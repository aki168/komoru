import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import '../../components/User/OrderList/OrderList.css'
import OrderList from '../../components/User/OrderList/OrderList'
import axios from 'axios'
import { Button } from 'react-bootstrap'


export default function OrderPage() {

  const [orderData, setOrderData] = useState([])
  // const [orderItemData, setOrderItemData] = useState([])
  const [isOrder, setIsOrder] = useState(false)


  //0623 aki - 若沒有token則跳轉登入頁
  let navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.token) {
      navigate('/login', { replace: true })
    }
  })

  //  0628 aki 抓取該會員的訂單記錄
  useEffect(() => {
    
    axios({
      method: "post",
      url: "http://localhost:5000/order/getOrderDataByMemberId",
      data: {
        token: localStorage.token
      }
    }).then((res) => {
      if (res.data.dataList.length) { //訂單資料 by 會員
        let postOrderData = res.data.dataList;
        setOrderData(postOrderData)
        setIsOrder(true)
      }
      console.log(res)


    }).catch((err) => {
      console.log(err)
    })
    
  }, [])

  console.log(orderData)


  // 0629 aki 接收到的資料設定入元件
  const orders = orderData.map(item => {
    return (
      <OrderList
        key={item.orderId}
        isOrder={isOrder}
        {...item}
      />
    )
  })

    // // 0707 aki 接收到的資料設定入元件
    // const orderItems = orderItemData.map(item => {
    //   return (
    //     <OrderItems 
    //       key={item.activePackId}
    //       {...item}
    //     />
    //   )
    // })

  const toBooking = () => {
    navigate('/bookingHomepage', { replace: true })
  }


  return (
    <div className='User--wrap'>
      <Navbar />
      <div className='User--container'>
        <div className="OrderList">
          <ul className="OrderList--menu">
            <li><a href="/user" className="menu--item">基本資料</a></li>
            <li><a href="/member-order" className="menu--item--on">訂單記錄</a></li>
            <li><a href="/member-feedback" className="menu--item">活動回饋</a></li>
            <li><a href="/member-coupon" className="menu--item">優惠表單</a></li>
          </ul>

          {!isOrder &&  // 若無任何訂單的畫面
            <div className="OrderList--card--none">
              <div className="card--title">
                <h3>訂單歷史紀錄</h3>
                <p>完整的訂單記錄，讓你方便查看所有訂單內容，每一次都將有不同的體驗！</p>
              </div>
              <img className="img-fluid mb-4 w-100" src="komoru_member.png" alt="profile-banner" />
              <section>
                <h2>目前沒有訂單紀錄，現在就開始旅程！</h2>
                <Button className="user--btn--M mt-3 fs-3" onClick={toBooking}>
                  前往預定
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
                  </svg>
                </Button>
              </section>

            </div>
          }

          {isOrder &&  // 訂單記錄畫面
            <div className="OrderList--card">
              <div class="card--title">
                <h3>訂單歷史紀錄</h3>
                <p>完整的訂單記錄，讓你方便查看所有訂單內容，每一次都將有不同的體驗！</p>
              </div>
              <img className="img-fluid mb-4 w-100" src="komoru_member.png" alt="profile-banner" />
              {orders}
            </div>
          }

        </div>
      </div>
    </div>
  )
}
