import React, { useContext, useEffect, useState } from "react";
import "./BookingOrderPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Steps } from "rsuite";
import { BookContext } from "../../Helper/Context";
import ActivityBag from "./ActivityBag";
import axios from "axios";

function BookingOrderPage() {
  const [memberId, setMemberId] = useState("");
  const [memberNickName, setMemberNickName] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberMail, setMemberMail] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberGender, setMemberGender] = useState("");

  useEffect(() => {
    axios({
      method: "post",
      url: "http://localhost:5000/member/isLogin",
      data: {
        token: localStorage.token,
      },
    })
      .then((res) => {
        //有登入的話，回傳「會員資訊」在res.data[0] ｜ 沒登入則回傳message
        let userData = res.data[0];
        console.log(userData);
        setMemberId(userData.memberId);
        setMemberNickName(userData.memberNickName);
        setMemberName(userData.memberName);
        setMemberMail(userData.memberMail);
        setMemberPhone(userData.memberPhone);
        setMemberGender(userData.memberGender);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const gender = () => {
    if (memberGender === "0") {
      return <>女</>;
    } else if (memberGender === "1") {
      return <>男</>;
    }
  };

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
    if (couponState === "1") {
      return <p>新會員優惠碼</p>;
    }
  };

  //顯示優惠折扣欄
  const [showCoupon, setShowCoupon] = useState(false);
  useEffect(() => {
    if (couponState === "1") {
      setShowCoupon(true);
    }
  }, [couponState]);

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

  //計算房間金額
  const [roomSum, setRoomSum] = useState(Number(0));
  useEffect(() => {
    if (
      roomState === "5" ||
      roomState === "1" ||
      roomState === "3" ||
      roomState === "4"
    ) {
      setRoomSum(dayState * 1000);
    } else if (
      roomState === "2" ||
      roomState === "6" ||
      roomState === "7" ||
      roomState === "8"
    ) {
      setRoomSum(dayState * 700);
    }
  }, [roomState]);

  //計算總金額，如果有優惠券，折200元
  useEffect(() => {
    if (couponState === "1") {
      setSumActivity(countActivity * 700 + roomSum - 200);
    } else {
      setSumActivity(countActivity * 700 + roomSum);
    }
  });

  const navigate = useNavigate();
  //傳訂單明細給後端
  const CheckoutOrderHandler = (event) => {
    event.preventDefault();

    const orderDetails = {
      memberId: memberId,
      orderStartDate: date,
      expDays: dayState,
      orderStatus: "0",
      roomId: roomState,
      couponItemId: couponState,
      orderTotal: sumActivity,
    };
    console.log({
      memberId: memberId,
      orderStartDate: date,
      expDays: dayState,
      orderStatus: "0",
      roomId: roomState,
      couponItemId: couponState,
      orderTotal: sumActivity,
    });
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

  return (
    <div className="orderContainer">
      {/* <Steps current={2}>
        <Steps.Item title="計畫確認" />
        <Steps.Item title="心理測驗" />
        <Steps.Item title="訂單明細" />
        <Steps.Item title="結帳" />
      </Steps> */}
      <div className="contentContainer">
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
        <div className="memberCheckout">
          <div className="memberImg">
            <img src="https://picsum.photos/80/100" alt="" />
          </div>
          <div className="memberContent">
            <p>訂購者資料</p>
            <p>帳號:{memberMail}</p>
            <p>姓名:{memberName}</p>
            <p>暱稱:{memberNickName}</p>
            <p>性別:{gender()}</p>
            <p>手機:{memberPhone}</p>
            <p>付款方式</p>
            <select
              id="expDays"
              defaultValue={"default"}
              className="headerDaySelect"
            >
              <option value="default" disabled hidden>
                請選擇要付款的方式
              </option>
              <option value="1">信用卡</option>
            </select>
          </div>
        </div>
        <div></div>
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
      <p className="marginContainer">下定金額 NT${roomSum}</p>
      {showCoupon && <p className="marginContainer">優惠折扣:200元</p>}
      <p className="marginContainer">應付金額 NT$ {sumActivity}</p>
      <button className="checkoutBtn" onClick={CheckoutOrderHandler}>
        下一步去結帳
      </button>
    </div>
  );
}

export default BookingOrderPage;