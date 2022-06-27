import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Confirm from '../../components/Confirm/Confirm'
import ForgotPW from '../../components/ForgotPW/ForgotPW';

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