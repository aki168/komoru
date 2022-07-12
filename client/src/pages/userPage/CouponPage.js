import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../components/User/User.css'
import Coupon from '../../components/User/Coupon/Coupon'
// import axios from 'axios'


export default function CouponPage() {


  //0623 aki - 若沒有token則跳轉登入頁
  let navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.token) {
      navigate('/login', { replace: true })
    }
  })



  return (
    <div className="Feedback--card">
      <div className="card--title">
        <h3>優惠票卷查看</h3>
        <p>註冊即送 200NTD 優惠票卷！關注KOMORU官方平台，領取各式超值的優惠票卷。</p>
      </div>
      <img className="img-fluid mb-4 w-100" src="../komoru_member.png" alt="profile-banner" />
      <Coupon />
    </div>
  )
}