import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookContext } from "../../Helper/Context";
import axios from "axios";

const CheckoutPage = () => {
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
  //哪幾天要參加
  const { activity1Data, setActivity1Data } = useContext(BookContext);
  const { activity2Data, setActivity2Data } = useContext(BookContext);
  const { activity3Data, setActivity3Data } = useContext(BookContext);
  const { countActivity, setCountActivity } = useContext(BookContext);
  //總金額
  const { sumActivity, setSumActivity } = useContext(BookContext);
  console.log(
    date,
    dayState,
    roomState,
    couponState,
    activityState,
    activity1Data,
    activity2Data,
    activity3Data,
    countActivity,
    sumActivity
  );

  const [finish, setFinish] = useState(false);
  const navigate = useNavigate();

  const CheckoutOrderHandler = (event) => {
    event.preventDefault();

    const orderDetails = {
      memberId: "3",
      orderStartDate: date,
      expDays: dayState,
      orderStatus: "0",
      roomId: roomState,
      couponItemId: couponState,
      orderTotal: sumActivity,
    };
    // console.log({
    //   memberId: "3",
    //   orderStartDate: date,
    //   expDays: dayState,
    //   orderStatus: "0",
    //   roomId: roomState,
    //   couponItemId: couponState,
    //   orderTotal: sumActivity,
    // });
    fetch("http://localhost:5000/order/getAndSaveOrderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(orderDetails),
    })
      .then((response) => response.json())
      .then(console.log("ok"))
      .catch(console.error);

    navigate("/checkoutSucceeded");
  };

  //2022-06-23 ZH
  //根據不同roomState顯示不同房間名稱
  const handleroomStateData = () => {
    if (roomState === "5") {
      return <p>台北:夾腳拖的家-私人套房</p>;
    } else if (roomState === "8") {
      return <p>台北:夾腳拖的家-背包客房</p>;
    } else if (roomState === "1") {
      return <p>台中:Star Hostel-私人套房</p>;
    } else if (roomState === "2") {
      return <p>台中:Star Hostel-背包客房</p>;
    } else if (roomState === "3") {
      return <p>台南:快活慢行-私人套房</p>;
    } else if (roomState === "6") {
      return <p>台南:快活慢行-背包客房</p>;
    } else if (roomState === "4") {
      return <p>台東:山林山鄰-私人套房</p>;
    } else if (roomState === "7") {
      return <p>台東:山林山鄰-背包客房</p>;
    }
  };

  //顯示優惠碼名稱
  const handleCouponStateData = () => {
    if (couponState === "coupon") {
      return <p>新會員優惠碼</p>;
    }
  };

  // 顯示是否參與活動;
  const handleActivityStateData = () => {
    if (activityState === "0") {
      return <p>是</p>;
    } else if (activityState === "1") {
      return <p>否</p>;
    }
  };

  // const array = activityData.map();
  //顯示哪幾天參與
  const handleActivity1Data = () => {
    if (activity1Data === "1") {
      return <p>第一天→要</p>;
    } else if (activity1Data === "2") {
      return <p>第一天→否</p>;
    }
  };

  const handleActivity2Data = () => {
    if (activity2Data === "3") {
      return <p>第二天→要</p>;
    } else if (activity2Data === "4") {
      return <p>第二天→否</p>;
    }
  };
  const handleActivity3Data = () => {
    if (activity3Data === "5") {
      return <p>第三天→要</p>;
    } else if (activity3Data === "6") {
      return <p>第三天→否</p>;
    }
  };
  return (
    <div>
      <div className="ckeckoutList">
        <div className="list">
          <p>入住日期:</p>
          <span>{date}</span>
        </div>
        <div className="list">
          <p>探索天數:</p>
          <span>{dayState}天</span>
        </div>
        <div className="list">
          <p>青旅/房型:</p>
          <span>{handleroomStateData()}</span>
        </div>
        <div className="list">
          <p>優惠券使用:</p>
          <span>{handleCouponStateData()}</span>
        </div>
        <div className="list">
          <p>是否要參與活動:</p>
          <span>{handleActivityStateData()}</span>
        </div>
        <div className="list">
          <p>活動包共{countActivity}天</p>
        </div>
        <div>{handleActivity1Data()}</div>
        <div>{handleActivity2Data()}</div>
        <div>{handleActivity3Data()}</div>
      </div>
      <button onClick={CheckoutOrderHandler}>確定結帳</button>
    </div>
  );
};

export default CheckoutPage;
