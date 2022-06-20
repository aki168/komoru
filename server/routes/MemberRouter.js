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
router.post("/emailIsExisted", memberController.emailIsExisted);

// 0619 確認帳密，允許登入 - aki
router.post("/loginAuth", memberController.loginAuth);

// 0619 確認帳密，允許登入 設jwt - aki // 仍在調整中
router.get('/isUserAuth',memberController.verifyJWT,(req,res)=>{
  res.send({auth:true,message:'嘿，恭喜妳已驗證成功'})
})


module.exports = router;
