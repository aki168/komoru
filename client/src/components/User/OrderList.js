import React from "react"
import './OrderList.css'
import { Accordion } from 'react-bootstrap'


export default function OrderList(props) {


  return (
    <>
      {/* 下：有訂房紀錄版 */}
      {/* { props.isOrder &&  */}
          <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <ul className="p-2 w-100 d-flex justify-content-between">
                  <li className="pt-2 pb-1">{props.orderStartDate}</li>
                  <li className="ps-2 pt-2 pb-1 w-50">{props.roomDesc}</li>
                  <li className="pt-2 pb-1">{props.memberName}</li>
                </ul>
              </Accordion.Header>
              <Accordion.Body className="p-3 text-start">
                詳細訂單資訊 [預計使用ZH的畫面]
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
        {/* } */}
    </>
  )

}