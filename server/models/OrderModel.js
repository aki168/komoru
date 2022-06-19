const db = require("./_ConfigDB");

// 2022-06-18 PG
// 取得訂單 DataList、入住天數、房型資訊
// orderId orderNumber orderStartDate stayNight orderStatus 
// memberName 
// roomDesc
// return：({})
exports.getOrderDataListWithRoomDescAndStayNight = async () => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT " +
      "`Order`.`order_id`, `Order`.`order_number`, `Order`.`order_start_date`, (`order_end_date` - `order_start_date`) AS `stay_night`, `Order`.`order_status`, " +
      "`Member`.`member_name`, " +
      "CONCAT(`City`.`city_name`, '/',`Room`.`room_title`) AS `room_desc` " +
      "FROM `Order` " +
      "JOIN `Member` ON `Order`.`member_id` = `Member`.`member_id` " +
      "JOIN `Room` ON `Order`.`room_id` = `Room`.`room_id` " +
      "JOIN `Hotel` ON `Room`.`hotel_id` = `Hotel`.`hotel_id` " +
      "JOIN `City` ON `Hotel`.`city_id` = `City`.`city_id`;";
    db.con.query(sql, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.rowDataToCamelData(rows));
    });
  });
};

// 2022-06-18 PG
// 修改訂單狀態 By orderId
// return：{}
exports.updateOrderStatusByOrderId = async (dataList) => {
  return new Promise((resolve, reject) => {
    let sql =
      "UPDATE `Order` SET " +
      "`order_status` = ?, `updater_id` = ?, `update_datetime` = ? " +
      "WHERE `Order`.`order_id` = ?;";
    let value = [
      dataList.orderStatus,
      dataList.employeeId,
      db.getDateTimeNow(),
      dataList.orderId,
    ];
    db.con.query(sql, value, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve({
        status: result.serverStatus,
      });
    });
  });
};
