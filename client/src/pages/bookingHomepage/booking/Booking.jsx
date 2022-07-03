import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./booking.css";
import axios from "axios";
import BookingPageImgAll from "../bookingPageImgAll/BookingPageImgAll";
import BookingImgTaipeiPrivateRoom from "../BookingPageImg/BookingImgTaipeiPrivateRoom";
import BookingImgTaipeiBackpackerRoom from "../BookingPageImg/BookingImgTaipeiBackpackerRoom";
import BookingImgTaichungPrivateRoom from "../BookingPageImg/BookingImgTaichungPrivateRoom";
import BookingImgTaichungBackpackerRoom from "../BookingPageImg/BookingImgTaichungBackpackerRoom";
import BookingImgTainanPrivateRoom from "../BookingPageImg/BookingImgTainanPrivateRoom";
import BookingImgTainanBackpackerRoom from "../BookingPageImg/BookingImgTainanBackpackerRoom";
import BookingImgHualienPrivateRoom from "../BookingPageImg/BookingImgHualienPrivateRoom";
import BookingImgHualienBackpackerRoom from "../BookingPageImg/BookingImgHualienBackpackerRoom";
import Day1ContentVisible from "../activityOpenContent/Day1ContentVisible";
import Day2ContentVisible from "../activityOpenContent/Day2ContentVisible";
import Day3ContentVisible from "../activityOpenContent/Day3ContentVisible";
import { BookContext } from "../../../Helper/Context";
import { IoMdAlert } from "react-icons/io";

