/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import Avatar from "../../assets/images/avatar.png";
import { CloseIcon, StarIcon } from "../../assets/icon";
import style from "./ratepopup.module.scss";
import TextArea from "../Input/TextArea/TextArea";

const RatePopup = ({ closeClick, data, rateClick, report, isSuccess }) => {
  const [rate, setRate] = useState(0);
  const [description, setDescription] = useState("");
  const [error, setError] = useState();

  return (
    <div className={style.wrapper}>
      <div className={style.card}>
        <div className={style.titleWrapper}>
          <h5>{report ? "İhlal Bildir" : "Değerlendirme"} </h5>
          <button onClick={closeClick}>
            <CloseIcon />
          </button>
        </div>
        {report ? null : (
          <div className={style.avatar}>
            <img src={data.firmLogo ? data.firmLogo : Avatar} />
            <h6>{data.firmName}</h6>
          </div>
        )}

        {report ? (
          <h3
            style={{
              marginBottom: "20px",
            }}
          >
            Böyle bir şey olduğu için üzgünüz. Bize sorunu bildirebilir misiniz?
          </h3>
        ) : (
          <>
            <h3>Aldığınız hizmet nasıldı?</h3>
            <div className={style.starWrapper}>
              {[...new Array(5)].map((item, index) => {
                return (
                  <span
                    onClick={() => setRate(index)}
                    className={rate >= index ? style.active : null}
                  >
                    <StarIcon />
                  </span>
                );
              })}
            </div>
          </>
        )}
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Açıklama"
        />
        {error ? (
          <span className="error-text">
            {report
              ? "Lütfen bildirinizi yazınız."
              : "Lütfen bir yorum yazınız."}
          </span>
        ) : null}
        <div className={style.buttonWrapper}>
          <button onClick={closeClick}>İptal</button>
          <button
            onClick={() => {
              if (report) {
                if (!isSuccess) {
                  rateClick(description);
                }
              } else {
                if (description.length > 5) {
                  rateClick({
                    rate: rate,
                    description: description,
                  });
                } else {
                  setError(true);
                }
              }
            }}
          >
            {isSuccess ? "Başarıyla Alındı" : report ? "Bildir" : "Yorum Yap"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatePopup;
