import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Booking from "./booking/Booking";
import "./BookingHomepage.css";
import BookingAgreeModal from "./bookingAgreeModal/BookingAgreeModal";
import Navbar from "../../components/Navbar/Navbar";

function BookingHomepage() {
  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.token) {
      navigate("/login", { replace: true });
    }
  });
  return (
    <>
      <BookingAgreeModal />
      <Navbar />
      <div className="bookingHomepageContainer">
        <Booking />
      </div>
    </>
  );
}

export default BookingHomepage;
