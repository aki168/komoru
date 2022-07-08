import React, { useState, useEffect } from "react";
import DemoColumnOccupancyRate from "./DemoColumnOccupancyRate";
import DemoLineRoomTurnover from "./DemoLineRoomTurnover";
import DemoPieParticipate from "./DemoPieParticipate";
import DemoPieExam from "./DemoPieExam";
import DemoPieActivityType from "./DemoPieActivityType";
import DemoLiquidCoupon from "./DemoLiquidCoupon";
import DemoLiquidFeedback from "./DemoLiquidFeedback";
import BackstageLoding from "../../../../components/BackstageLoading";
function DashboardChartsSouth({ dateData }) {
  /*20220707 YN
  南區報表資料初始化*/
  const [southData, setSouthData] = useState();

  /*20220707 YN
 報表資料載入過程初始化*/
  const [loading, setLoading] = useState(false);


  /*20220707 YN
取後端南區報表資料*/
  useEffect(() => {
    const newContacts = {
      cityId: "3",
      dateRange: `${dateData.dateRange}`,
    };
    setLoading(false)
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
        setSouthData(data.dataList);
        setLoading(true)
      })
      .catch((e) => {
        console.error(e);
      });
  }, [dateData]);
  return (
    <>
      <div className="mx-5 me-5">
        {loading ?
          <>
            <div>
              <div className="row mb-5">
                <h3>入住率</h3>
                {southData && <DemoColumnOccupancyRate southData={southData} />}
              </div>
              <div className="row mb-5">
                <h3>房型營業額</h3>
                {southData && <DemoLineRoomTurnover southData={southData} />}
              </div>
              <div className="row mb-5">
                <div className="col-4">
                  <h3>參與活動率</h3>
                  {southData && <DemoPieParticipate southData={southData} />}
                </div>
                <div className="col-4">
                  <h3>測驗後參與率</h3>
                  {southData && <DemoPieExam southData={southData} />}
                </div>
                <div className="col-4">
                  <h3>活動類型</h3>
                  {southData && <DemoPieActivityType southData={southData} />}
                </div>
              </div>
              <div className="row mb-5">
                <div className="col-6">
                  <h3>優惠卷使用率</h3>
                  {southData && <DemoLiquidCoupon southData={southData} />}
                </div>
                <div className="col-6">
                  <h3>回饋率</h3>
                  {southData && <DemoLiquidFeedback southData={southData} />}
                </div>
              </div>
            </div>
          </> : <div className="d-flex justify-content-center"><BackstageLoding /></div>}
      </div>
    </>
  );
}

export default DashboardChartsSouth;
