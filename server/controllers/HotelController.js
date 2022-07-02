const configController = require("./_ConfigController");
const hotelModel = require("../models/HotelModel");
const hotelImgModel = require("../models/HotelImgModel");
const fs = require("fs");

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

// 2022-07-01 PG
// 新增飯店和照片
// return：json
exports.addHotelWithImg = async (req, res, next) => {
  let data = JSON.parse(req.body.hotelDataList);
  let checkDataResult = checkData(data, [
    "hotelTitle",
    "hotelAddr",
    "hotelTel",
    "hotelDesc",
    "employeeId",
  ]);
  let mainImg = req.files.mainHotelImgFile[0];
  let firstImg = req.files.firstHotelImgFile[0];
  let secondImg = req.files.secondHotelImgFile[0];
  let thirdImg = req.files.thirdHotelImgFile[0];

  data.hotelImgPath = "/images/hotel/hotel-";
  // 整理照片資訊：副檔名、檔案路徑含原始檔名、檔案路徑
  data.hotelImgDataList = {
    main: {
      mimetype: mainImg.mimetype.substr(mainImg.mimetype.indexOf("/") + 1),
      originName: mainImg.destination + mainImg.filename,
      destination: mainImg.destination,
    },
    first: {
      mimetype: firstImg.mimetype.substr(firstImg.mimetype.indexOf("/") + 1),
      originName: firstImg.destination + firstImg.filename,
      destination: mainImg.destination,
    },
    second: {
      mimetype: secondImg.mimetype.substr(secondImg.mimetype.indexOf("/") + 1),
      originName: secondImg.destination + secondImg.filename,
      destination: mainImg.destination,
    },
    third: {
      mimetype: thirdImg.mimetype.substr(thirdImg.mimetype.indexOf("/") + 1),
      originName: thirdImg.destination + thirdImg.filename,
      destination: mainImg.destination,
    },
  };
  // 判斷是否有空值、沒有傳需要的資料
  if (checkDataResult.errCheck) {
    await hotelModel
      .addHotelWithImg(data)
      .then((result) => {
        // 判斷資料庫執行狀態是否為成功
        if (result.status == 2) {
          // 將檔案更名為 id 格式
          Object.values(result.hotelImgDataList).forEach((imgDataValue) => {
            fs.rename(
              imgDataValue.originName,
              imgDataValue.destination +
                "hotel-" +
                imgDataValue.hotelImgId +
                "." +
                imgDataValue.mimetype,
              function (err) {
                if (err) configController.sendJsonMsg(res, false, err, []);
              }
            );
          });

          configController.sendJsonMsg(res, true, "", {
            hotelId: result.hotelId,
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
      case "hotelDesc":
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
