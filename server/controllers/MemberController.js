const memberModel = require("../models/MemberModel");
const configController = require("./_ConfigController");
const jwt = require('jsonwebtoken'); //token
const { application } = require("express");
const { promisify } = require('util'); // nodejs原生
const db = require("../models/_ConfigDB");
const { encode } = require("punycode");

// 0616 秀出全部的會員 - aki
exports.showAllMember = async (req, res, next) => {
  await memberModel
    .showAllMember()
    .then((result) => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
};

// 0616 是否有該會員email在資料庫 - aki
exports.checkMailIsExisted = async (req, res) => {
  const { mail } = req.body;
  await memberModel
    .checkMailIsExisted(mail)
    .then((result) => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
};

// 0619 確認帳密，允許登入（上）＋先生成token在後端 - aki
exports.loginAuth = async (req, res) => {
  console.log(req.body);
  const { mail, passwd } = req.body;
  console.log(mail, passwd);

  await memberModel
    .loginAuth(mail, passwd)
    .then((result) => {
      console.log(result)
      const memberId = result[0].memberId;
      console.log(memberId)//印出驗證通的會員id

      // 依據id生成token
      const token = jwt.sign({ memberId: memberId }, 'jwtSecret', {
        expiresIn: '90d'
      }) //預設90天
      console.log(`印出專屬token：${token}`)

      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ auth: true, token: token, result: result }));

    })

    .catch((err) => {

      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
};

// 0619 確認帳密，允許登入（下） - aki // 仍在調整中
exports.verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"]

  if (!token) {
    res.send("嘿，我需要一個token，下次請給我")
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "您驗證失敗" })
      } else {
        req.memberId = decoded.memberId;
      }
      next();
    })
  }
}

// 0621 註冊會員 - aki
exports.register = async (req, res) => {
  console.log(req.body);
  const { mail, passwd, forgetPasswordAns, name, nickName, sex, phone } = req.body;
  await memberModel
    .register(mail, passwd, forgetPasswordAns, name, nickName, sex, phone)
    .then((result) => {
      console.log(result)
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
};

// 0622 是否有登入 - aki
exports.isLogin = async (req, res, next) => {
  // console.log(req.body);
  const { token } = req.body;
  if (token) {
    // 解碼
    const decoded = await promisify(jwt.verify)(token, "jwtSecret")
    console.log(decoded);
    const { memberId } = decoded;

    await memberModel // 解碼完後對照資料庫，有的話回傳該會員資料
      .isLogin(memberId)
      .then((result) => {
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(result));
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Server error" })
      })

  } else {
    res.json({ message: "該用戶尚未登入" })
  }
}

// 0627 修改個人資料 - aki 
exports.alertProfile = async (req, res) => {
  console.log(req.body);
  const { mail, name, nickName, sex, phone } = req.body;
  await memberModel
    .alertProfile(mail, name, nickName, sex, phone)
    .then((result) => {
      console.log(result)
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
};

// 0704 取得會員coupon明細 - MJ 
exports.getCouponByMemberId = async (req, res) => {
  const { token } = req.body;
  if (token) {
    //   解碼
    const decoded = await promisify(jwt.verify)(token, "jwtSecret")
    const { memberId } = decoded
    // let memberId = 2

    if (memberId) {
      try {
        let usableCouponlist = await memberModel.getUsableCouponByMemberId(memberId)
        let UnusableCouponByMemberId = await memberModel.getUnusableCouponByMemberId(memberId)
        configController.sendJsonMsg(res, true, "", { usableCouponlist, UnusableCouponByMemberId })
      } catch (error) {
        configController.sendJsonMsg(res, false, "sqlError", error["sqlMessage"])
        console.log(error)
      }
    } else {
      configController.sendJsonMsg(res, false, "memberId有誤", "")
    }
  } else {
    res.json({ message: "該用戶尚未登入" })
  }
}

// 0704 勉勵金句抽卡 - MJ
exports.getRainbowCard = async (req, res) => {
  // const { token } = req.body;
  // if (token) {
  //   //   解碼
  //   const decoded = await promisify(jwt.verify)(token, "jwtSecret")
  //   const { memberId } = decoded
  let memberId = 3

  if (memberId) {
    try {
      let getRainbowCard = await memberModel.getRainbowCard()
      let rainbowCardId = getRainbowCard[0].rainbowCardId
      let saveRainbowCard = await memberModel.saveRainbowCard(memberId, rainbowCardId)
      configController.sendJsonMsg(res, true, "", { getRainbowCard, saveRainbowCard })
    } catch (error) {
      configController.sendJsonMsg(res, false, "sqlError", error["sqlMessage"])
      console.log(error)
    }
  } else {
    configController.sendJsonMsg(res, false, "memberId Error", "")
  }
  // } else {
  //   res.json({ message: "該用戶尚未登入" })
  // }
}

exports.creatCoupon = async (req, res) => {
  let data = req.body
  let memberId = data['member_id']
  let couponId = data['coupon_id']
  let count = data['count']
  for (i = 0; i < count; i++) {
    await memberModel.creatCoupon(memberId, couponId)
  }
  configController.sendJsonMsg(res, true, "", 'done')
}