/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import style from "./myposts.module.scss";
import {
  DeleteIcon,
  EditIcon,
  PlusIcon,
  TransportTypeIcon,
  AddressBoxIcon,
  StarIcon,
  AcceptIcon,
  DeclineIcon,
} from "../../assets/icon";
import { useEffect, useState } from "react";
import Avatar from "../../assets/images/avatar.png";
import { PopupQuestion, RatePopup } from "../../components";
import { AxiosRequest } from "../../utils/AxiosRequest";
import { ApiRoutes } from "../../utils/ApiRoutes";
import { useSelector } from "react-redux";
import { TypeText } from "../../utils/TypeText";
import { useNavigate } from "react-router-dom";

const PostCard = ({
  item,
  isComplete,
  isWorking,
  rateClick,
  firmName,
  firmLogo,
  deleteClick,
  isOffline,
  setOnline,
  editClick,
}) => {
  return (
    <div className={style.workCard}>
      <div className={style.top}>
        <a href={`ilan/${item._id}`} className={style.info}>
          <div className={style.title}>
            <h6>{item.title}</h6>
          </div>
          <div className={style.badge}>
            {item.questions.map((i) => {
              return (
                <span>
                  {i.question} : {i.answer}
                </span>
              );
            })}
          </div>
        </a>

        <div className={style.buttonWrapper}>
          {isComplete ? (
            <div className={style.completeWrapper}>
              <h6>
                <span>
                  <AcceptIcon />
                </span>{" "}
                İş Tamamlandı
              </h6>
            </div>
          ) : isOffline ? (
            <div className={style.offlineWrapper}>
              <h6>
                <span>
                  <DeclineIcon />
                </span>{" "}
                İlan Yayından Kaldırıldı
              </h6>
              <button onClick={setOnline} className={style.edit}>
                Tekrar Yayına Al
              </button>
            </div>
          ) : isWorking ? (
            <div className={style.workingWrapper}>
              <div className={style.completeInfo}>
                <img src={firmLogo ? firmLogo : Avatar} />
                <h6>{firmName}</h6>
              </div>
              <button onClick={rateClick} className={style.completeButton}>
                <StarIcon /> İşi Tamamla / Değerlendir
              </button>
            </div>
          ) : (
            <>
              <button onClick={editClick} className={style.edit}>
                <EditIcon /> Düzenle
              </button>
              <button onClick={deleteClick} className={style.delete}>
                <DeleteIcon /> Yayından Kaldır
              </button>
            </>
          )}
        </div>
      </div>
      <a href={`ilan/${item._id}`} className={style.content}>
        <p>{item.additionalInfo}</p>
      </a>
      <a href={`ilan/${item._id}`} className={style.bottom}>
        <div className={style.left}>
          <div className={style.card}>
            <AddressBoxIcon type={"take"} />
            <div className={style.info}>
              <p>Alınacak Adres</p>
              <h6>
                {item.address.from.city} / {item.address.from.district}{" "}
              </h6>
            </div>
          </div>
          <div className={style.card}>
            <AddressBoxIcon />
            <div className={style.info}>
              <p>Taşınacak Adres</p>
              <h6>
                {item.address.to.city} / {item.address.to.district}
              </h6>
            </div>
          </div>
        </div>
        <div className={style.singleCard}>
          <TransportTypeIcon type={item.type} />
          <h6>{TypeText(item.type)}</h6>
        </div>
      </a>
    </div>
  );
};

