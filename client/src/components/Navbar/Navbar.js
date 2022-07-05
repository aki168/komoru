import { logout } from "../../App";
import "./Navbar.css";
import { Button } from "react-bootstrap";

const token = localStorage.token;

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>
        <a className="navbar--title" href="/">
          <img
            className="navbar--logo"
            src="KOMORU_LOGO_White.png"
            alt="LOGO"
          ></img>
        </a>
      </h1>
      <ul className="navbar--menu">
        <li>
          <a className="navbar--item" href="/hotelIntro">
            房型介紹
          </a>
        </li>
        <li>
          <a className="navbar--item" href="/contactUs">
            聯絡我們
          </a>
        </li>
        <li>
          <a className="navbar--item" href="/user">
            會員中心
          </a>
        </li>
        <li>
          <a className="navbar--item" href="/bookingHomepage">
            即刻預定
          </a>
        </li>
        <li>
          <a className="navbar--item" href="/">
            EN | TW
          </a>
        </li>
        <li>
          {token && (
            <Button variant="secondary" size="sm" onClick={logout}>
              登出
            </Button>
          )}
        </li>
      </ul>
    </nav>
  );
}
