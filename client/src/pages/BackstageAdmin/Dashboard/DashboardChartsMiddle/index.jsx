import React, { useState } from "react";
import DemoColumnOccupancyRate from "./DemoColumnOccupancyRate";
import DemoLineRoomTurnover from "./DemoLineRoomTurnover";
import DemoPieParticipate from "./DemoPieParticipate";
import DemoPieExam from "./DemoPieExam";
import DemoPieActivityType from "./DemoPieActivityType";
import DemoLiquidCoupon from "./DemoLiquidCoupon";
import DemoLiquidFeedback from "./DemoLiquidFeedback";
import { useEffect } from "react";

function DashboardChartsMiddle() {
  const [middleData,setMiddleData] = useState()
  useEffect(() => {
    const newContacts = {
      cityId: "2",
      dateRange: "2022-06",
    };
    fetch("http://localhost:5000/dashboard/getDashboardDataListByCondition", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(newContacts),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.dataList.IsOrderAfterExamItem);
        setMiddleData(data.dataList);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);
  return (
    <>
      <div className="mx-5 me-5">
        <div className="row mb-5">
          <h3>入住率</h3>
          {middleData && <DemoColumnOccupancyRate middleData={middleData} />}
        </div>
        <div className="row mb-5">
          <h3>房型營業額</h3>
          {middleData && <DemoLineRoomTurnover middleData={middleData} />}
        </div>
        <div className="row mb-5">
          <div className="col-4">
            <h3>參與活動率</h3>
            {middleData && <DemoPieParticipate middleData={middleData}/>}
          </div>
          <div className="col-4">
            <h3>測驗後參與率</h3>
            {middleData && <DemoPieExam middleData={middleData}/>}
          </div>
          <div className="col-4">
            <h3>活動類型</h3>
            {middleData && <DemoPieActivityType middleData={middleData}/>}
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-6">
            <h3>優惠卷使用率</h3>
            {middleData && <DemoLiquidCoupon middleData={middleData}/>}
          </div>
          <div className="col-6">
            <h3>回饋率</h3>
            {middleData && <DemoLiquidFeedback middleData={middleData}/>}
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardChartsMiddle;
