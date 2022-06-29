import React, { useState, useEffect } from "react"
import { Button } from "react-bootstrap"
import './User.css'
import axios from 'axios'

// memberGender: "0"
// memberId: 12
// memberImgPath: null
// memberMail: "gina@gmail.com"
// memberName: "沈吉娜"
// memberNickName: "GINA"
// memberPasswd: "gina"
// memberPhone: "0977444555"
// registerType: "0"
// updateDatetime: "2022-06-21 15:59:19"

export default function User(props) {


  //抓取表單資料使用 & 設立初始值
  const [formData, setFormData] = useState(
    {
      // mail: "",
      // name: "",
      // nickName: "",
      // sex: "",
      // phone: ""
    }
  )
  // 跳轉後即刻渲染資料「初始化」
  useEffect(() => {
    setFormData({
      mail: props.mail,
      name: props.name,
      nickName: props.nickName,
      sex: props.sex,
      phone: props.phone
    })
  }, [props])

  // 修改介面觸發：個人資料觸發函式
  const [alertData, setAlertData] = useState(false)
  const alertSwitch = () => {
    setAlertData(prevAlertData => !prevAlertData)
  }

  // 追蹤表單輸入值使用
  function inputHandler(e) {
    const { name, value } = e.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }
  console.log(formData)

  // 送出內容：個人資料修改
  function alertProfile(e) {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:5000/member/alertProfile",
      data: {
        mail: formData.mail,
        name: formData.name,
        nickName: formData.nickName,
        sex: formData.sex,
        phone: formData.phone
      }
    })
      .then((res) => {
        console.log(res)
        setAlertData(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }


  return (
    <div className="User">
      <ul className="OrderList--menu">
        <li><a href="/user" className="menu--item--on">基本資料</a></li>
        <li><a href="/member-order" className="menu--item">訂單記錄</a></li>
        <li><a href="/member-feedback" className="menu--item">活動回饋</a></li>
        <li><a href="/member-coupon" className="menu--item">優惠表單</a></li>
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
            <label htmlFor="mail">帳號　</label>
            <span className="fs-4">{formData.mail}</span>
            {/* <input
              type="text"
              name="mail"
              id="mail"
              value={formData.mail}
              onChange={inputHandler}
            />  */}
          </li>
          <li className="user--item">
            <label htmlFor="name">姓名　</label>
            {!alertData && <span className="fs-4">{formData.name}</span>}
            {alertData && <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={inputHandler}
            />}
          </li>
          <li className="user--item">
            <label htmlFor="nickName">暱稱　</label>
            {!alertData && <span className="fs-4">{formData.nickName}</span>}
            {alertData && <input
              type="text"
              name="nickName"
              id="nickName"
              value={formData.nickName}
              onChange={inputHandler}
            />}
          </li>
          <li className="user--item">
            <label htmlFor="sex">性別　</label>
            {!alertData && <span className="fs-4">{formData.sex==='1'? `男性` : `女性`}</span>}
            {alertData && <select
              name="sex"
              id="sex"
              value={formData.sex}
              onChange={inputHandler}
            >
              <option value="1">男性</option>
              <option value="0">女性</option>
            </select>}
          </li>
          <li className="user--item">
            <label htmlFor="phone">手機　</label>
            {!alertData && <span className="fs-4">{formData.phone}</span>}
            {alertData && <input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={inputHandler}
            />}
          </li>
        </ul>
        <div className="user--btnBar">
          <Button
            className="user--btn--M"
            size="s"
            variant="secondary"
            onClick={alertSwitch}
          >修改
          </Button>

          <Button className="user--btn--M" size="s" variant="secondary" onClick={alertProfile}>儲存</Button>
        </div>
      </div>


    



    </div>
  )

}