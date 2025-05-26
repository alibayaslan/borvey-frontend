/* eslint-disable jsx-a11y/alt-text */
import style from "./userpostcard.module.scss";
import Avatar from "../../assets/images/avatar.png";
import {
  AcceptIcon,
  AddressBoxIcon,
  EyeIcon,
  TransportTypeIcon,
} from "../../assets/icon";
import { TypeText } from "../../utils/TypeText";

const UserPostCard = ({ data }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.top}>
        <div className={style.userWrapper}>
          <div className={style.user}>
            <img src={data.userId.avatar ? data.userId.avatar : Avatar} />
            <p>{data.userId.name + " " + data.userId.surname}</p>
          </div>
          <div className={style.rightWrapper}>
            <a href={`/ilan/${data._id}`}>
              <EyeIcon /> Detay
            </a>
            {data.isOffered ? (
              <span className={style.offered}>
                <AcceptIcon /> Teklif Verdiniz
              </span>
            ) : null}
          </div>
        </div>
        <h5>{data.title}</h5>
      </div>
      <div className={style.cardWrapper}>
        <div className={style.card}>
          <AddressBoxIcon type={"take"} />
          <div className={style.info}>
            <p>Alınacak Adres</p>
            <h6>
              {data.address.from.city} / {data.address.from.district}
            </h6>
          </div>
        </div>
        <div className={style.card}>
          <AddressBoxIcon />
          <div className={style.info}>
            <p>Taşınacak Adres</p>
            <h6>
              {data.address.to.city} / {data.address.to.district}
            </h6>
          </div>
        </div>
        <div className={style.fullCard}>
          <TransportTypeIcon type={data.type} />
          <span>{TypeText(data.type)}</span>
        </div>
      </div>
    </div>
  );
};

export default UserPostCard;
