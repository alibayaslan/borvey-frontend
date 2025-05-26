import truck from "../../assets/images/icon/truck.png";
import box from "../../assets/images/icon/box.png";
import boxes from "../../assets/images/icon/boxes.png";
import short from "../../assets/images/icon/short.png";

import TitleSubtitle from "../HomeElement/TitleSubtitle/TitleSubtitle";
import style from "./servicecategories.module.scss";

const ServiceCategories = () => {
  const ServiceData = [
    {
      title: "Evden Eve Nakliye",
      image: truck,
      color: "#F59A13",
      altText: "Evden Eve Nakliye hizmeti için kamyon",
    },
    {
      title: "Parça Eşya Nakliye",
      image: box,
      color: "#306FDF",
      altText: "Tekli ürün nakliyatı için kutu",
    },
    {
      title: "Ofis Nakliye",
      image: boxes,
      color: "#24C4BB",
      altText: "Ofis taşımacılığı için kutular",
    },
    {
      title: "Kısa Mesafeli Nakliye",
      image: short,
      color: "#383E42",
      altText: "Kısa mesafeli nakliye hizmeti",
    },
  ];

  return (
    <div className={style.wrapper}>
      <TitleSubtitle
        title={"Nakliyat Kategorileri"}
        subTitle={
          "Güvenilir ve deneyimli nakliyecileri sizin için bulan borvey, doğrudan tedarikçi olmayıp sadece taşıma hizmeti almak isteyenlerle nakliye sektörü oyuncularını bir araya getiren paylaşım platformudur."
        }
      />

      <div className={style.cardWrapper}>
        {ServiceData.map((item, index) => {
          return (
            <a href="/login" className={style.card} key={index}>
              <img src={item.image} alt={item.altText} />
              <div
                style={{
                  background: `linear-gradient(180deg, rgba(255,255,255,0) 0%, ${item.color} 100%)`,
                }}
                className={style.cover}
              >
                <p>{item.title}</p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceCategories;
