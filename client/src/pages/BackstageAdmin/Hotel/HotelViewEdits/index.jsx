import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { BsFillArrowUpSquareFill } from "react-icons/bs";

function HotelViewEdits({ setEditShow, editData, data }) {
  /*20220624 YN
  修改資料初始化*/
  const [editModalData, setEditModalData] = useState({
    hotelTitle: "",
    cityId: "",
    hotelAddr: "",
    hotelTel: "",
    hotelDesc: "",
    hotelContent: "",
    employeeId: "1",
    roomImgPath: "",
  });

  /*20220624 YN
  修改照片資料初始化*/
  const [mainImageData, setMainImageData] = useState();
  const [firstImageData, setFirstImageData] = useState();
  const [secondImageData, setSecondImageData] = useState();
  const [thirdImageData, setThirdImageData] = useState();

  /*20220622 YN
   新增表單資料初始化*/
  // const [addFormData, setAddFormData] = useState({
  //   employeeId: "1",
  //   hotelTitle: "",
  //   hotelAddr: "",
  //   hotelTel: "",
  //   hotelDesc: "",
  // });

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

  /*20220624 YN
   可否修改狀態初始化*/
  const [isDisabled, setIsDisabled] = useState(true);

  /*20220703 YN
  縣市狀態初始化*/
  // const [cityData, setCityData] = useState();

  /*20220701 YN
    修改圖片狀態初始化*/
  const [editImage, setEditImage] = useState(false);

  /*20220710 YN
  修改按鈕初始化 */
  const [editButton, setEditButton] = useState(false);

  /*20220701 YN
     取得後端預設飯店資料*/
  useEffect(() => {
    // let hotelIdValue = { "hotelId": editData.hotelId}
    // console.log(editData)
    fetch("http://localhost:5000/hotel/getHotelDataWithImgByHotelId", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(editData),
    })
      .then((response) => response.json())
      .then((data) => {
        setEditModalData(data.dataList.hotelData[0]);
        //20220703 判斷主圖
        let mainResult = data.dataList.hotelImgDataList;
        let mainArr = mainResult.filter((result) => {
          return result.hotelImgIsMain === "0";
        });
        //20220703 判斷副圖
        let otherResult = data.dataList.hotelImgDataList;
        let otherArr = otherResult.filter((result) => {
          return result.hotelImgIsMain === "1";
        });

        setMainImageData(mainArr[0].hotelImgPath);
        setFirstImageData(
          typeof otherArr[0].hotelImgPath === "undefined"
            ? ""
            : otherArr[0].hotelImgPath
        );
        setSecondImageData(
          typeof otherArr[1].hotelImgPath === "undefined"
            ? ""
            : otherArr[1].hotelImgPath
        );
        setThirdImageData(
          typeof otherArr[2].hotelImgPath === "undefined"
            ? ""
            : otherArr[2].hotelImgPath
        );
        // console.log(data.dataList.hotelImgDataList);
        // console.log(data.dataList.hotelImgDataList[0].hotelImgPath);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  // console.log(editData)
  /*20220701 YN
     取得後端預設飯店資料*/
  // useEffect(() => {
  //   axios
  //     .post("http://localhost:5000/city/getCityDataList")
  //     .then((res) => {
  //       console.log(res.data.dataList);
  //       setCityData(res.data.dataList);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  // console.log(cityData);
  // /*20220701 YN
  //  飯店資料使用map作下拉選項*/
  // const cityArr = cityData.map((cityData, index) => {
  //   return console.log(cityData);
  // });

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
    const newContact = {
      hotelId: editModalData.hotelId,
      hotelTitle: editModalData.hotelTitle,
      cityId: editModalData.cityId,
      hotelAddr: editModalData.hotelAddr,
      hotelTel: editModalData.hotelTel,
      hotelDesc: editModalData.hotelDesc,
      hotelContent: editModalData.hotelContent,
      employeeId: "1",
      hotelImgPath: {
        mainHotelImgFile: mainImageData,
        firstHotelImgFile:
          typeof firstImageData === "undefined" ? "" : firstImageData,
        secondHotelImgFile:
          typeof secondImageData === "undefined" ? "" : secondImageData,
        thirdHotelImgFile:
          typeof thirdImageData === "undefined" ? "" : thirdImageData,
      },
    };
    // 20220703 YN 有更換照片傳的變數
    // const editContact = {
    //   hotelTitle: editModalData.hotelTitle,
    //   cityId: editModalData.cityId,
    //   hotelAddr: editModalData.hotelAddr,
    //   hotelTel: editModalData.hotelTel,
    //   hotelDesc: editModalData.hotelDesc,
    //   hotelContent: editModalData.hotelContent,
    //   employeeId: "1",
    //   hotelImgPath: "",
    // };
    console.log(newContact);
    // setAddFormData(newContacts);

    if (editImage === true) {
      const formData = new FormData();
      formData.append("hotelDataList", JSON.stringify(newContact));
      formData.append("mainHotelImgFile", selectedPrimaryFile);
      formData.append("firstHotelImgFile", selectedFirstaryFile);
      formData.append("secondHotelImgFile", selectedSecondFile);
      formData.append("thirdHotelImgFile", selectedThirdFile);
      if (selectedPrimaryFile === null) {
        alert("請選擇主要照片");
      }
      console.log(...formData);
      fetch("http://localhost:5000/hotel/updateHotelByHotelId", {
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
      formData.append("hotelDataList", JSON.stringify(newContact));
      formData.append("hotelImgFile", []);
      console.log(...formData);
      fetch("http://localhost:5000/hotel/updateHotelByHotelId", {
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

  /*20220701 YN
  修改狀態改變*/
  const disabledClickHandle = () => {
    setEditImage(true);
    setIsDisabled(!isDisabled);
    setEditButton(true);
  };

  /*20220709 YN
  排除當modal開啟時，scrollbar 消失 sidebar 往右移 */
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => (document.body.style.overflowY = "");
  }, []);

  return (
    <Form className="row me-5 ms-5 mb-3 mt-3" onSubmit={editFormSubmitHandle}>
      {!editImage && (
        <Form.Group className="col-6 d-flex ">
          <div className="container-fluid d-flex flex-column">
            <div
              className="col-12 h-75 justify-content-center d-flex flex-column align-items-center"
              style={{
                background: `url("http://localhost:5000${mainImageData}") no-repeat center/cover`,
              }}
            ></div>
            <div className="mt-2 col-md-12 d-flex h-25 container-fuield">
              <div
                className="me-1 col-md-4 d-flex flex-column justify-content-center align-items-center"
                style={{
                  background: `url("http://localhost:5000${firstImageData}") no-repeat center/cover`,
                }}
              ></div>
              <div
                className="col-md-4 d-flex flex-column justify-content-center align-items-center"
                style={{
                  background: `url("http://localhost:5000${secondImageData}") no-repeat center/cover`,
                }}
              ></div>
              <div
                className="ms-1 col-md-4 d-flex flex-column justify-content-center align-items-center"
                style={{
                  background: `url("http://localhost:5000${thirdImageData}") no-repeat center/cover`,
                }}
              ></div>
            </div>
          </div>
        </Form.Group>
      )}

      {editImage && (
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
                  <label
                    className="btn text-white "
                    htmlFor="primaryfileUpload"
                  >
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
                    <label
                      className="btn text-white "
                      htmlFor="firstFileUpload"
                    >
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
                    <label
                      className="btn text-white "
                      htmlFor="secondfileUpload"
                    >
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
      )}

      <Form.Group className="col-6">
        <Form.Group>
          <Form.Control
            className="km-modal-content"
            type="text"
            name="hotelTitle"
            // required="required"
            defaultValue={editModalData.hotelTitle}
            onChange={editFormChangeHandle}
            disabled={isDisabled}
          />
        </Form.Group>
        <Form.Group>
          <Form.Select
            name="cityId"
            disabled={isDisabled}
            onChange={editFormChangeHandle}
            className="km-modal-content mt-3"
          >
            <option defaultValue={editModalData.cityId}>
              {editData.cityName}
            </option>
            <option Value="1">台北市</option>
            <option Value="2">台中市</option>
            <option Value="3">台南市</option>
            <option Value="4">台東市</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Control
           className="km-modal-content mt-3"
            type="text"
            name="hotelAddr"
            // required="required"
            defaultValue={editModalData.hotelAddr}
            onChange={editFormChangeHandle}
            disabled={isDisabled}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            name="hotelTel"
            // required="required"
            className="km-modal-content mt-3"
            defaultValue={editModalData.hotelTel}
            onChange={editFormChangeHandle}
            disabled={isDisabled}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
           className="km-modal-content mt-3"
            type="text"
            name="hotelDesc"
            // required="required"
            placeholder="備註"
            defaultValue={editModalData.hotelDesc}
            onChange={editFormChangeHandle}
            disabled={isDisabled}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
           className="km-modal-content mt-3"
            as="textarea"
            rows={3}
            defaultValue={editModalData.hotelContent}
            name="hotelContent"
            onChange={editFormChangeHandle}
            disabled={isDisabled}
          />
        </Form.Group>
      </Form.Group>
      <div className="mt-3 mb-3 d-flex justify-content-end">

        {editButton ? (
          <></>
        ) : (
          <button
            className="btn me-1 km-edit-button-modal km-modal-footer"
            onClick={disabledClickHandle}
          >
            修改
          </button>
        )}
        {editButton ? (
          <a
            className="btn me-2 km-img-button-modal km-modal-footer"
            onClick={() => setEditImage(true)}
          >
            更換照片
          </a>
        ) : (
          <></>
        )}

        {editButton ? (
          <button
            className="btn me-1 km-img-button-modal km-modal-footer"
            type="submit"
          >
            儲存
          </button>
        ) : (
          <></>
        )}
      </div>
    </Form>
  );
}

export default HotelViewEdits;
