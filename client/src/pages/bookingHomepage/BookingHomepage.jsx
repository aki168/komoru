import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Booking from "./booking/Booking";
import "./BookingHomepage.css";
import BookingAgreeModal from "./bookingAgreeModal/BookingAgreeModal";
import Navbar from "../../components/Navbar/Navbar";
// import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import { AiOutlineRight } from "react-icons/ai";

function BookingHomepage() {
  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.token) {
      navigate("/login", { replace: true });
    }
  });

  return (
    <>
      <Navbar />
      <div className="bookingBreadcrumbs">
        <Link to="/">首頁</Link>
        <span>
          <AiOutlineRight />
        </span>
        <p>即刻預定</p>
      </div>
      {/* <BreadCrumbs /> */}
      <div className="bookingHomepageContainer">
        <Booking />
      </div>
    </>
  );
}

export default BookingHomepage;
