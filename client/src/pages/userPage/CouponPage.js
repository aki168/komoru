import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
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


//   //0707 aki - 撈取優惠卷 by token
// useEffect(()=>{

//   axios({
//     method:"post",
//     url:"http://localhost:5000/member/getCouponByMemberId",
//     data:{
//       token:localStorage.token
//     }
//   }).then((res)=>{
//     console.log(res.data.dataList)
//     // 未使用（Ｏ可用）
//     getCoupon(res.data.dataList.usableCouponlist)
  
//     // 已使用（Ｘ用掉的）
//     getUsedCoupon(res.data.dataList.UnusableCouponByMemberId)  

//   }).catch((err)=>{
//     console.log(err)
//   })
  
// },[])

// const coupons = getCoupon.map((item)=>{
//   return(
//     <Coupon
//       key={item.couponId}
//       {...item}
//       />
//   )
// })

// const usedCoupons = getUsedCoupon.map((item)=>{
//   return(
//     <UsedCoupon
//       key={item.couponId}
//       {...item}
//       />
//   )
// })


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
            <img className="img-fluid mb-4 w-100" src="komoru_member.png" alt="profile-banner" />
            {/* {coupons} */}
            <Coupon />
          </div>
        </div>
      </div>
    </div>


  )
}