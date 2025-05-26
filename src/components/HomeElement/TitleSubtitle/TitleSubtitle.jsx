import style from "./titlesubtitle.module.scss";

const TitleSubtitle = ({ title, subTitle }) => {
  return (
    <div className={style.wrapper}>
      <h2>{title}</h2>
      <p>{subTitle}</p>
    </div>
  );
};

export default TitleSubtitle;
