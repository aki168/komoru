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
exports.loginAuth = async (mail, passwd) => {
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
      " (`member_mail`, `member_passwd`, `member_forget_passwd_ans`, `member_name`, `member_nick_name`, `member_gender`, `member_phone`,`create_datetime`,`update_datetime`)" +
      " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
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

// 0627 修改個人資料 - aki 
// 更新(修改)一筆資料
// UPDATE `資料表` SET `欄位2` = '資料2'  WHERE `欄位1` = '資料1'  ;
exports.alterProfile = async (mail, name, nickName, sex, phone) => {
  return new Promise((resolve, reject) => {
    let sql = "UPDATE `Member`" +
      " SET `member_name`=?, `member_nick_name`=?, `member_gender`=?, `member_phone`=?,`update_datetime`=?" +
      " WHERE `member_mail` = ? ";
    let value = [
      name,
      nickName,
      sex,
      phone,
      db.getDateTimeNow(),
      mail
    ];

    console.log(value)
    db.con.query(sql, value, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(
        console.log('修改成功')
      );
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

// 0704 取得可使用的coupon - MJ
exports.getUsableCouponByMemberId = (memberId) => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT" +
      "`Coupon`.`coupon_title`,`CouponItem`.`coupon_id`,`Coupon`.`discount`" +
      "FROM `CouponItem`" +
      "JOIN `Coupon` ON `CouponItem`.`coupon_id` = `Coupon`.`coupon_id`" +
      "WHERE `CouponItem`.`coupon_item_status` = '0'" +
      "AND `CouponItem`.`member_id` = ?"
    let value = memberId

    db.con.query(sql, value, (err, rows, fields) => {
      if (err) {
        reject(err)
      }
      resolve(db.rowDataToCamelData(rows))
    })
  })
}

// 0704 取得已使用的coupon - MJ
exports.getUnusableCouponByMemberId = (memberId) => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT" +
      "`Coupon`.`coupon_title`,`CouponItem`.`coupon_id`,`Coupon`.`discount`" +
      "FROM `CouponItem`" +
      "JOIN `Coupon` ON `CouponItem`.`coupon_id` = `Coupon`.`coupon_id`" +
      "WHERE `CouponItem`.`coupon_item_status` = '1'" +
      "AND `CouponItem`.`member_id` = ?"
    let value = memberId

    db.con.query(sql, value, (err, rows, fields) => {
      if (err) {
        reject(err)
      }
      resolve(db.rowDataToCamelData(rows))
    })
  })
}


// 0704 勉勵金句抽卡 - MJ
exports.getRainbowCard = async () => {
  return new Promise((resolve, reject) => {
    let random = Math.floor(Math.random() * 15 + 1)
    let sql =
    "SELECT " +
    "`rainbow_card_content`, `rainbow_card_id` " +
    "FROM `RainbowCard` " +
    "WHERE `rainbow_card_id` = ? "
    
    db.con.query(sql, random, (err, rows, fields) => {
      if (err) {
        reject(err)
      }
      resolve(db.rowDataToCamelData(rows))
    })
  })
}

// 0704 勉勵金句儲存 - MJ
exports.saveRainbowCard = async (memberId, ranbowCardId) => {
  return new Promise((resolve, reject) => {
    // 檢查金句是否已經存在
    let sqlCheck = "SELECT 1 FROM `RainbowCardItem` WHERE `member_id` = ? AND `rainbow_card_id` = ? LIMIT 1 "
    let value = [memberId, ranbowCardId]
    let exist = db.con.query(sqlCheck, value, (err, results, fields) => {
      if (err) {
        reject(err)
      }
      else {
        if (results[0]) {
          resolve('already exist',
            console.log('already exist'))
        }
        else {
          let sql =
          "INSERT INTO `RainbowCardItem` " +
            "(`member_id`, `rainbow_card_id`)" +
            "VALUE (?, ?) "
            
            db.con.query(sql, value, (err, results, fields) => {
              if (err) {
                reject(err)
              }
            resolve('儲存成功')
          })
        }
      }
    })
  })
}

// 0705 生成coupon - MJ 
exports.createCoupon = async (memberId, couponId) => {
  return new Promise((resolve, reject) => {
    let sql = "INSERT INTO `CouponItem` " +
      "(`member_id`, `coupon_id`, `coupon_item_status`, `create_datetime`, `update_datetime`) " +
      "VALUE (?, ?, '0', ?, ?) "
    let time = db.getDateTimeNow()
    let value = [memberId, couponId, time, time]
    
    db.con.query(sql, value, (err, results, fields) => {
      if (err) {
        reject(err)
      }
      resolve('The solution is: ', results)
    })

  })
}

// 0705 - AKI 會員專區 : 修改頭貼照片 by mail
exports.updateMemberIcon = async (iconFilePath, mail) => {
  return new Promise((resolve, reject) => {
    let sql = "UPDATE `Member`" +
      " SET `member_img_path`=?,`update_datetime`=?" +
      " WHERE `member_mail` = ? ";
    let value = [
      iconFilePath+'.PNG',
      db.getDateTimeNow(),
      mail
    ];

    console.log(value)
    db.con.query(sql, value, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(
        console.log('修改成功')
      );
    });
  });
};