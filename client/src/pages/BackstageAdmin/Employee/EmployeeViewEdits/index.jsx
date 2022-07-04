import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

function EmployeeViewEdits({ setEditShow, editData }) {
  /*20220624 YN
  修改資料初始化*/
  const [editModalData, setEditModalData] = useState({
    employeeId: "",
    employeeAccount: "",
    employeePasswd: "",
    employeeName: "",
    employeePhone: "",
    operatorEmployeeId: "1",
  });

  /*20220624 YN
   可否修改狀態初始化*/
  const [isDisabled, setIsDisabled] = useState(true);

  /*20220624 YN
   可否顯示密碼狀態初始化*/
  const [shown, setShown] = useState(false);

  /*20220624 YN
   可否修改狀態改變*/
  const disabledClickHandle = () => {
    setIsDisabled(!isDisabled);
    setShown(true);
  };

  /*20220624 YN
   取得後端檢視資料*/
  useEffect(() => {
    // console.log(editData)
    // let partnershipIdValue = { 'partnershipId': editData }
    fetch("http://localhost:5000/employee/getEmployeeDataByEmployeeId", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(editData),
    })
      .then((response) => response.json()) // 取出 JSON 資料，並還原成 Object。response.json()　一樣回傳 Promise 物件
      .then((data) => {
        setEditModalData(data.dataList[0]);
        console.log(data.dataList[0]);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [editData]);

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
      employeeId: editModalData.employeeId,
      employeeAccount: editModalData.employeeAccount,
      employeePasswd: editModalData.employeePasswd,
      employeeName: editModalData.employeeName,
      employeePhone: editModalData.employeePhone,
      operatorEmployeeId: "1",
    };
    console.log(newContact);
    // setEditFormData(newContacts);
    fetch(
      "http://localhost:5000/employee/updateEmployeeByEmployeeId",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(newContact),
      }
    )
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
  };

  return (
    <Form className="container" onSubmit={editFormSubmitHandle}>
      <Form.Group>
        <Form.Label>員工帳號</Form.Label>
        <Form.Control
          type="text"
          name="employeeAccount"
          // required="required"
          placeholder="account"
          defaultValue={editModalData.employeeAccount}
          onChange={editFormChangeHandle}
          disabled={isDisabled}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>員工密碼</Form.Label>
        <Form.Control
          type="text"
          name="employeePasswd"
          // required="required"
          placeholder="password"
          Value={shown ? "" : "******"}
          onChange={editFormChangeHandle}
          disabled={isDisabled}
        />
        {/* <button className="btn" onClick={()=>setShown(!shown)}>顯示密碼</button> */}
      </Form.Group>
      <Form.Group>
        <Form.Label>員工姓名</Form.Label>
        <Form.Control
          type="text"
          name="employeeName"
          // required="required"
          defaultValue={editModalData.employeeName}
          placeholder="王小明"
          onChange={editFormChangeHandle}
          disabled={isDisabled}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>員工電話</Form.Label>
        <Form.Control
          type="text"
          name="employeePhone"
          // required="required"
          placeholder="0912-456-789"
          defaultValue={editModalData.employeePhone}
          onChange={editFormChangeHandle}
          disabled={isDisabled}
        />
      </Form.Group>
      <div className="mt-1 mb-1 d-flex justify-content-end">
        <Button className="me-1" onClick={disabledClickHandle}>
          修改
        </Button>
        <Button className="me-1" type="submit">
          儲存
        </Button>
      </div>
    </Form>
  );
}

export default EmployeeViewEdits;
