import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import '../../components/User/User.css'
import Coupon from '../../components/User/Coupon'


export default function CouponPage() {

  //0623 aki - 若沒有token則跳轉登入頁a
  let navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.token) {
      navigate('/login', { replace: true })
    }
  })



  return (
    <div className='User--wrap'>
      <Navbar />
      <div className='User--container'>
        <div className="Coupon">
          <ul className="Coupon--menu">
            <li><a href="/user" className="menu--item">基本資料</a></li>
            <li><a href="/member-order" className="menu--item">訂單記錄</a></li>
            <li><a href="/member-feedback" className="menu--item">活動回饋</a></li>
            <li><a href="/member-coupon" className="menu--item--on">優惠表單</a></li>
          </ul>
          <div className="Feedback--card">
            <div className="card--title">
              <h3>優惠票卷查看</h3>
              <p>註冊即送 200NTD 優惠票卷！關注KOMORU官方平台，領取各式超值的優惠票卷。</p>
            </div>
            <img className="img-fluid mb-4 w-100" src="https://dummyimage.com/1000x200/F2EAE4/ED8C4E.png&text=banner" alt="profile-banner" />
            <Coupon />
          </div>
        </div>
      </div>
    </div>


  )
}