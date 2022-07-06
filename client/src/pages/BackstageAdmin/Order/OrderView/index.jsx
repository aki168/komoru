import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

function OrderView({ setEditShow, editData }) {
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
  })
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

  /*20220624 YN
   可否修改狀態改變*/
  const disabledClickHandle = () => {
    setIsDisabled(!isDisabled)
  };

  /*20220622 YN
   城市資料初始化*/
  const [cityData, setCityData] = useState([]);

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

    const newEditFormData = { ...editModalData };
    newEditFormData[fieldName] = fieldValue;

    setEditModalData(newEditFormData);
    console.log(newEditFormData);
  };
  /*20220624 YN
  送出修改表單資料*/
  //   const editFormSubmitHandle = (event) => {
  //     event.preventDefault();
  //     const newContact = {
  //       cityId: editModalData.cityId,
  //       partnershipContactPerson: editModalData.partnershipContactPerson,
  //       partnershipName: editModalData.partnershipName,
  //       partnershipAddr: editModalData.partnershipAddr,
  //       partnershipTel: editModalData.partnershipTel,
  //       partnershipId: editModalData.partnershipId,
  //       employeeId: 1,
  //       partnershipDesc: editModalData.partnershipDesc,
  //     };
  //     const newContacts = newContact;
  //     // console.log(newContacts);
  //     // setEditFormData(newContacts);
  //     fetch(
  //       "http://localhost:5000/partnership/updatePartnershipByPartnershipId",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json; charset=utf-8",
  //         },
  //         body: JSON.stringify(newContacts),
  //       }
  //     )
  //       .then((response) => response.json()) // 取出 JSON 資料，並還原成 Object。response.json()　一樣回傳 Promise 物件
  //       .then((data) => {
  //         console.log(data);
  //       })
  //       .catch((e) => {
  //         console.error(e);
  //       });
  //     setEditShow(false);
  //     window.location.reload(false);
  //   };
  //   const revisedForm=()=>{
  // console.log(cityData.cityName);
  return (
    <div className="container">
      <div>
        <h3 className="mb-3 mt-3">訂購者資料</h3>
        <div className="row">
          <div className="col-6">
            <div className=" d-flex align-items-center ">
              <h5 className="mb-3">帳號</h5>
              <p className="mb-3">帳號</p>
            </div>
            <div className=" d-flex align-items-center ">
              <h5 className="mb-3">姓名</h5>
              <p className="mb-3">姓名</p>
            </div>
            <div className=" d-flex align-items-center ">
              <h5 className="mb-3">暱稱</h5>
              <p className="mb-3">暱稱</p>
            </div>
            <div className=" d-flex align-items-center ">
              <h5 className="mb-3">性別</h5>
              <p className="mb-3">性別</p>
            </div>
          </div>
          <div className="col-6">
          <div className=" d-flex align-items-center ">
              <h5 className="mb-3">帳號</h5>
              <p className="mb-3">帳號</p>
            </div>
            {/*                 
                <p className="mb-3">姓名</p>
                <p className="mb-3">暱稱</p>
                <p className="mb-3">性別</p> */}
          </div>
        </div>
      </div>
      <div className="col-6">
        <div className="row">
          <div className="col-6">
            <p className="mb-3">手機</p>
            <p className="mb-3">優惠代碼</p>
            <p className="mb-3">付款方式</p>
          </div>
          <div className="col-6">
            <p className="mb-3">帳號</p>
            <p className="mb-3">姓名</p>
            <p className="mb-3">暱稱</p>
          </div>
        </div>
      </div>
    </div>
    // <Form
    //   className="container"
    //   onSubmit={editFormSubmitHandle}
    // >
    //   <Form.Group>
    //     <Form.Label>商家名稱</Form.Label>
    //     <Form.Control
    //       type="text"
    //       name="partnershipName"
    //       required="required"
    //       defaultValue={editModalData.partnershipName}
    //       onChange={editFormChangeHandle}
    //       disabled={isDisabled}
    //     >
    //     </Form.Control>
    //   </Form.Group>
    //   <Form.Group>
    //     <Form.Label>負責人</Form.Label>
    //     <Form.Control
    //       type="text"
    //       name="partnershipContactPerson"
    //       required="required"
    //       defaultValue={editModalData.partnershipContactPerson}
    //       onChange={editFormChangeHandle}
    //       disabled={isDisabled}
    //     />
    //   </Form.Group>
    //   <Form.Group>
    //     <Form.Label>區域</Form.Label>
    //     <Form.Select name="cityId" onChange={editFormChangeHandle} disabled={isDisabled}>
    //       <option defaultValue={editModalData.cityId}>{editData.cityName}</option>
    //       {cityArr}
    //     </Form.Select>
    //   </Form.Group>
    //   <Form.Group>
    //     <Form.Label>地址</Form.Label>
    //     <Form.Control
    //       type="text"
    //       name="partnershipAddr"
    //       required="required"
    //       defaultValue={editModalData.partnershipAddr}
    //       onChange={editFormChangeHandle}
    //       disabled={isDisabled}
    //     />
    //   </Form.Group>
    //   <Form.Group>
    //     <Form.Label>聯絡電話</Form.Label>
    //     <Form.Control
    //       type="text"
    //       name="partnershipTel"
    //       required="required"
    //       defaultValue={editModalData.partnershipTel}
    //       onChange={editFormChangeHandle}
    //       disabled={isDisabled}
    //     />
    //   </Form.Group>
    //   <Form.Group>
    //     <Form.Label>備註</Form.Label>
    //     <Form.Control as="textarea" rows={3} disabled={isDisabled} defaultValue={editModalData.partnershipDesc} onChange={editFormChangeHandle} name="partnershipDesc" />
    //   </Form.Group>
    //   <div className="mt-1 mb-1 d-flex justify-content-end">
    //     <Button className="me-1" onClick={disabledClickHandle}>修改</Button>
    //     <Button className="me-1" type="submit">
    //       儲存
    //     </Button>
    //   </div>
    // </Form>
  );
}

export default OrderView;