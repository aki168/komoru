import axios from "axios";
import { useEffect } from "react";

export const Hotel1Img = [
  { image: "http://localhost:5000/images/hotel/hotel-1.jpeg" },
  { image: "http://localhost:5000/images/hotel/hotel-2.jpeg" },
  { image: "http://localhost:5000/images/hotel/hotel-3.jpeg" },
  { image: "http://localhost:5000/images/hotel/hotel-4.jpeg" },
];

export const Hotel2Img = [
  { image: "http://localhost:5000/images/hotel/hotel-5.jpeg" },
  { image: "http://localhost:5000/images/hotel/hotel-6.jpeg" },
  { image: "http://localhost:5000/images/hotel/hotel-7.jpeg" },
  { image: "http://localhost:5000/images/hotel/hotel-8.jpeg" },
];
export const Hotel3Img = [
  { image: "http://localhost:5000/images/hotel/hotel-9.jpeg" },
  { image: "http://localhost:5000/images/hotel/hotel-10.jpeg" },
  { image: "http://localhost:5000/images/hotel/hotel-11.jpeg" },
  { image: "http://localhost:5000/images/hotel/hotel-12.jpeg" },
];
export const Hotel4Img = [
  { image: "http://localhost:5000/images/hotel/hotel-13.jpeg" },
  { image: "http://localhost:5000/images/hotel/hotel-14.jpeg" },
  { image: "http://localhost:5000/images/hotel/hotel-15.jpeg" },
  { image: "http://localhost:5000/images/hotel/hotel-16.jpeg" },
];

export const TaichungSliderImg = [
  { image: "http://localhost:5000/images/hotel/hotel-1.jpeg" },
  { image: "http://localhost:5000/images/room/room-1.jpeg" },
  //   { image: "http://localhost:5000/images/room/room-2.jpeg" },
  //   { image: "http://localhost:5000/images/room/room-3.jpeg" },
  //   { image: "http://localhost:5000/images/room/room-4.jpeg" },
  { image: "http://localhost:5000/images/room/room-5.jpeg" },
  //   { image: "http://localhost:5000/images/room/room-6.jpeg" },
  //   { image: "http://localhost:5000/images/room/room-7.jpeg" },
];

export const TaichungSliderDes = [
  {
    description: (
      <>
        <p>台中-Star Hostel</p>
        <p>台中市西區公益路68號15樓</p>
        <p> 15F, No.68, Gongyi Rd., West Dist., Taichung, Taiwan</p>
        <p>TEL:+886 4 2321-9696</p>
      </>
    ),
  },
  {
    description: (
      <>
        <p>台中:Star Hostel-私人套房</p>
        <p>
          光與影追逐的空間，以星空為被，於晨光中醒來，一個人可以滾床，兩個人不嫌擁擠。讀一本書還是寫寫字，木作小書桌與藤椅陪伴著你，這是剛剛好的旅行。
        </p>
        <p>Bed Size : 150*200cm 雙人床</p>
        <p>Room Perks : 浴巾 / 衣架 / 沐浴乳 / 洗髮乳 / 潤髮乳</p>
        <p>
          Room Facilities : 獨立衛浴設備 / 平板電視 / 冷氣 / 吹風機 /小型冰箱 /
          木桌藤椅 / 對外窗
        </p>
      </>
    ),
  },
  {
    description: (
      <>
        <p>台中:Star Hostel-背包客房</p>
        <p>
          二進式玄關設計，是對旅人的貼心，在房間外設置電子鎖櫃，減少彼此干擾。
          天井通透的自然採光，沒有擔憂的幽閉感，在預算內的舒適旅行。
        </p>
        <p>Bed Size : 100*200cm 單人床位</p>
        <p>Room Perks : 床簾 / 閱讀燈 / 大型電子鎖櫃(50*50*100cm)</p>
        <p>
          Room Facilities : 共用衛浴 (備有沐浴乳 / 洗髮乳 / 潤髮乳 / 吹風機) /
          冷氣 / 國際插座
        </p>
      </>
    ),
  },
];

export const TainanSliderImg = [
  { image: "http://localhost:5000/images/hotel/hotel-20.jpeg" },
  { image: "http://localhost:5000/images/room/room-14.jpeg" },
  { image: "http://localhost:5000/images/room/room-13.jpeg" },
];

