import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import ExamAll from "./examAll/ExamAll";
// import { Steps } from "rsuite";

function PsychologicalExam() {
  // const location = useLocation();
  // console.log(location);
  // const [dayState, setDayState] = useState(location.state.dayState);
  // const [roomState, setRoomState] = useState(location.state.roomState);
  // const [couponState, setCouponState] = useState(location.state.couponState);
  // const [activityState, setActivityState] = useState(
  //   location.state.activityState
  // );

  return (
    <div>
      {/* <p>{dayState}</p>
      <p>{roomState}</p> */}
      {/* <p>{couponState}</p> */}
      {/* <p>{activityState}</p> */}
      {/* <Steps current={1}>
        <Steps.Item title="計畫確認" />
        <Steps.Item title="心理測驗" />
        <Steps.Item title="訂單明細" />
        <Steps.Item title="結帳" />
      </Steps> */}
      <ExamAll />
    </div>
  );
}

export default PsychologicalExam;
