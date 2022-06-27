import React, { useState } from "react"
import axios from 'axios'
import './SignIn.css'
import { useLocation } from "react-router-dom";
import { validEmail, validPhone } from "./Regex";
import { useNavigate } from 'react-router-dom'



export default function SignIn(props) {

  const { state: { userMail } = {} } = useLocation();//把前一頁mail值繼續帶下來

  // 驗證表單使用: 故意設『全形空白』的部分，是希望布林值不要是false而已，若有設定字串會顯示於畫面上
  const [emailErr, setEmailErr] = useState("　");
  const [passwdErr, setPasswdErr] = useState("　");
  const [phoneErr, setPhoneErr] = useState("　");
  const [allErr, setAllErr] = useState("　");
  const [validateCheck, setValidateCheck] = useState("");
  const [finish, setFinish] = useState("");

  const validate = () => {

    (!formData.mail || !formData.passwd || !formData.passwdCheck ||
      !formData.forgetPasswordAns || !formData.name || !formData.nickName || !formData.phone) ?
      setAllErr("各欄位不可空白") : setAllErr("");

    !validEmail.test(formData.mail) ? setEmailErr("email格式錯誤，請再次輸入") : setEmailErr("");
    
    (formData.passwd !== formData.passwdCheck) ? setPasswdErr("密碼與確認密碼不同，請再次輸入") : setPasswdErr("");
    !validPhone.test(formData.phone) ? setPhoneErr("手機格式錯誤，請再次輸入") : setPhoneErr("");
    //console.log(allErr, emailErr, passwdErr, phoneErr)

    if (!allErr && !emailErr && !passwdErr && !phoneErr) {
      setValidateCheck("可提交嚕") //目前有非同步未解，故需要點擊兩下才能送出註冊資料 
    }

  }

  // 抓取表單資料使用 & 設立初始值
  const [formData, setFormData] = useState(
    {
      mail: userMail,
      passwd: "",
      passwdCheck: "",
      forgetPasswordAns: "",
      name: "",
      nickName: "",
      sex: "1",
      phone: ""
    }
  )

  // 追蹤表單輸入值使用
  function inputHandler(e) {
    const { name, value } = e.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }
  console.log(formData)


  // 驗證ＯＫ後，提交後觸發
  function submitHandler(e) {
    e.preventDefault()

    axios({
      method: 'POST',
      url: 'http://localhost:5000/member/register',
      data: {
        mail:formData.mail, 
        passwd:formData.passwd, 
        forgetPasswordAns:formData.forgetPasswordAns, 
        name:formData.name, 
        nickName:formData.nickName, 
        sex:formData.sex, 
        phone:formData.phone
      }
    })
      .then((res) => {
        console.log('提交ok')
        setFinish(true)

      })
      .catch((err) => {
        console.log(err) 

      });


  }

  // 會員成功建檔案於資料庫後，跳轉到首頁的函式 
  let navigate = useNavigate()
  const finishThenBackHome = () => navigate('/');
  


  return (

    // <form >
    <ul className="signIn">
      <h2 className="signIn--title">建立帳戶</h2>
      <li className="signIn--item">
        {emailErr && <h5 className="errMsg">{emailErr}</h5>}
        <label className="signIn--label" htmlFor="mail">E-mail　</label>
        <input className="signIn--input--L"
          name="mail" id="mail" type="email"
          value={formData.mail}
          onChange={inputHandler} />
      </li>

      <li className="signIn--item">
        <label className="signIn--label" htmlFor="passwd">密碼　　</label>
        <input className="signIn--input--L"
          name="passwd" id="passwd" type="password" placeholder="設定任意英數組合為密碼"
          value={formData.passwd}
          onChange={inputHandler} />
      </li>
      <li className="signIn--item">
        {passwdErr && <h5 className="errMsg">{passwdErr}</h5>}
        <label className="signIn--label" htmlFor="passwdCheck">確認密碼</label>
        <input className="signIn--input--L" placeholder="請再次輸入密碼"
          name="passwdCheck" id="passwdCheck" type="password"
          value={formData.passwdCheck}
          onChange={inputHandler} />
      </li>

      <li className="signIn--item">
        <label className="signIn--label" htmlFor="forgetPasswordAns">密碼提示</label>
        <input className="signIn--input--L"
          name="forgetPasswordAns" id="forgetPasswordAns" placeholder="請填曾就讀國小作為暗號"
          value={formData.forgetPasswordAns}
          onChange={inputHandler} />
      </li>
      <br />
      <br />
      <li className="signIn--item">
        <label className="signIn--label" htmlFor="name">姓名</label>
        <input className="signIn--input--M mr-16"
          name="name" id="name"
          value={formData.name}
          onChange={inputHandler} />

        <label className="signIn--label" htmlFor="nickName">暱稱</label>
        <input className="signIn--input--M"
          name="nickName" id="nickName"
          value={formData.nickName}
          onChange={inputHandler} />
      </li>
      <li className="signIn--item">
        <label className="signIn--label" htmlFor="sex">性別</label>
        <select className="signIn--input--M"
          name="sex" id="sex"
          value={formData.sex}
          onChange={inputHandler}>
          <option value="1">男性</option>
          <option value="0">女性</option>
        </select>
      </li>
      <li className="signIn--item">
        {phoneErr && <h5 className="errMsg">{phoneErr}</h5>}
        <label className="signIn--label" htmlFor="phone">手機</label>
        <input className="signIn--input--XL" placeholder=""
          name="phone" id="phone"
          value={formData.phone}
          onChange={inputHandler} />
      </li>
      {!validateCheck && <button onClick={validate} className="signIn--submit">點擊兩下送出</button>}

      {validateCheck && <button onClick={!finish? submitHandler: finishThenBackHome} 
        className={!finish? "signIn--submitFin": "signIn--submit"} > {!finish? "請再次確認後送出": "註冊成功！點擊返回首頁"}
      </button>}


      <br />
      {allErr && <h5 className="errMsg">{allErr}　　　</h5>}
      <br />
      <br />
    </ul>







  )

}

// name -
// nickName -
// sex -
// phone
// imgPath
// registerType