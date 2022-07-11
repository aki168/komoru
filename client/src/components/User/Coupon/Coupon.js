import { useEffect, useState } from 'react'
import './Coupon.css'
import { Tab, Tabs } from 'react-bootstrap'
import axios from 'axios'
import CanUseCoupon from './CanUseCoupon'
import UsedCoupon from './UsedCoupon'
import BookingLoading from '../../BookingLoading/BookingLoading'

export default function Coupon(props) {


  const [coupon, getCoupon] = useState([])
  const [usedCoupon, getUsedCoupon] = useState([])
  // 初始化loading狀態
  const [loading, setLoading] = useState(false)


  //0707 aki - 撈取優惠卷 by token
  useEffect(() => {

    axios({
      method: "post",
      url: "http://localhost:5000/coupon/getCouponByMemberId",
      data: {
        token: localStorage.token
      }
    }).then((res) => {
      setLoading(true)
      console.log(res.data.dataList)
      // 未使用（Ｏ可用）
      getCoupon(res.data.dataList.usableCouponlist)

      // 已使用（Ｘ用掉的）
      getUsedCoupon(res.data.dataList.UnusableCouponByMemberId)

    }).catch((err) => {
      console.log(err)
    })

  }, [])

  const coupons = coupon.map((item) => {
    return (
      <CanUseCoupon
        key={item.couponId}
        {...item}
      />
    )
  })

  const usedCoupons = usedCoupon.map((item) => {
    return (
      <UsedCoupon
        key={item.couponId}
        {...item}
      />
    )
  })


  return (

    <div className="Coupon--card" >
      { //資料尚未取得之前，顯示Loading
        !loading &&
        <div className='d-flex justify-content-center'>
          <BookingLoading />
          <BookingLoading />
          <BookingLoading />
        </div>
      }
      
      {loading &&
      <Tabs fill
        defaultActiveKey="coupon"
        id="coupon-tab"
        className="mb-3 fs-5"
      >
        <Tab eventKey="coupon" title="未使用">
          <section className="coupon--item">
            {coupons}
          </section>
        </Tab>
        <Tab eventKey="coupon-used" title="已使用">
          <section className="coupon--item">
            {usedCoupons}
          </section>
        </Tab>
      </Tabs>
      }

    </div >
  )
}