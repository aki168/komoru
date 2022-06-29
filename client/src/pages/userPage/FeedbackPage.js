import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import '../../components/User/User.css'
import Feedback from '../../components/User/Feedback'


export default function FeedbackPage() {

  //0623 aki - 若沒有token則跳轉登入頁
  let navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.token) {
      navigate('/login', { replace: true })
    }})
    
    

  return (
    <div className='wrap'>
        <Navbar />
      <div className='User--container'>
        <Feedback />
      </div>
    </div>
  )
}