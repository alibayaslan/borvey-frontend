import React from "react";
import TitleSubtitle from "../HomeElement/TitleSubtitle/TitleSubtitle";
import style from "./howitworks.module.scss";
import Image1 from "../../assets/images/home/how-to-1.png";
import Image2 from "../../assets/images/home/how-to-2.png";
import Image3 from "../../assets/images/home/how-to-3.png";

const HowItWorks = () => {
  const CardData = [
    {
      title: "Ücretsiz İlanını Bırak",
      text: "Sadece ilanını bırak gerisini biz halledelim",
      illustration: Image1,
      alt: "Kullanıcıların ihtiyaçlarını tanımlamalarını sağlayan form ekranı",
    },
    {
      title: "Özel Fiyat Teklifleri Al",
      text: "Gelen teklifleri kontrol edip değerlendir",
      illustration: Image2,
      alt: "Gelen fiyat tekliflerinin karşılaştırıldığı ve değerlendirildiği ekran görseli",
    },
    {
      title: "Karşılaştır ve Seç",
      text: "Sana en uygun gelen teklifi onayla",
      illustration: Image3,
      alt: "Farklı teklifler arasında karşılaştırma yaparak en uygun olanını seçme sürecini gösteren görsel",
    },
  ];

  return (
    <div className={`${style.wrapper} ${style["nakliyat-sistemi-bolumu"]}`}>
      <TitleSubtitle
        title={"Nakliyat Sistemi Nasıl Çalışıyor?"}
        subTitle={
          "Taşınma talebine gelen fiyat tekliflerini değerlendir, en uygun olanını seç ve gerisini bize bırak. borvey ile taşınma kaosu artık sana uzak, iyi hizmet almanın keyfini çıkar..."
        }
      />

      <div className={style.cardWrapper}>
        {CardData.map((item) => {
          return (
            <div className={style.card} key={item.title}>
              <img src={item.illustration} alt={item.alt} />
              <h5>{item.title}</h5>
              <p>{item.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HowItWorks;
