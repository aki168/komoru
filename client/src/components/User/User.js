import React, { useState } from "react"
import { Button } from "react-bootstrap"
import './User.css'


export default function User(props) {

  // 抓取表單資料使用 & 設立初始值
  const [formData, setFormData] = useState(
    {
      mail: "",
      passwd: "",
      passwdCheck: "",
      forgetPasswordAns: "",
      name: "",
      nickName: "",
      sex: "",
      phone: ""
    }
  )

  


  // 追蹤表單輸入值使用
  function inputHandler(e) {
    const { name, value } = e.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }
  console.log(formData)


  return (
    <div className="User">
      <ul className="user--menu">
        <li><a href="/" className="menu--item--on">基本資料</a></li>
        <li><a href="/" className="menu--item">訂單記錄</a></li>
        <li><a href="/" className="menu--item">活動回饋</a></li>
        <li><a href="/" className="menu--item">優惠表單</a></li>
      </ul>

      <div className="user--card">
        <div className="user--icon">
          <div className="icon--pic">
            <img src="avatar-pl.png" alt="ICON" />
          </div>
          <Button className="user--btn--L" size="sm" variant="secondary">上傳照片</Button>
          <Button className="user--btn--L" size="sm" variant="secondary">更換封面</Button>
        </div>
        <ul className="user--form">
          <li className="user--item">
            <label htmlFor="mail">帳號</label>
            <input
              type="text"
              name="mail"
              id="mail"
              value={formData.mail}
              onChange={inputHandler}
            />
          </li>
          <li className="user--item">
            <label htmlFor="name">姓名</label>
            <input
              type="text"
              name="mail"
              id="mail"
              value={formData.mail}
              onChange={inputHandler} />
          </li>
          <li className="user--item">
            <label htmlFor="nickName">暱稱</label>
            <input
              type="text"
              name="nickName"
              id="nickName"
              value={formData.nickName}
              onChange={inputHandler} />
          </li>
          <li className="user--item">
            <label htmlFor="sex">性別</label>
            <select
              name="sex"
              id="sex"
              value={formData.sex}
              onChange={inputHandler} >
              <option value="1">男性</option>
              <option value="0">女性</option>
            </select>
          </li>
          <li className="user--item">
            <label htmlFor="phone">手機</label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={inputHandler} />
          </li>
        </ul>
        <div className="user--btnBar">
          <Button className="user--btn--M" size="s" variant="secondary">修改</Button>
          <Button className="user--btn--M" size="s" variant="secondary">儲存</Button>
        </div>
      </div>

    </div>
  )

}