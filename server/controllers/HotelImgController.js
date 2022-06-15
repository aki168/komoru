const configController = require("./_ConfigController");
const hotelImgModel = require("../models/HotelImgModel");

// 2022-06-15 PG
// 取得飯店照片 By HotelId
// return：json
exports.getHotelImgDataListByHotelId = async (req, res, next) => {
  let data = req.body;
  if (typeof data.hotelId !== "undefined") {
    await hotelImgModel
      .getHotelImgDataListByHotelId(data.hotelId)
      .then((result) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(result));
      })
      .catch((err) => {
        // 目前不確定這邊要怎改
        console.log(err);
        res.status(500).json({ message: "Server error" });
      });
  } else {
    configController.sendErrorJsonMsg(res, "無傳遞變數");
  }
};
