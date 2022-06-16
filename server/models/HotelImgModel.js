const db = require("./_ConfigDB");

// 2022-06-15 PG
// 取得飯店照片列表 By hotelId
// hotelId：飯店 Id
// return：[{}]
exports.getHotelImgDataListByHotelId = async (hotelId) => {
    return new Promise((resolve, reject) => {
      let sql =
        "SELECT *" +
        "FROM `HotelImg` " +
        "WHERE `HotelImg`.`hotel_id` = ? " + 
        "AND `HotelImg`.`is_invalid` = '1';";
      let value = hotelId;
      db.con.query(sql, value,(err, rows, fields) => {
        if (err) {
          reject(err);
        }
        resolve(db.rowDataToCamelData(rows));
      });
    });
  };
  