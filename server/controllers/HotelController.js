const configController = require("./_ConfigController");
const hotelModel = require("../models/HotelModel");

// 2022-06-15 PG
// 取得飯店列表、主圖、所屬縣市名
// hotelId hotelTitle hotelAddr hotelTel hotelContent checkInTime checkOutTime
// hotelImgPath
// cityName
// return：json
exports.getHotelDataListWithMainImgAndCityName = async (req, res, next) => {
  await hotelModel
    .getHotelDataListWithMainImgAndCityName()
    .then((result) => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(result));
    })
    .catch((err) => {
      // 目前不確定這邊要怎改
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
};

// 2022-06-15 PG
// 取得飯店資料 By hotelId
// return：json
exports.getHotelDataByHotelId = async (req, res, next) => {
  let data = req.body;
  if (typeof(data.hotelId) !== "undefined") {
    await hotelModel
      .getHotelDataByHotelId(data.hotelId)
      .then((result) => {
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            status: true,
            errMsg: "",
            data: result,
          })
        );
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
