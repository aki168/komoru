import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Confirm from '../../components/Confirm/Confirm'
import Login from '../../components/Login/Login';


export default function Register() {



  return (
    <div className='wrap'>
      <Navbar />
      <div className='container'>
        <Login />
        <Confirm />
      </div>
    </div>
  )
}