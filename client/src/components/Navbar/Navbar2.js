import { logout } from "../../App";
import "./Navbar.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>
        <Link className="navbar--title" to="/">
          KOMORU;
        </Link>
      </h1>
      <ul className="navbar--menu">
        <li>
          <Link className="navbar--item" to="/hotelIntro">
            房型介紹
          </Link>
        </li>
        <li>
          <Link className="navbar--item" to="/contactUs">
            聯絡我們
          </Link>
        </li>
        <li>
          <Link className="navbar--item" to="/user">
            會員中心
          </Link>
        </li>
        <li>
          <Link className="navbar--item" to="/bookingHomepage">
            即刻預定
          </Link>
        </li>
        <li>
          <Link className="navbar--item" to="/">
            EN | TW
          </Link>
        </li>
        <li>
          <Button variant="secondary" size="sm" onClick={logout}>
            測試用登出
          </Button>
        </li>
      </ul>
    </nav>
  );
}
