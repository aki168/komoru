import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import BackstageAdmin from "./pages/BackstageAdmin";

// // AKI
// import Home from "./pages/Home";
// import LoginPage from "./pages/aboutMember/LoginPage";
// import ForgotPW from "./pages/aboutMember/ForgotPWPage";
// import Register from "./pages/aboutMember/Register";
// import UserPage from "./pages/userPage/userPage";
// import OrderPage from "./pages/userPage/OrderPage";
// import FeedbackPage from "./pages/userPage/FeedbackPage";
// import CouponPage from "./pages/userPage/CouponPage";

// //ZH
// import PsychologicalExam from "./pages/psychologicalExam/PsychologicalExam";
// import BookingHomepage from "./pages/bookingHomepage/BookingHomepage";
// import ExamResult from "./pages/psychologicalExam/examAll/ExamResult";
// import BookingOrderPage from "./pages/orderPage/BookingOrderPage";
// import CheckoutSucceeded from "./pages/checkoutSucceededPage/CheckoutSucceeded";
// import ErrorPage from "./pages/errorPage/ErrorPage";
// import { BookContext } from "./Helper/Context";
// import PartnerHotel from "./pages/partnerHotel/PartnerHotel";

// 0622-確認該用戶是否登入，可以連這隻api
// export const loginOrNot = () => {
//   axios({
//     method: "post",
//     url: "http://localhost:5000/member/isLogin",
//     data: {
//       token: localStorage.token,
//     },
//   })
//     .then((res) => {
//       //有登入的話，回傳「會員資訊」在res.data[0] ｜ 沒登入則回傳message
//       let userData = res.data[0];
//       console.log(userData);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// 0622- aki 登出請調用該函式
// export const logout = () => {
//   localStorage.removeItem("token");
//   window.location.reload("false"); //想重新渲染同頁面可以用這段
// };

function App() {
  //2022-06-23 ZH
  //用context讓所有組件共用以下state
  // const [date, setDate] = useState(new Date());
  // const [dayState, setDayState] = useState("");
  // const [roomState, setRoomState] = useState("DEFAULT");
  // const [couponState, setCouponState] = useState("");
  // const [activityState, setActivityState] = useState("");
  // const [activity1Data, setActivity1Data] = useState("");
  // const [activity2Data, setActivity2Data] = useState("");
  // const [activity3Data, setActivity3Data] = useState("");
  // const [countActivity, setCountActivity] = useState(Number(0));
  // const [sumActivity, setSumActivity] = useState("");

  // const all = {
  //   date,
  //   setDate,
  //   dayState,
  //   setDayState,
  //   roomState,
  //   setRoomState,
  //   couponState,
  //   setCouponState,
  //   activityState,
  //   setActivityState,
  //   activity1Data,
  //   setActivity1Data,
  //   activity2Data,
  //   setActivity2Data,
  //   activity3Data,
  //   setActivity3Data,
  //   countActivity,
  //   setCountActivity,
  //   sumActivity,
  //   setSumActivity,
  // };
  return (
    <BrowserRouter>
      {/* YN */}
      <BackstageAdmin />

      {/* AKI */}
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPW" element={<ForgotPW />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/member-order" element={<OrderPage />} />
        <Route path="/member-feedback" element={<FeedbackPage />} />
        <Route path="/member-coupon" element={<CouponPage />} /> */}

        {/* ZH */}
        {/* <Route
          path="/bookingHomepage"
          element={
            <BookContext.Provider value={all}>
              <BookingHomepage />
            </BookContext.Provider>
          }
        />
        <Route path="/psychologicalExam" element={<PsychologicalExam />} />
        <Route path="/examResult" element={<ExamResult />} />
        <Route
          path="/bookingorderPage"
          element={
            <BookContext.Provider value={all}>
              <BookingOrderPage />
            </BookContext.Provider>
          }
        />
        <Route path="checkoutSucceeded" element={<CheckoutSucceeded />} />
        <Route path="/404" element={<ErrorPage />} />
        <Route path="/hotelIntro" element={<PartnerHotel />} />
      </Routes> */}
    </BrowserRouter>
  );
}

export default App;

// <Routes>標籤包起來的部分： 0620 由aki更新進去的前台路由 （寧的部分暫稱為後台）
// 寧的部分是 : BackstageAdmin 暫時先註解掉
