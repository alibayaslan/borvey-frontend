/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
import React from "react";
import { Link } from "react-router-dom";

const MobileNavbar = ({ data, profile, setOpen, isOpen }) => {
  return (
    <div className="bg-white p-4">
      <div className="nav-link"></div>
      {data ? (
        <div className="nav-link-button gap-2 mt-2">
          <Link
            to="/dashboard"
            className="classic-btn profile-btn"
            aria-label={`${data?.fullName}'in profilini görüntüle`}
          >
            <img
              width="30px"
              src={profile}
              alt={data?.fullName ? `${data?.fullName}'in profil fotoğrafı` : "Profil fotoğrafı"}
            />
            {data?.fullName} <i className="fa-solid fa-angle-down"></i>
          </Link>
          {data?.type == 2 && (
            <Link className="l-btn" to="/create-order" aria-label="İlan verme sayfasına git">
              İlan ver
            </Link>
          )}
          {data?.type == 1 && (
            <Link className="l-btn" to="/order-list" aria-label="Yük arama sayfasına git">
              Yük ara
            </Link>
          )}
        </div>
      ) : (
        <div className="nav-link-button gap-2 mt-2">
          <a
            className="classic-btn sign-btn"
            onClick={() => setOpen(!isOpen)}
            aria-label="Giriş yap veya üye ol"
          >
            Giriş Yap / Üye Ol
          </a>
          <a
            className="l-btn"
            onClick={() => setOpen(!isOpen)}
            style={{ cursor: "pointer" }}
            aria-label="Hizmet almak için açılır menü"
          >
            Hizmet Al
          </a>
          <a
            className="r-btn"
            onClick={() => setOpen(!isOpen)}
            style={{ cursor: "pointer" }}
            aria-label="Hizmet vermek için açılır menü"
          >
            Hizmet Ver
          </a>
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
