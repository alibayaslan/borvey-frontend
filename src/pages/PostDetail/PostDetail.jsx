/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import style from "./postdetail.module.scss";
import Avatar from "../../assets/images/avatar.png";
import {
  AddressBoxIcon,
  CalendarIcon,
  EyeIcon,
  TransportTypeIcon,
} from "../../assets/icon";
import { useState, useEffect } from "react";
import { ApiRoutes } from "../../utils/ApiRoutes";
import { AxiosRequest } from "../../utils/AxiosRequest";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { TypeText } from "../../utils/TypeText";
import { useSelector } from "react-redux";
import { OfferPopup } from "../../components";

const PostDetail = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user);
  const location = useLocation();
  const currentId = location.pathname.split("/")[2];
  const [isLoad, setLoad] = useState(true);
  const [data, setData] = useState();
  const [isOffer, setOffer] = useState(false);
  const [isMessage, setIsMessage] = useState(false);

  const getPostDetail = (id) => {
    AxiosRequest("post", ApiRoutes.post.getPost, {
      postId: id,
    })
      .then(async (res) => {
        setData(res.data);
        setLoad(false);
      })
      .catch((err) => {
        if (err.response.data) {
          setLoad(false);
        }
      });
  };

  const createMessage = (serviceId, personalId) => {
    AxiosRequest("post", ApiRoutes.user.createMessage, {
      serviceId: serviceId,
      personalId: personalId,
      type: userInfo.type,
    })
      .then(async (res) => {
        if (res.data === "success" || res.data === "alreadyHas") {
          navigate(`/mesaj?id=${personalId}`);
        }
      })
      .catch((err) => {
        if (err.response.data) {
          setLoad(false);
        }
      });
  };

  const canSendMessage = () => {
    AxiosRequest("post", ApiRoutes.post.canSendMessage, {
      postId: currentId,
      userId: userInfo._id,
    })
      .then(async (res) => {
        setIsMessage(res.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getPostDetail(currentId);
    canSendMessage();
  }, []);
  return (
    <>
      {isOffer ? (
        <OfferPopup
          data={data}
          closeClick={() => setOffer(false)}
          refreshClick={() => {
            setOffer(false);
            navigate("/tekliflerim");
          }}
          currentId={currentId}
        />
      ) : null}
      {isLoad && !data ? null : (
        <div className={style.wrapper}>
          <div className={style.postCard}>
            <div className={style.top}>
              <div className={style.info}>
                <img src={data.userId.avatar ? data.userId.avatar : Avatar} />
                <div className={style.title}>
                  <h5>{data.title} </h5>
                  <h6>
                    {moment(data.date).format("LL")} -{" "}
                    {moment(data.date).format("LT")}
                  </h6>
                </div>
              </div>
              {data.userId.status === "online" ? (
                <div className={style.topButtonWrapper}>
                  {userInfo.type === "personal" || !isMessage ? null : (
                    <button
                      onClick={() => {
                        createMessage(userInfo._id, data.userId._id);
                      }}
                    >
                      {" "}
                      Mesaj Gönder
                    </button>
                  )}
                  {userInfo.type === "personal" ? null : (
                    <button onClick={() => setOffer(true)}> Teklif Ver</button>
                  )}
                </div>
              ) : null}
            </div>
            <div className={style.content}>
              <p>{data.additionalInfo}</p>

              <div className={style.cardWrapper}>
                {data.questions.map((item) => {
                  return (
                    <div className={style.card}>
                      <div className={style.info}>
                        <p>{item.question}</p>
                        <h6>{item.answer}</h6>
                      </div>
                    </div>
                  );
                })}
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
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetail;
