import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { BsFillArrowUpSquareFill } from "react-icons/bs";

function RoomViewEdits({ setEditShow, editData, data, hotelData }) {
  /*20220622 YN
   飯店資料初始化*/
  // const [hotelData, setHotelData] = useState([]);

  /*20220624 YN
  修改資料初始化*/
  const [editModalData, setEditModalData] = useState({
    hotelId: "",
    liveNum: "",
    roomDesc: "",
    roomId: "",
    roomType: "",
    employeeId: "1",
    roomImgPath: "",
  });

  /*20220622 YN
   新增表單資料初始化*/
  // const [addFormData, setAddFormData] = useState({
  //   employeeId: "1",
  //   cityId: "",
  // });

  /*20220625 YN
   預覽照片狀態初始化*/
  const [imgPreview, setImgPreview] = useState(null);
  /*20220625 YN
   照片不符合規格錯誤狀態初始化*/
  const [error, setError] = useState(false);

  /*20220630 YN
     選擇照片狀態初始化*/
  const [selectedFile, setSelectedFile] = useState(null);
  /*20220701 YN
    修改圖片狀態初始化*/
  const [editImage, setEditImage] = useState(false);

  /*20220624 YN
   可否修改狀態初始化*/
  const [isDisabled, setIsDisabled] = useState(true);

  // console.log(editImage);
  /*20220701 YN
     取得後端預設房型資料*/
  useEffect(() => {
    fetch("http://localhost:5000/room/getRoomDataWithImgByRoomId", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(editData),
    })
      .then((response) => response.json())
      .then((data) => {
        setEditModalData(data.dataList[0]);
        console.log(data.dataList[0]);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [editData]);

  /*20220622 YN
   取得輸入新增表單資料*/
  const editFormChangeHandle = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editModalData };
    newFormData[fieldName] = fieldValue;

    setEditModalData(newFormData);
    console.log(newFormData);
  };
  /*20220622 YN
   送出時取得輸入新增表單資料，並傳到後端重整畫面*/
  const editFormSubmitHandle = (event) => {
    event.preventDefault();

    // 20220703 YN 沒更換照片傳的變數
    const newContact = {
      hotelId: editModalData.hotelId,
      roomType: editModalData.roomType,
      liveNum: editModalData.liveNum,
      roomDesc: editModalData.roomDesc,
      employeeId: 1,
      roomImgPath: editModalData.roomImgPath,
      roomId: editModalData.roomId,
    };

    // 20220703 YN 有更換照片傳的變數
    // const editContact = {
    //   hotelId: editModalData.hotelId,
    //   roomType: editModalData.roomType,
    //   liveNum: editModalData.liveNum,
    //   roomDesc: editModalData.roomDesc,
    //   employeeId: 1,
    //   roomImgPath: "",
    //   roomId: editModalData.roomId,
    // };

    // console.log(newContact)

    if (editImage === true) {
      const formData = new FormData();
      formData.append("roomDataList", JSON.stringify(newContact));
      formData.append("roomImgFile", selectedFile);
      console.log(...formData);
      fetch("http://localhost:5000/room/updateRoomByRoomId", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status) {
            setEditShow(false);
            window.location.reload(false);
          }
          console.log(data);
        })
        .catch((e) => {
          console.error(e);
        });
        
    } else {
      const formData = new FormData();
      formData.append("roomDataList", JSON.stringify(newContact));
      formData.append("roomImgFile", {});
      console.log(...formData);
      fetch("http://localhost:5000/room/updateRoomByRoomId", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status) {
            setEditShow(false);
            window.location.reload(false);
          }
          console.log(data);
        })
        .catch((e) => {
          console.error(e);
        });
    }
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
        console.log(selected);
      };
      reader.readAsDataURL(selected);
    } else {
      setError(true);
    }
  };

  /*20220701 YN
  修改狀態改變*/
  const disabledClickHandle = () => {
    setEditImage(true);
    setIsDisabled(!isDisabled);
  };
  // /*20220701 YN
  //   取得後端飯店資料*/
  // useEffect(() => {
  //   axios
  //     .post(
  //       "http://localhost:5000/hotel/getHotelDataListWithMainImgAndCityName"
  //     )
  //     .then((res) => {
  //       // console.log(res.data);
  //       setHotelData(res.data.dataList);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  /*20220701 YN
   飯店資料使用map作下拉選項*/
  const hotelArr = hotelData.map((hotelData, index) => {
    return (
      <option key={index} value={hotelData.hotelId}>
        {hotelData.hotelTitle}
      </option>
    );
  });

  return (
    <Form className="container row mt-3" onSubmit={editFormSubmitHandle}>
      {!editImage && (
        <Form.Group
          className="col-6 d-flex justify-content-center align-items-center "
          style={{
            background: `url("http://localhost:5000${editData.roomImgPath}") no-repeat center/cover`,
          }}
        ></Form.Group>
      )}
      {editImage && (
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
      )}
      <Form.Group className="col-6">
        <Form.Group>
          <Form.Label>飯店名稱</Form.Label>
          <Form.Select
            name="hotelId"
            onChange={editFormChangeHandle}
            disabled={isDisabled}
          >
            <option defaultValue={editData.hotelId}>
              {editData.hotelTitle}
            </option>
            {hotelArr}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>房型選擇</Form.Label>
          <Form.Select
            name="roomType"
            onChange={editFormChangeHandle}
            disabled={isDisabled}
          >
            <option defaultValue={editModalData.roomType}>
              {editData.roomType}
            </option>
            <option value="1">單人房</option>
            <option value="0">背包客</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>容納人數</Form.Label>
          <Form.Control
            type="text"
            name="liveNum"
            required="required"
            defaultValue={editModalData.liveNum}
            onChange={editFormChangeHandle}
            disabled={isDisabled}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>備註</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="xxx"
            defaultValue={editModalData.roomDesc}
            onChange={editFormChangeHandle}
            name="roomDesc"
            disabled={isDisabled}
          />
        </Form.Group>
      </Form.Group>
      <div className="mt-1 mb-1 d-flex justify-content-end">
        <Button className="mt-3 mb-3 me-1" onClick={disabledClickHandle}>
          修改
        </Button>
        <Button className="mt-3 mb-3" type="submit">
          儲存
        </Button>
      </div>
    </Form>
  );
}

export default RoomViewEdits;
