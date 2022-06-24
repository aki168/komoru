import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./bookingPageImg.css";

const BookingImgTainanPrivateRoom = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .post(
        "http://localhost:5000/room/getRoomDataListWithMainImgAndHotelNameAndCityName"
      )
      .then((res) => {
        console.log(res.data.dataList);
        setData(res.data.dataList);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="bookingPageImgContainer">
      <img
        className="bookingPageImg"
        src="http://localhost:5000/images/room/room-11.jpeg"
        alt=""
      />
    </div>
  );
};

export default BookingImgTainanPrivateRoom;
