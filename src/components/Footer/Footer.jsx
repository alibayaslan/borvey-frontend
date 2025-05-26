/* eslint-disable react/jsx-no-target-blank */

import React from "react";
import style from "./footer.module.scss";
import LogoWhite from "../../assets/images/logo-white.png";
import FooterImage from "../../assets/images/footer-image.png";
import { SocialMediaIcon } from "../../assets/icon";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const greyPath = ["/cookies", "/help", "/contact"];

  return (
    <footer
      className={`${style.footer} ${
        greyPath.includes(location.pathname) ? style.grey : null
      }`}
    >
      <div className={style.imageWrapper}>
        <img src={FooterImage} alt="Borvey uygulaması ile ilgili açıklayıcı görsel" />
      </div>
      <div className={style.contentWrapper}>
        <div className={style.content}>
          <a className={style.logo} href="/">
            <img src={LogoWhite} alt="Borvey logosu" />
          </a>
          <ul>
            <li>
              <a href="/">Anasayfa</a>
            </li>
            <li>
              <a href="/about">Hakkımızda</a>
            </li>
            <li>
              <a href="/help">Yardım</a>
            </li>
            <li>
              <a href="/contact">İletişim</a>
            </li>
          </ul>
          <div className={style.socialMedia}>
            <a target="_blank" href="https://www.youtube.com/@borveycom" aria-label="Borvey Youtube Hesabı">
              <SocialMediaIcon icon={"youtube"} />
            </a>
            <a target="_blank" href="https://www.instagram.com/borveycom/" aria-label="Borvey Instagram Hesabı">
              <SocialMediaIcon icon={"instagram"} />
            </a>
            <a
              target="_blank"
              href="https://www.facebook.com/people/borvey/100093522541664/"
              aria-label="Borvey Facebook Hesabı"
            >
              <SocialMediaIcon icon={"facebook"} />
            </a>
            <a target="_blank" href="https://x.com/borveyborvey" aria-label="Borvey Twitter Hesabı">
              <SocialMediaIcon icon={"twitter"} />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/borvey-com-441345287/"
              aria-label="Borvey LinkedIn Hesabı"
            >
              <SocialMediaIcon icon={"linkedin"} />
            </a>
          </div>
        </div>
      </div>
      <div className={style.bottomWrapper}>
        <div className={style.bottom}>
          <h6>© 2011 - 2024 borvey Teknoloji AŞ, Tüm Hakları Saklıdır</h6>
          <ul>
            <li>
              <a href="/cookies">Gizlilik Sözleşmesi</a>
            </li>

            <li>
              <a href="/cookies">KVKK</a>
            </li>
            <li>
              <a href="/cookies">Kullanıcı Sözleşmesi</a>
            </li>
            <li>
              <a href="/cookies">Çağrı Merkezi Aydınlatma Metni</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
