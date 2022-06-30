import React, { useState, useEffect } from "react";
// import TaipeiHotelImg from "./hotelImg/TaipeiHotelImg";
// import TaichungHotelImg from "./hotelImg/TaichungHotelImg";
import {
  HualienSliderImg,
  HualienSliderDes,
  TaichungSliderImg,
  TaichungSliderDes,
  TainanSliderImg,
  TainanSliderDes,
  TaipeiSliderImg,
  TaipeiSliderDes,
} from "./roomImg/RoomImg";
// import HotelDescription from "./hotelDescription/HotelDescription";
import axios from "axios";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import "./PartnerHotel.css";
import Aos from "aos";
import "aos/dist/aos.css";

const PartnerHotel = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const [current1, setCurrent1] = useState(0);
  const [current2, setCurrent2] = useState(0);
  const [current3, setCurrent3] = useState(0);
  const [current4, setCurrent4] = useState(0);

  //台北

  const nextSlide1 = () => {
    setCurrent1(current1 === TaipeiSliderImg.length - 1 ? 0 : current1 + 1);
  };
  const prevSlide1 = () => {
    setCurrent1(current1 === 0 ? TaipeiSliderImg.length - 1 : current1 - 1);
  };
  // if (!Array.isArray(TaipeiSliderImg) || TaipeiSliderImg.length <= 0) {
  //   return null;
  // }

  //台中
  const nextSlide2 = () => {
    setCurrent2(current2 === TaichungSliderImg.length - 1 ? 0 : current2 + 1);
  };
  const prevSlide2 = () => {
    setCurrent2(current2 === 0 ? TaichungSliderImg.length - 1 : current2 - 1);
  };
  // if (!Array.isArray(TaichungsliderImg) || TaichungsliderImg.length <= 0) {
  //   return null;
  // }

  //台南
  const nextSlide3 = () => {
    setCurrent3(current3 === TainanSliderImg.length - 1 ? 0 : current3 + 1);
  };
  const prevSlide3 = () => {
    setCurrent3(current3 === 0 ? TainanSliderImg.length - 1 : current3 - 1);
  };
  // if (!Array.isArray(TainanSliderImg) || TainanSliderImg.length <= 0) {
  //   return null;
  // }

  //花蓮
  const nextSlide4 = () => {
    setCurrent4(current4 === HualienSliderImg.length - 1 ? 0 : current4 + 1);
  };
  const prevSlide4 = () => {
    setCurrent4(current4 === 0 ? HualienSliderImg.length - 1 : current4 - 1);
  };
  // if (!Array.isArray(HualienSliderImg) || HualienSliderImg.length <= 0) {
  //   return null;
  // }

  return (
    // <div className="partnerHotelContainer">
    //   <div>

    //     <div>{TaichungHotelImg}</div>
    //     <div>{TainanHotelImg}</div>
    //     <div>{HualienHotelImg}</div>
    //     <div>{TaipeiHotelImg}</div>
    //   </div>
    // </div>
    <>
      <div className="hotelIntroTitle">
        <h1>合作飯店</h1>
        <h2>ROOMS</h2>
      </div>

      <section className="sliderleft">
        <FaArrowAltCircleLeft
          className="sliderleft-left-arrow"
          onClick={prevSlide1}
        />
        <FaArrowAltCircleRight
          className="sliderleft-right-arrow"
          onClick={nextSlide1}
        />
        {TaipeiSliderImg.map((Taipeiimg, index) => {
          return (
            <div
              className={index === current1 ? "slide active" : "slide"}
              key={index}
            >
              {index === current1 && (
                <img src={Taipeiimg.image} alt="Taipei img" className="image" />
              )}
            </div>
          );
        })}
        {TaipeiSliderDes.map((TaipeiDes, index) => {
          return (
            <div
              // className={index === current1 ? "slide active" : "slide"}
              key={index}
            >
              {index === current1 && (
                <p className="sizeRight">{TaipeiDes.description}</p>
              )}
            </div>
          );
        })}
      </section>

      <section className="sliderRight " data-aos="fade-left">
        <FaArrowAltCircleLeft
          className="sliderRight-left-arrow"
          onClick={prevSlide2}
        />
        <FaArrowAltCircleRight
          className="sliderRight-right-arrow"
          onClick={nextSlide2}
        />
        {TaichungSliderDes.map((TaichungDes, index) => {
          return (
            <div
              // className={index === current2 ? "slide active" : "slide"}
              key={index}
            >
              {index === current2 && (
                <p className="sizeLeft">{TaichungDes.description}</p>
              )}
            </div>
          );
        })}
        {TaichungSliderImg.map((Taichungimg, index) => {
          return (
            <div
              className={index === current2 ? "slide active" : "slide"}
              key={index}
            >
              {index === current2 && (
                <img src={Taichungimg.image} alt="err img" className="image" />
              )}
            </div>
          );
        })}
      </section>

      <section className="sliderleft" data-aos="fade-right">
        <FaArrowAltCircleLeft
          className="sliderleft-left-arrow"
          onClick={prevSlide3}
        />
        <FaArrowAltCircleRight
          className="sliderleft-right-arrow"
          onClick={nextSlide3}
        />
        {TainanSliderImg.map((Tainanimg, index) => {
          return (
            <div
              className={index === current3 ? "slide active" : "slide"}
              key={index}
            >
              {index === current3 && (
                <img src={Tainanimg.image} alt="err img" className="image" />
              )}
            </div>
          );
        })}
        {TainanSliderDes.map((TainanDes, index) => {
          return (
            <div
              // className={index === current3 ? "slide active" : "slide"}
              key={index}
            >
              {index === current3 && (
                <p className="sizeRight">{TainanDes.description}</p>
              )}
            </div>
          );
        })}
      </section>

      <section className="sliderRight" data-aos="fade-left">
        <FaArrowAltCircleLeft
          className="sliderRight-left-arrow"
          onClick={prevSlide4}
        />
        <FaArrowAltCircleRight
          className="sliderRight-right-arrow"
          onClick={nextSlide4}
        />
        {HualienSliderDes.map((HualienDes, index) => {
          return (
            <div
              // className={index === current4 ? "slide active" : "slide"}
              key={index}
            >
              {index === current4 && (
                <p className="sizeLeft">{HualienDes.description}</p>
              )}
            </div>
          );
        })}
        {HualienSliderImg.map((Hualienimg, index) => {
          return (
            <div
              className={index === current4 ? "slide active" : "slide"}
              key={index}
            >
              {index === current4 && (
                <img src={Hualienimg.image} alt="err img" className="image" />
              )}
            </div>
          );
        })}
      </section>
    </>
  );
};

