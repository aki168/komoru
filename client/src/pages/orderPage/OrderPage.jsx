import React, { useContext } from "react";
import { useState } from "react";
import "./OrderPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Steps } from "rsuite";
import { BookContext } from "../../Helper/Context";
import ActivityBag from "./ActivityBag";
import { useEffect } from "react";
// import axios from "axios";
// import { useEffect } from "react";

function OrderPage() {
  const {
    date,
    dayState,
    roomState,
    couponState,
    activityState,
    activity1Data,
    activity2Data,
    activity3Data,
    countActivity,
    sumActivity,
    setSumActivity,
  } = useContext(BookContext);

  console.log(
    // date,
    // dayState,
    // roomState,
    // couponState,
    // activityState,
    activity1Data,
    activity2Data,
    activity3Data,
    countActivity,
    sumActivity
  );

  //判斷活動包
  const [activityBag1Visible, setactivityBag1Visible] = useState(false);
  const [activityBag2Visible, setactivityBag2Visible] = useState(false);
  const [activityBag3Visible, setactivityBag3Visible] = useState(false);
  useEffect(() => {
    activity1Data === "1"
      ? setactivityBag1Visible(true)
      : setactivityBag1Visible(false);
    activity2Data === "3"
      ? setactivityBag2Visible(true)
      : setactivityBag2Visible(false);
    activity3Data === "5"
      ? setactivityBag3Visible(true)
      : setactivityBag3Visible(false);
  }, [activity1Data, activity2Data, activity3Data]);

  const navigate = useNavigate();
  const handleCheckoutPage = () => {
    navigate("/CheckoutPage");
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

  //顯示第一天活動包
  const showAvtivity1Bag = () => {
    if (activity1Data === "1") {
      return <ActivityBag />;
    }
  };

  //顯示第二天活動包
  const showAvtivity2Bag = () => {
    if (activity2Data === "3") {
      return <ActivityBag />;
    }
  };

  //顯示第三天活動包
  const showAvtivity3Bag = () => {
    if (activity3Data === "5") {
      return <ActivityBag />;
    }
  };

  //計算總金額
  const roomSumCost = 2000;
  useEffect(() => {
    setSumActivity(countActivity * 700 + 2000);
  });

  return (
    <div className="orderContainer">
      {/* <Steps current={2}>
        <Steps.Item title="計畫確認" />
        <Steps.Item title="心理測驗" />
        <Steps.Item title="訂單明細" />
        <Steps.Item title="結帳" />
      </Steps> */}
      <div className="contentContainer">
        <div className="examResult">
          <h1>霸道總裁</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            inventore, alias doloremque eveniet totam iste magni sed amet
            molestias ad necessitatibus illum quos error optio ea accusantium
            quaerat. Aliquam adipisci dicta nobis ad accusamus delectus impedit
            autem exercitationem dolorum et enim quae aperiam laudantium at in,
            similique minus fuga necessitatibus.
          </p>
          <img src="https://picsum.photos/300/300" alt="" />
        </div>
        <div className="orderList">
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
        </div>
      </div>
      <div className="marginContainer">
        {activityBag1Visible && (
          <div className="activityList">
            {/* 第一天活動包 */}
            {handleActivity1Data()}
            {showAvtivity1Bag()}
          </div>
        )}
        {activityBag2Visible && (
          <div className="activityList">
            {/* 第二天活動包 */}
            {handleActivity2Data()}
            {showAvtivity2Bag()}
          </div>
        )}
        {activityBag3Visible && (
          <div className="activityList">
            {/* 第三天活動包 */}
            {handleActivity3Data()}
            {showAvtivity3Bag()}
          </div>
        )}
      </div>
      <div className="marginContainer">
        <h5>KOMORU Star Hostel 背包客房型 加購活動確認</h5>
        <p>活動參與天數*{countActivity} </p>
        <p>NT${countActivity * 700}</p>
      </div>
      <p className="marginContainer">下定金額 NT${roomSumCost}</p>
      <p className="marginContainer">應付金額 NT$ {sumActivity}</p>
      <button className="checkoutBtn" onClick={handleCheckoutPage}>
        下一步去結帳
      </button>
    </div>
  );
}

export default OrderPage;
