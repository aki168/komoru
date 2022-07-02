const configController = require("./_ConfigController");
const roomModel = require("../models/RoomModel");
const fs = require("fs");

// 2022-06-15 PG
// 取得房型列表、主圖、所屬飯店名、所屬區域名
// roomId hotelId roomTitle liveNum
// roomImgPath
// hotelTitle
// cityName
// return：json
exports.getRoomDataListWithMainImgAndHotelNameAndCityName = async (
  req,
  res,
  next
) => {
  await roomModel
    .getRoomDataListWithMainImgAndHotelNameAndCityName()
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
};

// 2022-06-15 PG
// 取得房型資料 By roomId
// return：json
exports.getRoomDataByRoomId = async (req, res, next) => {
  let data = req.body;
  if (typeof data.roomId !== "undefined") {
    await roomModel
      .getRoomDataByRoomId(data.roomId)
      .then((result) => {
        configController.sendJsonMsg(res, true, "", result);
      })
      .catch((err) => {
        // 目前不確定這邊要怎改
        console.log(err);
        res.status(500).json({ message: "Server error" });
      });
  } else {
    configController.sendJsonMsg(res, false, "無傳遞變數", []);
  }
};

// 2022-06-29 PG
// 新增房型和照片
// return：json
exports.addRoomWithImg = async (req, res, next) => {
  let data = JSON.parse(req.body.roomDataList);
  let checkDataResult = checkData(data, [
    "hotelId",
    "roomType",
    "liveNum",
    "roomDesc",
    "employeeId",
  ]);

  // 整理照片資訊
  let img = req.files.roomImgFile[0];
  let mimetype = img.mimetype.substr(img.mimetype.indexOf("/") + 1);
  data.roomImgPath = "/images/room/room-";
  data.mimetype = mimetype;

  // 判斷是否有空值、沒有傳需要的資料
  if (checkDataResult.errCheck) {
    await roomModel
      .addRoomWithImg(data)
      .then((result) => {
        // 判斷資料庫執行狀態是否為成功
        if (result.status == 2) {
          // 將檔案更名為 id 格式
          fs.rename(
            img.destination + img.filename,
            img.destination + "room-" + result.roomImgId + "." + mimetype,
            function (err) {
              if (err) configController.sendJsonMsg(res, false, err, []);
            }
          );
          configController.sendJsonMsg(res, true, "", {
            roomId: result.roomId,
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

// 2022-06-18 PG
// 檢查資料
// dataList：要檢查的資料（前端傳來的）
// dataColumns：要檢查的項目
// return json
const checkData = (dataList, dataColumns) => {
  let errMsg = "";
  let errCheck = true;
  dataColumns.forEach((value) => {
    switch (value) {
      case "roomDesc":
        if (typeof dataList[value] === "undefined") {
          errMsg += value + " 不可為空。";
          errCheck = false;
        }
        break;
      default:
        if (
          typeof dataList[value] === "undefined" ||
          !dataList[value] ||
          typeof dataList[value] === ""
        ) {
          errMsg += value + " 不可為空。";
          errCheck = false;
        }
        break;
    }
  });
  return {
    errMsg: errMsg,
    errCheck: errCheck,
  };
};
