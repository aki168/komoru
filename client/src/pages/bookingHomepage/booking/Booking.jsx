import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./booking.css";
import BookingPageImgAll from "../bookingPageImgAll/BookingPageImgAll";
import BookingImgTaipeiPrivateRoom from "../BookingPageImg/BookingImgTaipeiPrivateRoom";
import BookingImgTaipeiBackpackerRoom from "../BookingPageImg/BookingImgTaipeiBackpackerRoom";
import BookingImgTaichungPrivateRoom from "../BookingPageImg/BookingImgTaichungPrivateRoom";
import BookingImgTaichungBackpackerRoom from "../BookingPageImg/BookingImgTaichungBackpackerRoom";
import BookingImgTainanPrivateRoom from "../BookingPageImg/BookingImgTainanPrivateRoom";
import BookingImgTainanBackpackerRoom from "../BookingPageImg/BookingImgTainanBackpackerRoom";
import BookingImgTaitungPrivateRoom from "../BookingPageImg/BookingImgTaitungPrivateRoom";
import BookingImgTaitungBackpackerRoom from "../BookingPageImg/BookingImgTaitungBackpackerRoom";
import Day1ContentVisible from "../activityOpenContent/Day1ContentVisible";
import Day2ContentVisible from "../activityOpenContent/Day2ContentVisible";
import Day3ContentVisible from "../activityOpenContent/Day3ContentVisible";
import { BookContext } from "../../../Helper/Context";

function Booking() {
  //入住天數
  const { date, setDate } = useContext(BookContext);
  //探索天數
  const { dayState, setDayState } = useContext(BookContext);
  //青旅/房型
  const { roomState, setRoomState } = useContext(BookContext);
  //優惠代碼
  const { couponState, setCouponState } = useContext(BookContext);
  //是否參與活動
  const { activityState, setActivityState } = useContext(BookContext);
  console.log(activityState);

  const { activity1Data, setActivity1Data } = useContext(BookContext);
  const { activity2Data, setActivity2Data } = useContext(BookContext);
  const { activity3Data, setActivity3Data } = useContext(BookContext);

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
  const handleSearch = () => {
    if (activityState === "0") {
      navigate("/psychologicalExam", {
        // state: {
        //   date,
        //   dayState,
        //   roomState,
        //   couponState,
        //   activityState,
        //   activityOpen,
        // },
      });
    } else if (activityState === "1") {
      navigate("/OrderPage");
    } else {
      navigate("/404");
    }
  };

  return (
    <div className="frame">
      <div className="leftContainer">
        <div className="bookingSearchItem DateItem">
          <p className="headerSearchText">入住日期</p>
          <input
            className="datePickerStyle"
            id="orderStartDate"
            type="date"
            name="orderStartDate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="bookingSearchItem DayItem">
          <p className="headerSearchText">探索天數</p>
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
        </div>

        <div className="bookingSearchItem roomTypeItem">
          <p className="headerSearchText">青旅/房型</p>
          <select
            id="roomId"
            value={roomState}
            className="headerLocationSelect"
            onChange={(e) => setRoomState(e.target.value)}
          >
            <option value="DEFAULT">請選擇房型</option>
            <option value="5">台北:夾腳拖的家-私人套房</option>
            <option value="8">台北:夾腳拖的家-背包客房</option>
            <option value="1">台中:Star Hostel-私人套房</option>
            <option value="2">台中:Star Hostel-背包客房</option>
            <option value="3">台南:快活慢行-私人套房</option>
            <option value="6">台南:快活慢行-背包客房</option>
            <option value="4">台東:山林山鄰-私人套房</option>
            <option value="7">台東:山林山鄰-背包客房</option>
          </select>
        </div>
        <div className="bookingSearchItem couponItem">
          <p className="headerSearchText">優惠代碼</p>
          <select
            id="couponItemId"
            defaultValue={"DEFAULT"}
            className="headerCouponSelect"
            onChange={(e) => setCouponState(e.target.value)}
          >
            <option value="DEFAULT" disabled hidden>
              請選擇要使用的優惠券
            </option>
            <option value="1">新會員優惠碼</option>
          </select>
        </div>
        <div className="bookingSearchItem ActivityItem">
          <p className="headerSearchText">是否要參與活動?</p>
          <input
            className="rdoBtn_radio"
            type="radio"
            name="yesOrNo"
            id="yes"
            value="0"
            disabled={activityOpen === true}
            onChange={(e) => setActivityState(e.target.value)}
            onClick={() => {
              setActivityOpen(true);
            }}
          ></input>
          <label htmlFor="yes" className="getActivity">
            是
          </label>
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
          <label htmlFor="no" className="getActivity">
            否
          </label>
        </div>

        {activityOpen && (
          <div className="isActivity">
            {day1ContentVisible && <Day1ContentVisible />}
            {day2ContentVisible && <Day2ContentVisible />}
            {day3ContentVisible && <Day3ContentVisible />}
          </div>
        )}
        <div className="bookingSearchItem">
          <p className="headerSearchText"></p>
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
      {room7ContentVisile && <BookingImgTaitungPrivateRoom />}
      {room8ContentVisile && <BookingImgTaitungBackpackerRoom />}
    </div>
  );
}

export default Booking;
