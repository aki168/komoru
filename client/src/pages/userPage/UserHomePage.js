import Navbar from '../../components/Navbar/Navbar-bg-white'
// import UserPage from './userPage'
// import OrderPage from './OrderPageUserZone'
// import FeedbackPage from './FeedbackPage'
// import CouponPage from './CouponPage'
// import User from '../../components/User/User'
import Menu from '../../components/User/Menu'

import UserHeader from '../../components/User/UserHeader'
import UserSubHeader from './UserSubHeader'
import '../../components/User/User.css'
// import { Route,Routes } from 'react-router-dom'

export default function UserHomePage() {





  return (
    <div className='User--wrap'>
      <Navbar />
      <UserHeader />
      <div className='User--container'>
        <div className='User'>
          <Menu />  
          <UserSubHeader />
        </div>
      </div>

    </div>
  )


}