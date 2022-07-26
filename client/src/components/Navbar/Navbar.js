import { logout } from "../../App";
import "./Navbar.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fontWeight } from "@mui/system";
import { IconName } from "react-icons/io";


export default function Navbar() {

  const token = localStorage.token;

  return (

    <div className="container-fluid navbar sticky-top">
      <div className="row " style={{ width: "100%" }}>


        <div className="col d-flex  align-self-center">

            {/* 側邊的導覽列 */}
            <div className="order-xl-2" style={{display: 'inline-block' }}>
          <ul className="navbar--menu d-none d-xl-flex">
            <li className="li--marginright">
              <Link className="navbar--item" to="/bookingHomepage" style={{ color: "#ED8C4E", fontWeight: "bolder" }}>
                即刻預訂
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
                <Button variant="white" size="lg" onClick={logout} style={{ color: "#ED8C4E" }}>
                  Log out
                </Button>
              )}
            </li>
          </ul>
          <button className="navbar-toggler d-block d-xl-none"  type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span >
              <img src="menu-outline.svg" style={{width:'45px'}}></img> 
            </span>
            <span></span>
          </button>

          <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h3 className="offcanvas-title" id="offcanvasNavbarLabel">
                <Link style={{marginLeft: '18px'}} to="/">
                  <img style={{ width: '180px' }}
                    className="navbar--logo"
                    src="KOMORU_LOGO_Home.png"
                    alt="LOGO"
                  ></img>
                </Link>
              </h3>
              <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className=" avbar-nav justify-content-end flex-grow-1 pe-3" style={{
                listStyle: "none"
              }}
              >
                <li className="li--marginright nav-item">
                  <Link className="navbar--item nav-link" to="/bookingHomepage" style={{ color: "#ED8C4E", fontWeight: "bolder" }}>即刻預訂</Link>
                </li>
                <li className="li--marginright nav-item">
                  <Link className="navbar--item nav-link" to="/hotelIntro">合作飯店</Link>
                </li>
                <li className="li--marginright nav-item">
                  <Link className="navbar--item nav-link " to="/user-home">會員中心</Link>
                </li>
                <li className="li--marginright nav-item">
                  <Link className="navbar--item nav-link" to="/contactUs">聯絡我們</Link>
                </li>

              </ul>






            </div>
          </div>

            </div>
          <h1 className="order-xl-1 me-lg-auto" style={{display: 'inline-flex',alignItems:'center'}}>
            <Link className="LogoContent ms-5" to="/">
              <img style={{ width: '200px' }}
                className="navbar--logo"
                src="KOMORU_LOGO_Home.png"
                alt="LOGO"
              ></img>
            </Link>
          </h1>
        
        </div>
       
      </div>


    </div>

  );
}
