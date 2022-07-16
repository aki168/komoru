import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { loginOrNot } from '../App';
import ActionAreaCard from '../components/Card/Card';
import Example from '../components/Carousel/Carousel';
import QuiltedImageList from '../components/ImageList/ImageList';
import APP from '../components/ScrollToTop/ScrollToTop'

import "../pages/Home.css"


export default function Home() {
  return (
    <div className='wrap'>
      <Navbar />
      <div className='Homepic'>
        <Example />
      </div>

      <div className='container-xxl'>
        <div className='row'>
          <div className='col'>
            <button onClick={loginOrNot}></button>

            <div className='about'>
              <h2 style={{ color: '#ED8C4E', textAlign: 'center' }}>ABOUT</h2>
              <br />
              <p className='aboutwords' >KOMORU為亞洲最大的複合式訂房網集結下定、活動以及員系統為會員系統為及會員系統為一集結下定、活動以及會員系統活動以及會員系統式訂房的複合式訂房網集結下定、活動以及會員系統為一身
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
            
            <br />
            <br />
            <h2 style={{ color: '#ED8C4E', textAlign: 'left' }}>ROOM</h2>
            <br />
            <p className='RoomWords' >KOMORU為亞洲最大的複合式訂房網集結下定、活動以及員系統為會員系統為及會員系統為一集結下定、活動以及會員系統活動以及會員系統式訂房的複合式訂房網集結下定、活動以及會員系統為一身
            </p>
            <div className='RoomList'>
              <QuiltedImageList />
            </div>

            <br />
            <br />
            <br />
            <br />

          </div>
          <div className='HomeFooter'>
            <Footer />
          </div>
<div className='ScrollTop'>
<APP />
  
</div>

        </div>


      </div>
    </div>


  )
}