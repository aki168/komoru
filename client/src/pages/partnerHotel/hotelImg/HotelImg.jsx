import React from "react";

const HotelImg = () => {
  /*20220617 ZH*/
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .post(
        "http://localhost:5000/hotel/getHotelDataListWithMainImgAndCityName"
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data.dataList);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="hotelImgContainer">
      <img src="" alt="" />
    </div>
  );
};

export default HotelImg;
