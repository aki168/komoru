import React,{useState} from 'react'
import './User.css'


export default function Menu() {
  
  const [isClicked, setIsClicked]=useState()
  
  function handleClick(e){
    e.preventDefault()
    setIsClicked(prevClicked => !prevClicked)
    
  }

  return (
    <ul className="user--menu">
      <li><a href="/" onClick={handleClick} className={isClicked}>基本資料</a></li>
      <li><a href="/" onClick={handleClick} className={isClicked}>訂單記錄</a></li>
      <li><a href="/" onClick={handleClick} className={isClicked? 'menu--item' : 'menu--item--on'}>活動回饋</a></li>
      <li><a href="/" onClick={handleClick} className={isClicked? 'menu--item' : 'menu--item--on'}>優惠表單</a></li>
    </ul>
  )
}