function Booking() {
  const [memberId, setMemberId] = useState("");
  const [couponData, setCouponData] = useState([]);

  //入住天數
  const { date, setDate } = useContext(BookContext);
  //探索天數
  const { dayState, setDayState } = useContext(BookContext);
  //青旅/房型
  const { cityState, setCityState } = useContext(BookContext);
  const { roomState, setRoomState } = useContext(BookContext);
  const { cityIdValue, setCityIdValue } = useContext(BookContext);
  //優惠代碼
  const { couponState, setCouponState } = useContext(BookContext);
  //是否參與活動
  const { activityState, setActivityState } = useContext(BookContext);

  const { activity1Data, setActivity1Data } = useContext(BookContext);
  const { activity2Data, setActivity2Data } = useContext(BookContext);
  const { activity3Data, setActivity3Data } = useContext(BookContext);

  //下一步點擊時狀態紀錄
  const [nextStep, setNextStep] = useState("");

  //點擊是否參與活動的"否"時，之前資料要清除
  useEffect(() => {
    if (activityState === "1") {
      return setActivity1Data("");
    }
  }, [activityState]);
  useEffect(() => {
    if (activityState === "1") {
      return setActivity2Data("");
    }
  }, [activityState]);
  useEffect(() => {
    if (activityState === "1") {
      return setActivity3Data("");
    }
  }, [activityState]);

  //探索日期重新選擇的話，之前資料要清除
  const clearActivityDataByChangingDayState = (e) => {
    setDayState(e.target.value);
    return setActivity1Data("") && setActivity2Data("") && setActivity3Data("");
  };

  //2022-06-19 -ZH
  //青旅/房型根據下拉式選單值不同，顯示不同圖片
  const [DEFAULTContentVisile, setDEFAULTContentVisile] = useState(false);
  const [room1ContentVisile, setRoom1ContentVisile] = useState(false);
  const [room2ContentVisile, setRoom2ContentVisile] = useState(false);
  const [room3ContentVisile, setRoom3ContentVisile] = useState(false);
  const [room4ContentVisile, setRoom4ContentVisile] = useState(false);
  const [room5ContentVisile, setRoom5ContentVisile] = useState(false);
  const [room6ContentVisile, setRoom6ContentVisile] = useState(false);
  const [room7ContentVisile, setRoom7ContentVisile] = useState(false);
  const [room8ContentVisile, setRoom8ContentVisile] = useState(false);
  useEffect(() => {
    roomState === "DEFAULT"
      ? setDEFAULTContentVisile(true)
      : setDEFAULTContentVisile(false);
    roomState === "5"
      ? setRoom1ContentVisile(true)
      : setRoom1ContentVisile(false);
    roomState === "8"
      ? setRoom2ContentVisile(true)
      : setRoom2ContentVisile(false);
    roomState === "1"
      ? setRoom3ContentVisile(true)
      : setRoom3ContentVisile(false);
    roomState === "2"
      ? setRoom4ContentVisile(true)
      : setRoom4ContentVisile(false);
    roomState === "3"
      ? setRoom5ContentVisile(true)
      : setRoom5ContentVisile(false);
    roomState === "6"
      ? setRoom6ContentVisile(true)
      : setRoom6ContentVisile(false);
    roomState === "4"
      ? setRoom7ContentVisile(true)
      : setRoom7ContentVisile(false);
    roomState === "7"
      ? setRoom8ContentVisile(true)
      : setRoom8ContentVisile(false);
  }, [roomState]);

  //2022-06-20 -ZH
  //根據探索天數顯示要勾選與否
  // 請選擇要活動的日期
  const [activityOpen, setActivityOpen] = useState(false);
  const [day1ContentVisible, setDay1ContentVisible] = useState(false);
  const [day2ContentVisible, setDay2ContentVisible] = useState(false);
  const [day3ContentVisible, setDay3ContentVisible] = useState(false);
  useEffect(() => {
    dayState === "1"
      ? setDay1ContentVisible(true)
      : setDay1ContentVisible(false);
  }, [dayState]);
  useEffect(() => {
    dayState === "2"
      ? setDay2ContentVisible(true)
      : setDay2ContentVisible(false);
  }, [dayState]);
  useEffect(() => {
    dayState === "3"
      ? setDay3ContentVisible(true)
      : setDay3ContentVisible(false);
  }, [dayState]);

  //根據是否參與活動與否跳轉不同分頁
  const navigate = useNavigate();
  const handleSearch = (e) => {
    setNextStep(e.type);
    if (
      date === "" ||
      dayState === "" ||
      roomState === "DEFAULT" ||
      activityState === ""
    ) {
      alert("輸入的格式有誤!");
    } else if (activityState === "0") {
      navigate("/psychologicalExam");
    } else if (activityState === "1") {
      navigate("/bookingOrderPage");
    }
    // else {
    //   navigate("/404");
    // }
  };

  //獲取coupon資料

  useEffect(() => {
    axios
      .post("http://localhost:5000/order/getCouponData", { memberId: memberId })
      .then((res) => {
        // console.log(res.data.dataList);
        setCouponData(res.data.dataList);
      })
      .catch((err) => console.log(err));
  }, []);

  /*將coupon資料map成coupon選項*/
  const couponArr = Object.values(couponData).map((values, index) => {
    return (
      <option key={index} value={values.couponId}>
        {values.couponTitle}
      </option>
    );
  });

  /*
   取得cityId的值*/
  const cityChangeHandle = (event) => {
    event.preventDefault();
    setCityIdValue(event.target.value);
    // console.log(event.target.value);
  };

  //獲取cityData
  useEffect(() => {
    axios
      .post("http://localhost:5000/city/getCityDataList")
      .then((res) => {
        setCityState(res.data.dataList);
      })
      .catch((err) => console.log(err));
  }, []);

  /*將city資料map成city選項*/
  const cityArr = Object.values(cityState).map((values, index) => {
    return (
      <option key={index} value={values.cityId}>
        {values.cityName}
      </option>
    );
  });

  const ref = useRef();

  return (
    <>
      {/* <ProgressBarAll /> */}
      <div className="frame">
        <div className="leftContainer">
          <div className="bookingTitle">即刻預定</div>
          <div className="bookingSearchItem">
            <input
              className="datePickerStyle"
              id="orderStartDate"
              name="orderStartDate"
              type="text"
              placeholder="請選擇入住日期"
              ref={ref}
              onFocus={() => (ref.current.type = "date")}
              onBlur={() => (ref.current.type = "text")}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            {nextStep === "click" && (
              <>{date === "" && <IoMdAlert className="IoMdAlert" />}</>
            )}
          </div>

          <div className="bookingSearchItem">
            <select
              id="expDays"
              defaultValue={"DEFAULT"}
              className="headerDaySelect"
              onChange={clearActivityDataByChangingDayState}
            >
              <option value="DEFAULT" disabled hidden>
                請選擇要探索的天數
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            {nextStep === "click" && (
              <>{dayState === "" && <IoMdAlert className="IoMdAlert" />}</>
            )}
          </div>

          <div className="bookingSearchItem">
            <div className="roomSelectContainer">
              <select
                name="cityId"
                onChange={cityChangeHandle}
                className="citySelect"
              >
                <option value="DEFAULT">請選擇縣市</option>
                {cityArr}
              </select>
              <select
                id="roomId"
                value={roomState}
                className="roomSelect"
                onChange={(e) => setRoomState(e.target.value)}
              >
                <option value="DEFAULT">請選擇青旅/房型</option>
                {cityIdValue === "1" && (
                  <>
                    <option value="5">夾腳拖的家-私人套房</option>
                    <option value="8">夾腳拖的家-背包客房</option>
                  </>
                )}
                {cityIdValue === "2" && (
                  <>
                    <option value="1">Star Hostel-私人套房</option>
                    <option value="2">Star Hostel-背包客房</option>
                  </>
                )}
                {cityIdValue === "3" && (
                  <>
                    <option value="3">快活慢行-私人套房</option>
                    <option value="6">快活慢行-背包客房</option>
                  </>
                )}
                {cityIdValue === "4" && (
                  <>
                    <option value="4">山林山鄰-私人套房</option>
                    <option value="7">山林山鄰-背包客房</option>
                  </>
                )}
              </select>
            </div>
            {nextStep === "click" && (
              <>
                {roomState === "DEFAULT" && <IoMdAlert className="IoMdAlert" />}
              </>
            )}
          </div>
          <div className="bookingSearchItem couponItem">
            <select
              name="couponId"
              defaultValue={"DEFAULT"}
              className="headerCouponSelect"
              onChange={(e) => setCouponState(e.target.value)}
            >
              <option value="DEFAULT" disabled hidden>
                請選擇優惠代碼
              </option>
              {couponArr}
            </select>
          </div>
          <div className="ActivityItem">
            <div className="activitySelectLine">
              <p>是否參與活動?</p>
              <label className="getActivity">
                <input
                  className="rdoBtn_radio"
                  type="radio"
                  name="yesOrNo"
                  id="isActive"
                  value="0"
                  disabled={activityOpen === true}
                  onChange={(e) => setActivityState(e.target.value)}
                  onClick={() => {
                    setActivityOpen(true);
                  }}
                ></input>
                <span className="iii">參加</span>
              </label>
              <label className="getActivity">
                <input
                  className="rdoBtn_radio"
                  type="radio"
                  name="yesOrNo"
                  id="no"
                  value="1"
                  // disabled={activityOpen === true}
                  onChange={(e) => {
                    setActivityState(e.target.value);
                  }}
                  onClick={() => {
                    setActivityOpen(false);
                  }}
                ></input>
                <span className="iii">不參加</span>
              </label>
              {nextStep === "click" && (
                <>
                  {activityState === "" && (
                    <IoMdAlert className="activityStateIoMdAlert" />
                  )}
                </>
              )}
            </div>

            {activityOpen && (
              <div className="isActivity">
                {day1ContentVisible && <Day1ContentVisible />}
                {day2ContentVisible && <Day2ContentVisible />}
                {day3ContentVisible && <Day3ContentVisible />}
              </div>
            )}
          </div>
          <div>
            <p className="line"></p>
            <button className="headerBtn" onClick={handleSearch}>
              下一步
            </button>
          </div>
        </div>
        {DEFAULTContentVisile && <BookingPageImgAll />}
        {room1ContentVisile && <BookingImgTaipeiPrivateRoom />}
        {room2ContentVisile && <BookingImgTaipeiBackpackerRoom />}
        {room3ContentVisile && <BookingImgTaichungPrivateRoom />}
        {room4ContentVisile && <BookingImgTaichungBackpackerRoom />}
        {room5ContentVisile && <BookingImgTainanPrivateRoom />}
        {room6ContentVisile && <BookingImgTainanBackpackerRoom />}
        {room7ContentVisile && <BookingImgHualienPrivateRoom />}
        {room8ContentVisile && <BookingImgHualienBackpackerRoom />}
      </div>
    </>
  );
}

export default Booking;