export default PartnerHotel;

// import React, { useState, useEffect } from "react";
// import {
//   HualienSliderImg,
//   TaichungSliderImg,
//   TainanSliderImg,
//   TaipeiSliderImg,
// } from "../partnerHotel/roomImg/RoomImg";
// import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
// import axios from "axios";
// import "../partnerHotel/PartnerHotel.css";

// const PartnerHotel = ({ slides }) => {
//   const [hotelData, setHotelData] = useState([]);
//   useEffect(() => {
//     axios
//       .post(
//         "http://localhost:5000/hotel/getHotelDataListWithMainImgAndCityName"
//       )
//       .then((res) => {
//         console.log(res.data.dataList);
//         setHotelData(res.data.dataList);
//       })
//       .catch((err) => console.log(err));
//   }, []);
//   const partnerHotelImgUrlArr = hotelData.map((hotelData, index) => {
//     return (
//       <div key={index}>
//         <img src={`http://localhost:5000${hotelData.hotelImgPath}`} alt="" />
//       </div>
//     );
//   });

//   const TaichungHotelImg = partnerHotelImgUrlArr[0];
//   const TainanHotelImg = partnerHotelImgUrlArr[1];
//   const HualienHotelImg = partnerHotelImgUrlArr[2];
//   const TaipeiHotelImg = partnerHotelImgUrlArr[3];

//   const [current, setCurrent] = useState(0);
//   const length = slides.length;
//   return (
//     <section className="slider">
//       <FaArrowAltCircleLeft className="left-arrow" />
//       <FaArrowAltCircleRight className="right-arrow" />
//       {TaichungHotelImg}
//       {TaichungSliderImg.map((Taichungimg, index) => {
//         return <img src={Taichungimg.image} alt="err img" className="image" />;
//       })}
//     </section>
//   );
// };

// export default PartnerHotel;
