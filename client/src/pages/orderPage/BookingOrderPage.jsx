import React, { useContext, useEffect, useState } from "react";
import "./BookingOrderPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Steps } from "rsuite";
import { BookContext } from "../../Helper/Context";
import ActivityBag from "./ActivityBag";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar-simple";

function BookingOrderPage() {
  const location = useLocation();
  // console.log(location);
  const [activityPack, setActivityPack] = useState(location.state.activityPack);
  // const [activePackItemContent, setActivePackItemContent] = useState("");
  // const [activePackItemEndTime, setActivePackItemEndTime] = useState("");
  // const [activePackItemStartTime, setActivePackItemStartTime] = useState("");
  // const [activePackItemTitle, setActivePackItemTitle] = useState("");
  const [activePackD1, setActivePackD1] = useState({});
  const [activePackD2, setActivePackD2] = useState({});
  const [activePackD3, setActivePackD3] = useState({});

  const {
    date,
    dayState,
    cityState,
    cityIdValue,
    roomState,
    couponState,
    couponData,
    activityState,
    activity1Data,
    activity2Data,
    activity3Data,
    countActivity,
    sumActivity,
    setSumActivity,
  } = useContext(BookContext);

  //獲取活動包
  useEffect(() => {
    axios({
      method: "post",
      url: "http://localhost:5000/activePack/getActivePackData",
      data: {
        isActive: activityState,
        joinTotal: countActivity,
        cityId: cityIdValue,
        activePackType: activityPack,
      },
    })
      .then((res) => {
        console.log(res.data);
        if (activity1Data === "1") {
          setActivePackD1(res.data.dataList.D1[0]);
        }
        if (activity2Data === "3") {
          setActivePackD2(res.data.dataList.D2[0]);
        }
        if (activity3Data === "5") {
          setActivePackD3(res.data.dataList.D3[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [memberId, setMemberId] = useState("");
  const [memberNickName, setMemberNickName] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberMail, setMemberMail] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberGender, setMemberGender] = useState("");

  // const [getActivePack, setGetActivityPack] = useState("");

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
      return <p>夾腳拖的家/私人套房</p>;
    } else if (roomState === "8") {
      return <p>夾腳拖的家/背包客房</p>;
    } else if (roomState === "1") {
      return <p>Star Hostel/私人套房</p>;
    } else if (roomState === "2") {
      return <p>Star Hostel/背包客房</p>;
    } else if (roomState === "3") {
      return <p>快活慢行/私人套房</p>;
    } else if (roomState === "6") {
      return <p>快活慢行/背包客房</p>;
    } else if (roomState === "4") {
      return <p>山林山鄰/私人套房</p>;
    } else if (roomState === "7") {
      return <p>山林山鄰/背包客房</p>;
    }
  };

  //顯示優惠碼名稱
  const handleCouponStateData = () => {
    if (couponState != "") {
      return <p>{couponData[0].couponTitle}</p>;
    }
  };

  console.log(couponState);
  // console.log("first");
  console.log(couponData[0].couponTitle);
  // const couponDiscount = Number(couponData[0].discount);
  console.log(Number(couponData[0].discount));

  //顯示優惠折扣欄
  const [showCoupon, setShowCoupon] = useState(false);
  useEffect(() => {
    if (couponState != "") {
      setShowCoupon(true);
    }
  }, [couponState]);

  // 顯示是否參與活動;
  const handleActivityStateData = () => {
    if (activityState === "0") {
      return <p>參加</p>;
    } else if (activityState === "1") {
      return <p>不參加</p>;
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

  //獲取相對應的activePackId
  const [activePackId, setactivePackId] = useState([]);
  const PackId = [];
  useEffect(() => {
    if (activity1Data === "1") {
      PackId.push(`${activePackD1.activePackType}`);
    }
    if (activity2Data === "3") {
      PackId.push(`${activePackD2.activePackType}`);
    }
    if (activity3Data === "5") {
      PackId.push(`${activePackD3.activePackType}`);
    }
    setactivePackId(PackId);
  }, []);
  console.log(activePackId);

  //顯示第一天活動包
  const showAvtivity1Bag = () => {
    if (activity1Data === "1") {
      return (
        <>
          <p>{activePackD1.activePackItemTitle}</p>
          <p>開始時間:{activePackD1.activePackItemStartTime}</p>
          <p>結束時間:{activePackD1.activePackItemEndTime}</p>
          <p>{activePackD1.activePackItemContent}</p>
        </>
      );
    }
  };

  //顯示第二天活動包
  const showAvtivity2Bag = () => {
    if (activity2Data === "3") {
      return (
        <>
          <p>{activePackD2.activePackItemTitle}</p>
          <p>開始時間:{activePackD2.activePackItemStartTime}</p>
          <p>結束時間:{activePackD2.activePackItemEndTime}</p>
          <p>{activePackD2.activePackItemContent}</p>
        </>
      );
    }
  };

  //顯示第三天活動包
  const showAvtivity3Bag = () => {
    if (activity3Data === "5") {
      return (
        <>
          <p>{activePackD3.activePackItemTitle}</p>
          <p>開始時間:{activePackD3.activePackItemStartTime}</p>
          <p>結束時間:{activePackD3.activePackItemEndTime}</p>
          <p>{activePackD3.activePackItemContent}</p>
        </>
      );
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
      setSumActivity(
        countActivity * 700 + roomSum - Number(couponData[0].discount)
      );
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
      activePackId: activePackId,
      isActive: activityState,
      joinTotal: countActivity,
    };
    console.log({
      memberId: memberId,
      orderStartDate: date,
      expDays: dayState,
      orderStatus: "0",
      roomId: roomState,
      couponItemId: couponState,
      orderTotal: sumActivity,
      activePackId: activePackId,
      isActive: activityState,
      joinTotal: countActivity,
    });
    fetch("http://localhost:5000/order/getAndSaveOrderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(orderDetails),
    })
      .then((response) => response.json())
      // .then(console.log("ok"))
      .catch(console.error);

    navigate("/checkoutSucceeded");
  };

  return (
    <>
      <Navbar />
      <div className="orderContainer">
        <div className="memberCheckout">
          <div className="memberCheckoutHeader">
            <h1>訂購者資料確認</h1>
            <p>
              確認資料無誤後選擇付款方式，簡單快速的下訂流程讓你立即體驗旅程！
            </p>
          </div>

          <table className="memberCheckoutTable">
            <tbody>
              <tr>
                <td>
                  <b>帳號:</b>
                  <span>{memberMail}</span>
                </td>
                <td>
                  <b>手機:</b>
                  <span className="specialSpan">{memberPhone}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <b>姓名:</b>
                  <span>{memberName}</span>
                </td>
                <td>
                  <b>性別:</b>
                  <span className="specialSpan">{gender()}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <b>暱稱:</b>
                  <span>{memberNickName}</span>
                </td>
                <td>
                  <div className="payMethodContent">
                    <b>付款方式</b>

                    <span>
                      <select id="expDays" defaultValue={"default"}>
                        <option value="default" disabled hidden>
                          請選擇要付款的方式
                        </option>
                        <option value="1">信用卡</option>
                      </select>
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="orderList">
          <div className="orderListHeader">
            <h1>訂購者資料確認</h1>
            <p>
              一條龍記錄您的訂單及活動行程，並即時更新在會員中心讓您隨時查看。
            </p>
          </div>
          <div className="orderListBody">
            <div className="orderListImg">
              <img src="https://picsum.photos/500/300" alt="" />
            </div>
            <div className="orderListAll">
              <div className="list">
                <p>入住日期</p>
                <span>{date}</span>
              </div>
              <div className="list">
                <p>探索天數</p>
                <span>{dayState}天</span>
              </div>
              <div className="list">
                <p>青旅/房型</p>
                <span>{handleroomStateData()}</span>
              </div>
              <div className="list">
                <p>優惠票券</p>
                <span>{handleCouponStateData()}</span>
              </div>
              <div className="list">
                <p>活動參與</p>
                <span>{handleActivityStateData()}</span>
              </div>
              <div className="list">
                <p>活動天數</p>
                <span>{countActivity}</span>
              </div>
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
        <div className="line"></div>
        <div className="marginContainer plusBuy">
          <h5>KOMORU Star Hostel 背包客房型 加購活動確認</h5>
          <p>
            活動參與天數{countActivity}天<span>共NT${countActivity * 700}</span>
          </p>
        </div>
        <div className="marginContainer">
          <p>下定金額 NT${roomSum}</p>
          {showCoupon && <p>優惠折扣:{Number(couponData[0].discount)}元</p>}
          <p>應付金額 NT$ {sumActivity}</p>
          <button className="checkoutBtn" onClick={CheckoutOrderHandler}>
            下一步去結帳
          </button>
        </div>
      </div>
    </>
  );
}

export default BookingOrderPage;
