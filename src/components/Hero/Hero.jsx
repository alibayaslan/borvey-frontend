/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import heroImage from "../../assets/images/home-img.png";
import style from "./hero.module.scss";

const Hero = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.hero}>
        <div className={style.left}>
          <h1>
            borvey <br />
            ile taşınmak <span>hesaplı</span>
            <br />
            ve <span>kolay!</span>
          </h1>
          <p>
            Güvenilir bir nakliyeci bulmanın pizza siparişi vermek kadar kolay olduğu bir dünyayı hayal edin...
          </p>
          <div className={style.buttonWrapper}>
            <a href="/kayit-ol" className={style.primary}>
              Nakliyeci Ara
            </a>
            <a href="/kayit-ol?type=service" className={style.secondary}>
              Aracına Yük Bul
            </a>
          </div>
        </div>
        <div className={style.right}>
          <img src={heroImage} 
          alt="Nakliye için kolay ve ekonomik taşımacılık platformu"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
