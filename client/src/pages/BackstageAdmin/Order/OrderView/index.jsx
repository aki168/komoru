import React, { useState, useEffect, useCallback } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import BackstageLoding from "../../../../components/BackstageLoading";

function OrderView({ setEditShow, editData }) {
  /*20220624 YN
  修改資料初始化*/
  const [orderMemberData, setOrderMemberData] = useState("");
  const [orderActiveDataFirst, setOrderActiveDataFirst] = useState(null);
  const [orderActiveDataSecond, setOrderActiveDataSecond] = useState(null);
  const [orderActiveDataThird, setOrderActiveDataThird] = useState(null);

  /*20220707 YN
 資料載入過程初始化*/
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await fetch(
      "http://localhost:5000/order/getOrderDataWithActivePackByOrderId",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(editData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.dataList);
        console.log(data.dataList.orderData);
        console.log(data.dataList.orderItemDataList[0]);
        setLoading(true);
        setOrderMemberData(data.dataList.orderData[0]);
        setOrderActiveDataFirst(data.dataList.orderItemDataList[0]);
        setOrderActiveDataSecond(data.dataList.orderItemDataList[1]);
        setOrderActiveDataThird(data.dataList.orderItemDataList[2]);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  /*20220624 YN
   取得後端檢視資料*/
  // useEffect(() => {
  //   fetch("http://localhost:5000/order/getOrderDataWithActivePackByOrderId", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json; charset=utf-8",
  //     },
  //     body: JSON.stringify(editData),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // setEditModalData(data.dataList[0]);
  //       console.log(data.dataList.orderData);
  //       console.log(data.dataList.orderItemDataList);
  //       setOrderMemberData(data.dataList.orderData[0]);
  //       setOrderActiveData(data.dataList.orderItemDataList[0]);
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  // }, []);

  /*20220709 YN
  排除當modal開啟時，scrollbar 消失 sidebar 往右移 */
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => (document.body.style.overflowY = "");
  }, []);

  return (
    <>
      {loading ? (
        <div className="container border mb-3">
          <div>
            <h3 className="mb-3 mt-3">訂購者資料</h3>
            <div className="row">
              <div className="col-6">
                <div className=" d-flex align-items-center ">
                  <h5 className="mb-3 col-4">帳號</h5>
                  <p className="mb-3 col-4">{orderMemberData.memberMail}</p>
                </div>
                <div className=" d-flex align-items-center ">
                  <h5 className="mb-3 col-4">姓名</h5>
                  <p className="mb-3 col-4">{orderMemberData.memberName}</p>
                </div>
                <div className=" d-flex align-items-center ">
                  <h5 className="mb-3 col-4">暱稱</h5>
                  <p className="mb-3 col-4">{orderMemberData.memberNickName}</p>
                </div>
              </div>
              <div className="col-6">
                <div className=" d-flex align-items-center ">
                  <h5 className="mb-3 col-4">性別</h5>
                  <p className="mb-3 col-4">{orderMemberData.memberGender}</p>
                </div>
                <div className=" d-flex align-items-center">
                  <h5 className="mb-3 col-4">手機</h5>
                  <p className="mb-3 col-4">{orderMemberData.memberPhone}</p>
                </div>
                <div className=" d-flex align-items-center ">
                  <h5 className="mb-3 col-4">付款方式</h5>
                  <p className="mb-3 col-4">{orderMemberData.payment}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="mb-3 mt-3">訂單資料</h3>
            <div className="row">
              <div className="col-6">
                <div className=" d-flex align-items-center ">
                  <h5 className="mb-3 col-4">入住日期</h5>
                  <p className="mb-3 col-4">{orderMemberData.orderStartDate}</p>
                </div>
                <div className=" d-flex align-items-center ">
                  <h5 className="mb-3 col-4">退房日期</h5>
                  <p className="mb-3 col-4">{orderMemberData.orderEndDate}</p>
                </div>
                <div className=" d-flex align-items-center ">
                  <h5 className="mb-3 col-4">青旅/房型</h5>
                  <p className="mb-3 col-6">{orderMemberData.roomDetail}</p>
                </div>
              </div>
              <div className="col-6">
                <div className=" d-flex align-items-center ">
                  <h5 className="mb-3 col-4">優惠票卷</h5>
                  <p className="mb-3 col-4">{orderMemberData.couponTitle}</p>
                </div>
                <div className=" d-flex align-items-center ">
                  <h5 className="mb-3 col-4">應付金額</h5>
                  <p className="mb-3 col-4">{orderMemberData.orderTotal}元</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="mb-3 mt-3">活動資料</h3>
            <div className="row">
              {orderActiveDataFirst && (
                <div className="col-4">
                  <h4 className="mb-1 mt-3">第一天</h4>
                  <div className=" d-flex align-items-center ">
                    <h5 className="mb-3 col-4">活動參與</h5>
                    <p className="mb-3 col-4">
                      {orderActiveDataFirst.isActive === "0" ? "有" : "無"}
                    </p>
                  </div>
                  <div className=" d-flex align-items-center ">
                    <h5 className="mb-3 col-4">活動日期</h5>
                    <p className="mb-3 col-4">
                      {orderActiveDataFirst.orderItemDate}
                    </p>
                  </div>
                  <div className=" d-flex align-items-center ">
                    <h5 className="mb-3 col-4">活動包類型</h5>
                    <p className="mb-3 col-6">
                      {orderActiveDataFirst.activePackType}
                    </p>
                  </div>
                </div>
              )}
              {orderActiveDataSecond && (
                <div className="col-4">
                  <h4 className="mb-1 mt-3">第二天</h4>
                  <div className=" d-flex align-items-center ">
                    <h5 className="mb-3 col-4">活動參與</h5>
                    <p className="mb-3 col-4">
                      {orderActiveDataSecond.isActive === "0" ? "有" : "無"}
                    </p>
                  </div>
                  <div className=" d-flex align-items-center ">
                    <h5 className="mb-3 col-4">活動日期</h5>
                    <p className="mb-3 col-4">
                      {orderActiveDataSecond.orderItemDate}
                    </p>
                  </div>
                  <div className=" d-flex align-items-center ">
                    <h5 className="mb-3 col-4">活動包類型</h5>
                    <p className="mb-3 col-6">
                      {orderActiveDataSecond.activePackType}
                    </p>
                  </div>
                </div>
              )}
              {orderActiveDataThird && (
                <div className="col-4">
                  <h4 className="mb-1 mt-3">第三天</h4>
                  <div className=" d-flex align-items-center ">
                    <h5 className="mb-3 col-4">活動參與</h5>
                    <p className="mb-3 col-4">
                      {orderActiveDataThird.isActive === "0" ? "有" : "無"}
                    </p>
                  </div>
                  <div className=" d-flex align-items-center ">
                    <h5 className="mb-3 col-4">活動日期</h5>
                    <p className="mb-3 col-4">
                      {orderActiveDataThird.orderItemDate}
                    </p>
                  </div>
                  <div className=" d-flex align-items-center ">
                    <h5 className="mb-3 col-4">活動包類型</h5>
                    <p className="mb-3 col-6">
                      {orderActiveDataThird.activePackType}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* <div className="d-flex justify-content-end">
            <button
              className="btn btn-success mb-3 me-3"
              onClick={() => setEditShow(false)}
            >
              確定
            </button>
          </div> */}
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <BackstageLoding />
        </div>
      )}
    </>
  );
}

export default OrderView;
