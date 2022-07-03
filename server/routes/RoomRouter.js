const express = require("express");
const router = express.Router();

const roomController = require("../controllers/RoomController");

// 2022-06-12-PG
// 載入回傳 json 格式所需模組
const bodyParser = require("body-parser");
router.use(bodyParser.json());

// 2022-06-29 PG
// 上傳檔案初始化
const multer = require("multer");
// 自定義行為模式
const storage = multer.diskStorage({
  // 指定儲存路徑
  destination: function (req, file, cb) {
    cb(null, "./public/images/room/");
  },
  // 檔名更改
  filename: function (req, file, cb) {
    cb(null, "room" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// ----------------------------------------------------------------------------------------------------------------------

// 2022-06-15 PG
// 取得房型列表、主圖、所屬飯店名、所屬區域名
// roomId hotelId roomTitle liveNum
// roomImgPath
// hotelTitle
// cityName
router.post(
  "/getRoomDataListWithMainImgAndHotelNameAndCityName",
  roomController.getRoomDataListWithMainImgAndHotelNameAndCityName
);

// 2022-06-15 PG
// 取得房型資料 By roomId
router.post("/getRoomDataByRoomId", roomController.getRoomDataByRoomId);

// 2022-06-29 PG
// 新增房型
router.post(
  "/addRoom",
  upload.fields([{ name: "roomImgFile" }, { name: "roomDataList" }]),
  roomController.addRoomWithImg
);

// 2022-07-03 PG
// 修改房型 By roomId
router.post(
  "/updateRoomByRoomId",
  upload.fields([{ name: "roomImgFile" }, { name: "roomDataList" }]),
  roomController.updateRoomWithImgByRoomId
);

module.exports = router;
