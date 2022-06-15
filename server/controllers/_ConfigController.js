// 2022-06-15 PG
// 回傳異常狀態：json 格式
// res：resquest
// msg: 錯誤訊息
exports.sendErrorJsonMsg= (res,msg) => {
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        status: false,
        errMsg: msg,
        data: [],
      })
    );
}