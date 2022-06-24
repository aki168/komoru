import { BrowserRouter, Routes, Route } from "react-router-dom";
import BackstageAdmin from "./pages/BackstageAdmin";

import LoginPage from "./pages/LoginPage";
import ForgotPW from "./pages/ForgotPWPage";
import Register from "./pages/Register";
import Home from "./pages/Home";

//ZH
import { useState } from "react";
import PsychologicalExam from "./pages/psychologicalExam/PsychologicalExam";
import BookingHomepage from "./pages/bookingHomepage/BookingHomepage";
import OrderPage from "./pages/orderPage/OrderPage";
import CheckoutPage from "./pages/checkoutPage/CheckoutPage";
import CheckoutSucceeded from "./pages/checkoutSucceededPage/CheckoutSucceeded";
import ErrorPage from "./pages/errorPage/ErrorPage";
import { BookContext } from "./Helper/Context";

function App() {
  //2022-06-23 ZH
  //用context讓所有組件共用以下state
  const [date, setDate] = useState(new Date());
  const [dayState, setDayState] = useState("");
  const [roomState, setRoomState] = useState("DEFAULT");
  const [couponState, setCouponState] = useState("");
  const [activityState, setActivityState] = useState("");
  const [activity1Data, setActivity1Data] = useState("");
  const [activity2Data, setActivity2Data] = useState("");
  const [activity3Data, setActivity3Data] = useState("");
  const [countActivity, setCountActivity] = useState(Number(0));
  const [sumActivity, setSumActivity] = useState("");

  const all = {
    date,
    setDate,
    dayState,
    setDayState,
    roomState,
    setRoomState,
    couponState,
    setCouponState,
    activityState,
    setActivityState,
    activity1Data,
    setActivity1Data,
    activity2Data,
    setActivity2Data,
    activity3Data,
    setActivity3Data,
    countActivity,
    setCountActivity,
    sumActivity,
    setSumActivity,
  };
  return (
    <BrowserRouter>
      {/* <BackstageAdmin /> */}

      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPW" element={<ForgotPW />} />
      </Routes>  */}

      <Routes>
        <Route
          path="/"
          element={
            <BookContext.Provider value={all}>
              <BookingHomepage />
            </BookContext.Provider>
          }
        />
        <Route path="/psychologicalExam" element={<PsychologicalExam />} />
        <Route
          path="/orderPage"
          element={
            <BookContext.Provider value={all}>
              <OrderPage />
            </BookContext.Provider>
          }
        />
        <Route
          path="/CheckoutPage"
          element={
            <BookContext.Provider value={all}>
              <CheckoutPage />
            </BookContext.Provider>
          }
        />

        <Route path="checkoutSucceeded" element={<CheckoutSucceeded />} />
        <Route path="/404" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// <Routes>標籤包起來的部分： 0620 由aki更新進去的前台路由 （寧的部分暫稱為後台）
// 寧的部分是 : BackstageAdmin 暫時先註解掉
