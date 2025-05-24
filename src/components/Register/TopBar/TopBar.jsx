import { Fragment } from "react";
import logo from "../../../assets/images/logo.png";
import style from "./topbar.module.scss";

const TopBar = ({ isActive, selectedType, currentStep }) => {
  const userData = [
    {
      title: "Servisler",
    },
    {
      title: "Adres ve Detay",
    },
    {
      title: "Profilini Tamamla!",
    }
  ];

  const serviceData = [
    {
      title: "Profilini Tamamla!",
    },
  ];

  return (
    <div
      className={`${style.topbar} ${
        selectedType === "service" ? style.service : null
      }`}
    >
      <a className={style.logo} href="/">
        <img src={logo} />
      </a>
      <div className={style.stepperWrapper}>
        {[selectedType === "service" ? serviceData : userData]
          .flat()
          .map((item, index) => {
            return (
              <Fragment key={index}>
              <div
                className={`${style.stepper} ${
                  index === currentStep ? style.active : null
                } ${index < currentStep ? style.complete : null}`}
              >
                <div className={style.stepBar} />
                <h6>{item.title}</h6>
              </div>
              </Fragment>
            );
          })}
      </div>
    </div>
  );
};

export default TopBar;
