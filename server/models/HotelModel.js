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
      "`Hotel`.`hotel_id`,`Hotel`.`hotel_title`,`Hotel`.`hotel_addr`,`Hotel`.`hotel_tel`,`Hotel`.`hotel_content`,`Hotel`.`check_in_time`,`Hotel`.`check_out_time`," +
      "`HotelImg`.`hotel_img_path`," +
      "`City`.`city_name` " +
      "FROM `Hotel` " +
      "JOIN `HotelImg` ON `Hotel`.`hotel_id` = `HotelImg`.`hotel_id` " +
      "JOIN `City` ON `Hotel`.`city_id` = `City`.`city_id`" +
      "WHERE `HotelImg`.`hotel_img_is_main` = '0'" +
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
      "WHERE `Hotel`.`hotel_id` = ?" +
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