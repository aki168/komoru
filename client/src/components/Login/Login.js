import React, { useState } from "react"
import "./Login.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom'


export default function Login(props) {

  let navigate = useNavigate()

  const [mail, setMail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [mailCheck, setMailCheck] = useState(""); //確認mail是否設定好在顯示密碼欄位
  const [loginStatus, setLoginStatus] = useState(false); //設置jwt使用按鈕狀態
  const [emailErr, setEmailErr] = useState("　");

  const inputEmailHandler = (e) => {
    setMail(() => (e.target.value));
  }
  //console.log(mail) //動態追蹤輸入的mail值

  const inputPasswdHandler = (e) => {
    setPasswd(() => (e.target.value))
  }
  //console.log(passwd) //動態追蹤輸入的pw值



  // 0620 aki - 驗證網站是否有該會員：有的人才能輸入密碼＆向他打招呼
  // 若該mail網站沒有，將會導向註冊頁面
  const loginHandler = () => {
    if (mail !== "") {
      axios({
        method: 'POST',
        url: 'http://localhost:5000/member/checkMailIsExisted',
        data: {
          mail: mail,
        }
      })
        .then((res) => {
          console.log(res.data)// 印出資料庫回傳的資料看看（若尚未註冊不會顯示）
          if (res.data[0].memberMail === mail) {
            setMailCheck(prevMailCheck => `親愛的${res.data[0].memberNickName}，歡迎您回來`) //輸入mail與資料庫資料吻合setOK
          } 
        })
        .catch((e) => {
          console.log(mail) //動態追蹤輸入的mail值
          alert("該mail尚未註冊，將為您跳轉至註冊頁");
          navigate('/register', { state: { userMail: mail } }, { replace: true })
        });
    } else if (mail === "") {
      // alert("請輸入電子信箱");
      setEmailErr("請輸入電子信箱")
    }
  }


  // 0620 aki - 正式驗證帳號及密碼：登入驗證
  const loginHandlerWithPW = () => {
    if (mail !== "" && passwd !== "") {
      axios({
        method: 'POST',
        url: 'http://localhost:5000/member/loginAuth',
        data: {
          mail: mail,
          passwd: passwd
        }
      })
        .then((res) => {
          console.log(res.data)// 印出撈到的資料看看
          console.log(res.data.token)// 印出撈到的token看看

          if (res.data.result[0].memberMail === mail && res.data.result[0].memberPasswd === passwd) {
            localStorage.setItem("token", res.data.token)
            // setUserIsLogin({isLoginMail:mail, isLoginToken:res.data.token})
            setLoginStatus(true) // 插入驗證事情

          } else {
            console.log(mail, passwd) //動態追蹤輸入的mail值
            alert("帳號或密碼錯誤"); // 簡易版
          }
        })
        .catch((e) => {
          // if (e.response.error) {
          alert("帳號或密碼錯誤"); // 進階版
          // }
        });
    } else if (mail === "" || passwd === "") {
      alert("請填寫帳號及密碼");
    }
  }

  // 0620 aki - 二次驗證：帳密都驗證好才會觸發，發放token
  // 完成後導向首頁
  const userAuth = () => {
    axios({
      method: 'get',
      url: "http://localhost:5000/member/verifyJWT",
      headers: { "x-access-token": localStorage.getItem("token") }

    }).then((res) => {
      console.log(res)

      alert('登入成功！')
      navigate('/', { replace: true })
  
    })
  }








  return (
    <div className="login">
      <h2 className="login--title">登入或建立帳戶</h2>
      <h5>{mailCheck}</h5>
      {emailErr && <h5 className="errMsg">{emailErr}</h5>}
      <input className="login--input--L" name="mail" id="mail" type="email" onChange={inputEmailHandler} placeholder="請輸入信箱帳號"/>

      {mailCheck && <input placeholder="請填寫密碼"
        className="login--input--L" name="passwd" id="passwd"
        type="password" onChange={inputPasswdHandler} />}

      {!loginStatus && <button className="login--submit"
        onClick={mailCheck ? loginHandlerWithPW : loginHandler}>使用電子信箱繼續</button>}

      {loginStatus && <button onClick={userAuth} className="login--submit btn-wine">點擊後進行二次認證</button>}



      {/* <a href="/ForgotPW" className="login--forgot">忘記密碼？</a> */}

      <h3 className="login--subTitle">或使用以下選項登入</h3>
      <ul className="login--other">
        <li className="login--block">Google</li>
        <li className="login--block">Facebook</li>
        <li className="login--block">LINE</li>
      </ul>

    </div>




  )
}
