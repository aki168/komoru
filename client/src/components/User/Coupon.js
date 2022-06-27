import React from 'react'
import './Coupon.css'
import {Tab,Tabs} from 'react-bootstrap'

export default function Coupon(props) {


  return (
    <div className="Coupon">
    <ul className="Coupon--menu">
      <li><a href="/" className="menu--item">基本資料</a></li>
      <li><a href="/" className="menu--item">訂單記錄</a></li>
      <li><a href="/" className="menu--item">活動回饋</a></li>
      <li><a href="/" className="menu--item--on">優惠表單</a></li>
    </ul>

    <div className="Coupon--card">
    <Tabs fill
      defaultActiveKey="coupon"
      id="coupon-tab"
      className="mb-3 fs-5"
    >
      <Tab className="p-3" eventKey="coupon" title="未使用">
        <section className="coupon--item">
          <p>註冊優惠代碼優惠代碼優惠代碼優惠代碼優惠代碼優惠代碼</p>
        </section>
      </Tab>
      <Tab className="p-3"  eventKey="coupon-used" title="已使用">
      <section className="coupon--item">
        <p>無</p>
      </section>
      </Tab> 
    </Tabs>
    </div>

  </div>
  )

}