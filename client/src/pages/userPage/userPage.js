import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import '../../components/User/User.css'
import axios from 'axios'
import User from '../../components/User/User'
// import { NavItem } from 'react-bootstrap'
// import { loginOrNot } from '../../App'
// import RainbowCard from '../../components/RainbowCard/RainbowCard'


export default function UserPage() {

const [userData, setUserData] = useState({})


//0623 aki - 若沒有token則跳轉登入頁
let navigate = useNavigate()
useEffect(()=>{
  if(!localStorage.token){
    navigate('/login', { replace: true })
  }else{
    axios({
      method: "post",
      url: "http://localhost:5000/member/isLogin",
      data:{
        token:localStorage.token
      }
    }).then((res) => {
      // console.log(res) //有登入的話，回傳「會員資訊」在res.data[0] ｜ 沒登入則回傳message
      let data = res.data[0];
      setUserData(data)//想辦法把值取出來

    }).catch((err) => {
      console.log(err)
    })
  }
},[])


console.log(userData)

  return (
    <div className='wrap'>
      <Navbar />
      <div className='User--container'>
        <User
        mail={userData.memberMail}
        name={userData.memberName}
        nickName={userData.memberNickName}
        sex={userData.memberGender}
        phone={userData.memberPhone}
        />
        {/* <RainbowCard /> */}
      </div>
    </div>
  )
}