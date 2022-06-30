import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { BsFillArrowUpSquareFill } from "react-icons/bs";

function HotelAdd({ setAddShow, data }) {
  /*20220622 YN
     飯店資料初始化*/
  const [hotelData, setHotelData] = useState([]);

  /*20220622 YN
     新增表單資料初始化*/
  const [addFormData, setAddFormData] = useState({
    employeeId: "1",
    hotelTitle: "",
    hotelAddr: "",
    hotelTel: "",
    hotelDesc: "",
  });

  /*20220625 YN
     預覽照片狀態初始化*/
  const [primaryImgPreview, setPrimaryImgPreview] = useState(null);
  const [firstImgPreview, setFirstImgPreview] = useState(null);
  const [secondImgPreview, setSecondImgPreview] = useState(null);
  const [thirdImgPreview, setThirdImgPreview] = useState(null);

  /*20220625 YN
     照片不符合規格錯誤狀態初始化*/
  const [primaryError, setPrimaryError] = useState(false);
  const [firstError, setFirstError] = useState(false);
  const [secondError, setSecondError] = useState(false);
  const [thirdError, setThirdError] = useState(false);

  /*20220630 YN
     選擇照片狀態初始化*/
  const [selectedPrimaryFile, setSelectedPrimaryFile] = useState(null);
  const [selectedFirstaryFile, setSelectedFirstaryFile] = useState(null);
  const [selectedSecondFile, setSelectedSecondFile] = useState(null);
  const [selectedThirdFile, setSelectedThirdFile] = useState(null);

  /*20220622 YN
     取得後端飯店資料*/
  useEffect(() => {
    axios
      .post(
        "http://localhost:5000/hotel/getHotelDataListWithMainImgAndCityName"
      )
      .then((res) => {
        console.log(res.data.dataList);
        // setHotelData(res.data.dataList);
      })
      .catch((err) => console.log(err));
  }, []);

  // const hotelTitleArr = hotelData.map((hotelTitleData, index) => {
  //     return (
  //         <option key={index} value={hotelTitleData.hotelId}>
  //             {hotelTitleData.hotelTitle}
  //         </option>
  //     );
  // });
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
      employeeId: "1",
      hotelTitle: addFormData.hotelTitle,
      hotelAddr: addFormData.hotelAddr,
      hotelTel:addFormData.hotelTel,
      hotelDesc: addFormData.hotelDesc,
    };
    const formData = new FormData();
    // for (var index in newContact) {
    // }
    formData.append('hotelDataList', JSON.stringify(newContact));
    formData.append("primaryHotelImgFile", selectedPrimaryFile);
    formData.append("firstyHotelImgFile", selectedFirstaryFile);
    formData.append("secondHotelImgFile", selectedSecondFile);
    formData.append("thirdHotelImgFile", selectedThirdFile);

    console.log(...formData)

    // fetch("http://localhost:5000/room/addRoom", {
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
  const primaryImageChangeHandle = (e) => {
    setPrimaryError(false);
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setPrimaryImgPreview(reader.result);
        setSelectedPrimaryFile(selected);
        console.log(selected);
      };
      reader.readAsDataURL(selected);
    } else {
      setPrimaryError(true);
    }
  };
  const firstImageChangeHandle = (e) => {
    setFirstError(false);
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setFirstImgPreview(reader.result);
        setSelectedFirstaryFile(selected);
        console.log(selected);
      };
      reader.readAsDataURL(selected);
    } else {
      setFirstError(true);
    }
  };
  const secondImageChangeHandle = (e) => {
    setSecondError(false);
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setSecondImgPreview(reader.result);
        setSelectedSecondFile(selected);
        console.log(selected);
      };
      reader.readAsDataURL(selected);
    } else {
      setSecondError(true);
    }
  };
  const thirdImageChangeHandle = (e) => {
    setThirdError(false);
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setThirdImgPreview(reader.result);
        setSelectedThirdFile(selected);
        console.log(selected);
      };
      reader.readAsDataURL(selected);
    } else {
      setThirdError(true);
    }
  };

  return (
    <Form className="container row mt-3" onSubmit={addFormSubmitHandle}>
      <Form.Group className="col-6 d-flex ">
        <div className="container-fluid d-flex flex-column">
          <div
            className="col-12 h-75 justify-content-center d-flex flex-column align-items-center"
            style={{
              background: primaryImgPreview
                ? `url("${primaryImgPreview}") no-repeat center/cover`
                : "#d3d3d3",
            }}
          >
            {!primaryImgPreview && (
              <>
                <label className="btn text-white " htmlFor="primaryfileUpload">
                  <BsFillArrowUpSquareFill size="4em" />
                </label>
                <input
                  id="primaryfileUpload"
                  type="file"
                  style={{ display: "none" }}
                  onChange={primaryImageChangeHandle}
                />
                <p className="text-white">請選擇主要圖片</p>
              </>
            )}
            {primaryError && (
              <p className="text-center text-danger">不支援此檔案</p>
            )}
            <div>
              {primaryImgPreview && (
                <button onClick={() => setPrimaryImgPreview(null)}>
                  更換照片
                </button>
              )}
            </div>
          </div>
          <div className="mt-2 col-md-12 d-flex h-25 container-fuield">
            <div
              className="me-1 col-md-4 d-flex flex-column justify-content-center align-items-center"
              style={{
                background: firstImgPreview
                  ? `url("${firstImgPreview}") no-repeat center/cover`
                  : "#d3d3d3",
              }}
            >
              {!firstImgPreview && (
                <>
                  <label className="btn text-white " htmlFor="firstFileUpload">
                    <BsFillArrowUpSquareFill size="2em" />
                  </label>
                  <input
                    id="firstFileUpload"
                    type="file"
                    style={{ display: "none" }}
                    onChange={firstImageChangeHandle}
                  />
                </>
              )}
              {firstError && (
                <p className="text-center text-danger">不支援此檔案</p>
              )}
              <div>
                {firstImgPreview && (
                  <button onClick={() => setFirstImgPreview(null)}>
                    更換照片
                  </button>
                )}
              </div>
            </div>

            <div
              className="col-md-4 d-flex flex-column justify-content-center align-items-center"
              style={{
                background: secondImgPreview
                  ? `url("${secondImgPreview}") no-repeat center/cover`
                  : "#d3d3d3",
              }}
            >
              {!secondImgPreview && (
                <>
                  <label className="btn text-white " htmlFor="secondfileUpload">
                    <BsFillArrowUpSquareFill size="2em" />
                  </label>
                  <input
                    id="secondfileUpload"
                    type="file"
                    style={{ display: "none" }}
                    onChange={secondImageChangeHandle}
                  />
                </>
              )}
              {secondError && (
                <p className="text-center text-danger">不支援此檔案</p>
              )}
              <div>
                {secondImgPreview && (
                  <button onClick={() => setSecondImgPreview(null)}>
                    更換照片
                  </button>
                )}
              </div>
            </div>
            <div
              className="ms-1 col-md-4 d-flex flex-column justify-content-center align-items-center"
              style={{
                background: thirdImgPreview
                  ? `url("${thirdImgPreview}") no-repeat center/cover`
                  : "#d3d3d3",
              }}
            >
              {!thirdImgPreview && (
                <>
                  <label className="btn text-white " htmlFor="fileUpload">
                    <BsFillArrowUpSquareFill size="2em" />
                  </label>
                  <input
                    id="fileUpload"
                    type="file"
                    style={{ display: "none" }}
                    onChange={thirdImageChangeHandle}
                  />
                </>
              )}
              {thirdError && (
                <p className="text-center text-danger">不支援此檔案</p>
              )}
              <div>
                {thirdImgPreview && (
                  <button onClick={() => setThirdImgPreview(null)}>
                    更換照片
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Form.Group>
      <Form.Group className="col-6">
        <Form.Group>
          <Form.Label>飯店名稱</Form.Label>
          <Form.Control
            type="text"
            name="hotelTitle"
            required="required"
            placeholder="請輸入飯店名稱"
            onChange={addFormChangeHandle}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>地址</Form.Label>
          <Form.Control
            type="text"
            name="hotelAddr"
            required="required"
            placeholder="請輸入飯店地址"
            onChange={addFormChangeHandle}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>聯絡電話</Form.Label>
          <Form.Control
            type="text"
            name="hotelTel"
            required="required"
            placeholder="請輸入聯絡電話"
            onChange={addFormChangeHandle}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>備註</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="xxx"
            name="hotelDesc"
            onChange={addFormChangeHandle}
          />
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

export default HotelAdd;
