const db = require("./_ConfigDB");

// 2022-06-15 PG
// 取得飯店列表、主圖、所屬縣市名
// hotelId hotelTitle hotelAddr hotelTel hotelContent checkInTime checkOutTime
// hotelImgPath
// cityName
// return：({})
exports.getHotelDataListWithMainImgAndCityName = async () => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT" +
      "`Hotel`.`hotel_id`,`Hotel`.`hotel_title`,`Hotel`.`hotel_addr`,`Hotel`.`hotel_tel`,`Hotel`.`hotel_content`, " +
      "`HotelImg`.`hotel_img_path`," +
      "`City`.`city_name` " +
      "FROM `Hotel` " +
      "JOIN `HotelImg` ON `Hotel`.`hotel_id` = `HotelImg`.`hotel_id` " +
      "JOIN `City` ON `Hotel`.`city_id` = `City`.`city_id`" +
      "WHERE `HotelImg`.`hotel_img_is_main` = '0' " +
      "AND `Hotel`.`is_invalid` = '1';";
    db.con.query(sql, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.rowDataToCamelData(rows));
    });
  });
};

// 2022-06-15 PG
// 取得飯店資料 By hotelId
// return：({})
exports.getHotelDataByHotelId = async (hotelId) => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT *" +
      "FROM `Hotel` " +
      "WHERE `Hotel`.`hotel_id` = ? " +
      "AND `Hotel`.`is_invalid` = '1';";
    let value = hotelId;
    db.con.query(sql, value, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.rowDataToCamelData(rows));
    });
  });
};

// 2022-07-01 PG
// 新增飯店和照片
// dataList：飯店資料
// return：{}
exports.addHotelWithImg = async (dataList) => {
  return new Promise((resolve, reject) => {
    // 最後回傳 hotelImgId 用
    let returnImgDataList = dataList.hotelImgDataList;

    let sql =
      "INSERT INTO `Hotel` " +
      "(`city_id`, `hotel_title`, `hotel_addr`, `hotel_tel`, `hotel_content`, `hotel_desc`, `creator_id`, `create_datetime`) " +
      "VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
    let value = [
      dataList.cityId,
      dataList.hotelTitle,
      dataList.hotelAddr,
      dataList.hotelTel,
      dataList.hotelContent,
      dataList.hotelDesc,
      dataList.employeeId,
      db.getDateTimeNow(),
    ];
    db.con.query(sql, value, (err, result) => {
      if (err) {
        reject(err);
      } else {
        // 如果飯店新增成功，並且有傳照片才繼續新增照片後續處理
        if (
          result.serverStatus == 2 &&
          Object.keys(returnImgDataList).length != 0
        ) {
          // 確保跑完照片動作才 resolve，目前想不到其他執行順序問題所產生的非同步狀況
          let count = 0;
          Object.entries(returnImgDataList).forEach(
            ([imgDataKey, imgDataValue]) => {
              // 新增照片
              let addImgSql =
                "INSERT INTO `HotelImg` " +
                "(`hotel_id`, `hotel_img_path`, `hotel_img_is_main`, `creator_id`, `create_datetime`) " +
                "VALUES (?, ?, ?, ?, ?);";
              let addImgValue = [
                result.insertId,
                "tmp",
                imgDataKey == "mainHotelImgFile" ? "0" : "1",
                dataList.employeeId,
                db.getDateTimeNow(),
              ];
              db.con.query(
                addImgSql,
                addImgValue,
                (addImgErr, addImgResult) => {
                  if (addImgErr) {
                    reject(addImgErr);
                  } else {
                    // 如果新增照片成功才修改照片路徑
                    if (addImgResult.serverStatus == 2) {
                      // 修改照片路徑
                      let updateImgSql =
                        "UPDATE `HotelImg` SET " +
                        "`hotel_img_path` = ?, `updater_id` = ?, `update_datetime` = ? " +
                        "WHERE `HotelImg`.`hotel_img_id` = ?;";
                      let updateImgValue = [
                        dataList.hotelImgPath +
                          addImgResult.insertId +
                          "." +
                          imgDataValue.mimetype,
                        dataList.employeeId,
                        db.getDateTimeNow(),
                        addImgResult.insertId,
                      ];
                      db.con.query(
                        updateImgSql,
                        updateImgValue,
                        (updateImgErr, updateImgResult) => {
                          if (updateImgErr) {
                            reject(updateImgErr);
                          } else {
                            // 修改成功的話把 hotelImgId 塞到要回傳的物件裡
                            returnImgDataList[imgDataKey].hotelImgId =
                              addImgResult.insertId;
                            count++;
                            // 確定跑完最後一筆才整包 resolve 回去
                            if (
                              count == Object.keys(returnImgDataList).length
                            ) {
                              resolve({
                                status: 2,
                                hotelImgDataList: returnImgDataList,
                                hotelId: result.insertId,
                              });
                            }
                          }
                        }
                      );
                    }
                  }
                }
              );
            }
          );
        }
      }
    });
  });
};
