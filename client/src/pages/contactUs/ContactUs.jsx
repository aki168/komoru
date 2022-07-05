import React from "react";
import { TiMail, TiUserOutline, TiMessage } from "react-icons/ti";

const ContactUs = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <p>
            <TiUserOutline />
            姓名:
          </p>
          <input type="text" required />
          <p>
            <TiMail />
            信箱Email:
          </p>
          <input type="text" required />
          <p>
            <TiMessage />
            聯絡訊息:
          </p>
          <input type="text" required />
          <button>提交</button>
        </form>
      </div>
    </>
  );
};

export default ContactUs;
