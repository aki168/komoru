import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

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
    console.log(newFormData);
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
    <Form className="container" onSubmit={addFormSubmitHandle}>
      <Form.Group>
        <Form.Label>商家名稱</Form.Label>
        <Form.Control
          type="text"
          name="partnershipName"
          required="required"
          placeholder="新村站著吃燒肉"
          onChange={addFormChangeHandle}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>負責人</Form.Label>
        <Form.Control
          type="text"
          name="partnershipContactPerson"
          required="required"
          placeholder="王小明"
          onChange={addFormChangeHandle}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>區域</Form.Label>
        <Form.Select name="cityId" onChange={addFormChangeHandle}>
          <option defaultValue>請選擇區域</option>
          {cityArr}
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>地址</Form.Label>
        <Form.Control
          type="text"
          name="partnershipAddr"
          required="required"
          placeholder="台中市西區英才路123號"
          onChange={addFormChangeHandle}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>聯絡電話</Form.Label>
        <Form.Control
          type="text"
          name="partnershipTel"
          required="required"
          placeholder="0912345678"
          onChange={addFormChangeHandle}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>備註</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="xxx" />
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
