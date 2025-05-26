/* eslint-disable jsx-a11y/alt-text */
import Avatar from "../../assets/images/avatar.png";
import { CloseIcon, UserChipArrow } from "../../assets/icon";
import style from "./userchip.module.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions";

const Popup = ({ closeClick, avatar, name, email, userType }) => {
  console.log("usertype", userType);
  const dispatch = useDispatch();
  return (
    <div className={style.popup}>
      <div className={style.top}>
        <div className={style.user}>
          <img src={avatar} />
          <div className={style.title}>
            <h5>{name}</h5>
            <p>{email}</p>
          </div>
        </div>
        <button onClick={closeClick}>
          <CloseIcon />
        </button>
      </div>
      <ul className={style.menu}>
        <li>
          <a href={userType === "service" ? "/ilanlar" : "/ilanlarim"}>
            Anasayfa
          </a>
        </li>
        <li>
          <a href="/profil">Profil</a>
        </li>
        <li className={style.signOut}>
          <button
            onClick={() => {
              dispatch(logoutUser());
              localStorage.removeItem("token");
            }}
          >
            Çıkış Yap
          </button>
        </li>
      </ul>
    </div>
  );
};

const UserChip = ({ data }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div
      className={`${style.container} ${
        data.type === "personal" ? style.personalWrapper : null
      }`}
    >
      <div onClick={() => setOpen(true)} className={style.wrapper}>
        <div className={style.avatar}>
          <img src={data.avatar ? data.avatar : Avatar} />
        </div>
        <div className={style.title}>
          <h5>{data.name + " " + data.surname}</h5>
          <h6>
            {data.type === "personal"
              ? "Hizmet Alan Kullanıcı"
              : "Hizmet Veren Kullanıcı"}{" "}
          </h6>
        </div>
        <button className={style.arrow}>
          <UserChipArrow />
        </button>
      </div>
      {isOpen ? (
        <Popup
          name={data.name + " " + data.surname}
          avatar={data.avatar ? data.avatar : Avatar}
          closeClick={() => setOpen(false)}
          email={data.email}
          userType={data.type}
        />
      ) : null}
    </div>
  );
};

export default UserChip;
