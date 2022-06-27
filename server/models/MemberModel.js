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
exports.checkMailIsExisted = async (mail) => {
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
// passwd暫時先由前端判斷
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

// 0621 註冊會員  - aki
exports.register = async (mail, passwd, forgetPasswordAns, name, nickName, sex, phone) => {
  return new Promise((resolve, reject) => {
    let sql = "INSERT INTO `Member`" +
    " (`member_mail`, `member_passwd`, `member_forget_passwd_ans`, `member_name`, `member_nick_name`, `member_gender`, `member_phone`,`create_datetime`,`update_datetime`)"+
    " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);" ;
    let value = [ 
      mail, 
      passwd, 
      forgetPasswordAns, 
      name, 
      nickName, 
      sex, 
      phone,
      db.getDateTimeNow(),
      db.getDateTimeNow()
    ];

    console.log(value)
    db.con.query(sql, value, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(
        console.log('新增成功')
      );
    });
  });
};

//  0622 是否有登入 - aki
exports.isLogin = async (memberId) => {
  return new Promise((resolve, reject) => {
    let sql = ' SELECT * FROM Member WHERE `member_id` =  ? ; ';
    db.con.query(sql, memberId, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.rowDataToCamelData(rows));
    });
  });
};



// member_mail
// member_passwd
// member_forget_passwd_ans
// member_name
// member_nick_name
// member_gender
// member_phone
// member_img_path
// register_type
