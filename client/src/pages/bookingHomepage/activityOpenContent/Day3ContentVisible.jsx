import React, { useContext } from "react";
import "./DayContentVisible.css";
import { BookContext } from "../../../Helper/Context";
import { useEffect, useState } from "react";

const Day3ContentVisible = () => {
  const { activity1Data, setActivity1Data } = useContext(BookContext);
  const { activity2Data, setActivity2Data } = useContext(BookContext);
  const { activity3Data, setActivity3Data } = useContext(BookContext);

  const { countActivity, setCountActivity } = useContext(BookContext);
  useEffect(() => {
    if (
      activity3Data === "5" &&
      activity2Data === "3" &&
      activity1Data === "1"
    ) {
      setCountActivity(3);
    } else if (activity2Data === "3" && activity1Data === "1") {
      setCountActivity(2);
    } else if (activity3Data === "5" && activity1Data === "1") {
      setCountActivity(2);
    } else if (activity3Data === "5" && activity2Data === "3") {
      setCountActivity(2);
    } else if (activity1Data === "1") {
      setCountActivity(1);
    } else if (activity2Data === "3") {
      setCountActivity(1);
    } else if (activity3Data === "5") {
      setCountActivity(1);
    } else if (
      activity3Data === "6" &&
      activity2Data === "4" &&
      activity1Data === "2"
    ) {
      setCountActivity(0);
    }
  });

  const [disableVisible, setDisableVisible] = useState(true);

  useEffect(() => {
    activity1Data === "1" && activity2Data === "3" && activity3Data === "5"
      ? setDisableVisible(false)
      : setDisableVisible(true);
  }, [activity1Data, activity2Data, activity3Data]);
  console.log(activity1Data, activity2Data, activity3Data);

  //當活動參與都選否，使activityState得值變"1"(否)，才能直接跳轉OrderPage
  const { activityState, setActivityState } = useContext(BookContext);
  useEffect(() => {
    if (
      activity1Data === "2" &&
      activity2Data === "4" &&
      activity3Data === "6"
    ) {
      return setActivityState("1");
    }
  }, [activity1Data, activity2Data, activity3Data]);

  return (
    <>
      <div className="activityChoice">
        <p>第一天</p>
        <input
          className="rdobutton_radio"
          type="radio"
          name="pick1stActivity"
          id="activityId"
          value="1"
          onChange={(e) => {
            setActivity1Data(e.target.value);
          }}
        ></input>
        <label htmlFor="yes">是</label>
        {disableVisible && (
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
      <div className="activityChoice">
        <p>第二天</p>
        <input
          className="rdobutton_radio"
          type="radio"
          name="pick2stActivity"
          id="activityId"
          value="3"
          onChange={(e) => {
            setActivity2Data(e.target.value);
          }}
        ></input>
        <label htmlFor="yes">是</label>
        {disableVisible && (
          <>
            <input
              className="rdobutton_radio"
              type="radio"
              name="pick2stActivity"
              id="activityId"
              value="4"
              onChange={(e) => {
                setActivity2Data(e.target.value);
              }}
            ></input>
            <label htmlFor="yes">否</label>
          </>
        )}
      </div>
      <div className="activityChoice">
        <p>第三天</p>
        <input
          className="rdobutton_radio"
          type="radio"
          name="pick3stActivity"
          id="activityId"
          value="5"
          onChange={(e) => {
            setActivity3Data(e.target.value);
          }}
        ></input>
        <label htmlFor="yes">是</label>
        {disableVisible && (
          <>
            <input
              className="rdobutton_radio"
              type="radio"
              name="pick3stActivity"
              id="activityId"
              value="6"
              onChange={(e) => {
                setActivity3Data(e.target.value);
              }}
            ></input>
            <label htmlFor="yes">否</label>
          </>
        )}
      </div>
    </>
  );
};

export default Day3ContentVisible;
