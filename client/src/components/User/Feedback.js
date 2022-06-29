import React from "react"
import './Feedback.css'
import { Button, Accordion,Form } from 'react-bootstrap'


export default function Feedback(props) {


  return (
    <>
      <div className="Feedback">
        <ul className="Feedback--menu">
          <li><a href="/user" className="menu--item">基本資料</a></li>
          <li><a href="/member-order" className="menu--item">訂單記錄</a></li>
          <li><a href="/member-feedback" className="menu--item--on">活動回饋</a></li>
          <li><a href="/member-coupon" className="menu--item">優惠表單</a></li>
        </ul>
        <div className="Feedback--card--none">
          <p>目前沒有可供評論的訂單，現在就出發！</p>
          <Button size="lg" variant="secondary">
            Book Now
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
            </svg>
          </Button>
        </div>
      </div>


      {/* 下：有訂房紀錄版 */}


      <div className="Feedback">
        <ul className="Feedback--menu">
          <li><a href="/user" className="menu--item">基本資料</a></li>
          <li><a href="/member-order" className="menu--item">訂單記錄</a></li>
          <li><a href="/member-feedback" className="menu--item--on">活動回饋</a></li>
          <li><a href="/" className="menu--item">優惠表單</a></li>
        </ul>
        <div className="Feedback--card">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <ul className="p-2 w-100 d-flex justify-content-between">
                  <li className="pt-2 pb-1">2022/06/28</li>
                  {/* <li className="pt-2 pb-1">KOMORU日租旅人平台</li> */}
                  <li className="ps-2 pt-2 pb-1 w-50">台中區 Star Hostel / 背包客房</li>
                  <li className="pt-2 pb-1">User</li>
                </ul>
              </Accordion.Header>
              <Accordion.Body className="p-4 text-start">
                <Form>
                  <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
                    {/* <Form.Label>Example textarea</Form.Label> */}
                    <Form.Control as="textarea" rows={5} placeholder="填寫活動反饋" />
                  </Form.Group>
                </Form>
                <span>對於此趟旅程有什麼想法或是改變歡迎分享給 KOMORU</span>
                <Button className="Feedback--btn float-end me-1" size="sm" variant="secondary">
                  修改
                </Button>
                <Button className="Feedback--btn float-end me-1" size="sm" variant="secondary">
                  提交
                </Button>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <ul className="p-2 w-100 d-flex justify-content-between">
                  <li className="pt-2 pb-1">2022/05/29</li>
                  {/* <li className="pt-2 pb-1">KOMORU日租旅人平台</li> */}
                  <li className="ps-2 pt-2 pb-1 w-50">台東區 三鄰三林青年文旅 / 私人套房</li>
                  <li className="pt-2 pb-1">User</li>
                </ul>
              </Accordion.Header>
              <Accordion.Body className="p-4 text-start">
                <Form>
                  <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
                    {/* <Form.Label>Example textarea</Form.Label> */}
                    <Form.Control as="textarea" rows={5} placeholder="填寫活動反饋" />
                  </Form.Group>
                </Form>
                <span>對於此趟旅程有什麼想法或是改變歡迎分享給 KOMORU</span>
                <Button className="Feedback--btn float-end me-1" size="sm" variant="secondary">
                  修改
                </Button>
                <Button className="Feedback--btn float-end me-1" size="sm" variant="secondary">
                  提交
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </>
  )

}