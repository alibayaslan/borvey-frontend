/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import profile from "../assets/images/profile1.png";
import { Link } from "react-router-dom";
const SideBar = ({ data, loading }) => {
  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <div className="sidebar-container">
      <div className="sidebar-profile-section">
        <div className="side-profile">
          {data?.image ? (
          <img width="50px" src={data?.image} alt="profile-img" />
          ) : (
            <img width="50px" src={profile} alt="profile-img" />
         )}
        </div>
        <div className="side-profile-title">
          {data?.fullName}
          <br />
          <a>{data?.email}</a>
        </div>
      </div>
      <div className="sidebar-links-container">
        <Link to="/dashboard" >
          <i className="fa-regular fa-user"></i> Kişisel Bilgiler
        </Link>
        {data?.type === 1 && (
          <Link to="/company" >
          <i class="fa-solid fa-suitcase"></i> Firma Bilgilerim
        </Link>
        )}
        <Link to="/security">
          <i className="fa-solid fa-lock"></i> Şifre ve Güvenlik
        </Link>
        <Link to="/myservices/active">
          <i className="fa-solid fa-bars-progress"></i> İlanlarım
        </Link>
        {data?.type === 2 && (
          <Link to="/offers">
          <i className="fa-regular fa-user"></i> Gelen Teklifler
        </Link>
        )}
        <Link to="/message">
          <i className="fa-regular fa-envelope"></i> Mesaj kutusu
        </Link>

        <button onClick={handleLogOut} className="cursor-pointer">
          <i className="fa-solid fa-arrow-right-from-bracket"></i> Çıkış Yap
        </button>
      </div>
    </div>
  );
};

export default SideBar;
