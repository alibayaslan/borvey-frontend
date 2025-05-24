import React, { useState, useEffect } from "react";

import Illustration1 from "../../assets/images/about/about-illustration-1.png";
import Illustration2 from "../../assets/images/about/about-illustration-2.png";
import Illustration3 from "../../assets/images/about/about-illustration-3.png";
// import Illustration4 from "../../assets/images/about/about-illustration-4.png"; // Silindi
import AboutImage from "../../assets/images/about/about-image.png";
import VideoCover from "../../assets/images/about/video-cover.png";

import borveyVideo from "../../assets/videos/borvey.mp4";

import style from "./about.module.scss";
import { PlayIcon } from "../../assets/icon";
import { AxiosRequest } from "../../utils/AxiosRequest";
import { ApiRoutes } from "../../utils/ApiRoutes";
import { Helmet } from "react-helmet";

const VideoComp = () => {
  const [isOn, setOn] = useState(false);

  return (
    <div
      onClick={() => setOn(!isOn)}
      className={`${style.videoWrapper} ${isOn ? style.zIndex : ""} container mt-44 max-sm:mt-16`}
    >
      {isOn ? (
        <video width="320" height="240" autoPlay muted controls className="max-sm:mt-16">
          <source src={borveyVideo} type="video/mp4" />
          Your browser does not support the video tag
        </video>
      ) : (
        <div className={style.cover}>
          <button>
            <PlayIcon />
          </button>
          <img src={VideoCover} alt="Video Kapak" />
        </div>
      )}
    </div>
  );
};

const About = () => {
  const [data, setData] = useState(null);

  const getHomeData = () => {
    AxiosRequest("post", ApiRoutes.website.getHome)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getHomeData();
  }, []);

  const aboutData = [
    {
      title: "Taşınma Sürecinizi Biz Yönetiriz",
      text: `Sokak sokak nakliyeci aramanıza, sayısız reklam arasında kaybolmanıza gerek yok.
borvey, belirlediğiniz kriterlerde hizmet verenleri size getirir.`,
      illustration: Illustration1,
    },
    {
      title: "Güvenilir Nakliye Çözümleri",
      text: `borvey ile evini, iş yerini, yazlığına kargoyla gönderemediğin dolabını, ikinci elden aldığın eşyaları nasıl taşıyacağını düşünme!`,
      illustration: Illustration2,
    },
    {
      title: "Nakliye Maliyetlerinizi Azaltın",
      text: `borvey, hem birlikte çalıştığı nakliye firmalarının hem de nakliye hizmeti alan müşterilerinin memnuniyeti için gerekli tüm tedbirleri alır.`,
      illustration: Illustration3,
    },
  ];

  return (
    <>
      {data && (
        <Helmet>
          <title>{data.SEO.about.title}</title>
          <meta
            name="description"
            content={data.SEO.about.description}
            data-react-helmet="true"
          />
          <meta
            name="keywords"
            content={data.SEO.about.tags}
            data-react-helmet="true"
          />
        </Helmet>
      )}

      <VideoComp />

      <div className={style.wrapper}>
        <div className={style.illustrationWrapper}>
          <h1>Türkiye'nin Lider Nakliye ve Taşımacılık Platformu</h1>
          <div className={style.cardWrapper}>
            {aboutData.map((item, index) => (
              <div key={index} className={style.card}>
                <img src={item.illustration} alt={item.title} />
                <div className={style.textWrapper}>
                  <h5>{item.title}</h5>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={style.bottomPart}>
            <img src={AboutImage} alt="Hakkımızda Alt Görsel" />
            <h3>Stressiz Bir Taşınma, Nakliye İçin İpuçları</h3>
            <p>
              Sokak sokak, site site nakliyeci arayın, tanıdıklarınızdan öneri,
              referans isteyin,&nbsp; iş arkadaşınızın evini 3 yıl önce taşıyan
              nakliyecinin telefonunu bulmaya çalışın...&nbsp;
              <br />
              Ya da sadece borvey'de ücretsiz üyelik açıp ilanınızı bırakın.
              <br />
              <br />
              Sonrasında borvey üyesi nakliyat firmaları size tekliflerini
              iletsin,&nbsp; siz aralarından dilediğinizi seçin ve taşınma
              kabusu yaşamadan bu iş bitsin.
              <br />
              borvey sizinle...
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
