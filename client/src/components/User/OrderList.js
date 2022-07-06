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
                <ul className="acco-header p-2 w-100 d-flex justify-content-between">
                  <li className="pt-2 pb-1">{props.orderStartDate}</li>
                  <li className="ps-2 pt-2 pb-1 w-75">{props.cityName}　{props.hotelTitle} / {props.roomType? "私人房型":"背包客房"}</li>
                  <li className="pt-2 pb-1">{props.memberName}</li>
                </ul>
              </Accordion.Header>
              <Accordion.Body className="p-3 text-start">
                詳細訂單資訊 x









              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        {/* } */}
    </>
  )

}