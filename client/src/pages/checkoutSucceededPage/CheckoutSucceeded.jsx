import React from "react";
import { Link } from "react-router-dom";
import "./CheckoutSucceeded.css";

const CheckoutSucceeded = () => {
  return (
    <div className="checkoutSucceededContainer">
      <p>下定成功!</p>
      <p>
        快到會員中心查看→<Link to="/member-order">訂單紀錄</Link>
      </p>
    </div>
  );
};

export default CheckoutSucceeded;
