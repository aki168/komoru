import React, { useState } from "react";
// import {
//   TiMail,
//   TiPhoneOutline,
//   TiUserOutline,
//   TiMessage,
// } from "react-icons/ti";
import "./ContactUs.css";
import Navbar from "../../components/Navbar/Navbar";
import AutoCarousel from "./AutoCarousel";
import axios from "axios";
import ContactUsModal from "./ContactUsModal";
import { GoComment, GoMail } from "react-icons/go";
import { AiOutlinePhone, AiOutlineUser } from "react-icons/ai";

const ContactUs = () => {
  // const [loading, setLoading] = useState(false);
  // const [opencontactUsModal, setOpencontactUsModal] = useState(false);
  const [formData, setFormData] = useState({});
  // const [recieve, setReceive] = useState(true);

  // 追蹤表單輸入值使用
  function inputHandler(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  //送出表單提交資料，並清空表單輸入植
  function send(e) {
    e.preventDefault();
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.tel === "" ||
      formData.html === ""
    ) {
      alert("輸入不得有空");
    } else {
      axios({
        method: "POST",
        url: "http://localhost:5000/employee/contactUs",
        data: {
          subject: formData.name + "," + formData.email + "," + formData.tel,
          html: formData.html,
        },
      })
        .then((res) => {
          console.log(res);
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
          alert("我們已收到您的訊息!謝謝!");
          // setLoading(true);
        })
        // .then(() => {
        //   // setOpencontactUsModal(true);
        //   setReceive(false);
        // })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // const reset = () => {
  //   setReceive(true);
  // };
  return (
    <>
      {/* <ContactUsModal
        open={opencontactUsModal}
        close={() => {
          setOpencontactUsModal(false);
        }}
      /> */}

      <Navbar />
      {/* {recieve ? ( */}
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
            <AiOutlineUser className="contactIcon" />
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
            <GoMail className="contactIcon" />
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
            <AiOutlinePhone className="contactIcon" />
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
            <GoComment className="contactIcon" />
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
      {/* ) : (
        <div className="ContactUsContainer">
          <div className="leftContent">
            <h1>聯絡 KOMORU 官方</h1>
            <p>
              如果您對KOMORU日租旅人平台有任何疑問或需要索取更詳細的資料,請在下方留下您的姓名/公司名稱、電子信箱、聯絡電話，並確認皆正確無誤，我們會盡快予以回覆。
            </p>
            <AutoCarousel />
          </div>
          <div className="recieveContent">
            <p>我們已收到您的訊息!謝謝!</p>
            <button className="submitBtn" onClick={reset}>
              ok
            </button>
          </div>
        </div>
      )} */}
    </>
  );
};

export default ContactUs;
