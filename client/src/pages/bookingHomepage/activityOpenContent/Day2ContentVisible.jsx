import React, { useState, useContext } from "react";
import "./DayContentVisible.css";
import { BookContext } from "../../../Helper/Context";
import { useEffect } from "react";

const Day2ContentVisible = () => {
  const { activity1Data, setActivity1Data } = useContext(BookContext);
  const { activity2Data, setActivity2Data } = useContext(BookContext);

  const { countActivity, setCountActivity } = useContext(BookContext);

  //判斷活動共選幾天
  useEffect(() => {
    if (activity1Data === "1" && activity2Data === "3") {
      setCountActivity(2);
    } else if (activity1Data === "1" && activity2Data === "4") {
      setCountActivity(1);
    } else if (activity1Data === "2" && activity2Data === "3") {
      setCountActivity(1);
    } else if (activity1Data === "2" && activity2Data === "4") {
      setCountActivity(0);
    }
  }, [activity1Data, activity2Data]);

  //當全部選要參加活動時，隱藏"否"的選項
  const [disableNoVisible, setDisableNoVisible] = useState(true);
  useEffect(() => {
    activity1Data === "1" && activity2Data === "3"
      ? setDisableNoVisible(false)
      : setDisableNoVisible(true);
  }, [activity1Data, activity2Data]);

  //當活動參與都選否，使activityState得值變"1"(否)，才能直接跳轉OrderPage
  const { activityState, setActivityState } = useContext(BookContext);
  useEffect(() => {
    if (activity1Data === "2" && activity2Data === "4") {
      return setActivityState("1");
    }
  }, [activity1Data, activity2Data]);
  return (
    <>
      <div className="activityChoice">
        <p>第一天</p>
        <label>
          <input
            className="rdobutton_radio"
            type="radio"
            name="pick1stActivity"
            id="activityId"
            value="1"
            onChange={(e) => {
              setActivity1Data(e.target.value);
              // countActivityDaysYes();
            }}
          ></input>
          是
        </label>
        {/* {disableNoVisible && ( */}

        <label>
          <input
            className="rdobutton_radio"
            type="radio"
            name="pick1stActivity"
            id="activityId"
            value="2"
            onChange={(e) => {
              setActivity1Data(e.target.value);
              // countActivityDaysNo();
            }}
          ></input>
          否
        </label>

        {/* )} */}
      </div>
      <div className="activityChoice">
        <p>第二天</p>
        <label>
          <input
            className="rdobutton_radio"
            type="radio"
            name="pick2stActivity"
            id="activityId"
            value="3"
            onChange={(e) => {
              setActivity2Data(e.target.value);
              // countActivityDaysYes();
            }}
          ></input>
          是
        </label>
        {/* {disableNoVisible && ( */}
        <label>
          <input
            className="rdobutton_radio"
            type="radio"
            name="pick2stActivity"
            id="activityId"
            value="4"
            onChange={(e) => {
              setActivity2Data(e.target.value);
              // countActivityDaysNo();
            }}
          ></input>
          否
        </label>

        {/* )} */}
      </div>
    </>
  );
};

export default Day2ContentVisible;
