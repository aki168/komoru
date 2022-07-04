import React from 'react';
import Navbar from '../../components/Navbar/Navbar-simple';
import Confirm from '../../components/Confirm/Confirm'
import Login from '../../components/Login/Login';
import '../../components/Login/Login.css'


export default function Register() {



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