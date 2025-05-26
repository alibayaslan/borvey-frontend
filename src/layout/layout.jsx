/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../components/SideBar";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import style from "./layout.module.scss";
import Logo from "../assets/images/logo.png";
import { MenuArrowIcon, MenuIcon, SignoutIcon } from "../assets/icon";
import { NotificationButton, UserChip } from "../components";
import Avatar from "../assets/images/avatar.png";
import useWindowDimensions from "../utils/windowWidth";
import { logoutUser } from "../redux/actions";

const ServiceMenuData = [
  {
    title: "İlanlar",
    path: "/ilanlar",
    icon: <MenuIcon type={"ilanlar"} />,
  },
  {
    title: "Tekliflerim",
    path: "/tekliflerim",
    icon: <MenuIcon type={"teklifler"} />,
  },
  {
    title: "Mesaj",
    path: "/mesaj",
    icon: <MenuIcon type={"mesaj"} />,
  },
  {
    title: "Yorumlar",
    path: "/yorumlar",
    icon: <MenuIcon type={"yorumlar"} />,
  },
  {
    title: "Ayarlar",
    path: "/firma-bilgileri",
    icon: <MenuIcon type={"ayarlar"} />,
    subMenu: [
      {
        title: "Firma Bilgileri",
        path: "/firma-bilgileri",
      },
      {
        title: "Profil",
        path: "/profil",
      },
      {
        title: "Güvenlik ve Şifre",
        path: "/guvenlik",
      },
    ],
  },
];

const UserMenuData = [
  {
    title: "İlanlar",
    path: "/ilanlarim",
    icon: <MenuIcon type={"ilanlar"} />,
  },

  {
    title: "Teklifler",
    path: "/teklifler",
    icon: <MenuIcon type={"teklifler"} />,
  },
  {
    title: "Mesaj",
    path: "/mesaj",
    icon: <MenuIcon type={"mesaj"} />,
  },
  {
    title: "Ayarlar",
    path: "/profil",
    icon: <MenuIcon type={"ayarlar"} />,
    subMenu: [
      {
        title: "Profil",
        path: "/profil",
      },
      {
        title: "Güvenlik ve Şifre",
        path: "/guvenlik",
      },
    ],
  },
];

const SideBar = ({ userInfo, closePress, logoutClick }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentLocation = location.pathname;

  const menuData = userInfo.type === "service" ? ServiceMenuData : UserMenuData;

  const sidebarRef = useRef(null); // Sidebar referansı

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Eğer tıklama sidebar dışında gerçekleşmişse
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        console.log("Sidebar dışına tıklandı!");
        closePress();
        // Burada istediğiniz işlemi gerçekleştirin (örneğin, sidebar'ı kapatma)
      }
    };

    // Pencereye tıklama dinleyicisi ekleyin
    document.addEventListener("mousedown", handleClickOutside);

    // Bileşen unmount olduğunda dinleyiciyi temizleyin
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      className={`${style.sideBar} ${
        userInfo.type === "personal" ? style.personalWrapper : null
      }`}
      ref={sidebarRef}
    >
      <a href={userInfo.type === "personal" ? "/ilanlarim" : "/ilanlar"}>
        <img src={Logo} />
      </a>
      <ul className={style.menu}>
        {menuData.map((item) => {
          return (
            <>
              <li
                className={`${style.item} ${
                  item.path === currentLocation ||
                  (item.subMenu &&
                    item.subMenu.map((i) => i.path).includes(currentLocation))
                    ? style.activeItem
                    : null
                }`}
              >
                <div className={style.itemWrapper}>
                  <span>{item.icon}</span>
                  <a href={item.path}>{item.title}</a>
                </div>
                {item.subMenu ? (
                  <button className={style.arrowButton}>
                    {<MenuArrowIcon />}
                  </button>
                ) : null}
              </li>
              {item.subMenu &&
              (item.path === currentLocation ||
                item.subMenu.map((i) => i.path).includes(currentLocation)) ? (
                <ul className={style.subMenu}>
                  {item.subMenu.map((i) => {
                    return (
                      <li className={style.subItem}>
                        <div
                          className={`${style.circle} ${
                            currentLocation === i.path
                              ? style.activeCircle
                              : null
                          }`}
                        />
                        <a href={i.path}>{i.title}</a>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </>
          );
        })}
      </ul>
      <div className={style.userCard}>
        <div className={style.user}>
          <img src={userInfo.avatar ? userInfo.avatar : Avatar} />
          <p>{userInfo.name + " " + userInfo.surname}</p>
        </div>
        <button onClick={() => logoutClick()}>
          <SignoutIcon />
        </button>
      </div>
    </div>
  );
};

const Layout = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const [isSidebar, setSidebar] = useState(false);
  const { width } = useWindowDimensions();
  const location = useLocation();
  const currentLocation = location.pathname;

  const menuData = userInfo.type === "service" ? ServiceMenuData : UserMenuData;

  const currentPath = menuData.filter(
    (item) =>
      item.path === currentLocation ||
      (item.subMenu &&
        item.subMenu.map((i) => i.path).includes(currentLocation))
  );

  return (
    <div className={style.wrapper}>
      {isSidebar || width > 960 ? (
        <SideBar
          logoutClick={() => {
            localStorage.removeItem("token");
            dispatch(logoutUser());
          }}
          userInfo={userInfo}
          closePress={() => setSidebar(false)}
        />
      ) : null}
      {isSidebar && width < 960 ? <div className={style.shadow} /> : null}
      <div className={style.contentCard}>
        <div className={style.topBar}>
          <div className={style.title}>
            {/* <span>
              <MenuArrowIcon />
            </span> */}
            <h2>
              {currentPath && currentPath.length ? currentPath[0].title : ""}
            </h2>
          </div>
          <div className={style.right}>
            <NotificationButton
              userInfo={userInfo}
              hamburgerClick={() => setSidebar(true)}
              width={width}
            />
            <UserChip data={userInfo} />
          </div>
        </div>
        <div className={style.contentWrapper}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
