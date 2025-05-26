import style from "./transporttype.module.scss";
import { TransportTypeIcon } from "../../../assets/icon";
import { useState } from "react";
import { useLocation } from "react-router-dom";



const SelectionCard = ({ type, title, click, transportType }) => {
  return (
    <div
      className={`${style.selection} ${
        transportType === type ? style.selected : null
      }`}
      onClick={click}
    >
      <div className={style.info}>
        <div className={style.circle} />
        <div className={style.textWrapper}>
          <h5>{title}</h5>
          <p>
            Eşyalarınızı özenle paketleyip, güvenli ve hızlı bir şekilde yeni
            evinize taşıyoruz.
          </p>
        </div>
      </div>
      <TransportTypeIcon type={type} />
    </div>
  );
};

const TransportType = ({ height, changeType, setSelectedType, value }) => {
  const [transportType, setTransportType] = useState(value ? value : "");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const typeParam = queryParams.get("type");
  return (
    <div
      className={`${style.selectionWrapper} ${
        height ? style.heightWrapper : null
      }`}
    >
      <SelectionCard
        title={"Evden Eve Nakliye"}
        type={"home"}
        transportType={transportType}
        click={() => {
          setSelectedType(typeParam === "first" ? "firstcustomer" : "customer");
          setTransportType("home");
          if (changeType) {
            changeType("home");
          }
        }}
      />
      <SelectionCard
        title={"Tekli Ürün Nakliyat"}
        type={"single"}
        transportType={transportType}
        click={() => {
          setTransportType("single");
          if (changeType) {
            changeType("single");
          }
        }}
      />
      <SelectionCard
        title={"Ofis Nakliyat"}
        type={"office"}
        transportType={transportType}
        click={() => {
          setTransportType("office");
          if (changeType) {
            changeType("office");
          }
        }}
      />
      <SelectionCard
        title={"Kısa Mesafe Nakliyat"}
        type={"short"}
        transportType={transportType}
        click={() => {
          setTransportType("short");
          if (changeType) {
            changeType("short");
          }
        }}
      />
    </div>
  );
};

export default TransportType;
