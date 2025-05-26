import style from "./downloadappcard.module.scss";

import PhoneImage from "../../assets/images/home/phone-image.png";
import GoogleImage from "../../assets/images/home/google-play-download.png";
import AppleImage from "../../assets/images/home/app-store-download.png";
import Amblem from "../../assets/images/amblem.png";

const DownloadAppCard = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.card}>
        <img 
          className={style.phone} 
          src={PhoneImage} 
          alt="Borvey uygulaması indirme ekranını gösteren mobil cihaz görseli"
        />
        <div className={style.content}>
          <div className={style.title}>
            <img 
              src={Amblem} 
              alt="Borvey amblemi, şirket logosu"
            />
            <h3>Uygulamamızı İndirin!</h3>
          </div>
          <p>
            Evinizi, ofisinizi, parça eşyanızı taşıtmak ya da taşıma hizmeti
            vermek için uygulamamızı ücretsiz indirin, size özel hizmetlerimize
            mobil cihazlarınızdan hemen ulaşın.
          </p>
          <div className={style.buttonWrapper}>
            <a
              href="https://play.google.com/store/apps/details?id=com.tr.bi.borvey&hl=tr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img 
                src={GoogleImage} 
                alt="Google Play Store üzerinden Borvey uygulamasını indirin"
              />
            </a>

            <a
              href="https://apps.apple.com/tr/app/borvey-yeni-nesil-ta%C5%9F%C4%B1mac%C4%B1l%C4%B1k/id6478465673?l=tr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img 
                src={AppleImage} 
                alt="App Store üzerinden Borvey uygulamasını indirin"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadAppCard;
