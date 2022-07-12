import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar-simple';
import Confirm from '../../components/Confirm/Confirm'
import Login from '../../components/Login/Login';
import '../../components/Login/Login.css'


export default function LoginPage() {

    //0712 aki - 若有token則跳轉首頁
    let navigate = useNavigate()
    useEffect(() => {
      if (localStorage.token) {
        navigate('/', { replace: true })
      }
    }, [])



  return (
    <div className='login--wrap'>
      <Navbar />
      <div className='login--container'>
        <Login />
        <Confirm />
      </div>
    </div>
  )
}