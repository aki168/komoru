import { logout } from "../../App";
import "./Navbar-bg-white.css";
import { Button } from "react-bootstrap";

const token = localStorage.token;

export default function Navbar() {
  return (
    <nav className="navbar--bgWhite">
      <h1>
        <a className="navbar--title" href="/">
          <img className="navbar--logo" src="../KOMORU_LOGO_OG.png" alt="LOGO"></img>
        </a>
      </h1>
      <ul className="navbar--menu">
        <li>
          <a className="navbar--item--bgWhite" href="/hotelIntro">
            房型介紹
          </a>
        </li>
        <li>
          <a className="navbar--item--bgWhite" href="/">
            聯絡我們
          </a>
        </li>
        <li>
          <a className="navbar--item--bgWhite" href="/user">
            會員中心
          </a>
        </li>
        <li>
          <a className="navbar--item--bgWhite" href="/bookingHomepage">
            即刻預定
          </a>
        </li>
        <li>
          <a className="navbar--item--bgWhite" href="/">
            EN | TW
          </a>
        </li>
        <li>
          {token&& 
            <Button variant="secondary" size="sm" onClick={logout}>
              登出
            </Button>
          }
        </li>
      </ul>
    </nav>
  );
}
