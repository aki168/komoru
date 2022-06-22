const mysql = require("mysql");

const db = mysql.createConnection({
  host: "db4free.net",
  port: "3306",
  user: "kmradmin",
  password: "1qaz@WSX",
  database: "komoru",
  dateStrings: true, // 2022-06-18 PG 強制日期格式以字串傳回
  multipleStatements: true
});

db.connect(function (err) {
  // console.log(err);
  if (err) {
    console.log("connecting error");
    return;
  }
  console.log("connecting success");
});

exports.con = db;

// 2022-06-14 PG
// 將 column name 底線轉換為駝峰
// Ex：city_id -> cityId
// text：要轉換的字串
// return：string
exports.setColumnNameLineToCamel = (text) => {
  return text.replace(/(_\w)/g, (t) => {
    return t[1].toUpperCase();
  });
};

// 2022-06-14 PG
// 將 column name 駝峰轉換為底線
// Ex：cityId -> city_id
// text：要轉換的字串
// return：string
exports.setColumnNameCamelToLine = (text) => {
  return text
    .replace(/[\w]([A-Z])/g, (m) => {
      return m[0] + "_" + m[1];
    })
    .toLowerCase();
};

// 2022-06-14 PG
// 將 rowData obj 轉換為駝峰
// rows：原始資料庫 obj
// return：陣列包物件 [{}]
exports.rowDataToCamelData = (rows) => {
  let newDatalist = [];
  Object.values(rows).forEach((data) => {
    let newData = {};
    Object.entries(data).forEach(([key, value]) => {
      Object.assign(newData, { [this.setColumnNameLineToCamel(key)]: value });
    });
    newDatalist.push(newData);
  });
  return newDatalist;
};

// 2022-06-14 PG
// 將 key 為駝峰資料轉為底線
// dataList：欲轉換的 dataList obj
// return：陣列包物件 [{}]
exports.camelDataToRowData = (dataList) => {
  let newDatalist = [];
  Object.values(dataList).forEach((data) => {
    let newData = {};
    Object.entries(data).forEach(([key, value]) => {
      Object.assign(newData, { [this.setColumnNameCamelToLine(key)]: value });
    });
    newDatalist.push(newData);
  });
  return newDatalist;
};

// 2022-06-16 PG
// 取得當下時間（ +8 hr 轉換）
exports.getDateTimeNow = () => {
  let now = new Date();
  now = now.setHours(now.getHours() + 8);
  return new Date(now)
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "");
};

exports.multipleQueryRowDataToSingleObj = (dataList) => {
  let newDatalist = [];
  dataList = JSON.parse(JSON.stringify(dataList));
  dataList.forEach((data)=>{
      Object.entries(data[0]).forEach(([key, value]) => {
         newDatalist[key] = value;
        });
    });
    return newDatalist;
}