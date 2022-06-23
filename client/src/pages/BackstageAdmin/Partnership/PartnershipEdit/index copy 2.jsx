import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

function PartnershipEdit({ data, setEditShow, editData }) {
  //   const [formDOM, setFormDOM] = useState(null);
  const [editFormData, setEditFormData] = useState({
    partnershipId: `${editData.partnershipId}`,
    cityId: "",
    partnershipName: `${editData.partnershipName}`,
    partnershipContactPerson: `${editData.partnershipContactPerson}`,
    partnershipAddr: `${editData.partnershipAddr}`,
    partnershipTel: `${editData.partnershipTel}`,
    employeeId: "1",
  });
  /*20220622 YN
   城市資料初始化*/
  const [cityData, setCityData] = useState([]);
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

  const cityArr = cityData.map((cityData, index) => {
    return (
      <option key={index} value={cityData.cityId}>
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

    const newEditFormData = { ...editFormData };
    newEditFormData[fieldName] = fieldValue;

    setEditFormData(newEditFormData);
    console.log(newEditFormData);
  };

  /*20220622 YN
   送出時取得輸入新增表單資料，並傳到後端重整畫面*/
  //

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
  //     setAddShow(false);
  //     window.location.reload(false);
  //   };

  // const addFormSubmitHandle = async(data) => {
  //   const request = {
  //     id: nanoid(),
  //     ...addFormData,
  //   };
  //   const response= await fetch("http://localhost:5000/partnership/addPartnership",{method: "POST",});
  //   setAddFormData([...addFormData,response.data]);
  //   console.log(data);
  //   // data.push(newContacts);
  //   // setAddShow(false)
  // };



  const editFormSubmitHandle = (event) => {
    event.preventDefault();

    const newContact = {
      cityId: editFormData.cityId,
      partnershipContactPerson: editFormData.partnershipContactPerson,
      partnershipName: editFormData.partnershipName,
      partnershipAddr: editFormData.partnershipAddr,
      partnershipTel: editFormData.partnershipTel,
      partnershipId: editFormData.partnershipId,
      employeeId: 1,
    };
    const newContacts = newContact;
    setEditFormData(newContacts);
    fetch("http://localhost:5000/partnership/updatePartnershipByPartnershipId", {
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
    setEditShow(false);
    // window.location.reload(false);
  };    
  //   const revisedForm=()=>{
    console.log(editData);
  return (
    <Form
      className="container"
      onSubmit={editFormSubmitHandle}

      //   ref={(form) => setFormDOM(form)}
      //   onClick={(e) => {
      //     if (formDOM != null) {
      //       formDOM.reset();
      //     }

      //   }}
    >
      <Form.Group>
        <Form.Label>商家名稱</Form.Label>
        <Form.Control
          type="text"
          name="partnershipName"
          required="required"
          defaultValue={editData.partnershipName}
          onChange={editFormChangeHandle}
        >
          {data.partnershipName}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>負責人</Form.Label>
        <Form.Control
          type="text"
          name="partnershipContactPerson"
          required="required"
          defaultValue={editData.partnershipContactPerson}
          onChange={editFormChangeHandle}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>區域</Form.Label>
        <Form.Select name="cityId" onChange={editFormChangeHandle}>
          {/* <option value={editData.cityId}>{editData.cityName}</option> */}
          {cityArr}
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>地址</Form.Label>
        <Form.Control
          type="text"
          name="partnershipAddr"
          required="required"
          defaultValue={editData.partnershipAddr}
          onChange={editFormChangeHandle}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>聯絡電話</Form.Label>
        <Form.Control
          type="text"
          name="partnershipTel"
          required="required"
          defaultValue={editData.partnershipTel}
          onChange={editFormChangeHandle}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>備註</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <div className="mt-1 mb-1 d-flex justify-content-end">
        <Button className="me-1">修改</Button>
        <Button className="me-1" type="submit">
          儲存
        </Button>
      </div>
    </Form>
  );
}

export default PartnershipEdit;
