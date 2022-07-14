var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");


// 2022-06-12-PG
// 額外引用的模組一律放這，先不要和 express 預設有的放一起
var cors = require("cors");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// router
var configRouter = require("./routes/_ConfigRouters");

// errorController
var errorController = require("./controllers/_errorController");

var app = express();

// 2022-06-12-PG
// 設定前後端跨域傳輸、允許私密訊息傳輸
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

// 2022-06-18 PG
// 開放公開資料夾做讀取
app.use(express.static("public"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// router setting
app.use("/", configRouter);

// 2022-06-12-PG
// 404 不走 express 預設，註解測試會不會影響
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error
app.use(errorController.get404);

// 不知道為啥進不去，會自動跑下面的
// app.use(errorController.get500);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// passport.use(new GoogleStrategy({
//   clientID: '300310047900-4tgg9ie5rgbi5anu4qbkjne3t4ip8get.apps.googleusercontent.com',
//   clientSecret: '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',
//   callbackURL: "http://localhost:5000/member/google/callback"
// },
//   function (accessToken, refreshToken, profile, cb) {
//     return profile;
//   }
// ));

module.exports = app;
