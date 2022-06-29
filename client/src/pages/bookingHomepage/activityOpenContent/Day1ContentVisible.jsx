import React, { useContext, useEffect, useState } from "react";
import "./DayContentVisible.css";
import { BookContext } from "../../../Helper/Context";

const Day1ContentVisible = () => {
  const { activity1Data, setActivity1Data } = useContext(BookContext);
  const { countActivity, setCountActivity } = useContext(BookContext);
  const [disable1Visible, setDisable1Visible] = useState(true);
  useEffect(() => {
    activity1Data === "1"
      ? setDisable1Visible(false)
      : setDisable1Visible(true);
  }, [activity1Data]);

  const show = () => {
    setCountActivity(1);
  };

  //當活動參與都選否，使activityState得值變"1"(否)，才能直接跳轉OrderPage
  const { activityState, setActivityState } = useContext(BookContext);
  useEffect(() => {
    if (activity1Data === "2") {
      return setActivityState("1");
    }
  }, [activity1Data]);

  return (
    <div className="activityChoice">
      <p>第一天</p>
      <label>
        <input
          className="rdobutton_radio"
          type="radio"
          name="pick1stActivity"
          id="activityId"
          value="1"
          onClick={show}
          onChange={(e) => {
            setActivity1Data(e.target.value);
          }}
        ></input>
        要
      </label>
      {/* {disable1Visible && (
        <> */}
      <label>
        <input
          className="rdobutton_radio"
          type="radio"
          name="pick1stActivity"
          id="activityId"
          value="2"
          onChange={(e) => {
            setActivity1Data(e.target.value);
          }}
        ></input>
        否
      </label>
      {/* </>
      )} */}
    </div>
  );
};

export default Day1ContentVisible;
