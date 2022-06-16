const express = require("express");
const router = express.Router();

const roomController = require("../controllers/RoomController");

// 2022-06-12-PG
// 載入回傳 json 格式所需模組
const bodyParser = require("body-parser");
router.use(bodyParser.json());

// ----------------------------------------------------------------------------------------------------------------------

// 2022-06-15 PG
// 取得房型列表、主圖、所屬縣市名
// roomId hotelId roomTitle liveNum
// roomImgPath
// hotelTitle
router.post("/getRoomDataListWithMainImgAndHotelName", roomController.getRoomDataListWithMainImgAndHotelName);

// 2022-06-15 PG
// 取得房型資料 By roomId
router.post("/getRoomDataByRoomId", roomController.getRoomDataByRoomId);


module.exports = router;
