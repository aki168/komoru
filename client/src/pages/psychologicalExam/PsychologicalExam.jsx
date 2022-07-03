import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import ExamAll from "./examAll/ExamAll";
import "./PsychologicalExam.css";
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
    <div className="ExamFrame">
      <div className="examContainer">
        <ExamAll />
      </div>
    </div>
  );
}

export default PsychologicalExam;
