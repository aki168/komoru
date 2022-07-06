import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import "./PartnershipAdd.css"

function PartnershipAdd({ data, setAddShow }) {
  /*20220622 YN
   城市資料初始化*/
  const [cityData, setCityData] = useState([]);
  /*20220622 YN
   新增表單資料初始化*/
  const [addFormData, setAddFormData] = useState({
    partnershipContactPerson: "",
    partnershipName: "",
    partnershipAddr: "",
    partnershipTel: "",
    employeeId: "1",
    cityId: "",
    partnershipDesc: "",
  });
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
   將城市資料使用map作下拉選項*/
  const cityArr = cityData.map((cityData, index) => {
    return (
      <option key={index} value={cityData.cityId}>
        {cityData.cityName}
      </option>
    );
  });
  /*20220622 YN
   取得輸入新增表單資料*/
  const addFormChangeHandle = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
    // console.log(newFormData);
  };
  /*20220622 YN
   送出時取得輸入新增表單資料，並傳到後端重整畫面*/
  const addFormSubmitHandle = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      partnershipContactPerson: addFormData.partnershipContactPerson,
      partnershipName: addFormData.partnershipName,
      cityId: addFormData.cityId,
      partnershipAddr: addFormData.partnershipAddr,
      partnershipTel: addFormData.partnershipTel,
      employeeId: 1,
      partnershipDesc: addFormData.partnershipDesc,
    };

    const newContacts = newContact;

    setAddFormData(newContacts);
    fetch("http://localhost:5000/partnership/addPartnership", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(newContacts),
    })
      .then((response) => response.json()) // 取出 JSON 資料，並還原成 Object。response.json()　一樣回傳 Promise 物件
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.error(e);
      });
    // data.push(newContacts);
    setAddShow(false);
    window.location.reload(false);
  };

  return (
    <Form className="me-5 ms-5 mt-3 mb-3 " onSubmit={addFormSubmitHandle}>

      <Form.Group className="mb-2">
        <Form.Control
          type="text"
          name="partnershipName"
          required="required"
          placeholder="請輸入商家名稱"
          onChange={addFormChangeHandle}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Control
          type="text"
          name="partnershipContactPerson"
          required="required"
          placeholder="請輸入負責人"
          onChange={addFormChangeHandle}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Select name="cityId" onChange={addFormChangeHandle}>
          <option selected >請選擇區域</option>
          {cityArr}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Control
          type="text"
          name="partnershipAddr"
          required="required"
          placeholder="請輸入地址"
          onChange={addFormChangeHandle}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Control
          type="text"
          name="partnershipTel"
          required="required"
          placeholder="請輸入聯絡電話"
          onChange={addFormChangeHandle}
          // oninput="value=value.replace(/[^0-9]/g,'')"
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Control as="textarea" rows={3} placeholder="請輸入備註" name="partnershipDesc" onChange={addFormChangeHandle} />
      </Form.Group>
      <div className="mt-1 mb-1 d-flex justify-content-end">
        <Button className="me-1" type="submit">
          新增
        </Button>
      </div>
    </Form>
  );
}

export default PartnershipAdd;
