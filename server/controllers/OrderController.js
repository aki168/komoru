const configController = require("./_ConfigController");
const orderModel = require("../models/OrderModel");
const jwt = require('jsonwebtoken'); //token
const { promisify } = require('util'); // nodejs原生
// --------------------------------------------------------------

// 2022-06-18 PG
// 取得訂單 DataList、房型資訊、入住天數
// orderId orderNumber orderStartDate stayNight orderStatus 
// memberName 
// roomDesc
// return：json
exports.getOrderDataListWithRoomDescAndStayNight = async (req, res, next) => {
  await orderModel
    .getOrderDataListWithRoomDescAndStayNight()
    .then((result) => {
      Object.entries(result).forEach(([key, value]) => {
        // 將 enum 數值轉換為文字
        let valueToString = configController.enumValueToString(
          "Order",
          "orderStatus",
          value.orderStatus
        );
        // 如果檢查結果是正常，即將值取代為對應的文字，否則輸出錯誤訊息
        result[key].orderStatus = valueToString.errCheck
          ? valueToString.transferString
          : valueToString.errMsg;
      });
      configController.sendJsonMsg(res, true, "", result);
    })
    .catch((err) => {
      // 目前不確定這邊要怎改
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
};

// 2022-06-18 PG
// 修改訂單狀態 By orderId
// return：json
exports.updateOrderStatusByOrderId = async (req, res, next) => {
  let data = req.body;
  let checkDataResult = checkData(data, [
    "orderId",
    "orderStatus",
    "employeeId",
  ]);
  // 判斷是否有空值、沒有傳需要的資料
  if (checkDataResult.errCheck) {
    await orderModel
      .updateOrderStatusByOrderId(data)
      .then((result) => {
        // 判斷資料庫執行狀態是否為成功
        if (result.status == 2) {
          configController.sendJsonMsg(res, true, "", []);
        } else {
          configController.sendJsonMsg(res, false, "SQL未預期錯誤", []);
        }
      })
      .catch((err) => {
        // 目前不確定這邊要怎改
        console.log(err);
        res.status(500).json({ message: "Server error" });
      });
  } else {
    configController.sendJsonMsg(res, false, checkDataResult.errMsg, []);
  }
};


// MJ
// 取得並儲存訂單資料
// req：前端傳來的訂單資料(JSON格式)
exports.getAndSaveOrderData = async (req, res) => {
  var data = req.body
  try {
    let done = await orderModel.saveOrderData(data)
    configController.sendJsonMsg(res, true, '', done)
  } catch (error) {
    configController.sendJsonMsg(res, false, '輸入資料有誤', error['sqlMessage'])
  }
}


// 2022-06-29 MJ
// 取得coupon By memberId
exports.getCouponData = async (req, res) => {
  var data = req.body
  var memberId = data['memberId']
  if (memberId) {
    try {
      let done = await orderModel.getCouponItemDataList(memberId)
      console.log(done)
      configController.sendJsonMsg(res, true, '', done)
    }
    catch (error) {
      configController.sendJsonMsg(res, false, 'sqlError', error['sqlMessage'])
      console.log(error)
    }
  }
  else {
    configController.sendJsonMsg(res, false, 'memberId有誤', '')
  }
}


// 2022-06-18 PG
// 檢查資料
// dataList：要檢查的資料（前端傳來的）
// dataColumns：要檢查的項目
// return json
const checkData = (dataList, dataColumns) => {
  let errMsg = "";
  let errCheck = true;
  dataColumns.forEach((value) => {
    if (
      typeof dataList[value] === "undefined" ||
      !dataList[value] ||
      typeof dataList[value] === ""
    ) {
      errMsg += value + " 不可為空。";
      errCheck = false;
    }
  });
  return {
    errMsg: errMsg,
    errCheck: errCheck,
  };
};


// 2022-06-28 AKI
// 取得訂單資料byMemberId
exports.getOrderDataByMemberId = async (req, res) => {
  const { token } = req.body;
  if (token) {
    // 解碼
    const decoded = await promisify(jwt.verify)(token, "jwtSecret")
    console.log(decoded);
    const { memberId } = decoded;

    await orderModel // 解碼完後對照資料庫，有的話回傳該訂單資料
      .getOrderDataByMemberId(memberId)
      .then((result) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(result));
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Server error" });
      })
  } else {
    res.json({ message: "該用戶尚未登入" })
  }
};
