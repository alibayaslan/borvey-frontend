import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import TitleSubtitle from "../HomeElement/TitleSubtitle/TitleSubtitle";
import style from "./latestcompany.module.scss";
import CompanyLogo from "../../assets/images/company-logo.png";
import { QuoteIcon } from "../../assets/icon";
import { Link } from "react-router-dom";

const LatestCompany = ({ data }) => {
  const [slideStatus, setSlideStatus] = useState(0);
  const slideRefs = useRef([]);

  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    centerMode: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    afterChange: (current) => setSlideStatus(current),
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    slideRefs.current.forEach((slide) => {
      if (!slide) return;

      const linkElement = slide.querySelector("a");
      const isActive = slide.classList.contains("slick-active");

      slide.setAttribute("aria-hidden", !isActive);

      if (linkElement) {
        linkElement.setAttribute("tabindex", isActive ? "0" : "-1");
        linkElement.style.pointerEvents = isActive ? "auto" : "none";
        linkElement.style.opacity = isActive ? "1" : "0.5";
        linkElement.setAttribute("aria-disabled", isActive ? "false" : "true");
      }
    });
  }, [slideStatus]);

  return (
    <div className={style.wrapper}>
      <span>
        <TitleSubtitle
          title={"Öne Çıkan Nakliyeciler"}
          subTitle={
            "Üyelerimizin kusursuz hizmet alıp memnuniyet yaşadığı nakliyecileri inceleyip yorum bırakabilirsiniz"
          }
        />
      </span>

      <div className={style.sliderWrapper}>
        <Slider {...settings}>
          {[...data, ...data].map((item, index) => (
            <div
              key={index}
              ref={(el) => (slideRefs.current[index] = el)}
              className={style.card}
            >
              <div className={style.topCard}>
                <img
                  className={style.background}
                  src={item.firm.logo ? item.firm.logo : CompanyLogo}
                  alt=""
                  role="presentation"
                />
                <div className={style.topContent}>
                  <div className={style.text}>
                    <img
                      src={item.firm.logo ? item.firm.logo : CompanyLogo}
                      alt={`${item.firm.name} logosu`}
                    />
                    <h5>{item.firm.name}</h5>
                  </div>
                  <QuoteIcon />
                </div>
              </div>
              <div className={style.content}>
                <p>
                  {item.firm.description.length > 100
                    ? `${item.firm.description.slice(0, 100)}...`
                    : item.firm.description}
                </p>
                <Link to="/login">Firmayı İncele</Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default LatestCompany;
