import React from "react";
import DemoColumnOccupancyRate from "./DemoColumnOccupancyRate";
import DemoLineTurnover from "./DemoLineTurnover";
import DemoLineRoomTurnover from "./DemoLineRoomTurnover";
import DemoPieParticipate from "./DemoPieParticipate";
import DemoPieNoParticipate from "./DemoPieNoParticipate";
import DemoPieActivityType from "./DemoPieActivityType";
import DemoLiquidCoupon from "./DemoLiquidCoupon";
import DemoLiquidFeedback from "./DemoLiquidFeedback";

function DashboardChartsEast() {
  return (
    <>
      <div className="mx-5 me-5">
        <div className="row mb-5">
          <h3>入住率</h3>
          <DemoColumnOccupancyRate />
        </div>
        <div className="row mb-5">
          <div className="col-6">
            <h3>營業額</h3>
            <DemoLineTurnover />
          </div>
          <div className="col-6">
            <h3>房型營業額</h3>
            <DemoLineRoomTurnover />
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-4">
            <h3>參與活動率</h3>
            <DemoPieParticipate />
          </div>
          <div className="col-4">
            <h3>測驗率</h3>
            <DemoPieNoParticipate />
          </div>
          <div className="col-4">
            <h3>活動類型</h3>
            <DemoPieActivityType />
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-6">
            <h3>優惠卷使用率</h3>
            <DemoLiquidCoupon />
          </div>
          <div className="col-6">
            <h3>回饋率</h3>
            <DemoLiquidFeedback />
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardChartsEast;
