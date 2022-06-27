import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { BsFillArrowUpSquareFill } from "react-icons/bs";

function RoomAdd({ setAddShow, data }) {
  /*20220622 YN
   飯店資料初始化*/
  const [hotelData, setHotelData] = useState([]);

  /*20220622 YN
   房型資料初始化*/
  // const [roomData, setRoomData] = useState([]);

  /*20220622 YN
   新增表單資料初始化*/
  const [addFormData, setAddFormData] = useState({
    employeeId: "1",
    hotelId: "",
    roomId: "",
    liveNum: "",
  });

  /*20220625 YN
   預覽照片狀態初始化*/
  const [imgPreview, setImgPreview] = useState(null);

  /*20220625 YN
   照片不符合規格錯誤狀態初始化*/
  const [error, setError] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  /*20220622 YN
   取得後端飯店資料*/
  useEffect(() => {
    axios
      .post(
        "http://localhost:5000/hotel/getHotelDataListWithMainImgAndCityName"
      )
      .then((res) => {
        // console.log(res.data.dataList);
        setHotelData(res.data.dataList);
      })
      .catch((err) => console.log(err));
  }, []);

  /*20220625 YN
   取得後端房型資料*/
  // useEffect(() => {
  //   axios
  //     .post(
  //       "http://localhost:5000/room/getRoomDataListWithMainImgAndHotelNameAndCityName"
  //     )
  //     .then((res) => {
  //       console.log(res.data.dataList);
  //       setRoomData(res.data.dataList);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const hotelTitleArr = hotelData.map((hotelTitleData, index) => {
    return (
      <option key={index} value={hotelTitleData.hotelId}>
        {hotelTitleData.hotelTitle}
      </option>
    );
  });
  // const roomTitleArr = roomData.map((roomTitleData, index) => {
  //   return (
  //     <option key={index} value={roomTitleData.roomId}>
  //       {roomTitleData.roomTitle}
  //     </option>
  //   );
  // });

  /*20220622 YN
   取得輸入新增表單資料*/
  const addFormChangeHandle = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
    console.log(newFormData);
  };
  /*20220622 YN
   送出時取得輸入新增表單資料，並傳到後端重整畫面*/
  const addFormSubmitHandle = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      hotelId: addFormData.hotelId,
      roomId: addFormData.roomId,
      liveNum: addFormData.liveNum,
      employeeId: 1,
      roomImgPath:selectedFile
    };

    const newContacts = newContact;
    console.log(newContacts)

    // setAddFormData(newContacts);
    // fetch("http://localhost:5000/partnership/addPartnership", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json; charset=utf-8",
    //   },
    //   body: JSON.stringify(newContacts),
    // })
    //   .then((response) => response.json()) // 取出 JSON 資料，並還原成 Object。response.json()　一樣回傳 Promise 物件
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
    // data.push(newContacts);
    // setAddShow(false);
    // window.location.reload(false);
  };
  /*20220625 YN
  更換照片、預覽照片、限制照片格式*/
  const handleImageChange = (e) => {
    setError(false);
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
        setSelectedFile(selected);
        console.log(selected)
      };
      reader.readAsDataURL(selected);
    } else {
      setError(true);
    }
  };
  return (
    <Form className="container row mt-3" onSubmit={addFormSubmitHandle}>
      <Form.Group
        className="col-6 d-flex justify-content-center align-items-center "
        style={{
          background: imgPreview
            ? `url("${imgPreview}") no-repeat center/cover`
            : "#d3d3d3",
        }}
      >
        <div className="d-flex  flex-column ">
          <div className="d-flex flex-column">
            {!imgPreview && (
              <>
                <label className="btn text-white" htmlFor="fileUpload">
                  <BsFillArrowUpSquareFill size="5em" />
                </label>
                <input
                  name="fileUploadName"
                  id="fileUpload"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <p className="text-white">(png,jpeg or jpg)</p>
              </>
            )}
          </div>
          <div>
            {error && <p className="text-center text-danger">不支援此檔案</p>}
          </div>
        </div>
        <div>
          {imgPreview && (
            <button onClick={() => setImgPreview(null)}>更換照片</button>
          )}
        </div>
      </Form.Group>
      <Form.Group className="col-6">
        <Form.Group>
          <Form.Label>飯店名稱</Form.Label>
          <Form.Select name="hotelId" onChange={addFormChangeHandle}>
            <option defaultValue>請選擇飯店</option>
            {hotelTitleArr}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>房型選擇</Form.Label>
          <Form.Select name="roomId" onChange={addFormChangeHandle}>
            <option defaultValue>請選擇房型</option>
            <option value="1">私人套房</option>
            <option value="2">背包客房</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>容納人數</Form.Label>
          <Form.Control
            type="text"
            name="liveNum"
            required="required"
            placeholder="1"
            onChange={addFormChangeHandle}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>備註</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="xxx" />
        </Form.Group>
      </Form.Group>
      <div className="mt-1 mb-1 d-flex justify-content-end">
        <Button className="mt-3 mb-3" type="submit">
          新增
        </Button>
      </div>
    </Form>
  );
}

export default RoomAdd;
