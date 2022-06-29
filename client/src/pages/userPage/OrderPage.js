import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import '../../components/User/User.css'
import OrderList from '../../components/User/OrderList'
import axios from 'axios'


export default function OrderPage() {

  // const [userData, setUserData] = useState({})
  const [orderData, setOrderData] = useState({})


  //0623 aki - 若沒有token則跳轉登入頁
  let navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.token) {
      navigate('/login', { replace: true })
    }
  })

  // //0623 aki - 若沒有token則跳轉登入頁
  // let navigate = useNavigate()
  // useEffect(()=>{
  //   if(!localStorage.token){
  //     navigate('/login', { replace: true })
  //   }else{
  //     axios({
  //       method: "post",
  //       url: "http://localhost:5000/member/isLogin",
  //       data:{
  //         token:localStorage.token
  //       }
  //     }).then((res) => {
  //       // console.log(res) //有登入的話，回傳「會員資訊」在res.data[0] ｜ 沒登入則回傳message
  //       let data = res.data[0];
  //       setUserData(data)//想辦法把值取出來
  //     }).catch((err) => {
  //       console.log(err)
  //     })
  //   }
  // },[])

  // // 0628 aki 抓取該會員的訂單記錄
  useEffect(() => {
    // if(userData){
    axios({
      method: "post",
      url: "http://localhost:5000/order/getOrderDataByMemberId",
      data: {
        token: localStorage.token
      }
    }).then((res) => {
      let postOrderData = res.data[0];
      setOrderData(postOrderData)//想辦法把值取出來
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
    // }
  }, [])


  return (
    <div className='wrap'>
      <Navbar />
      <div className='User--container'>
        <OrderList
          name={orderData.memberName}
          hotelTitle={orderData.hotelTitle}
          roomDesc={orderData.roomDesc}
          stayNight={orderData.stayNight}
          orderStartDate={orderData.orderStartDate} />
      </div>
    </div>
  )
}