import style from "./twocard.module.scss";

const TwoCard = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.cardWrapper}>
        <div className={`${style.card} ${style.primary}`}>
          <div className={style.textWrapper}>
            <h5>Zahmetsiz Taşınma…</h5>
            <p>
            Taşınma travma olmasın, borvey'e gelin! Kullanıcı dostu platformumuz sayesinde yeni ev ya da ofisinizi, parça eşya nakliyenizi planlayalım. Size en uygun fiyatlı hizmeti, istediğiniz zamanda sunalım...
            </p>
          </div>
          <a href="/kayit-ol?type=customer">Nakliyeci Bul</a>
        </div>
        <div className={`${style.card} ${style.secondary}`}>
          <div className={style.textWrapper}>
            <h5>Kamyonun Garajda Yatmasın...</h5>
            <p>
              Yük için günlerce sevdiklerinden uzakta tır garajlarında beklemeye, boş ya da
              yarım yükle masraflı, mutsuz seferlere son. borvey'e gel, uygun güzergahta
              uygun müşteri bulalım; akaryakıta boşuna para harcama.
            </p>
          </div>
          <a href="/kayit-ol?type=service">Yük Ara</a> {/* Etiketin kapanması tamamlandı */}
        </div>
      </div>
    </div>
  );
};

export default TwoCard;
