import React from "react"
import './Feedback.css'
import { Button, Form } from 'react-bootstrap'


export default function Feedback(props) {


  return (
    <div className="Feedback">
      <ul className="Feedback--menu">
        <li><a href="/" className="menu--item">基本資料</a></li>
        <li><a href="/" className="menu--item">訂單記錄</a></li>
        <li><a href="/" className="menu--item--on">活動回饋</a></li>
        <li><a href="/" className="menu--item">優惠表單</a></li>
      </ul>

      <div className="Feedback--card">
        <h2 className="Feedback--title">目前沒有旅程供評論</h2>
        <Form>
          <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
            {/* <Form.Label>Example textarea</Form.Label> */}
            <Form.Control as="textarea" rows={5} placeholder="填寫活動反饋" />
          </Form.Group>
        </Form>
        <Button className="Feedback--btn" size="s" variant="secondary">
          送出
        </Button>
      </div>

    </div>
  )

}