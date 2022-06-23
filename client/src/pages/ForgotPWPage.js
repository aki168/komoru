import React from 'react';
import Navbar from '../components/Navbar';
import Confirm from '../components/Confirm'
import ForgotPW from '../components/ForgotPW';

export default function ForgotPWPage() {
  return (
    <div className='wrap'>
      <Navbar />
      <div className='container'>
        <ForgotPW />
        <Confirm />
      </div>
    </div>
  )
}