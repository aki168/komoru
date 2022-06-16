const db = require("./_ConfigDB");

// 2022-06-15 PG
// 取得房型照片列表 By roomId
// roomId：房型 Id
// return：[{}]
exports.getRoomImgDataListByRoomId = async (roomId) => {
    return new Promise((resolve, reject) => {
      let sql =
        "SELECT *" +
        "FROM `RoomImg` " +
        "WHERE `RoomImg`.`room_id` = ?" + 
        "AND `RoomImg`.`is_invalid` = '1';";
      let value = roomId;
      db.con.query(sql, value,(err, rows, fields) => {
        if (err) {
          reject(err);
        }
        resolve(db.rowDataToCamelData(rows));
      });
    });
  };
  