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
      "`City`.`city_name`, " +
      "`Room`.`room_type` " +
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


// 2022-06-22 MJ
// 取得訂房資料
// 傳入JSON格式資料如下
/**{
  "memberId": "1",
  "orderStartDate": "2022-06-23",
  "expDays": 1,
  "orderStatus": "0",
  "roomId": "4",
  "couponItemId": "3",
  "orderTotal": 8888,
}
*/
// return：JSON
exports.getOrderData = (data) => {
  // 駝峰轉_
  // 傳入string
  function decamelize(string, options) {
    options = options || {};
    var separator = options.separator || '_'
    var split = options.split || /(?=[A-Z])/
    return string.split(split).join(separator).toLowerCase()
  }

  // 日期加天數Function
  Date.prototype.addDays = function (days) {
    this.setDate(this.getDate() + days)
    return this
  }

  // 收到請求時加入創建訂單的時間
  data['createDatetime'] = db.getDateTimeNow()

  // 取得入住日期並加上體驗天數
  var date = new Date(data["orderStartDate"])
  date = date.addDays(parseInt(data['expDays'])).toLocaleDateString()

  // 將體驗天數轉為退房日期並放入JSON資料中
  data['orderEndDate'] = date
  delete data['expDays']

  // console.log(data)
  // 把JSON中的駝峰改為_
  for (key in data) {
    var newKey = decamelize(key)
    if (newKey) {
      data[newKey] = data[key]
      delete data[key]
    }
  }
  return data
}

// 2022-06-22 MJ
// 將訂房資料存入SQL
exports.saveOrderData = async (data) => {
  data = this.getOrderData(data)
  // 生成隨機亂碼做order_number
  data['order_number'] = db.creatRandomPassword(8)

  //  檢查order_number是否重複
  let check = await exports.isOnumExist(data['order_number'])
  while (check) {
    data['order_number'] = db.creatRandomPassword(8)
    let doubleCheck = await exports.isOnumExist(data['order_number'])
    if (doubleCheck) {
      break
    }
  }

  // 存入SQL
  return new Promise(function (reslove, reject) {
    db.con.query('INSERT INTO `Order` SET ?', data, function (error, results, fields) {
      if (error) {
        reject(error)
      }
      reslove(
        data,
        console.log('The solution is: ', results)
      )
    })
  })
}

// 2022-06-28 MJ
// 檢查orderNumber是否重複
exports.isOnumExist = (orderNum) => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT " +
      "`order_number`" +
      "FROM `Order`" +
      "WHERE `order_number` = ?"
    let value = orderNum

    db.con.query(sql, value, (err, result) => {
      if (err) {
        reject(false)
      }
      resolve(true)
    })
  })
}

// 2022-06-29 MJ
// 取得會員couponItem dataList
// return：({})
exports.getCouponItemDataList = async (memberId) => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT" +
      "`Coupon`.`coupon_title`,`CouponItem`.`coupon_id`,`Coupon`.`discount`" +
      "FROM `CouponItem`" +
      "JOIN `Coupon` ON `CouponItem`.`coupon_id` = `Coupon`.`coupon_id`" +
      "WHERE `CouponItem`.`coupon_item_status` = '0'" +
      "AND `CouponItem`.`member_id` = ?"
    let value = memberId

    db.con.query(sql, value, (err, rows, fields) => {
      if (err) {
        reject(err)
      }
      resolve(db.rowDataToCamelData(rows))
    })
  })
}

// 2022-06-28 AKI

// 取得訂單資料byMemberId (只有標題....)
exports.getOrderDataByMemberId  = async (memberId) => {
  return new Promise((resolve, reject) => {
    let sql = 
    "SELECT `Order`.`order_id`,`Order`.`order_number`," +
    "`Hotel`.`Hotel_id`,`Hotel`.`hotel_title`, `Hotel`.`hotel_tel`, `Hotel`.`hotel_addr`," + 
    "`Order`.`order_start_date`,`Member`.`member_id`, `Member`.`member_name`," +
    "(`order_end_date` - `order_start_date`) AS `stay_night`, `Order`.`order_status`," + 
    "CONCAT(`City`.`city_name`,'　', `Hotel`.`hotel_title` ,'　/　',`Room`.`room_title`) AS `room_desc` " +
    "FROM `Order` " +
    "JOIN `Member` ON `Order`.`member_id` = `Member`.`member_id`"+
    "JOIN `Room` ON `Order`.`room_id` = `Room`.`room_id` "+
    "JOIN `Hotel` ON `Room`.`hotel_id` = `Hotel`.`hotel_id`"+
    "JOIN `City` ON `Hotel`.`city_id` = `City`.`city_id`"+
    "WHERE `Member`.`member_id` = ? "+
    "ORDER BY `order_start_date` DESC;";
    db.con.query(sql, memberId, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.rowDataToCamelData(rows));
    });
  });
};