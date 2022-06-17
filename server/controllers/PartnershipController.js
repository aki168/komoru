const configController = require("./_ConfigController");
const partnershipModel = require("../models/PartnershipModel");

// 2022-06-16 PG
// 取得合作夥伴 dataList、所屬城市名稱
// partnershipId partnershipName partnershipAddr partnershipTel partnershipContactPerson
// cityName
// return：json
exports.getPartnershipDataListWithCityName = async (req, res, next) => {
  await partnershipModel
    .getPartnershipDataListWithCityName()
    .then((result) => {
      configController.sendJsonMsg(res, true, "", result);
    })
    .catch((err) => {
      // 目前不確定這邊要怎改
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
};

// 2022-06-15 PG
// 取得合作夥伴 Data By partnershipId
// return：json
exports.getPartnershipDataByPartnershipId = async (req, res, next) => {
  let data = req.body;
  let checkDataResult = checkData(data, ["partnershipId"]);
  // 判斷是否有空值、沒有傳需要的資料
  if (checkDataResult.errCheck) {
    await partnershipModel
      .getPartnershipDataByPartnershipId(data.partnershipId)
      .then((result) => {
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

// 2022-06-16 PG
// 新增合作夥伴
// return：json
exports.addPartnership = async (req, res, next) => {
  let data = req.body;
  let checkDataResult = checkData(data, [
    "cityId",
    "partnershipName",
    "partnershipAddr",
    "partnershipTel",
    "partnershipContactPerson",
    "employeeId"
  ]);
  // 判斷是否有空值、沒有傳需要的資料
  if (checkDataResult.errCheck) {
    await partnershipModel
      .addPartnership(data)
      .then((result) => {
        // 判斷資料庫執行狀態是否為成功
        if (result.status == 2) {
          configController.sendJsonMsg(res, true, "", {
            partnershipId: result.partnershipId,
          });
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

// 2022-06-17 PG
// 修改合作夥伴
// return：json
exports.updatePartnership = async (req, res, next) => {
  let data = req.body;
  let checkDataResult = checkData(data, [
    "partnershipId",
    "cityId",
    "partnershipName",
    "partnershipAddr",
    "partnershipTel",
    "partnershipContactPerson",
    "employeeId"
  ]);
  // 判斷是否有空值、沒有傳需要的資料
  if (checkDataResult.errCheck) {
    await partnershipModel
      .updatePartnership(data)
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

// 2022-06-16 PG
// 刪除合作夥伴
// return：json
exports.delPartnership = async (req, res, next) => {
  let data = req.body;
  let checkDataResult = checkData(data, [
    "partnershipId",
    "employeeId"
  ]);
  // 判斷是否有空值、沒有傳需要的資料
  if (checkDataResult.errCheck) {
    await partnershipModel
      .delPartnership(data)
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

// 2022-06-16 PG
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
