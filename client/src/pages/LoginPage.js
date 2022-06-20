import React from 'react';
import Navbar from '../components/Navbar';
import Confirm from '../components/Confirm'
import Login from '../components/Login';


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