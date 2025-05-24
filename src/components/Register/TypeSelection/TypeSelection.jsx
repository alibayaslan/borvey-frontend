import style from "./typeselection.module.scss";
import CustomerIllustration from "../../../assets/images/register/customer_illustration.png";
import ServiceIllustration from "../../../assets/images/register/service_illustration.png";

const TypeSelection = ({ selectedType, click }) => {
  return (
    <div className={style.wrapper}>
      <div
        className={`${style.card} ${style.customer} ${
          selectedType === "customer" ? style.activeCustomer : null
        }`}
        onClick={() => click("customer")}
      >
        <div className={style.top}>
          <div className={style.circle} />
          <h5>Hizmet Almak İstiyorum</h5>
        </div>
        <div className={style.imageWrapper}>
          <img src={CustomerIllustration} />
        </div>
        <div className={style.textWrapper}>
          <p>
            Hizmet almak istiyorsanız, ihtiyacınıza uygun profesyonellerle hızlı
            ve kolay bir şekilde bağlantı kurabilirsiniz. İhtiyaçlarınızı
            belirleyin ve size en uygun çözümleri bulun.
          </p>
        </div>
      </div>
      <div
        className={`${style.card} ${style.service} ${
          selectedType === "service" ? style.activeService : null
        }`}
        onClick={() => click("service")}
      >
        <div className={style.top}>
          <div className={style.circle} />
          <h5>Hizmet Vermek İstiyorum</h5>
        </div>
        <div className={style.imageWrapper}>
          <img src={ServiceIllustration} />
        </div>
        <div className={style.textWrapper}>
          <p>
            borvey’de istediğin güzergah ve tarihte yük bulmak için ücretsiz üye
            olman yeterli. Uygun yük ve taşıma taleplerini senin için borvey
            bulsun, aracın boş kalmasın.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TypeSelection;
