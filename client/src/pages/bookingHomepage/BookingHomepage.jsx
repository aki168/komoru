import React from "react";
import Booking from "./booking/Booking";
import "./BookingHomepage.css";
import BookingAgreeModal from "./bookingAgreeModal/BookingAgreeModal";

function BookingHomepage() {
  return (
    <>
      <BookingAgreeModal />
      <div className="bookingHomepageContainer">
        <Booking />
      </div>
    </>
  );
}

export default BookingHomepage;
