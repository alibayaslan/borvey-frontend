import { useState } from "react";
import style from "./popup.module.scss";
import { EyeIcon, SelectArrow } from "../../assets/icon";

const PopupQuestion = ({
  question,
  acceptTitle,
  declineTitle,
  accept,
  decline,
  deleteAccount,
  error,
  userInfo,
}) => {
  const [password, setPassword] = useState();
  const [reason, setReason] = useState("");
  const [isOn, setOn] = useState(false);
  const personalReason = [
    "Çalışma mantığını beğenmedim.",
    "İlanlarıma cevap alamadım.",
    "Şirket ile sorun yaşadım.",
  ];

  const serviceReason = [
    "Uygun iş çıkmadı",
    "Müşteriyle fiyatlarda anlaşamadık",
    "Benim lokasyonumda iş bulamadım",
  ];
  return (
    <div
      className={`${style.popup} ${deleteAccount ? style.deleteAccount : null}`}
    >
      <div className={style.card}>
        <h5>{question}</h5>
        {deleteAccount ? (
          <div className={style.content}>
            <p>
              Hesabınızı silmek istediğinize üzüldük. Yaşadığınız sorunu bizimle
              paylaşmak isterseniz aşağıdakilerden birini seçebilirsiniz
            </p>
            <label className={style.selectInput}>
              <SelectArrow />
              <select onChange={(e) => setReason(e.target.value)}>
                <option disabled selected>
                  Lütfen seçim yapın
                </option>
                {userInfo.type === "service"
                  ? serviceReason.map((item) => {
                      return <option value={item}>{item}</option>;
                    })
                  : personalReason.map((item) => {
                      return <option value={item}>{item}</option>;
                    })}
              </select>
            </label>
            <p className={style.deleteText}>
              Hesabınızı silme aşamasını tamamlamak için lütfen aşağıya
              şifrenizi girin.
            </p>
            <label className={`${style.input}`}>
              <div className={style.inputWrapper}>
                <input
                  type={isOn ? "text" : "password"}
                  placeholder={"Şifrenizi girin"}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setOn(!isOn);
                  }}
                >
                  <EyeIcon isOn={isOn} />
                </button>
              </div>
            </label>
            {error ? <p className={style.deleteText}>{error}</p> : null}
          </div>
        ) : null}
        <div className={style.buttonWrapper}>
          <button onClick={decline}>{declineTitle}</button>
          <button
            onClick={() => {
              if (deleteAccount && password && password.length > 7) {
                console.log("girdi");
                accept({
                  reason: reason,
                  password: password,
                });
              } else if (!deleteAccount) {
                accept();
              }
            }}
          >
            {acceptTitle}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupQuestion;
