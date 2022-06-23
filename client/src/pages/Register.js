import React from 'react';
import Navbar from '../components/Navbar';
import SignIn from '../components/SignIn';
import Confirm from '../components/Confirm'

export default function Register() {
  return (
    <div className='wrap'>
      <Navbar />
      <div className='container'>
        <SignIn />
        <Confirm />
      </div>
    </div>
  )
}