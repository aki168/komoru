import React from 'react'
import './Coupon.css'
import { Tab, Tabs } from 'react-bootstrap'

export default function Coupon(props) {


  return (

    <div className= "Coupon--card" >
      <Tabs fill
        defaultActiveKey="coupon"
        id="coupon-tab"
        className="mb-3 fs-5"
      >
        <Tab className="p-3 " eventKey="coupon" title="未使用">
          <section className="coupon--item">
            <h3>註冊優惠200$</h3>
          </section>
        </Tab>
        <Tab className="p-3" eventKey="coupon-used" title="已使用">
          <section className="coupon--item">
            <h3>無</h3>
          </section>
        </Tab>
      </Tabs>
    </div >
  )
}