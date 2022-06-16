const db = require("../bin/db/_Config");

// 2022-06-15 PG
// 取得房型列表、主圖、所屬縣市名
// roomId hotelId roomTitle liveNum
// roomImgPath
// hotelTitle
// return：({})
exports.getRoomDataListWithMainImgAndHotelName = async () => {
    return new Promise((resolve, reject) => {
      let sql =
        "SELECT" +
        "`Room`.`room_id`,`Room`.`hotel_id`,`Room`.`room_title`,`Room`.`live_num`," +
        "`RoomImg`.`room_img_path`," +
        "`Hotel`.`hotel_title`" +
        "FROM `Room` " +
        "JOIN `RoomImg` ON `Room`.`room_id` = `RoomImg`.`room_id` " +
        "JOIN `Hotel` ON `Room`.`hotel_id` = `Hotel`.`hotel_id` " +
        "WHERE `RoomImg`.`room_img_is_main` = '0';";
      db.con.query(sql, (err, rows, fields) => {
        if (err) {
          reject(err);
        }
        resolve(db.rowDataToCamelData(rows));
      });
    });
  };
  
  // 2022-06-15 PG
  // 取得房型資料 By roomId
  // return：({})
  exports.getRoomDataByRoomId = async (roomId) => {
    return new Promise((resolve, reject) => {
      let sql =
        "SELECT *" +
        "FROM `Room` " +
        "WHERE `Room`.`room_id` = ?;";
      let value = roomId;
      db.con.query(sql, value, (err, rows, fields) => {
        if (err) {
          reject(err);
        }
        resolve(db.rowDataToCamelData(rows));
      });
    });
  };