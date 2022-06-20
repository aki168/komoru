const db = require("./_ConfigDB");

// 0616 秀出全部的會員 - aki
exports.showAllMember = async () => {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM Member";
    db.con.query(sql, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.rowDataToCamelData(rows));
    });
  });
};

// 0616 是否有該會員email在資料庫 - aki
exports.emailIsExisted = async (mail) => {
  return new Promise((resolve, reject) => {
    let sql = ' SELECT * FROM Member WHERE `member_mail` =  ? ; ';
    db.con.query(sql, mail, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.rowDataToCamelData(rows));
    });
  });
};
// ' SELECT * FROM Member WHERE `member_mail` = "wang@gmail.com" ';

// 0619 確認帳密，允許登入(controller與emailIsExisted不同) - aki
exports.loginAuth = async (mail,passwd) => {
  return new Promise((resolve, reject) => {
    let sql = ' SELECT * FROM Member WHERE `member_mail` =  ? ; ';
    db.con.query(sql, mail, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.rowDataToCamelData(rows));
    });
  });
};

