const express = require("express");
const router = express.Router();

const memberController = require("../controllers/MemberController");

// 2022-06-12-PG
// 載入回傳 json 格式所需模組
const bodyParser = require("body-parser");
router.use(bodyParser.json());

// ----------------------------------------------------------------------------------------------------------------------

// 0616 秀出全部的會員 - aki
router.post("/showAllMember", memberController.showAllMember);

// 0616 是否有該會員email在資料庫 - aki
router.post("/checkMailIsExisted", memberController.checkMailIsExisted);

// 0619 確認帳密，允許登入 - aki
router.post("/loginAuth", memberController.loginAuth);

// 0619 確認帳密，允許登入 設jwt - aki // 仍在調整中
router.get('/verifyJWT',memberController.verifyJWT,(req,res)=>{
  res.send({auth:true,message:'嘿，恭喜妳已驗證成功'})
})

// 0621 註冊會員 - aki
router.post('/register',memberController.register);

// 0622 是否有登入 - aki
router.post('/isLogin',memberController.isLogin);

// 0623 會員登出 - aki (改由前端刪除token方式，此路由暫不使用)
// router.post('/logout',memberController.logout)

// 0627 修改個人資料 - aki 
router.post('/alertProfile',memberController.alertProfile);

// 0704 取得會員coupon明細 - MJ
router.post('/getCouponByMemberId', memberController.getCouponByMemberId)

// 0704 勉勵金句抽卡 - MJ
router.post('/getRainbowCard', memberController.getRainbowCard)

// 0705 coupon生成 - MJ
router.post('/creatCoupon', memberController.creatCoupon)

module.exports = router;
