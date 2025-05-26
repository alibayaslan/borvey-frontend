/* eslint-disable no-useless-escape */
import React, { useState } from "react";
import TitleSubtitle from "../HomeElement/TitleSubtitle/TitleSubtitle";
import style from "./infocard.module.scss";

const InfoCard = () => {
  const [current, setCurrent] = useState(0);

  const CardData = [
    {
      title: "Tek iş, Tek Odak: Nakliye",
      text: `Musluk tamiri, boya badana ya da \"Öğretmenden temiz, keyfekeder araç\" ilanlarının olduğu mecralarda neden daha fazla vakit kaybedip mutsuz olasınız ki?`,
      icon: "/nakliye-icons/2.jpg"
    },
    {
      title: "Nakliyeci Size Ulaşsın",
      text: `Hem para harcayıp hem de hakkınız olan hizmeti almak için çabalamak istemiyorsanız şu anda doğru ekrana ve doğru siteye bakıyorsunuz...`,
      icon: "/nakliye-icons/3.jpg"
    },
    {
      title: "Parayı Ödeyen Sizsiniz!",
      text: `Anneannenizin yadigarı şifonyer yeni evinize sağ salim ulaşacak mı? Yazlığınıza gidecek tek masa için 3 katı ücret ödeme kabusu çok mu yakın?`,
      icon: "/nakliye-icons/yük-ara.png"
    },
    {
      title: "Kaosa borvey ile Son...",
      text: `\"Marketlerden koli, kutu toplama seferberliği olmasın\", \"Beyaz eşyalarımı akrobasi yaparken izlemek istemiyorum\" derseniz borvey burada...`,
      icon: "/nakliye-icons/1.jpg"
    },
  ];

  return (
    <div className={style.wrapper}>
      <TitleSubtitle
        title={"Ekonomik ve hızlı nakliyat"}
        subTitle={
          "Şehiriçi, şehirlerarası, ev, yazlık, ofis, parça eşya taşımalarınızda, nakliye çözümlerimizle hızlı ve hesaplı hizmet alın."
        }
      />
      <div className={`${style.cardWrapper} relative top-12`}>
        {CardData.map((item, index) => (
          <div
            key={index}
            onMouseEnter={() => setCurrent(index)}
            onMouseLeave={() => setCurrent(0)}
            className={
              current === index
                ? `${style.card} ${style.active}`
                : style.card
            }
          >
            <div className="absolute -top-16 -right-12 rounded-full border-[3px] border-[#f3c785] object-cover size-32 bg-white overflow-hidden flex justify-center items-center cursor-pointer">
              <img src={item.icon} alt={item.title} className="object-cover" />
            </div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoCard;
