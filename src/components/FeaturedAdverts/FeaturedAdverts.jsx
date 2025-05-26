/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import TitleSubtitle from "../HomeElement/TitleSubtitle/TitleSubtitle";
import style from "./featuredadverts.module.scss";
import { SeeAllIcon } from "../../assets/icon";
import { TypeText } from "../../utils/TypeText";

const FeaturedAdverts = ({ data }) => {
  return (
    <div className={style.wrapper}>
      <TitleSubtitle
        title={"En Yeni Nakliye Talepleri"}
        subTitle={
          "borvey ile en güncel ilanlar ve taşıma taleplerini inceleyip teklif verebilirsiniz."
        }
      />
      <div className={style.cardWrapper}>
        {data?.map((item, index) => {
          return (
            // <a href="/kayit-ol?type=service" className={style.card} key={item.title}>
            <a href="/login" className={style.card} key={item.title}>
              <div className={style.textWrapper}>
                <h5>{item.title}</h5>
                <h5
                  style={{
                    color: "#f59a13",
                  }}
                >
                  {TypeText(item.type)}
                </h5>
                <p>{item.additionalInfo}</p>
              </div>
              <img
                src={
                  index === 0
                    ? "/images/evden-eve.jpg"
                    : index === 1
                    ? "/images/ofis-tasima.jpg"
                    : "/images/parca-tasima.jpg"
                }
                alt={
                  index === 0
                    ? "Evden Eve Taşıma İlanı Görseli"
                    : index === 1
                    ? "Ofis Taşıma İlanı Görseli"
                    : "Parça Taşıma İlanı Görseli"
                }
              />
            </a>
          );
        })}
      </div>

      {/* <a className={style.seeAll} href="/kayit-ol?type=service"> */}
      <a className={style.seeAll} href="/login">
        <span>Tümünü Gör</span> <SeeAllIcon />
      </a>
    </div>
  );
};

export default FeaturedAdverts;
