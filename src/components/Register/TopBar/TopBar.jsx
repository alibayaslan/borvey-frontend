/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import { Fragment } from "react";
import logo from "../../../assets/images/logo.png";
import style from "./topbar.module.scss";
import { boolean } from "yup";

const TopBar = ({ isActive, selectedType, typeParam, currentStep }) => {

  let userData = [
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

  const userDataFirst = [
    { 
      title: "Başlarken" 
    },
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
      title: "Firma Bilgileri",
    },
    {
      title: "Profilini Tamamla!",
    },
  ];

  const serviceDataFirst = [
    {
      title: "Başlarken",
    },
    {
      title: "Firma Bilgileri",
    },
    {
      title: "Profilini Tamamla!",
    },
  ];


  return (
    <div
      className={`${style.topbar} ${
        typeParam === "service" ? style.service : null
      }`}
    >
      <a className={style.logo} href="/">
        <img src={logo} />
      </a>
      <div className={style.stepperWrapper}>
        {/* {[typeParam === "service" ? serviceData : selectedType === "firstservice" ? serviceData : userData]
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
          })} */}

        {typeParam === "service" ? 
        (
          <>
          {serviceData.flat().map((item, index) => {
            console.log("item",item);
            return (
              <Fragment key={index}>
              <div
                className={`${style.stepper} ${
                  index === currentStep ? style.active : null
                } ${index < currentStep ? style.complete : null}`}
              >
                <div className={style.stepBar} />
                <h6>{item?.title}</h6>
              </div>
              </Fragment>
            );
          })}
          </>
        )
        : selectedType === "firstservice" ?
        (
          <>
          {serviceDataFirst.flat().map((item, index) => {
            console.log("item",item);
            return (
              <Fragment key={index}>
              <div
                className={`${style.stepper} ${
                  index === currentStep ? style.active : null
                } ${index < currentStep ? style.complete : null}`}
              >
                <div className={style.stepBar} />
                <h6>{item?.title}</h6>
              </div>
              </Fragment>
            );
          })}
          </>
        )
        : selectedType === "firstcustomer" ? 
        (
          <>
          {userDataFirst.flat().map((item, index) => {
            console.log("item",item);
            return (
              <Fragment key={index}>
              <div
                className={`${style.stepper} ${
                  index === currentStep ? style.active : null
                } ${index < currentStep ? style.complete : null}`}
              >
                <div className={style.stepBar} />
                <h6>{item?.title}</h6>
              </div>
              </Fragment>
            );
          })}
          </>
        )
        : 
        (
          <>
          {userData.flat().map((item, index) => {
            console.log("item",item);
            return (
              <Fragment key={index}>
              <div
                className={`${style.stepper} ${
                  index === currentStep ? style.active : null
                } ${index < currentStep ? style.complete : null}`}
              >
                <div className={style.stepBar} />
                <h6>{item?.title}</h6>
              </div>
              </Fragment>
            );
          })}
          </>
        )
        }


        {/* {selectedType === "firstservice" && typeParam === 'first' && 
          serviceData
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
        {selectedType === "firstcustomer" && typeParam === 'first' && 
          userData
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
        {typeParam === "service" && 
          serviceData
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
        {typeParam === "customer" && 
          userData
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
          })} */}
      </div>
    </div>
  );
};

export default TopBar;
