import React from "react";
import logo from "../assets/images/logo.png";
const AccountType = ({ setOpenSignIn, setOpenRegister }) => {
  const handleToggle = () => {
    setOpenSignIn(false);
    setOpenRegister(true);
  };
  return (
    <div  className="overlay-modal flex">
      <div className="modal-login">
        <div className="x-mark">
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div
          className="sign-column-logo items-start justify-center mt-[25px]"
        >
          <div className="logo-align bg-none">
            <img src={logo} alt="logo" />
          </div>
          <div className="sign-text">
            Hoş geldiniz
            <br />
            <span  className="text-[16px] ">
              borvey Platfomu’nda ilk olarak ne yapmak istersiniz?
            </span>
          </div>
          <div className="sign-alt-text"></div>
        </div>
        <div className="login-form-container pop-up-links-container-sign">
          <a className="xmargk">
            <div className="pop-up-links">
              Hizmet Almak
              <br /> İstiyorum
            </div>
          </a>
          <a className="xmargk">
            <div className="pop-up-links">
              Hizmet Vermek
              <br /> İstiyorum
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AccountType;