export const TainanSliderDes = [
  {
    description: (
      <>
        <p>台南-快活慢行</p>
        <p>連絡電話:06-2229255</p>
        <p>信箱:hii@hiihubs.com</p>
        <p>702 台南市南區樹林街二段420號</p>
        <p>No.420, Sec. 2, Shulin St., South Dist., Tainan City 702, Taiwan</p>
      </>
    ),
  },
  {
    description: (
      <>
        <p>台南:快活慢行-私人套房</p>
        <p>倆人的小旅行。 陽台灑落陽光，從清晨開始體驗台南的愉悅</p>
        <p>Bed Size : 200x200cm</p>
        <p>
          Room Facilities : 獨立衛浴(提供浴巾、沐浴乳、洗髮乳及吹風機) / 冷氣 /
          洗衣 / 導覽手冊
        </p>
      </>
    ),
  },
  {
    description: (
      <>
        <p>台南:快活慢行-背包客房</p>
        <p>
          在最少預算中，提供給旅行者簡單舒適的睡眠拉下床簾，夢中的放肆與自由才是睡眠的原貌。
        </p>
        <p>Bed Size : 140x200cm</p>
        <p>
          Room Facilities : 共用衛浴(提供浴巾、沐浴乳、洗髮乳及吹風機) / 冷氣 /
          洗衣烘衣 / 私人置物櫃
        </p>
      </>
    ),
  },
];

export const HualienSliderImg = [
  { image: "http://localhost:5000/images/hotel/hotel-15.jpeg" },
  { image: "http://localhost:5000/images/room/room-11.jpeg" },
  { image: "http://localhost:5000/images/room/room-12.jpeg" },
];

export const HualienSliderDes = [
  {
    description: (
      <>
        <p>花蓮-山林山鄰</p>
        <p>address: 981花蓮縣玉里鎮大同路228號</p>
        <p>TEL:03-888-7228</p>
      </>
    ),
  },
  {
    description: (
      <>
        <p>花蓮:山林山鄰-私人套房</p>
        <p>
          輕旅房為日式床板及雙人舒適軟墊
          主打服務【環島型背包旅客】為主，空間不大，如同照片喲。
          你可以想像從共享的通鋪空間，變成有獨立的房間及衛浴，經濟實惠又能安穩的休息。
          房間有衛浴設備、洗髮乳、沐浴乳、浴巾、毛巾、吹風機、閱讀燈、WIFI、空調、衣架、水壺和水杯。
          室內面積約2.1坪。
          ❊請留意,旅館不提供一次性盥洗用品、沒有電視、續住不整房
        </p>
      </>
    ),
  },
  {
    description: (
      <>
        <p>花蓮:山林山鄰-背包客房</p>
        <p>
          提供室內拖鞋、附鎖之置物櫃、水壺和水杯、共用房間與衛浴，提供洗髮乳、沐浴乳、浴巾、毛巾，吹風機。利用綠建材組成6組獨立的木盒子，皆為日式拉門隔間設計(可上鎖)，床型為單人舒適軟墊，附閱讀燈、衣架。獨享房擺設共享桌椅、懶骨頭，設有圖書及桌遊遊戲，除了便於背包旅客交流聊天，也適合家庭及親朋好友包房體驗。​總面積約25坪。
          請留意，旅館不提供一次性盥洗用品、續住不整房，行動支持愛護土地與環境。
        </p>
      </>
    ),
  },
];

export const TaipeiSliderImg = [
  { image: "http://localhost:5000/images/hotel/hotel-11.jpeg" },
  { image: "http://localhost:5000/images/room/room-9.jpeg" },
  { image: "http://localhost:5000/images/room/room-10.jpeg" },
];

export const TaipeiSliderDes = [
  {
    description: (
      <>
        <p>台北:夾腳拖的家</p>
      </>
    ),
  },
  {
    description: (
      <>
        <p>台北:夾腳拖的家-私人套房</p>
      </>
    ),
  },
  {
    description: (
      <>
        <p>台北:夾腳拖的家-背包客房</p>
      </>
    ),
  },
];
