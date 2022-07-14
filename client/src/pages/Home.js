import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { loginOrNot } from '../App'
import ActionAreaCard from '../components/Card/Card';
import Example from '../components/Carousel/Carousel';
import QuiltedImageList from '../components/ImageList/ImageList'

import "../pages/Home.css"


export default function Home() {
  return (
    <div className='wrap'>
      <Navbar />
      <div className='Homepic'>
          <Example />
      </div>
     
      <div className='container-xxl'>

        <button onClick={loginOrNot}>是否有登入，有的話回傳檔案在res.data[0]</button>

      <div className='about'>
        <h2  style={{color:'#ED8C4E',textAlign:'center'}}>ABOUT</h2>
        <br />
        <p  className='aboutwords' style={{Align:'center'}}>KOMORU為亞洲最大的複合式訂房網，集結下定、活動以及會員系統為一身，KOMORU為亞洲最大的複合式訂房網，集結下定、活動以及會員系統為一身，KOMORU為亞洲最大的複合式訂房網，集結下定、活動以及會員系統為一身，KOMORU為亞洲最大的複合式訂房網，集結下定、活動以及會員系統為一身，KOMORU為亞洲最大的複合式訂房網，集結下定、活動以及會員系統為一身，KOMORU為亞洲最大的複合式訂房網，集結下定、活動以及會員系統為一身，KOMORU為亞洲最大的複合式訂房網，集結下定、活動以及會員系統為一身，KOMORU為亞洲最大的複合式訂房網，集結下定、活動以及會員系統為一身，KOMORU為亞洲最大的複合式訂房網，集結下定、活動以及會員系統為一身，
        </p>
      </div>
        <div className='Komoruthree'>

          <div>
            <ActionAreaCard />
          </div>

          <div>
            <ActionAreaCard />
          </div>

          <div>
            <ActionAreaCard />
          </div>

        </div>
        <br />
        <br />
        {/* <div className='Homepic'>
          <Example />
        </div> */}
        <br />
        <br />

        <div className='RoomList'>
          <QuiltedImageList />
        </div>

        <br />
        <br />
        <br />
        <br />
        
      </div>
      <div>
          <Footer />
        </div>
    </div>
  )
}