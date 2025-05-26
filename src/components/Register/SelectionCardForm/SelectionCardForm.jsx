import { useState } from "react";
import style from "./selectioncardform.module.scss";

const SelectionCardForm = ({ dashboard, select, transportType, value }) => {
  const [selected, setSelected] = useState(value ? value.answer : "");

  const HomeTransport = [
    "1+1 Oda",
    "2+1 Oda",
    "3+1 Oda",
    "4+1 Oda",
    "Daha Fazla",
  ];

  const SingleTransport = [
    "Koltuk/Koltuk Takımı/Yatak",
    "Gardırop/Kitaplık/Masa",
    "Buzdolabı/Çamaşır/Bulaşık Makinesi",
    "Koli/Hurç/Ambalajlı Paket",
    "Diğer",
  ];

  const OfficeTransport = [
    "10-20 metrekare",
    "20-40 metrekare",
    "40-80 metrekare",
    "80 metrekareden büyük",
  ];

  const ShortTransport = [
    "Aynı Bina/Site/Yerleşke/Kampüs içi",
    "0-1 kilometre",
    "1-3 kilometre",
    "3-5 kilometre",
  ];

  const data =
    transportType === "home"
      ? HomeTransport
      : transportType === "single"
      ? SingleTransport
      : transportType === "office"
      ? OfficeTransport
      : ShortTransport;

  return (
    <div
      className={`${style.wrapper} ${
        dashboard ? style.dashboardWrapper : null
      }`}
    >
      <h1>Kaç odalı ev taşınacak?</h1>
      <div className={style.cardWrapper}>
        {data.map((item) => {
          return (
            <div
              className={`${style.card} ${
                selected === item ? style.active : null
              }`}
              onClick={() => {
                setSelected(item);

                if (select) {
                  select({
                    question: "Kaç odalı ev taşınacak?",
                    answer: item,
                  });
                }
              }}
            >
              <div className={style.circle} />
              <h5>{item}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectionCardForm;
