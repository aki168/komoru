const configController = require("./_ConfigController");
const orderModel = require("../models/OrderModel");
const orderItemModel = require("../models/OrderItemModel");
const jwt = require("jsonwebtoken"); //token
const { promisify } = require("util"); // nodejs原生
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
        let orderStatusValueToString = configController.enumValueToString(
          "Order",
          "orderStatus",
          value.orderStatus
        );
        let roomTypeValueToString = configController.enumValueToString(
          "Room",
          "roomType",
          value.roomType
        );
        // 如果檢查結果是正常，即將值取代為對應的文字，否則輸出錯誤訊息
        result[key].orderStatus = orderStatusValueToString.errCheck
          ? orderStatusValueToString.transferString
          : orderStatusValueToString.errMsg;
        result[key].roomType = roomTypeValueToString.errCheck
          ? result[key].cityName + "/" + roomTypeValueToString.transferString
          : roomTypeValueToString.errMsg;
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

// 2022-06-27 MJ
// 取得並儲存訂單資料
// req：前端傳來的訂單資料(JSON格式)
exports.getAndSaveOrderData = async (req, res) => {
  var data = req.body;

  try {
    await orderModel.saveOrderData(data).then((result) => {
      orderModel.saveOrderIdToOrderItemAndExamItem(result);
    });
    configController.sendJsonMsg(res, true, "", "儲存成功");
  } catch (error) {
    configController.sendJsonMsg(
      res,
      false,
      "輸入資料有誤",
      error["sqlMessage"]
    );
  }
};

// 2022-06-29 MJ
// 取得coupon By memberId
exports.getCouponData = async (req, res) => {
  var data = req.body;
  var memberId = data["memberId"];
  if (memberId) {
    try {
      let done = await orderModel.getCouponItemDataList(memberId);
      configController.sendJsonMsg(res, true, "", done);
    } catch (error) {
      configController.sendJsonMsg(res, false, "sqlError", error["sqlMessage"]);
      console.log(error);
    }
  } else {
    configController.sendJsonMsg(res, false, "memberId有誤", "");
  }
};

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

