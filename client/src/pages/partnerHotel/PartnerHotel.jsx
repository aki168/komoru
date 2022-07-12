import React, { useState, useEffect } from "react";
// import TaipeiHotelImg from "./hotelImg/TaipeiHotelImg";
// import TaichungHotelImg from "./hotelImg/TaichungHotelImg";
import { Hotel1Img, Hotel2Img, Hotel3Img, Hotel4Img } from "./roomImg/RoomImg";
// import HotelDescription from "./hotelDescription/HotelDescription";
import axios from "axios";
import "./PartnerHotel.css";
import Aos from "aos";
import "aos/dist/aos.css";
import Navbar from "../../components/Navbar/Navbar-bg-white";
import RoomItemLeft from "./roomItem/RoomItemLeft";
import RoomItemRight from "./roomItem/RoomItemRight";
import PrivateRoomModal from "./roomModal/PrivateRoomModal";
import BackPackerRoomModal from "./roomModal/BackPackerRoomModal";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import UserHeader from "../../components/User/UserHeader";

const PartnerHotel = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const [current1, setCurrent1] = useState(0);
  const [current2, setCurrent2] = useState(0);
  const [current3, setCurrent3] = useState(0);
  const [current4, setCurrent4] = useState(0);

  const [data, setData] = useState([]);
  useEffect(() => {
    axios({
      method: "post",
      url: "http://localhost:5000/hotel/getHotelDataListWithMainImgAndCityName",
      // data: {
      //   hotelId: 2,
      // },
    })
      .then((res) => {
        console.log(res.data.dataList);
        setData(res.data.dataList);
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
      {/* 0712 aki-更改為滾動視差  */}
      <div className="partnerHotel--titleBar partnerHotel--bg--fix mb-5">
      <UserHeader
        title="遍地全台的合作飯店一覽"
        text="KOMORU與北、中、南、東各個在地青旅合作，活絡社會並讓旅者與業者達到雙贏！"
      />
      </div>

      {/* <div className="hotelIntroTitle">
        <div className="textGroup">
          <h1>遍地全台的合作飯店一覽 </h1>
          <p>
            KOMORU與北、中、南、東各個在地青旅合作，活絡社會並讓旅者與業者達到雙贏！
          </p>
        </div>
      </div> */}

      {/* 台北 */}
      <section className="sliderleft mt-3">
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
        <div className="sizeRight" data-aos="fade-up">
          <div>
            <h1>夾腳拖的家</h1>
            <h1>Flip Flop Hostel</h1>
          </div>
          <p>{data[0].hotelContent}</p>
          <br />
          <p>{data[0].hotelTel}</p>
          <p>{data[0].hotelAddr}</p>
          <a href="https://www.facebook.com/OwlStay.FlipFlopHostel/">
            認識 夾角拖的家 Flip Flop Hostel
          </a>
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
      <RoomItemLeft
        privateClick={openPrivateModal3Click}
        backPackerClick={openBackPackerModal3Click}
        privateUrl="http://localhost:5000/images/room/room-9.jpeg"
        backPackerUrl="http://localhost:5000/images/room/room-10.jpeg"
      />

      {/* 台中 */}
      <section className="sliderRight">
        <BsChevronLeft
          className="sliderRight-left-arrow"
          onClick={prevSlide1}
        />
        <BsChevronRight
          className="sliderRight-right-arrow"
          onClick={nextSlide1}
        />
        <div className="sizeLeft" data-aos="fade-up">
          <div>
            <h1>誠星青年旅館</h1>
            <h1>Star Hostel</h1>
          </div>
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
      <RoomItemRight
        privateClick={openPrivateModal1Click}
        backPackerClick={openBackPackerModal1Click}
        privateUrl="http://localhost:5000/images/room/room-1.jpeg"
        backPackerUrl="http://localhost:5000/images/room/room-5.jpeg"
      />

      {/* 台南 */}
      <section className="sliderleft ">
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
        <div className="sizeRight" data-aos="fade-up">
          <h1>{data[1].hotelTitle}</h1>
          <p>{data[1].hotelContent}</p>
          <br />
          <p>{data[1].hotelTel}</p>
          <p>{data[1].hotelAddr}</p>
        </div>
      </section>
      <RoomItemLeft
        privateClick={openPrivateModal2Click}
        backPackerClick={openBackPackerModal2Click}
        privateUrl="http://localhost:5000/images/room/room-14.jpeg"
        backPackerUrl="http://localhost:5000/images/room/room-13.jpeg"
      />

      {/* 花蓮 */}
      <section className="sliderRight">
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
        <div className="sizeLeft" data-aos="fade-up">
          <div>
            <h1>{data[2].hotelTitle}</h1>
          </div>
          <p>{data[2].hotelContent}</p>
          <br />
          <p>{data[2].hotelTel}</p>
          <p>{data[2].hotelAddr}</p>
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
      <RoomItemRight
        privateClick={openPrivateModal4Click}
        backPackerClick={openBackPackerModal4Click}
        privateUrl="http://localhost:5000/images/room/room-11.jpeg"
        backPackerUrl="http://localhost:5000/images/room/room-12.jpeg"
      />
    </>
  );
};

export default PartnerHotel;
