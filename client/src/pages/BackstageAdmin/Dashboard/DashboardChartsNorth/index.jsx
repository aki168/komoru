import React, { useState, useEffect } from "react";
import DemoColumnOccupancyRate from "./DemoColumnOccupancyRate";
import DemoLineRoomTurnover from "./DemoLineRoomTurnover";
import DemoPieParticipate from "./DemoPieParticipate";
import DemoPieExam from "./DemoPieExam";
import DemoPieActivityType from "./DemoPieActivityType";
import DemoLiquidCoupon from "./DemoLiquidCoupon";
import DemoLiquidFeedback from "./DemoLiquidFeedback";
import BackstageLoding from "../../../../components/BackstageLoading";
function DashboardChartsNorth({ dateData, setTitleArea }) {
  /*20220707 YN
  北區報表資料初始化*/
  const [northData, setNorthData] = useState();

  /*20220707 YN
  報表資料載入過程初始化*/
  const [loading, setLoading] = useState(false);

  /*20220709 YN
   區域標題狀態設定*/
  useEffect(() => {
    setTitleArea("北區");
  }, []);

  /*20220707 YN
   取後端北區報表資料*/
  useEffect(() => {
    const newContacts = {
      cityId: "1",
      dateRange: `${dateData.dateRange}`,
    };
    setLoading(false);
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
        setNorthData(data.dataList);
        setLoading(true);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [dateData]);
  return (
    <>
      <div className="mx-5 me-5">
        <div className="row ms-5 me-5">
          {loading ? (
            <>
              <div
                className="mt-3 ps-3 pe-3 pb-4"
                style={{
                  backgroundColor: "white",
                  boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                }}
              >
                <div className="pt-3 ps-1">
                  <p style={{ fontSize: "22px", color: "#808080" }}>入住率</p>
                </div>
                {northData && (
                  <DemoColumnOccupancyRate northData={northData} />
                )}
              </div>

              <div
                className="mt-5 ps-3 pe-3 pb-4"
                style={{
                  backgroundColor: "white",
                  boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                }}
              >
                <div className="pt-3 ps-1">
                  <p style={{ fontSize: "22px", color: "#808080" }}>房型營業額</p>
                </div>
                {northData && <DemoLineRoomTurnover northData={northData} />}
              </div>
              <div className="row mb-5 mt-2 g-0">
                <div
                  className="col-4"
                  style={{
                    padding: "20px 20px 0 0",
                  }}
                >
                  {/* <h3>參與活動率</h3> */}
                  <div
                    className="mt-3"
                    style={{
                      backgroundColor: "white",
                      boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                    }}
                  >
                    <div className="pt-3 ps-1">
                      <p style={{ fontSize: "22px", color: "#808080" }}>參與活動率</p>
                    </div>

                    {northData && (
                      <DemoPieParticipate northData={northData} />
                    )}
                  </div>
                </div>
                <div
                  className="col-4"
                  style={{
                    padding: "20px 20px 0 20px",
                  }}
                >

                  <div
                    className="mt-3"
                    style={{
                      backgroundColor: "white",
                      boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                    }}
                  >
                    <div className="pt-3 ps-1">
                      <p style={{ fontSize: "22px", color: "#808080" }}>測驗後參與率</p>
                    </div>
                    {northData && <DemoPieExam northData={northData} />}
                  </div>
                </div>

                <div
                  className="col-4"
                  style={{
                    padding: "20px 0 0 20px",
                  }}
                >

                  <div
                    className="mt-3"
                    style={{
                      backgroundColor: "white",
                      boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                    }}
                  >
                    <div className="pt-3 ps-1">
                      <p style={{ fontSize: "22px", color: "#808080" }}>活動類型</p>
                    </div>
                    {northData && (
                      <DemoPieActivityType northData={northData} />
                    )}
                  </div>
                </div>
              </div>
              <div className="row mb-5 g-0">
                <div
                  className="col-6"
                  style={{
                    padding: "0 20px 0 0",
                  }}
                >
                  <div
                    className="pb-5"
                    style={{
                      backgroundColor: "white",
                      boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                    }}
                  >
                    <div className="pt-3 ps-4">
                      <p style={{ fontSize: "22px", color: "#808080" }}>優惠卷使用率</p>
                    </div>
                    {northData && <DemoLiquidCoupon northData={northData} />}
                  </div>
                </div>
                <div
                  className="col-6"
                  style={{
                    padding: "0 0 0 20px",
                  }}
                >
                  <div
                    className="pb-5 "
                    style={{
                      backgroundColor: "white",
                      boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                    }}
                  >
                    <div className="pt-3 ps-4">
                      <p style={{ fontSize: "22px", color: "#808080" }}>回饋率</p>
                    </div>
                    {northData && (
                      <DemoLiquidFeedback northData={northData} />
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="d-flex justify-content-center">
              <BackstageLoding />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DashboardChartsNorth;