// 2022-06-30 AKI MJ
// 取得訂單資料byMemberId
exports.getOrderDataByMemberId = async (req, res) => {
  const { token } = req.body;
  if (token) {
    //   解碼
    const decoded = await promisify(jwt.verify)(token, "jwtSecret");
    const { memberId } = decoded;
    // let memberId = 8763
    // 解碼完後對照資料庫，有的話回傳該訂單資料

    try {
      let getOrderDataByMemberId = await orderModel.getOrderDataByMemberId(
        memberId
      );
      let orderItemDataList = await orderModel.getOrderItemDataListByMemberId(
        memberId
      );

      // 將 enum 數值轉換為文字
      Object.entries(getOrderDataByMemberId).forEach(([key, value]) => {
        let valueToString = configController.enumValueToString(
          "Room",
          "roomType",
          value.roomType
        );
        let orderStatusValueToString = configController.enumValueToString(
          "Order",
          "orderStatus",
          value.orderStatus
        );
        let memberGenderValueToString = configController.enumValueToString(
          "Member",
          "gender",
          value.memberGender
        );

        // 如果檢查結果是正常，即將值取代為對應的文字，否則輸出錯誤訊息
        getOrderDataByMemberId[key].roomType = valueToString.errCheck
          ? valueToString.transferString
          : valueToString.errMsg;

        getOrderDataByMemberId[key].orderStatus =
          orderStatusValueToString.errCheck
            ? orderStatusValueToString.transferString
            : orderStatusValueToString.errMsg;

        getOrderDataByMemberId[key].memberGender =
          memberGenderValueToString.errCheck
            ? memberGenderValueToString.transferString
            : memberGenderValueToString.errMsg;
      });
      Object.entries(orderItemDataList).forEach(([key, value]) => {
        let activePackTypeValueToString = configController.enumValueToString(
          "ActivePack",
          "activePackType",
          value.activePackType
        );
        orderItemDataList[key].activePackType =
          activePackTypeValueToString.errCheck
            ? activePackTypeValueToString.transferString
            : activePackTypeValueToString.errMsg;
      });
      configController.sendJsonMsg(res, true, "", {
        getOrderDataByMemberId,
        orderItemDataList,
      });
    } catch (error) {
      // 目前不確定這邊要怎改
      console.log(err);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.json({ message: "該用戶尚未登入" });
  }
};

// 2022-07-05 PG
// 取得訂單資料 by memberId（後台 memberId）
exports.no = async (req, res) => {
  let data = req.body;
  let checkDataResult = checkData(data, ["orderId"]);
  // 判斷是否有空值、沒有傳需要的資料
  if (checkDataResult.errCheck) {
    await orderModel // 解碼完後對照資料庫，有的話回傳該訂單資料
      .getOrderDataByOrderId(data)
      .then((result) => {
        Object.entries(result).forEach(([key, value]) => {
          // 將 enum 數值轉換為文字
          let valueToString = configController.enumValueToString(
            "Room",
            "roomType",
            value.roomType
          );
          // 如果檢查結果是正常，即將值取代為對應的文字，否則輸出錯誤訊息
          result[key].roomType = valueToString.errCheck
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
  } else {
    configController.sendJsonMsg(res, false, checkDataResult.errMsg, []);
  }
};

// 2022-07-05 PG
// 取得訂單資料與活動包 by orderId
// return：json
exports.getOrderDataWithActivePackByOrderId = async (req, res) => {
  let data = req.body;
  if (typeof data.orderId !== "undefined") {
    let result = {
      orderData: await getOrderDataByOrderId(data.orderId, res),
      orderItemDataList: await getOrderItemDataListWithActivePackByOrderId(
        data.orderId,
        res
      ),
    };
    configController.sendJsonMsg(res, true, "", result);
  } else {
    configController.sendJsonMsg(res, false, "無傳遞變數", []);
  }
};

// 2022-07-05 PG
// 取得訂單資料 By orderId
// orderId：訂單 Id
// res：return err 用
// return：{}
const getOrderDataByOrderId = async (orderId, res) => {
  let orderData;
  await orderModel
    .getOrderDataByOrderId(orderId)
    .then((result) => {
      let roomTypeValueToString = configController.enumValueToString(
        "Room",
        "roomType",
        result[0].roomType
      );
      let orderStatusValueToString = configController.enumValueToString(
        "Order",
        "orderStatus",
        result[0].orderStatus
      );
      let paymentValueToString = configController.enumValueToString(
        "Order",
        "payment",
        result[0].payment
      );
      let memberGenderValueToString = configController.enumValueToString(
        "Member",
        "gender",
        result[0].memberGender
      );
      result[0].roomDetail =
        result[0].roomDetail +
        (roomTypeValueToString.errCheck
          ? roomTypeValueToString.transferString
          : roomTypeValueToString.errMsg);

      result[0].orderStatus = orderStatusValueToString.errCheck
        ? orderStatusValueToString.transferString
        : orderStatusValueToString.errMsg;

      result[0].payment = paymentValueToString.errCheck
        ? paymentValueToString.transferString
        : paymentValueToString.errMsg;

      result[0].memberGender = memberGenderValueToString.errCheck
        ? memberGenderValueToString.transferString
        : memberGenderValueToString.errMsg;
      orderData = result;
    })
    .catch((err) => {
      // 目前不確定這邊要怎改
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
  return orderData;
};

// 2022-07-05 PG
// 取得訂單明細資料 By orderId
// orderId：訂單 Id
// res：return err 用
// return：{}
const getOrderItemDataListWithActivePackByOrderId = async (orderId, res) => {
  let orderItemDataList;
  await orderItemModel
    .getOrderItemDataListWithActivePackByOrderId(orderId)
    .then((result) => {
      Object.entries(result).forEach(([key, value]) => {
        let valueToString = configController.enumValueToString(
          "ActivePack",
          "activePackType",
          value.activePackType
        );
        result[key].activePackType = valueToString.errCheck
          ? valueToString.transferString
          : valueToString.errMsg;
        orderItemDataList = result;
      });
    })
    .catch((err) => {
      // 目前不確定這邊要怎改
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
  return orderItemDataList;
};
