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

  return (
    <div className="activityChoice">
      <p>第一天</p>
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
      <label htmlFor="yes">要</label>
      {disable1Visible && (
        <>
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
          <label htmlFor="yes">否</label>
        </>
      )}
    </div>
  );
};

export default Day1ContentVisible;
