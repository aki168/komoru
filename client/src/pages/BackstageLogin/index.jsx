import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { Container, Form } from "react-bootstrap";
import LoginHeader from "../../components/BackstageAdminLoginHeader";
import Background from "../../assets/BackstageLoginKOMORU.png"
import "./BackstageLogin.css"
import LOGO_OG from "../../assets/KOMORU_LOGO_OG.png"
import LoginModal from "./LoginModal"
import { Modal, Button } from "react-bootstrap"





function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="xs"
      aria-labelledby="contained-modal-title-vcenter"
      centered  
    >
      <Modal.Header style={{ border: "none" }} closeButton>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer className="justify-content-center" style={{ border: "none" }}>
        {/* <Button onClick={()=>setLoginShow(true)}>Close</Button> */}
      </Modal.Footer>
    </Modal>
  );
}


function BackstageLogin() {
  let navigate = useNavigate()
  const [account, setAccount] = useState("");
  const [passwd, setPasswd] = useState("");
  const [loginShow, setLoginShow] = useState(false);

  const inputAccountHandler = (e) => {
    setAccount(() => e.target.value);
    //console.log(account) //動態追蹤輸入的account值
  };

  const inputPasswdHandler = (e) => {
    setPasswd(() => e.target.value);
    //console.log(passwd) //動態追蹤輸入的pw值
  };


  // 0620 aki - 正式驗證帳號及密碼：登入驗證
  const loginHandlerWithPW = (event) => {
    event.preventDefault();
    console.log(account)
    console.log(passwd)


    if (account !== "" && passwd !== "") {
      axios({
        method: "POST",
        url: "http://localhost:5000/employee/login",
        data: {
          employeeAccount: account,
          employeePasswd: passwd,
        },
        withCredentials: true
      })
        .then((res) => {
          // console.log(res.data);
          if (res.data.status) {
            console.log(res.data); // 印出撈到的資料看看
            console.log(loginShow)
            setLoginShow(true)
            navigate('/BackstageAdmin', { replace: true }) 
          }
          
          // console.log(res.data.token); // 印出撈到的token看看

        })
        .catch((err) => {
          console.log(err)
          // if (e.response.error) {
          // alert("帳號或密碼錯誤"); // 進階版
          // }
        });
    } else if (account === "" || passwd === "") {
      alert("請填寫帳號及密碼");
    }
  };

  return (
    <>
      {/* <div>
        <LoginHeader />
      </div> */}
      <div className="BackstageLogin-backgorund" style={{ height: "100vh" }}>
        <Container className="text-center ">
          <img style={{ marginTop: '150px' }} src={LOGO_OG} alt="" />
          <h3 className="mt-4">後台管理系統</h3>
          <Form className="col-lg-6 offset-lg-3">
            <div className="mb-4 mt-4">
              <input
                className="form-control"
                // id="account"
                placeholder="請輸入帳號"
                name="account"
                onChange={inputAccountHandler}
              />
            </div>
            <div className="mb-4">
              <input
                // type="password"
                className="form-control"
                // id="pwd"
                placeholder="請輸入密碼"
                name="pswd"
                onChange={inputPasswdHandler}
              />
            </div>
            <button className="btn col-md-12 " onClick={loginHandlerWithPW} style={{ background: '#ED8C4E', color: "#FFFFFF" }}>
              登入
            </button>
          </Form>
        </Container>
        <button>OK</button>
        <MyVerticallyCenteredModal
        show={loginShow}
        onHide={() => setLoginShow(false)}
        // setLoginShow={setLoginShow}
      />
      
      </div>
    </>
  );
}

export default BackstageLogin;
