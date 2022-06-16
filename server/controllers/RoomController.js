const configController = require("./_ConfigController");
const roomModel = require("../models/RoomModel");

// 2022-06-15 PG
// 取得房型列表、主圖、所屬縣市名
// roomId hotelId roomTitle liveNum
// roomImgPath
// hotelTitle
// return：json
exports.getRoomDataListWithMainImgAndHotelName = async (req, res, next) => {
  await roomModel
    .getRoomDataListWithMainImgAndHotelName()
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
