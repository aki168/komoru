import React, { useState } from "react";
import { nanoid } from "nanoid";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

function PartnershipAdd({ data, setAddShow }) {
  const [addFormData, setAddFormData] = useState({
    partnershipName: "",
    cityName: "",
    partnershipAddr: "",
    partnershipTel: "",
  });

  const addFormChangeHandle = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    console.log(newFormData);

    setAddFormData(newFormData);
  };

  const addFormSubmitHandle = (event) => {
    event.preventDefault();
    const newContact = {
      id: nanoid(),
      partnershipName: addFormData.partnershipName,
      cityName: addFormData.cityName,
      partnershipAddr: addFormData.partnershipAddr,
      partnershipTel: addFormData.partnershipTel,
    };
    const newContacts = newContact;
    setAddFormData(newContacts);
    // console.log(newContacts);
    fetch("http://localhost:5000/partnership/addPartnership", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(newContacts),
    })
      .then(response => response.json()) // 取出 JSON 資料，並還原成 Object。response.json()　一樣回傳 Promise 物件
      .then(data => {
        console.log(data);
      })
      .catch(e => {
        console.error(e);
      });
  

    // data.push(newContacts);
    // setAddShow(false)
  };

  //   const addFormSubmitHandle = async(data) => {
  //     const request = {
  //       id: nanoid(),
  //       ...addFormData,
  //     };
  //     const response= await fetch("http://localhost:5000/partnership/addPartnership",{method: "POST",});
  //     setAddFormData([...addFormData,response.data]);
  //     console.log(data);
  //     // data.push(newContacts);
  //     // setAddShow(false)
  //   };

  return (
    <Form className="container" onSubmit={addFormSubmitHandle}>
      <Form.Group>
        夥伴名稱
        <Form.Control
          type="text"
          name="partnershipName"
          required="required"
          placeholder="partnershipName"
          onChange={addFormChangeHandle}
        />
      </Form.Group>
      <Form.Group>
        區域
        <Form.Control
          type="text"
          name="cityName"
          required="required"
          placeholder="cityName"
          onChange={addFormChangeHandle}
        />
      </Form.Group>
      <Form.Group>
        地址
        <Form.Control
          type="text"
          name="partnershipAddr"
          required="required"
          placeholder="partnershipAddr"
          onChange={addFormChangeHandle}
        />
      </Form.Group>
      <Form.Group>
        聯絡電話
        <Form.Control
          type="text"
          name="partnershipTel"
          required="required"
          placeholder="partnershipTel"
          onChange={addFormChangeHandle}
        />
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
