const configController = require("./_ConfigController");
const hotelModel = require("../models/HotelModel");
const hotelImgModel = require("../models/HotelImgModel");

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
      configController.sendJsonMsg(res, true, "", result);
    })
    .catch((err) => {
      // 目前不確定這邊要怎改
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
};

// 2022-06-15 PG
// 取得飯店資料和照片 By hotelId
// return：json
exports.getHotelDataWithImgByHotelId = async (req, res, next) => {
  let data = req.body;
  if (typeof data.hotelId !== "undefined") {
    let result = {
      hotelData: await getHotelDataByHotelId(data.hotelId, res),
      hotelImgDataList: await getHotelImgDataListByHotelId(data.hotelId, res),
    };

    configController.sendJsonMsg(res, true, "", result);
  } else {
    configController.sendJsonMsg(res, false, "無傳遞變數", []);
  }
};

// 2022-06-30 PG
// 取得飯店資料 By hotelId
// hotelId：飯店 Id
// res：return err 用
// return：{}
const getHotelDataByHotelId = async (hotelId, res) => {
  let hotelData;
  await hotelModel
    .getHotelDataByHotelId(hotelId)
    .then((result) => {
      hotelData = result;
    })
    .catch((err) => {
      // 目前不確定這邊要怎改
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
  return hotelData;
};

// 2022-06-30 PG
// 取得飯店照片 dataList By hotelId
// hotelId：飯店 Id
// res：return err 用
// return：{}
const getHotelImgDataListByHotelId = async (hotelId, res) => {
  let hotelImgDataList;
  await hotelImgModel
    .getHotelImgDataListByHotelId(hotelId)
    .then((result) => {
      hotelImgDataList = result;
    })
    .catch((err) => {
      // 目前不確定這邊要怎改
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
  return hotelImgDataList;
};
