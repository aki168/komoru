import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

function PartnershipEdit({ setEditShow, editData, data }) {
  /*20220624 YN
  修改資料初始化*/
  const [editModalData, setEditModalData] = useState({
    partnershipId: "",
    cityId: "",
    partnershipName: "",
    partnershipContactPerson: "",
    partnershipAddr: "",
    partnershipTel: "",
    employeeId: "1",
    partnershipDesc: "",
  });
  // const [editFormData, setEditFormData] = useState({
  //   partnershipId: "",
  //   cityId: "",
  //   partnershipName:  `${editModalData.partnershipName}`,
  //   partnershipContactPerson: "",
  //   partnershipAddr: "",
  //   partnershipTel: "",
  //   employeeId: "1",
  // });

  /*20220624 YN
   可否修改狀態初始化*/
  const [isDisabled, setIsDisabled] = useState(true);

  /*20220622 YN
   城市資料初始化*/
  const [cityData, setCityData] = useState([]);

  /*20220710 YN
  修改按鈕初始化 */
  const [editButton, setEditButton] = useState(false);

  /*20220710 YN
  當輸入框為""，出現警示狀態初始化 */
  const [alertImg, setAlertImg] = useState(false);

  /*20220624 YN
   可否修改狀態改變*/
  const disabledClickHandle = () => {
    setIsDisabled(!isDisabled);
    setEditButton(true);
  };

  /*20220624 YN
   取得後端檢視資料*/
  useEffect(() => {
    // console.log(editData)
    // let partnershipIdValue = { 'partnershipId': editData }
    fetch(
      "http://localhost:5000/partnership/getPartnershipDataByPartnershipId",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(editData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setEditModalData(data.dataList[0]);
        // console.log(data.dataList[0]);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [editData]);

  /*20220622 YN
   取得後端城市資料*/
  useEffect(() => {
    axios
      .post("http://localhost:5000/city/getCityDataList")
      .then((res) => {
        // console.log(res.data.dataList);
        setCityData(res.data.dataList);
      })
      .catch((err) => console.log(err));
  }, []);

  /*20220622 YN
   城市資料用map轉換成選單格式*/
  const cityArr = cityData.map((cityData, index) => {
    return (
      <option key={index} value={cityData.cityId} selected={(editModalData.cityId === cityData.cityId) ? true : ""}>
        {cityData.cityName}
      </option>
    );
  });
  /*20220622 YN
   取得輸入修改表單資料*/
  const editFormChangeHandle = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newEditFormData = { ...editModalData };
    newEditFormData[fieldName] = fieldValue;

    setEditModalData(newEditFormData);
    console.log(newEditFormData);
  };
  /*20220624 YN
  送出修改表單資料*/
  const editFormSubmitHandle = (event) => {
    event.preventDefault();
    const newContact = {
      cityId: editModalData.cityId,
      partnershipContactPerson: editModalData.partnershipContactPerson,
      partnershipName: editModalData.partnershipName,
      partnershipAddr: editModalData.partnershipAddr,
      partnershipTel: editModalData.partnershipTel,
      partnershipId: editModalData.partnershipId,
      employeeId: 1,
      partnershipDesc: editModalData.partnershipDesc,
    };
    const newContacts = newContact;
    // console.log(newContacts);
    // setEditFormData(newContacts);
    fetch(
      "http://localhost:5000/partnership/updatePartnershipByPartnershipId",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(newContacts),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          window.location.reload(false);
          setEditShow(false);
          alert("修改成功");
        } else {
          console.log(data);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  /*20220709 YN
  排除當modal開啟時，scrollbar 消失 sidebar 往右移 */
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => (document.body.style.overflowY = "");
  }, []);


  console.log(cityArr)
  return (
    <Form className="container" onSubmit={editFormSubmitHandle} style={{ fontSize: '18px' }}>
      <Form.Group>
        <Form.Label>商家名稱</Form.Label>
        <Form.Control
          type="text"
          name="partnershipName"
          // required="required"
          defaultValue={editModalData.partnershipName}
          onChange={editFormChangeHandle}
          disabled={isDisabled}
          style={{ fontSize: '18px' }}
        ></Form.Control>
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label >負責人</Form.Label>
        <Form.Control
          type="text"
          name="partnershipContactPerson"
          // required="required"
          defaultValue={editModalData.partnershipContactPerson}
          onChange={editFormChangeHandle}
          disabled={isDisabled}
          style={{ fontSize: '18px' }}
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label>區域</Form.Label>
        <Form.Select
          name="cityId"
          onChange={editFormChangeHandle}
          disabled={isDisabled}
          style={{ fontSize: '18px'}}
        >
          <option disabled>
            請選擇區域
          </option>
          {cityArr}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label>地址</Form.Label>
        <Form.Control
          type="text"
          name="partnershipAddr"
          // required="required"
          defaultValue={editModalData.partnershipAddr}
          onChange={editFormChangeHandle}
          disabled={isDisabled}
          style={{ fontSize: '18px' }}
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label>聯絡電話</Form.Label>
        <Form.Control
          type="text"
          name="partnershipTel"
          // required="required"
          defaultValue={editModalData.partnershipTel}
          onChange={editFormChangeHandle}
          disabled={isDisabled}
          style={{ fontSize: '18px' }}
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label>備註</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          disabled={isDisabled}
          defaultValue={editModalData.partnershipDesc}
          onChange={editFormChangeHandle}
          name="partnershipDesc"
          style={{ fontSize: '18px' }}
        />
      </Form.Group>
      <div className="mt-3 mb-3 d-flex justify-content-end">
        {editButton ? (
          <></>
        ) : (
          <button
            className="btn me-1"
            onClick={disabledClickHandle}
            style={{
              backgroundColor: '#ED8C4E',
              color: 'white',
              fontSize: "20px",
            }}
          >
            修改
          </button>
        )}

        {editButton ? (
          <button
            className="btn me-1"
            type="submit"
            style={{
              backgroundColor: "#7BA23F",
              color: "white",
              fontSize: "20px",
            }}
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

export default PartnershipEdit;