const MyPosts = () => {
  const navigate = useNavigate();
  const [isLoad, setLoad] = useState(true);
  const [state, setState] = useState(0);
  const [isPopup, setPopup] = useState(false);
  const userInfo = useSelector((state) => state.user);
  const [data, setData] = useState();
  const [isStatus, setStatus] = useState();

  const getPostData = (value) => {
    AxiosRequest("post", ApiRoutes.post.getPostList, {
      userId: userInfo._id,
    })
      .then(async (res) => {
        console.log("data", res.data);
        setData(res.data.filter((i) => i.status !== "blocked").reverse());
        setLoad(false);
      })
      .catch((err) => {
        if (err.response.data) {
          setLoad(false);
        }
      });
  };

  const commentFirm = (value) => {
    setLoad(true);
    AxiosRequest("post", ApiRoutes.post.createComment, {
      personalUserID: userInfo._id,
      serviceUserID: value.serviceId,
      postID: value.postId,
      rate: value.rate,
      description: value.description,
    })
      .then(async (res) => {
        setLoad(false);
        navigate(0);
      })
      .catch((err) => {
        if (err.response.data) {
          setLoad(false);
        }
      });
  };

  const setStatusPost = (value) => {
    setLoad(true);
    AxiosRequest("post", ApiRoutes.post.setPostStatus, {
      postId: value.postId,
      status: value.status,
    })
      .then(async (res) => {
        setLoad(false);
        navigate(0);
      })
      .catch((err) => {
        if (err.response.data) {
          setLoad(false);
        }
      });
  };

  useEffect(() => {
    getPostData();
  }, []);

  const filteredData = data
    ? data.filter((item) => {
        if (state === 1) {
          // Geçmiş İlanlar sekmesi
          return (
            item.status === "completed" ||
            item.status === "offline" ||
            item.status === "blocked"
          );
        }
        return true; // Tüm İlanlar sekmesi
      })
    : [];

  return (
    <>
      {isStatus ? (
        <PopupQuestion
          question={
            isStatus.status === "offline"
              ? "İlanınızı yayından kaldırmak istediğinize emin misiniz?"
              : "İlanınızı yeniden yayına almak istediğinize emin misiniz?"
          }
          declineTitle={"İptal"}
          acceptTitle={
            isStatus.status === "offline" ? "Yayından Kaldır" : "Yayına Al"
          }
          decline={() => setStatus()}
          accept={() => setStatusPost(isStatus)}
        />
      ) : null}
      {isPopup ? (
        <RatePopup
          rateClick={(e) => {
            commentFirm({
              ...e,
              serviceId: isPopup.serviceId,
              postId: isPopup.postId,
            });
          }}
          data={isPopup}
          closeClick={() => setPopup(false)}
        />
      ) : null}
      {isLoad ? null : (
        <div className={style.wrapper}>
          <div className={style.topWrapper}>
            <div className={style.topSwitch}>
              <button
                onClick={() => setState(0)}
                className={state === 0 ? style.active : null}
              >
                Tümü
              </button>
              <button
                onClick={() => setState(1)}
                className={state === 1 ? style.active : null}
              >
                Geçmiş İlanlar
              </button>
            </div>
            <a href="/yeni-ilan" className={style.newPost}>
              Yeni İlan
            </a>
          </div>
          {filteredData && filteredData.length ? (
            <>
              <div className={style.workWrapper}>
                {filteredData.map((item, index) => {
                  const isOfferAccept =
                    item.offers && item.offers.length
                      ? item.offers.filter((i) => i.status === "accept")
                      : null;

                  return (
                    <PostCard
                      deleteClick={() =>
                        setStatus({
                          postId: item._id,
                          status: "offline",
                        })
                      }
                      setOnline={() => {
                        setStatus({
                          postId: item._id,
                          status: "online",
                        });
                      }}
                      rateClick={() =>
                        setPopup({
                          firmName: isOfferAccept[0].serviceUserID.firm.name,
                          firmLogo: isOfferAccept[0].serviceUserID.firm.logo,
                          serviceId: isOfferAccept[0].serviceUserID._id,
                          postId: item._id,
                        })
                      }
                      editClick={() => navigate(`/ilan-duzenle/${item._id}`)}
                      isWorking={item.status === "working"}
                      isComplete={item.status === "completed"}
                      isOffline={item.status === "offline"}
                      item={item}
                      firmName={
                        isOfferAccept && isOfferAccept.length
                          ? isOfferAccept[0].serviceUserID.firm.name
                          : ""
                      }
                      firmLogo={
                        isOfferAccept && isOfferAccept.length
                          ? isOfferAccept[0].serviceUserID.firm.logo
                          : ""
                      }
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <h2>İlan datası bulunamadı</h2>
          )}
        </div>
      )}
    </>
  );
};

export default MyPosts;
