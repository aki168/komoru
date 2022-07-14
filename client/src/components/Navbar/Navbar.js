import { logout } from "../../App";
import "./Navbar.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fontWeight } from "@mui/system";


export default function Navbar() {
  
  const token = localStorage.token;
  
  return (
    <div className="container-fluid navbar sticky-top">
      <h1>
        <Link className="navbar--title" to="/">
          <img
            className="navbar--logo"
            src="KOMORU_LOGO_Home.png"
            alt="LOGO"
          ></img>
        </Link>
      </h1>
      <ul className="navbar--menu">
        <li >
          <Link className="navbar--item" to="/bookingHomepage" style={{ color: "#ED8C4E" ,fontWeight:"bolder" }}>
            即刻預定
          </Link>
        </li>
        <li>
          <Link className="navbar--item" to="/hotelIntro">
            合作飯店
          </Link>
        </li>
        <li>
          <Link className="navbar--item" to="/user-home">
            會員中心
          </Link>
        </li>
        <li>
          <Link className="navbar--item" to="/contactUs">
            聯絡我們
          </Link>
        </li>
        <li className="logout">
          {token && (
            // 改不掉按鈕樣式
            <Button variant="white" size="lg" onClick={logout} style={{ color: "#ED8C4E" }}>
              LOG 
            </Button>
          )}
        </li>
      </ul>
    
    </div>
  );
}
