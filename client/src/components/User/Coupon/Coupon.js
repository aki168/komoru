import { useEffect, useState } from 'react'
import './Coupon.css'
import { Tab, Tabs } from 'react-bootstrap'
import axios from 'axios'
import CanUseCoupon from './CanUseCoupon'
import UsedCoupon from './UsedCoupon'

export default function Coupon(props) {


  const [coupon,getCoupon] = useState([])
  const [usedCoupon, getUsedCoupon ] = useState([])


  //0707 aki - 撈取優惠卷 by token
useEffect(()=>{

  axios({
    method:"post",
    url:"http://localhost:5000/member/getCouponByMemberId",
    data:{
      token:localStorage.token
    }
  }).then((res)=>{
    console.log(res.data.dataList)
    // 未使用（Ｏ可用）
    getCoupon(res.data.dataList.usableCouponlist)
  
    // 已使用（Ｘ用掉的）
    getUsedCoupon(res.data.dataList.UnusableCouponByMemberId)  

  }).catch((err)=>{
    console.log(err)
  })
  
},[])

const coupons = coupon.map((item)=>{
  return(
    <CanUseCoupon
      key={item.couponId}
      {...item}
      />
  )
})

const usedCoupons = usedCoupon.map((item)=>{
  return(
    <UsedCoupon
      key={item.couponId}
      {...item}
      />
  )
})


  return (

    <div className= "Coupon--card" >
      <Tabs fill
        defaultActiveKey="coupon"
        id="coupon-tab"
        className="mb-3 fs-5"
      >
        <Tab className="p-3 " eventKey="coupon" title="未使用">
          <section className="coupon--item">
            {coupons}
            {/* <h3>註冊優惠200$</h3> */}
          </section>
        </Tab>
        <Tab className="p-3" eventKey="coupon-used" title="已使用">
          <section className="coupon--item">
            {usedCoupons}
            {/* <h3>無</h3> */}
          </section>
        </Tab>
      </Tabs>
    </div >
  )
}