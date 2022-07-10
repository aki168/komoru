import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar-bg-white'
import '../../components/User/User.css'
import axios from 'axios'
import User from '../../components/User/User'

import RainbowCard from '../../components/RainbowCard/RainbowCard'
// import { NavItem } from 'react-bootstrap'
// import { loginOrNot } from '../../App'
// import RainbowCard from '../../components/RainbowCard/RainbowCard'




export default function UserPage() {

  // 獲取會員資料
  const [userData, setUserData] = useState({})
  // 0708 aki-金句內容資料獲取
  // const [rainbowCard, setRainbowCard] = useState('')


  //0623 aki - 若沒有token則跳轉登入頁
  let navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.token) {
      navigate('/login', { replace: true })
    } else {
      axios({
        method: "post",
        url: "http://localhost:5000/member/isLogin",
        data: {
          token: localStorage.token
        }
      }).then((res) => {
        // console.log(res) //有登入的話，回傳「會員資訊」在res.data[0] ｜ 沒登入則回傳message
        let data = res.data[0];
        setUserData(data)//想辦法把值取出來

      }).catch((err) => {
        console.log(err)
      })
    }
  }, [])

  console.log(userData)

  // 0708 獲取金句資料
  // useEffect(() => {
  //   axios({
  //     method: "post",
  //     url: "http://localhost:5000/member/getRainbowCard",
  //     data: {
  //       token: localStorage.token
  //     }
  //   }).then((res) => {
  //     console.log(res)
  //     setRainbowCard(res.data.dataList.getRainbowCard[0])
  //     console.log(res.data.dataList.getRainbowCard[0])
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // }
  //   , [])



  return (
    <div className='User--wrap'>
      <RainbowCard 
      // key={rainbowCard.rainbowCardId}
      // rainbowCardContent={rainbowCard.rainbowCardContent}
      />
      <Navbar />
      <div className='User--titleBar'>
        <h2>簡單、多功能的會員中心系統</h2>
        <p className='pt-3 fs-5'>KOMORU 協助你輕鬆創管理你的會員資料、瀏覽你的下訂紀錄，探索更多元的自己！</p>
      </div>
      <div className='User--container'>
        <User
          mail={userData.memberMail}
          name={userData.memberName}
          nickName={userData.memberNickName}
          sex={userData.memberGender}
          phone={userData.memberPhone}
          iconPath={userData.memberImgPath}
        />
      </div>
    </div>
  )
}