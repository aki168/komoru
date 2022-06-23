import React from "react"
import './SignIn.css'
import { useLocation } from "react-router-dom";

export default function SignIn(props) {
  
  const { state: { userMail } = {} } = useLocation();//把前一頁mail值繼續帶下來

  const [mail, setMail] = React.useState(userMail);
  const inputEmailHandler = (e) => {
    setMail(() => (e.target.value));
  }
  console.log(mail) //動態追蹤輸入的mail值





  return (

    <ul className="signIn">
      <h2 className="signIn--title">建立帳戶</h2>
      <li className="signIn--item">
        <label className="signIn--label" htmlFor="mail">E-mail　</label>
        <input className="signIn--input--L" 
                name="mail" id="mail" type="email" 
                value={mail} 
                onChange={inputEmailHandler}/>
      </li>
      <li className="signIn--item">
        <label className="signIn--label" htmlFor="passwd">密碼　　</label>
        <input className="signIn--input--L" name="passwd" id="passwd" type="password" />
      </li>
      <li className="signIn--item">
        <label className="signIn--label" htmlFor="passwdCheck">確認密碼</label>
        <input className="signIn--input--L" name="passwdCheck" id="passwdCheck" type="password" />
      </li>
      <li className="signIn--item">
        <label className="signIn--label" htmlFor="forgetPasswordAns">密碼提示</label>
        <input className="signIn--input--L" name="forgetPasswordAns" id="forgetPasswordAns" placeholder="請填曾就讀國小作為暗號" />
      </li>
      <br />
      <br />
      <li className="signIn--item">
        <label className="signIn--label" htmlFor="name">姓名</label>
        <input className="signIn--input--M mr-16" name="name" id="name" />
        <label className="signIn--label" htmlFor="nickName">暱稱</label>
        <input className="signIn--input--M" name="nickName" id="nickName" />
      </li>
      <li className="signIn--item">
        <label className="signIn--label" htmlFor="sex">性別</label>
        <select className="signIn--input--M" name="sex" id="sex">
          <option value="1">男性</option>
          <option value="0">女性</option>
          {/* <option value="N">不透露</option> */}
        </select>
      </li>
      <li className="signIn--item">
        <label className="signIn--label" htmlFor="phone">手機</label>
        <input className="signIn--input--XL" name="phone" id="phone" />
      </li>

      <button className="signIn--submit">送出</button>
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