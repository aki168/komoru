// 2022-06-15 PG
// 回傳 json 格式
// res：resquest
// status：給前端判斷的狀態
// msg：錯誤訊息
// data：回傳的資料
exports.sendJsonMsg = (res, status, msg, data) => {
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      "status": status,
      "errMsg": msg,
      "data": data,
    })
  );
};
