import React from "react"
import './Navbar.css'


export default function Navbar() {
  return (
    <nav className="navbar">
      <h1><a className="navbar--title" href="/">KOMORU;</a></h1>
      <ul className="navbar--menu">
        <li><a className="navbar--item" href="/">房型介紹</a></li>
        <li><a className="navbar--item" href="/">聯絡我們</a></li>
        <li><a className="navbar--item" href="/login">會員中心</a></li>
        <li><a className="navbar--item" href="/">即刻預定</a></li>
        <li><a className="navbar--item" href="/">EN | TW</a></li>
      </ul>
    </nav>
  )
}

