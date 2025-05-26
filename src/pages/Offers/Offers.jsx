/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import style from "./offers.module.scss";
import {
  DeleteIcon,
  EditIcon,
  PlusIcon,
  TransportTypeIcon,
  AddressBoxIcon,
  StarIcon,
  FaqArrowIcon,
  OfferIcon,
  DeclineIcon,
  AcceptIcon,
  SendIcon,
} from "../../assets/icon";
import { useState, useEffect } from "react";
import Avatar from "../../assets/images/avatar.png";
import { RatePopup } from "../../components";
import { useSelector } from "react-redux";
import { ApiRoutes } from "../../utils/ApiRoutes";
import { AxiosRequest } from "../../utils/AxiosRequest";
import { TypeText } from "../../utils/TypeText";
import { useNavigate, useLocation } from "react-router-dom";

const PostCard = ({
  isComplete,
  rateClick,
  item,
  declineClick,
  acceptClick,
  status,
  sendMessage,
  id,
}) => {
  return (
    <div id={id} className={style.workCard}>
      <div className={style.left}>
        <div className={style.top}>
          <div className={style.info}>
            <div className={style.title}>
              <h6>{item.postID.title}</h6>
            </div>
            <div className={style.badge}>
              <span>
                {item.time.from} - {item.time.to}
              </span>
              <span>
                {item.date.from} - {item.date.to}
              </span>
            </div>
          </div>
        </div>
        <div className={style.content}>
          <p>{item.postID.additionalInfo}</p>
        </div>
        <div className={style.bottom}>
          <div className={style.bottomLeft}>
            <div className={style.card}>
              <AddressBoxIcon type={"take"} />
              <div className={style.info}>
                <p>Alınacak Adres</p>
                <h6>
                  {item.postID.address.from.city} /{" "}
                  {item.postID.address.from.district}
                </h6>
              </div>
            </div>
            <div className={style.card}>
              <AddressBoxIcon />
              <div className={style.info}>
                <p>Taşınacak Adres</p>
                <h6>
                  {item.postID.address.to.city} /{" "}
                  {item.postID.address.to.district}
                </h6>
              </div>
            </div>
          </div>
          <div className={style.singleCard}>
            <TransportTypeIcon type={item.postID.type} />
            <h6>{TypeText(item.postID.type)}</h6>
          </div>
        </div>
      </div>
      <div className={style.offerWrapper}>
        <div className={style.offerInfo}>
          <img
            src={
              item.serviceUserID.firm.logo
                ? item.serviceUserID.firm.logo
                : Avatar
            }
            alt="firm logo"
          />
          <h6>
            {item.serviceUserID.firm.name} <span>4,0</span>
          </h6>
        </div>
        <div className={style.offerBottom}>
          <div className={style.price}>
            <p>Verilen Teklif</p>
            <h5>{item.price}₺</h5>
          </div>
          {status === "hold" ? (
            <div className={style.buttonWrapper}>
              <button onClick={declineClick}>
                <span>
                  <DeclineIcon />
                </span>
                Reddet
              </button>
              <button onClick={acceptClick}>
                <span>
                  <AcceptIcon />
                </span>
                Kabul Et
              </button>
            </div>
          ) : status === "accept" ? (
            <div className={style.acceptStatus}>
              <span>
                <AcceptIcon />
              </span>
              Kabul Edildi
            </div>
          ) : status === "decline" ? (
            <div className={style.declineStatus}>
              <span>
                <DeclineIcon />
              </span>
              Reddedildi
            </div>
          ) : null}
          <button className={style.sendMessage} onClick={sendMessage}>
            <span>
              <SendIcon />
            </span>
            Mesaj Gönder
          </button>
        </div>
      </div>
    </div>
  );
};

const Offers = () => {
  const navigate = useNavigate();
  const [isLoad, setLoad] = useState(true);
  const [state, setState] = useState(0);
  const [isPopup, setPopup] = useState(false);
  const [data, setData] = useState([]);
  const userInfo = useSelector((state) => state.user);
  const sectionData = [
    "Tümü",
    "Beklemedeki Teklifler",
    "Kabul Edilen Teklifler",
    "Reddedilen Teklifler",
  ];
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const offerParam = queryParams.get("id");

  const getOfferData = () => {
    AxiosRequest("post", ApiRoutes.offer.getOfferList, {
      userId: userInfo._id,
      type: userInfo.type,
    })
      .then((res) => {
        setData(res.data.reverse());
        setLoad(false);
      })
      .catch((err) => {
        console.error("Error fetching offers:", err);
        setLoad(false);
      });
  };

  const responseOffer = (value) => {
    setLoad(true);
    AxiosRequest("post", ApiRoutes.offer.responseOffer, {
      status: value.status,
      offerId: value.id,
      postId: value.postId,
      name: `${userInfo.name} ${userInfo.surname}`,
      userId: userInfo._id,
      postTitle: value.postTitle,
      serviceUserId: value.serviceUserId,
    })
      .then((res) => {
        getOfferData();

        setLoad(false);
      })
      .catch((err) => {
        console.error("Error fetching offers:", err);
        setLoad(false);
      });
  };

  useEffect(() => {
    getOfferData();
  }, []);

  const filteredData = data.filter((i) => {
    switch (state) {
      case 1:
        return i.status === "hold";
      case 2:
        return i.status === "accept";
      case 3:
        return i.status === "decline";
      default:
        return true;
    }
  });

  const createMessage = (serviceId, personalId) => {
    AxiosRequest("post", ApiRoutes.user.createMessage, {
      serviceId: serviceId,
      personalId: personalId,
      type: userInfo.type,
    })
      .then(async (res) => {
        if (res.data === "success" || res.data === "alreadyHas") {
          navigate("/mesaj");
        }
      })
      .catch((err) => {
        if (err.response.data) {
          setLoad(false);
        }
      });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  useEffect(() => {
    if (data && data.length && offerParam) {
      scrollToSection(offerParam);
    }
  }, [data, offerParam]);

  return (
    <>
      {isPopup && <RatePopup closeClick={() => setPopup(false)} />}
      {isLoad ? (
        <p>Yükleniyor...</p>
      ) : (
        <div className={style.wrapper}>
          <div className={style.topSwitch}>
            {sectionData.map((item, index) => (
              <button
                key={index}
                onClick={() => setState(index)}
                className={state === index ? style.active : ""}
              >
                {item}
              </button>
            ))}
          </div>
          {filteredData.length ? (
            <>
              <div className={style.workWrapper}>
                {filteredData.map((item, index) => (
                  <PostCard
                    key={index}
                    item={item}
                    rateClick={() => setPopup(true)}
                    isComplete={index % 2 === 0}
                    status={item.status}
                    id={item._id}
                    acceptClick={() => {
                      responseOffer({
                        id: item._id,
                        status: "accept",
                        postId: item.postID._id,
                        postTitle: item.postID.title,
                        serviceUserId: item.serviceUserID._id,
                      });
                    }}
                    declineClick={() => {
                      responseOffer({
                        id: item._id,
                        status: "decline",
                        postId: item.postID._id,
                        postTitle: item.postID.title,
                        serviceUserId: item.serviceUserID._id,
                      });
                    }}
                    sendMessage={() => {
                      createMessage(item.serviceUserID._id, userInfo._id);
                    }}
                  />
                ))}
              </div>
            </>
          ) : (
            <h4>Herhangi bir teklif bulunmamaktadır</h4>
          )}
        </div>
      )}
    </>
  );
};

export default Offers;
