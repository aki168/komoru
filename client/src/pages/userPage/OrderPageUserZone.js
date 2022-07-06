import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import '../../components/User/User.css'
import OrderList from '../../components/User/OrderList'
import axios from 'axios'
import { Button } from 'react-bootstrap'


export default function OrderPage() {

  const [orderData, setOrderData] = useState([])
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
    // if(userData){
    axios({
      method: "post",
      url: "http://localhost:5000/order/getOrderDataByMemberId",
      data: {
        token: localStorage.token
      }
    }).then((res) => {
      if (res.data.dataList.length) {
        let postOrderData = res.data.dataList;
        setOrderData(postOrderData)//想辦法把值取出來
        setIsOrder(true)
      }
      console.log(res.data.dataList)
    }).catch((err) => {
      console.log(err)
    })
    // }
  }, [])

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
              <div class="card--title">
                <h3>訂單歷史紀錄</h3>
                <p>完整的訂單記錄，讓你方便查看所有訂單內容，每一次都將有不同的體驗！</p>
              </div>
              <img className="img-fluid mb-4 w-100" src="https://dummyimage.com/1000x200/F2EAE4/ED8C4E.png&text=banner" alt="profile-banner" />
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
              <img className="img-fluid mb-4 w-100" src="https://dummyimage.com/1000x200/F2EAE4/ED8C4E.png&text=banner" alt="profile-banner" />
              {orders}
            </div>
          }

        </div>
      </div>
    </div>
  )
}

// HotelId: 1
// hotelAddr: "台中市西區公益路68號15樓"
// hotelTel: "+886 4 2321-9696"
// hotelTitle: "Star Hostel"
// memberId: 1
// memberName: "陳小明"
// orderId: 1
// orderNumber: "1111"
// orderStartDate: "2022-06-17"
// orderStatus: "0"
// roomDesc: "台中市 Star Hostel/私人套房"
// stayNight: 1