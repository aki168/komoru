import React, { useState, useEffect, useCallback } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import BackstageLoding from "../../../../components/BackstageLoading";

function OrderView({ setEditShow, editData }) {
  /*20220624 YN
  修改資料初始化*/
  const [orderMemberData, setOrderMemberData] = useState("");
  const [orderActiveData, setOrderActiveData] = useState("");

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
        console.log(data.dataList.orderItemDataList);
        setLoading(true);
        setOrderMemberData(data.dataList.orderData[0]);
        setOrderActiveData(data.dataList.orderItemDataList[0]);
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
        <div className="container mb-3">
          <div style={{ margin: "0 0 0 60px" }}>
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
          <div style={{ margin: "0 0 0 60px" }}>
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
                <div className=" d-flex align-items-center ">
                  <h5 className="mb-3 col-4">優惠票卷</h5>
                  <p className="mb-3 col-4">{orderMemberData.couponTitle}</p>
                </div>
              </div>
              <div className="col-6">
                <div className=" d-flex align-items-center ">
                  <h5 className="mb-3 col-4">活動參與</h5>
                  <p className="mb-3 col-4">{orderActiveData.activePackType}</p>
                </div>
                <div className=" d-flex align-items-center ">
                  <h5 className="mb-3 col-4">活動天數</h5>
                  <p className="mb-3 col-4">活動天數?</p>
                </div>
                <div className=" d-flex align-items-center ">
                  <h5 className="mb-3 col-4">應付金額</h5>
                  <p className="mb-3 col-4">{orderMemberData.orderTotal}元</p>
                </div>
              </div>
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
