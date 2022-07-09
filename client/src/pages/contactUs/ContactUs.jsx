import React, { useState } from "react";
import {
  TiMail,
  TiPhoneOutline,
  TiUserOutline,
  TiMessage,
} from "react-icons/ti";
import "./ContactUs.css";
import Navbar from "../../components/Navbar/Navbar";
import AutoCarousel from "./AutoCarousel";
import axios from "axios";

const ContactUs = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  };

  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [tel, setTel] = useState("");
  // const [html, setHtml] = useState("");

  const [formData, setFormData] = useState({});
  // 追蹤表單輸入值使用
  function inputHandler(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  // // 修改介面觸發：個人資料觸發函式
  // const [toggleData, setToggleData] = useState(false);
  // const toggleSwitch = () => {
  //   setToggleData((prevAlertData) => !prevAlertData);
  // };

  function send(e) {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:5000/employee/contactUs",
      data: {
        subject: formData.name + "," + formData.email + "," + formData.tel,
        html: formData.html,
      },
    })
      .then((res) => {
        // console.log(res);
        // console.log({
        //   subject: formData.name + "," + formData.email + "," + formData.tel,
        //   html: formData.html,
        // });
        setFormData({
          name: "",
          email: "",
          tel: "",
          html: "",
        });
      })
      .then(() => {
        alert("提交成功!");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // const send = (event) => {
  //   event.preventDefault();
  //   const conTactUsDetails = {
  //     // subject: name + "," + email + "," + tel,
  //     // html: html,
  //     subject: ,
  //     html:,
  //   };
  //   console.log({
  //     // subject: name + "," + email + "," + tel,
  //     // html: html,
  //   });
  //   fetch("http://localhost:5000/employee/contactUs", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json; charset=utf-8",
  //     },
  //     body: JSON.stringify(conTactUsDetails),
  //   })
  //     .then((response) => console.log(response.json()))
  //     // .then(setName("") && setEmail("") && setTel(""))
  //     .catch(console.error);
  // };
  return (
    <>
      <Navbar />
      <div className="ContactUsContainer">
        <div className="leftContent">
          <h1>聯絡 KOMORU 官方</h1>
          <p>
            如果您對KOMORU日租旅人平台有任何疑問或需要索取更詳細的資料,請在下方留下您的姓名/公司名稱、電子信箱、聯絡電話，並確認皆正確無誤，我們會盡快予以回覆。
          </p>
          <AutoCarousel />
        </div>
        <form className="contactForm">
          <h1>立即免費聯繫</h1>
          <p>
            <TiUserOutline className="contactIcon" />
            <input
              className="basicText"
              id="name"
              name="name"
              type="text"
              placeholder="請留下您的姓名 / 公司名稱"
              required
              value={formData.name}
              onChange={inputHandler}
            />
          </p>
          <p>
            <TiMail className="contactIcon" />
            <input
              className="basicText"
              id="email"
              name="email"
              type="text"
              placeholder="請輸入您的電子信箱"
              required
              value={formData.email}
              onChange={inputHandler}
            />
          </p>
          <p>
            <TiPhoneOutline className="contactIcon" />
            <input
              className="basicText"
              id="tel"
              name="tel"
              type="text"
              placeholder="請輸入您的聯絡電話"
              required
              value={formData.tel}
              onChange={inputHandler}
            />
          </p>
          <p>
            <TiMessage className="contactIcon" />
            <textarea
              className="messegeText"
              id="html"
              name="html"
              placeholder="備註訊息"
              required
              value={formData.html}
              onChange={inputHandler}
            ></textarea>
          </p>
          <button className="submitBtn" onClick={send}>
            提交
          </button>
        </form>
      </div>
    </>
  );
};

export default ContactUs;
