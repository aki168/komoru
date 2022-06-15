const express = require("express");
const router = express.Router();

const hotelController = require("../controllers/HotelController");

// 2022-06-12-PG
// 載入回傳 json 格式所需模組
const bodyParser = require("body-parser");
router.use(bodyParser.json());

// ----------------------------------------------------------------------------------------------------------------------

// 2022-06-15 PG
// 取得飯店列表、主圖、所屬縣市名
// hotelId hotelTitle hotelAddr hotelTel hotelContent checkInTime checkOutTime
// hotelImgPath
// cityName
router.post("/getHotelDataListWithMainImgAndCityName", hotelController.getHotelDataListWithMainImgAndCityName);

// 2022-06-15 PG
// 取得飯店資料 By hotelId
router.post("/getHotelDataByHotelId", hotelController.getHotelDataByHotelId);


module.exports = router;
