import React from "react"
import "./Login.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom'


export default function Login(props) {

  let navigate = useNavigate()

  const [mail, setMail] = React.useState("");
  const [passwd, setPasswd] = React.useState("");
  const [mailOK,setMailOK] = React.useState(""); //確認mail是否設定好在顯示密碼欄位
  const [loginStatus,setLoginStatus] = React.useState(false); //設置jwt使用按鈕狀態

  const inputEmailHandler = (e) => {
    setMail(() => (e.target.value));
  }
  console.log(mail) //動態追蹤輸入的mail值

  const inputPasswdHandler = (e) => {
    setPasswd(() => (e.target.value))
  }
  console.log(passwd) //動態追蹤輸入的pw值




  const loginHandler = () => {
    if (mail !== "") {
      axios({
        method: 'POST',
        url: 'http://localhost:5000/member/emailIsExisted',
        data: {
          mail: mail,
        }
      })
        .then((res) => {
          console.log(res.data)// 印出資料庫回傳的資料看看（若尚未註冊不會顯示）
          if (res.data[0].memberMail === mail) {
            setMailOK(prevMailOK => `親愛的${res.data[0].memberNickName}，歡迎您回來` ) //輸入mail與資料庫資料吻合setOK
          } else {
            // console.log(mail) //動態追蹤輸入的mail值
            // alert("該mail尚未註冊，將為您跳轉至註冊頁"); // 簡易版
            // navigate('/register',{state: { userMail: mail } }, { replace: true })
          }
        })
        .catch((e) => {
          console.log(mail) //動態追蹤輸入的mail值
          alert("該mail尚未註冊，將為您跳轉至註冊頁"); 
          navigate('/register',{state: { userMail: mail } }, { replace: true })
        });
    } else if (mail === "") {
      alert("請輸入電子信箱");
    }
  }

  const userAuth = () => {
    axios({
      method:'get',
      url:"http://localhost:5000/member/isUserAuth",
      headers: {"x-access-token": localStorage.getItem("token")}
      
    }).then((res) => {
      console.log(res)
      alert('登入成功！')
      navigate('/', { replace: true })

    })
  }

  const loginHandler2 = () => {
    if (mail !== "" && passwd !== "") {
      axios({
        method: 'POST',
        url: 'http://localhost:5000/member/loginAuth',
        data: {
          mail: mail,
          passwd:passwd
        }
      })
        .then((res) => {
          console.log(res.data)// 印出撈到的資料看看
          console.log(res.data.token)// 印出撈到的token看看


          if (res.data.result[0].memberMail === mail && res.data.result[0].memberPasswd === passwd) {
            localStorage.setItem("token",res.data.token)
            setLoginStatus(true) // 插入驗證事情
            // alert("登入成功！");
            // navigate('/', { replace: true })
            // 後端必須另外設定jwtcookie
          } else {
            console.log(mail,passwd) //動態追蹤輸入的mail值
            alert("帳號或密碼錯誤"); // 簡易版
          }
        })
        .catch((e) => {
          // if (e.response.error) {
            alert("帳號或密碼錯誤"); // 進階版
          // }
        });
    } else if (mail === "" || passwd=== "") {
      alert("請填寫帳號及密碼");
    }
  }

  return (


    <div className="login">
      <h2 className="login--title">登入或建立帳戶</h2>
      <h5>{mailOK}</h5>
      <input className="login--input--L" name="mail" id="mail" type="email" onChange={inputEmailHandler} />
      
      { mailOK && <input placeholder="請填寫密碼" 
        className="login--input--L" name="passwd" id="passwd" 
        type="password" onChange={inputPasswdHandler} /> }
      
      { !loginStatus && <button className="login--submit" 
        onClick={mailOK ? loginHandler2:loginHandler}>使用電子信箱繼續</button> }

      { loginStatus && <button onClick={userAuth} className="login--submit text-wine">點擊後進行二次認證</button> }

      

      <a href="/ForgotPW" className="login--forgot">忘記密碼？</a>

      <h3 className="login--subTitle">或使用以下選項登入</h3>
      <ul className="login--other">
        <li className="login--block">Google</li>
        <li className="login--block">Facebook</li>
        <li className="login--block">LINE</li>
      </ul>

    </div>




  )

}
