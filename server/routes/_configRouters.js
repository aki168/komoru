const express = require("express");
const router = express.Router();

// const hotelRouter = require("./HotelRouter");
// const hotelImgRouter = require("./HotelImgRouter");
// const roomRouter = require("./RoomRouter");
// const roomImgRouter = require("./RoomImgRouter");
// const memberRouterRouter = require("./_ExampleRouter");
// const orderRouter = require("./OrderRouter");
// const orderItemRouter = require("./OrderItemRouter");
// const examItemRouter = require("./ExamItemRouter");
// const activePackRouter = require("./ActivePackRouter");
// const activePackItemRouter = require("./ActivePackItemRouter");
// const partnershipRouter = require("./PartnershipRouter");
// const feebackRouter = require("./FeebackRouter");
// const feebackImgRouter = require("./FeebackImgRouter");
const rainbowCardRouter = require("./RainbowCardRouter");
// const rainbowCardItemRouter = require("./RainbowCardItemRouter");
// const couponRouter = require("./CouponRouter");
// const couponItemRouter = require("./CouponItemRouter");
// const cityRouter = require("./CityRouter");
// const employeeRouter = require("./EmployeeRouter");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// router.use("/hotel", hotelRouter);
// router.use("/hotelImg", hotelImgRouter);
// router.use("/room", roomRouter);
// router.use("/roomImg", roomImgRouter);
// router.use("/member", memberRouterRouter);
// router.use("/order", orderRouter);
// router.use("/orderItem", orderItemRouter);
// router.use("/examItem", examItemRouter);
// router.use("/activePack", activePackRouter);
// router.use("/activePackItem", activePackItemRouter);
// router.use("/partnership", partnershipRouter);
// router.use("/feeback", feebackRouter);
// router.use("/feebackImg", feebackImgRouter);
router.use("/rainbowCard", rainbowCardRouter);
// router.use("/rainbowCardItem", rainbowCardItemRouter);
// router.use("/coupon", couponRouter);
// router.use("/couponItem", couponItemRouter);
// router.use("/city", cityRouter);
// router.use("/employee", employeeRouter);

module.exports = router;
