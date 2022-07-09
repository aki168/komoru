import React from "react";
import { BsFillRecordFill } from "react-icons/bs";
import "./ActivityBag.css";

const ActivityBag = (props) => {
  return (
    <div className="ActivityBagContainer">
      <h1>{props.date}</h1>
      {/* <h2>{props.activePackItemTitle}</h2> */}
      <table className="bagTable">
        <tr>
          <td>
            <span>
              <BsFillRecordFill />
              10:00 - 11:00 Check In
            </span>
            <p>前往預定飯店並參觀飯店空間</p>
          </td>
          <td>
            <span>
              <BsFillRecordFill />
              14:00 - 16:00 探索時刻
            </span>
            <p>{props.activePackItemContent2}</p>
          </td>
          <td>
            <span>
              <BsFillRecordFill />
              21:00 - 23:00 永續傳承
            </span>
            <p>前往飯店櫃檯留言你今日的觀察及改變</p>
          </td>
        </tr>
        <tr>
          <td>
            <span>
              <BsFillRecordFill />
              11:00 - 12:00 改變的開始
            </span>
            <p>前往飯店櫃檯領取上一位旅客的回饋</p>
          </td>
          <td>
            <span>
              <BsFillRecordFill />
              16:00 - 17:00 Tea Time
            </span>
            <p>{props.activePackItemContent3}</p>
          </td>
        </tr>
        <tr>
          <td>
            <span>
              <BsFillRecordFill />
              12:00 - 14:00 不一樣的用餐體驗
            </span>
            <p>{props.activePackItemContent}</p>
          </td>
          <td>
            <span>
              <BsFillRecordFill />
              17:00 - 21:00 沈澱＆聆聽
            </span>
            <p>自由活動 / 晚餐 / 與自己對話</p>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default ActivityBag;
