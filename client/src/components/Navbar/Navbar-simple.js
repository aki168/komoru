// import { logout } from "../../App";
import "./Navbar.css";
// import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>
        <Link className="navbar--title" to="/">
          <img
            className="navbar--logo"
            src="KOMORU_LOGO_White.png"
            alt="LOGO"
          ></img>
        </Link>
      </h1>
      {/* <ul className="navbar--menu">
        <li>
          <a className="navbar--item" href="/">
            房型介紹
          </a>
        </li>
        <li>
          <a className="navbar--item" href="/">
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
          <Button variant="secondary" size="sm" onClick={logout}>
            測試用登出
          </Button>
        </li>
      </ul> */}
    </nav>
  );
}
