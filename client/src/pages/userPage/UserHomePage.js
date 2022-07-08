import Navbar from '../../components/Navbar/Navbar-bg-white'
import UserPage from './userPage'
import OrderPage from './OrderPageUserZone'
import FeedbackPage from './FeedbackPage'
import CouponPage from './CouponPage'
import Menu from '../../components/User/Menu'

import '../../components/User/User.css'
import { Route,Routes } from 'react-router-dom'

export default function UserHomePage() {





  return (
    <div className='User--wrap'>
      <Navbar />
      <div className='User--titleBar'>
        <h2>簡單、多功能的會員中心系統</h2>
        <p className='pt-3 fs-5'>KOMORU 協助你輕鬆創管理你的會員資料、瀏覽你的下訂紀錄，探索更多元的自己！</p>
      </div>
      <div className='User--container'>
        <div className='User'>
          <Menu />

            <Routes>
              <Route path="/user" component={UserPage} />
              <Route path="/member-order" component={OrderPage} />
              <Route path="/member-feedback" component={FeedbackPage} />
              <Route path="/member-coupon" component={CouponPage} />
            </Routes>

        </div>
      </div>
    </div>
  )


}