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
    }})
    
    

  return (
    <div className='wrap'>
        <Navbar />
      <div className='User--container'>
        <Coupon />
      </div>
    </div>
  )
}