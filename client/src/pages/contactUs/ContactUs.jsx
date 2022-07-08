import React from "react";
import {
  TiMail,
  TiPhoneOutline,
  TiUserOutline,
  TiMessage,
} from "react-icons/ti";
import "./ContactUs.css";
import Navbar from "../../components/Navbar/Navbar";
import AutoCarousel from "./AutoCarousel";

const ContactUs = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  };
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
              type="text"
              placeholder="請留下您的姓名 / 公司名稱"
              required
            />
          </p>
          <p>
            <TiMail className="contactIcon" />
            <input
              className="basicText"
              type="text"
              placeholder="請輸入您的電子信箱"
              required
            />
          </p>
          <p>
            <TiPhoneOutline className="contactIcon" />
            <input
              className="basicText"
              type="text"
              placeholder="請輸入您的聯絡電話"
              required
            />
          </p>
          <p>
            <TiMessage className="contactIcon" />
            <textarea
              className="messegeText"
              placeholder="備註訊息"
              required
            ></textarea>
          </p>
          <button className="submitBtn">提交</button>
        </form>
      </div>
    </>
  );
};

export default ContactUs;
