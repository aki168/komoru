import Navbar from '../../components/Navbar/Navbar-bg-white'
import Menu from '../../components/User/Menu'
import UserHeader from '../../components/User/UserHeader'
import UserSubHeader from './UserSubHeader'
import '../../components/User/User.css'

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