import React from "react"
import './OrderList.css'
import { Button, Accordion } from 'react-bootstrap'


export default function OrderList(props) {


  return (
    <>

      <div className="OrderList">
        <ul className="OrderList--menu">
          <li><a href="/user" className="menu--item">基本資料</a></li>
          <li><a href="/member-order" className="menu--item--on">訂單記錄</a></li>
          <li><a href="/member-feedback" className="menu--item">活動回饋</a></li>
          <li><a href="/member-coupon" className="menu--item">優惠表單</a></li>
        </ul>

        <div className="OrderList--card--none">
          <p>目前沒有訂單紀錄，現在就開始旅程！</p>
          <Button size="lg" variant="secondary">
            Book Now
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
            </svg>
          </Button>
        </div>
      </div>


{/* 下：有訂房紀錄版 */}



      <div className="OrderList">
        <ul className="OrderList--menu">
          <li><a href="/user" className="menu--item">基本資料</a></li>
          <li><a href="/member-order" className="menu--item--on">訂單記錄</a></li>
          <li><a href="/member-feedback" className="menu--item">活動回饋</a></li>
          <li><a href="/member-coupon" className="menu--item">優惠表單</a></li>
        </ul>

        <div className="OrderList--card">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <ul className="p-2 w-100 d-flex justify-content-between">
                  <li className="pt-2 pb-1">{props.orderStartDate}</li>
                  {/* <li className="pt-2 pb-1">KOMORU日租旅人平台</li> */}
                  <li className="ps-2 pt-2 pb-1 w-50">{props.roomDesc}</li>
                  <li className="pt-2 pb-1">{props.name}</li>
                </ul>
              </Accordion.Header>
              <Accordion.Body className="p-3 text-start">
                詳細訂單資訊
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <ul className="p-2 w-100 d-flex justify-content-between">
                  <li className="pt-2 pb-1">2022/05/29</li>
                  {/* <li className="pt-2 pb-1">KOMORU日租旅人平台</li> */}
                  <li className="ps-2 pt-2 pb-1 w-50">台東區 三鄰三林青年文旅 / 私人套房</li>
                  <li className="pt-2 pb-1">{props.name}</li>
                </ul>
              </Accordion.Header>
              <Accordion.Body className="p-3 text-start">
                詳細訂單資訊
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>


    </>
  )

}