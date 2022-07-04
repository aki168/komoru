import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { Container, Form } from "react-bootstrap";
import LoginHeader from "../../components/BackstageAdminLoginHeader";

function BackstageLogin() {
  let navigate = useNavigate()
  const [account, setAccount] = useState("");
  const [passwd, setPasswd] = useState("");

  const inputAccountHandler = (e) => {
    setAccount(() => e.target.value);
    //console.log(account) //動態追蹤輸入的account值
  };

  const inputPasswdHandler = (e) => {
    setPasswd(() => e.target.value);
    //console.log(passwd) //動態追蹤輸入的pw值
  };

  // 0620 aki - 驗證網站是否有該會員：有的人才能輸入密碼＆向他打招呼
  // 若該mail網站沒有，將會導向註冊頁面
  // const loginHandler = () => {
  //   if (mail !== "") {
  //     axios({
  //       method: "POST",
  //       url: "http://localhost:5000/member/checkMailIsExisted",
  //       data: {
  //         mail: mail,
  //       },
  //     })
  //       .then((res) => {
  //         console.log(res.data); // 印出資料庫回傳的資料看看（若尚未註冊不會顯示）
  //         if (res.data[0].memberMail === mail) {
  //           setMailCheck(
  //             (prevMailCheck) =>
  //               `親愛的${res.data[0].memberNickName}，歡迎您回來`
  //           ); //輸入mail與資料庫資料吻合setOK
  //         }
  //       })
  //       .catch((e) => {
  //         console.log(mail); //動態追蹤輸入的mail值
  //         alert("該mail尚未註冊，將為您跳轉至註冊頁");
  //         navigate(
  //           "/register",
  //           { state: { userMail: mail } },
  //           { replace: true }
  //         );
  //       });
  //   } else if (mail === "") {
  //     alert("請輸入電子信箱");
  //   }
  // };

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
          console.log(res.data);
          if (res.data.status) {
            console.log(res.data); // 印出撈到的資料看看
            alert('登入成功！')
            navigate('/BackstageAdmin', { replace: true })
          }

          // console.log(res.data.token); // 印出撈到的token看看

          // if (
          //   res.data.result[0].memberMail === mail &&
          //   res.data.result[0].memberPasswd === passwd
          // ) {
          //   localStorage.setItem("token", res.data.token);
          //   // setUserIsLogin({isLoginMail:mail, isLoginToken:res.data.token})
          //   setLoginStatus(true); // 插入驗證事情
          // } else {
          //   console.log(mail, passwd); //動態追蹤輸入的mail值
          //   alert("帳號或密碼錯誤"); // 簡易版
          // }
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
      <div>
        <LoginHeader />
      </div>
      <div>
        <Container style={{ marginTop: '180px' }}>
          <Form className="col-lg-6 offset-lg-3">
            <div className="mb-3 mt-3">
              <label htmlFor="account" className="form-label">
                Account:
              </label>
              <input
                className="form-control"
                // id="account"
                placeholder="Enter account"
                name="account"
                onChange={inputAccountHandler}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="pwd" className="form-label">
                Password:
              </label>
              <input
                // type="password"
                className="form-control"
                // id="pwd"
                placeholder="Enter password"
                name="pswd"
                onChange={inputPasswdHandler}
              />
            </div>
            <button className="btn col-md-12 " onClick={loginHandlerWithPW} style={{ background: '#ED8C4E', color: "#FFFFFF" }}>
              登入
            </button>
          </Form>
        </Container>
      </div>
    </>
  );
}

export default BackstageLogin;
