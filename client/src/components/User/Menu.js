import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import './User.css'


export default function Menu() {
  
  const [isClicked, setIsClicked]=useState()
  
  function handleClick(e){
    e.preventDefault()
    setIsClicked(prevClicked => !prevClicked)
    
  }

  return (
    <ul className="user--menu">
      <li><Link to="/user" onClick={handleClick} className="menu--item--on">基本資料</Link></li>
      <li><Link to="/member-order" onClick={handleClick} className="menu--item">訂單記錄</Link></li>
      <li><Link to="/member-feedback" onClick={handleClick} className="menu--item">活動回饋</Link></li>
      <li><Link to="/member-coupon" onClick={handleClick} className="menu--item">優惠表單</Link></li>
    </ul>
  )
}