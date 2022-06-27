import React from "react"
import './OrderList.css'


export default function OrderList(props) {


  return (
    <div className="OrderList">
    <ul className="OrderList--menu">
      <li><a href="/" className="menu--item">基本資料</a></li>
      <li><a href="/" className="menu--item--on">訂單記錄</a></li>
      <li><a href="/" className="menu--item">活動回饋</a></li>
      <li><a href="/" className="menu--item">優惠表單</a></li>
    </ul>

    <div className="OrderList--card">
      <p>目前沒有訂單紀錄，現在就開始旅程！</p>
    </div>

  </div>
  )

}