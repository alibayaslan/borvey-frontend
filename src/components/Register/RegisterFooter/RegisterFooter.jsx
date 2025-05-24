import style from "./registerfooter.module.scss";

const RegisterFooter = () => {
  return (
    <div className={style.footer}>
      <p>© 2011 - 2024 borvey Teknoloji AŞ. All Rights Reserved</p>
      <ul>
        <li>
          <a href="/cookies">Gizlilik Sözleşmesi</a>
        </li>
        <div className={style.circle} />
        <li>
          <a href="/cookies">KVKK</a>
        </li>
        <div className={style.circle} />
        <li>
          <a href="/cookies">Kullanıcı Sözleşmesii</a>
        </li>
        <div className={style.circle} />
        <li>
          <a href="/cookies">Çağrı Merkezi Aydınlatma Metni</a>
        </li>
      </ul>
    </div>
  );
};

export default RegisterFooter;
