/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import style from "./comments.module.scss";
import Avatar from "../../assets/images/avatar.png";
import { StarIcon } from "../../assets/icon";
import { useEffect, useState } from "react";
import { AxiosRequest } from "../../utils/AxiosRequest";
import { ApiRoutes } from "../../utils/ApiRoutes";
import { useSelector } from "react-redux";
import moment from "moment/moment";

const CommentCard = ({ item }) => {
  return (
    <div className={style.commentCard}>
      <div className={style.top}>
        <div className={style.info}>
          <img
            src={
              item.personalUserID.avatar ? item.personalUserID.avatar : Avatar
            }
          />
          <div className={style.title}>
            <h5>{item.postID.title} </h5>
            <h6>
              {moment(item.date).format("ll")} -{" "}
              {moment(item.date).format("LT")}
            </h6>
          </div>
        </div>
        <button>Bildir</button>
      </div>
      <div className={style.content}>
        <div className={style.star}>
          <h6>{item.rate},0</h6>
          <div className={style.starWrapper}>
            {[...new Array(5)].map((i, index) => {
              return <StarIcon isBlank={item.rate < index + 1} />;
            })}
          </div>
        </div>
        <p>{item.description}</p>
      </div>
    </div>
  );
};

const Comments = () => {
  const [isLoad, setLoad] = useState(true);
  const [data, setData] = useState();
  const [totalRate, setTotalRate] = useState();
  const userInfo = useSelector((state) => state.user);

  const getComments = (value) => {
    AxiosRequest("post", ApiRoutes.user.getComments, {
      userId: userInfo._id,
      type: userInfo.type,
    })
      .then(async (res) => {
        await setData(res.data.reverse());

        if (res.data && res.data.length) {
          const totalRate = await res.data.reduce(
            (sum, item) => sum + item.rate,
            0
          );
          const averageRate = (await totalRate) / res.data.length;
          await setTotalRate(averageRate);
        }

        await setLoad(false);
      })
      .catch((err) => {
        if (err.response.data) {
          setLoad(false);
        }
      });
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      {isLoad ? null : data && data.length ? (
        <div className={style.wrapper}>
          {totalRate ? (
            <div className={style.comment}>
              <h3>
                {totalRate.toFixed(1)} <span>/ 5</span>
              </h3>
              <h4>{data.length} Yorum</h4>
            </div>
          ) : null}
          <div className={style.commentWrapper}>
            {data.map((item) => {
              return <CommentCard item={item} />;
            })}
          </div>
        </div>
      ) : (
        <h5>hiç yorum yok</h5>
      )}
    </>
  );
};

export default Comments;
