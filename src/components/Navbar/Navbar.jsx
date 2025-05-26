/* eslint-disable no-unused-vars */
import { useState } from "react";
import logo from "../../assets/images/logo.png";
import profile from "../../assets/images/profile1.png";
import { Link } from "react-router-dom";
import MobileNavbar from "./MobileNavbar";
import style from "./navbar.module.scss";
import useWindowDimensions from "../../utils/windowWidth";
import { HamburgerIcon } from "../../assets/icon";
import UserChip from "../UserChip/UserChip";
import NotificationButton from "../NotificationButton/NotificationButton";

const Navbar = ({ isOpen, setOpen, data, loading, userInfo }) => {
  const [isNav, setNav] = useState(false);
  const { width } = useWindowDimensions();

  return (
    <>
      <div className={style.wrapper}>
        <header className={style.header}>
          <a className={style.logo} href="/">
            <img src={logo} alt="Borvey Logo" /> {/* Alt metni eklendi */}
          </a>
          {width > 960 ? (
            <ul className={style.buttonList}>
              {userInfo.token ? (
                <>
                  <NotificationButton
                    userInfo={userInfo}
                    width={width}
                    homepage
                  />
                  <UserChip data={userInfo} />
                </>
              ) : (
                <>
                  <li>
                    <a href="/kayit-ol?type=customer" className={style.primary}>
                      Hizmet Al
                    </a>
                  </li>
                  <li>
                    <a
                      href="/kayit-ol?type=service"
                      className={style.secondary}
                    >
                      Hizmet Ver
                    </a>
                  </li>
                  <li>
                    <a href="/login" className={style.third}>
                      Giriş Yap
                    </a>
                  </li>
                </>
              )}
            </ul>
          ) : (
            <button
              className={style.hamburgerButton}
              onClick={() => setNav(!isNav)}
              aria-label={isNav ? "Menüyü kapat" : "Menüyü aç"}
            >
              <HamburgerIcon isOn={isNav} />
            </button>
          )}
        </header>
        {width < 960 && isNav ? (
          <div className={style.mobileMenu}>
            <ul className={style.buttonList}>
              <li>
                <a href="/kayit-ol?type=service" className={style.primary}>
                  Hizmet Ver
                </a>
              </li>
              <li>
                <a href="/kayit-ol?type=customer" className={style.secondary}>
                  Hizmet Al
                </a>
              </li>
              <li>
                <a href="/login" className={style.third}>
                  Giriş Yap / Üye Ol
                </a>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Navbar;
