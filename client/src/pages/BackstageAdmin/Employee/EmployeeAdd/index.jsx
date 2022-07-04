import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

function EmployeeAdd({setAddShow }) {
  /*20220622 YN
   新增表單資料初始化*/
  const [addFormData, setAddFormData] = useState({
    employeeAccount: "",
    employeePasswd: "",
    employeeName: "",
    employeePhone: "",
    operatorEmployeeId: "1",
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
      employeeAccount: addFormData.employeeAccount,
      employeePasswd: addFormData.employeePasswd,
      employeeName: addFormData.employeeName,
      employeePhone: addFormData.employeePhone,
      operatorEmployeeId:"1",
    };

    // console.log(newContact)
    // setAddFormData(newContacts);
    fetch("http://localhost:5000/employee/addEmployee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(newContact),
    })
      .then((response) => response.json()) // 取出 JSON 資料，並還原成 Object。response.json()　一樣回傳 Promise 物件
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.error(e);
      });
    setAddShow(false);
    window.location.reload(false);
  };

  return (
    <Form className="container" onSubmit={addFormSubmitHandle}>
      <Form.Group>
        <Form.Label>員工帳號</Form.Label>
        <Form.Control
          type="text"
          name="employeeAccount"
          required="required"
          placeholder="account"
          onChange={addFormChangeHandle}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>員工密碼</Form.Label>
        <Form.Control
          type="text"
          name="employeePasswd"
          required="required"
          placeholder="password"
          onChange={addFormChangeHandle}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>員工姓名</Form.Label>
        <Form.Control
          type="text"
          name="employeeName"
          required="required"
          placeholder="王小明"
          onChange={addFormChangeHandle}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>員工電話</Form.Label>
        <Form.Control
          type="text"
          name="employeePhone"
          required="required"
          placeholder="0912-456-789"
          onChange={addFormChangeHandle}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>員工負責人</Form.Label>
        <Form.Control
          type="text"
          name="operatorEmployeeId"
          required="required"
          placeholder="1"
          defaultValue="1"
          disabled
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

export default EmployeeAdd;
