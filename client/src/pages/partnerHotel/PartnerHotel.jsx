import React, { useState, useEffect } from "react";
// import TaipeiHotelImg from "./hotelImg/TaipeiHotelImg";
// import TaichungHotelImg from "./hotelImg/TaichungHotelImg";
import { Hotel1Img, Hotel2Img, Hotel3Img, Hotel4Img } from "./roomImg/RoomImg";
// import HotelDescription from "./hotelDescription/HotelDescription";
import axios from "axios";
import "./PartnerHotel.css";
import Aos from "aos";
import "aos/dist/aos.css";
import Navbar from "../../components/Navbar/Navbar";
import RoomItem from "./roomItem/RoomItem";
import PrivateRoomModal from "./roomModal/PrivateRoomModal";
import BackPackerRoomModal from "./roomModal/BackPackerRoomModal";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const PartnerHotel = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const [current1, setCurrent1] = useState(0);
  const [current2, setCurrent2] = useState(0);
  const [current3, setCurrent3] = useState(0);
  const [current4, setCurrent4] = useState(0);

  useEffect(() => {
    axios({
      method: "post",
      url: "http://localhost:5000/hotelImg/getHotelImgDataListByHotelId",
      data: {
        hotelId: 1,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //台北

  const nextSlide1 = () => {
    setCurrent1(current1 === Hotel1Img.length - 1 ? 0 : current1 + 1);
  };
  const prevSlide1 = () => {
    setCurrent1(current1 === 0 ? Hotel1Img.length - 1 : current1 - 1);
  };
  // if (!Array.isArray(TaipeiSliderImg) || TaipeiSliderImg.length <= 0) {
  //   return null;
  // }

  //台中
  const nextSlide2 = () => {
    setCurrent2(current2 === Hotel2Img.length - 1 ? 0 : current2 + 1);
  };
  const prevSlide2 = () => {
    setCurrent2(current2 === 0 ? Hotel2Img.length - 1 : current2 - 1);
  };
  // if (!Array.isArray(TaichungsliderImg) || TaichungsliderImg.length <= 0) {
  //   return null;
  // }

  //台南
  const nextSlide3 = () => {
    setCurrent3(current3 === Hotel3Img.length - 1 ? 0 : current3 + 1);
  };
  const prevSlide3 = () => {
    setCurrent3(current3 === 0 ? Hotel3Img.length - 1 : current3 - 1);
  };
  // if (!Array.isArray(TainanSliderImg) || TainanSliderImg.length <= 0) {
  //   return null;
  // }

  //花蓮
  const nextSlide4 = () => {
    setCurrent4(current4 === Hotel4Img.length - 1 ? 0 : current4 + 1);
  };
  const prevSlide4 = () => {
    setCurrent4(current4 === 0 ? Hotel4Img.length - 1 : current4 - 1);
  };
  // if (!Array.isArray(HualienSliderImg) || HualienSliderImg.length <= 0) {
  //   return null;
  // }

  const [openPrivate1Modal, setOpenPrivate1Modal] = useState(false);
  const [openBackPacker1Modal, setOpenBackPacker1Modal] = useState(false);
  const [openPrivate2Modal, setOpenPrivate2Modal] = useState(false);
  const [openBackPacker2Modal, setOpenBackPacker2Modal] = useState(false);
  const [openPrivate3Modal, setOpenPrivate3Modal] = useState(false);
  const [openBackPacker3Modal, setOpenBackPacker3Modal] = useState(false);
  const [openPrivate4Modal, setOpenPrivate4Modal] = useState(false);
  const [openBackPacker4Modal, setOpenBackPacker4Modal] = useState(false);

  const openPrivateModal1Click = () => {
    setOpenPrivate1Modal(true);
  };
  const openBackPackerModal1Click = () => {
    setOpenBackPacker1Modal(true);
  };
  const openPrivateModal2Click = () => {
    setOpenPrivate2Modal(true);
  };
  const openBackPackerModal2Click = () => {
    setOpenBackPacker2Modal(true);
  };
  const openPrivateModal3Click = () => {
    setOpenPrivate3Modal(true);
  };
  const openBackPackerModal3Click = () => {
    setOpenBackPacker3Modal(true);
  };
  const openPrivateModal4Click = () => {
    setOpenPrivate4Modal(true);
  };
  const openBackPackerModal4Click = () => {
    setOpenBackPacker4Modal(true);
  };

  useEffect(() => {
    if (
      openPrivate1Modal === true ||
      openPrivate2Modal === true ||
      openPrivate3Modal === true ||
      openPrivate4Modal === true ||
      openBackPacker1Modal === true ||
      openBackPacker2Modal === true ||
      openBackPacker3Modal === true ||
      openBackPacker4Modal === true
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [
    openPrivate1Modal,
    openPrivate2Modal,
    openPrivate3Modal,
    openPrivate4Modal,
    openBackPacker1Modal,
    openBackPacker2Modal,
    openBackPacker3Modal,
    openBackPacker4Modal,
  ]);
  // useEffect(() => {
  //   if (openPrivate1Modal === true) {
  //     document.body.style.overflow = "hidden";
  //   }
  //   if (openPrivate1Modal === false) {
  //     document.body.style.overflow = "unset";
  //   }
  // }, [openPrivate1Modal]);

  return (
    <>
      {/* Modal必須放最外層，否則overlay無法作用 */}
      <PrivateRoomModal
        onClose={() => {
          setOpenPrivate1Modal(false);
        }}
        open={openPrivate1Modal}
        privateUrl="http://localhost:5000/images/room/room-1.jpeg"
      />
      <BackPackerRoomModal
        onClose={() => {
          setOpenBackPacker1Modal(false);
        }}
        open={openBackPacker1Modal}
        backPackerUrl="http://localhost:5000/images/room/room-5.jpeg"
      />
      <PrivateRoomModal
        onClose={() => {
          setOpenPrivate2Modal(false);
        }}
        open={openPrivate2Modal}
        privateUrl="http://localhost:5000/images/room/room-14.jpeg"
      />
      <BackPackerRoomModal
        onClose={() => {
          setOpenBackPacker2Modal(false);
        }}
        open={openBackPacker2Modal}
        backPackerUrl="http://localhost:5000/images/room/room-13.jpeg"
      />
      <PrivateRoomModal
        onClose={() => {
          setOpenPrivate3Modal(false);
        }}
        open={openPrivate3Modal}
        privateUrl="http://localhost:5000/images/room/room-9.jpeg"
      />
      <BackPackerRoomModal
        onClose={() => {
          setOpenBackPacker3Modal(false);
        }}
        open={openBackPacker3Modal}
        backPackerUrl="http://localhost:5000/images/room/room-10.jpeg"
      />
      <PrivateRoomModal
        onClose={() => {
          setOpenPrivate4Modal(false);
        }}
        open={openPrivate4Modal}
        privateUrl="http://localhost:5000/images/room/room-11.jpeg"
      />
      <BackPackerRoomModal
        onClose={() => {
          setOpenBackPacker4Modal(false);
        }}
        open={openBackPacker4Modal}
        backPackerUrl="http://localhost:5000/images/room/room-12.jpeg"
      />

      <Navbar />
      <button className="goBooking">立即預定</button>
      <div className="hotelIntroTitle">
        <h1>合作飯店</h1>
        <h2>ROOMS</h2>
      </div>

      <section className="sliderleft" data-aos="fade-right">
        <BsChevronLeft className="sliderleft-left-arrow" onClick={prevSlide3} />
        <BsChevronRight
          className="sliderleft-right-arrow"
          onClick={nextSlide3}
        />
        {Hotel3Img.map((Tainanimg, index) => {
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
        <div className="sizeRight">
          <p>台北:夾腳拖的家</p>
        </div>
        {/* {TainanSliderDes.map((TainanDes, index) => {
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
        })} */}
      </section>
      <RoomItem
        privateClick={openPrivateModal3Click}
        backPackerClick={openBackPackerModal3Click}
        privateUrl="http://localhost:5000/images/room/room-9.jpeg"
        backPackerUrl="http://localhost:5000/images/room/room-10.jpeg"
      />

      <section className="sliderRight" data-aos="fade-left">
        <BsChevronLeft
          className="sliderRight-left-arrow"
          onClick={prevSlide1}
        />
        <BsChevronRight
          className="sliderRight-right-arrow"
          onClick={nextSlide1}
        />
        <div className="sizeLeft">
          <p>台中-Star Hostel</p>
          <p>台中市西區公益路68號15樓</p>
          <p> 15F, No.68, Gongyi Rd., West Dist., Taichung, Taiwan</p>
          <p>TEL:+886 4 2321-9696</p>
        </div>
        {Hotel1Img.map((Taipeiimg, index) => {
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
      </section>
      <RoomItem
        privateClick={openPrivateModal1Click}
        backPackerClick={openBackPackerModal1Click}
        privateUrl="http://localhost:5000/images/room/room-1.jpeg"
        backPackerUrl="http://localhost:5000/images/room/room-5.jpeg"
      />

      <section className="sliderleft " data-aos="fade-right">
        <BsChevronLeft className="sliderleft-left-arrow" onClick={prevSlide2} />
        <BsChevronRight
          className="sliderleft-right-arrow"
          onClick={nextSlide2}
        />
        {Hotel2Img.map((Taichungimg, index) => {
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
        <div className="sizeRight">
          <p>台南-快活慢行</p>
          <p>連絡電話:06-2229255</p>
          <p>信箱:hii@hiihubs.com</p>
          <p>702 台南市南區樹林街二段420號</p>
          <p>
            No.420, Sec. 2, Shulin St., South Dist., Tainan City 702, Taiwan
          </p>
        </div>
      </section>
      <RoomItem
        privateClick={openPrivateModal2Click}
        backPackerClick={openBackPackerModal2Click}
        privateUrl="http://localhost:5000/images/room/room-14.jpeg"
        backPackerUrl="http://localhost:5000/images/room/room-13.jpeg"
      />

      <section className="sliderRight" data-aos="fade-left">
        <BsChevronLeft
          className="sliderRight-left-arrow"
          onClick={prevSlide4}
        />
        <BsChevronRight
          className="sliderRight-right-arrow"
          onClick={nextSlide4}
        />
        {/* {HualienSliderDes.map((HualienDes, index) => {
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
        })} */}
        <div className="sizeLeft">
          <p>花蓮-山林山鄰</p>
          <p>address: 981花蓮縣玉里鎮大同路228號</p>
          <p>TEL:03-888-7228</p>
        </div>
        {Hotel4Img.map((Hualienimg, index) => {
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
      <RoomItem
        privateClick={openPrivateModal4Click}
        backPackerClick={openBackPackerModal4Click}
        privateUrl="http://localhost:5000/images/room/room-11.jpeg"
        backPackerUrl="http://localhost:5000/images/room/room-12.jpeg"
      />
    </>
  );
};

export default PartnerHotel;
