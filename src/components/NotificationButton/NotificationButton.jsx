/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
  CloseIcon,
  HamburgerIcon,
  NotificationIcon,
  NotificationIconType,
} from "../../assets/icon";
import style from "./notificationbutton.module.scss";
import { AxiosRequest } from "../../utils/AxiosRequest";
import { ApiRoutes } from "../../utils/ApiRoutes";
import moment from "moment";
import { logoutUser } from "../../redux/actions";
import { useDispatch } from "react-redux";

const NotificationPopup = ({ closeClick, data, userInfo }) => {
  return (
    <div className={style.popup}>
      <div className={style.title}>
        <p>Bildirimler</p>
        <button onClick={() => closeClick()}>
          <CloseIcon />
        </button>
      </div>
      <div className={style.wrapper}>
        {data.length > 0 ? (
          <>
            {data.map((item) => {
              const link =
                item.status === "message"
                  ? `/mesaj?id=${
                      userInfo.type === "personal"
                        ? item.serviceUserId._id
                        : item.personalUserId._id
                    }`
                  : item.status === "offer"
                  ? `/teklifler?id=${item.offerId._id}`
                  : item.status === "offerAnswer"
                  ? `/tekliflerim?id=${item.offerId._id}`
                  : null;
              return (
                <a href={link} className={style.notification}>
                  {item.isRead ? null : <div className={style.dot} />}
                  <NotificationIconType
                    type={
                      item.status === "offerAnswer" &&
                      item.text.includes("redetti")
                        ? "offerDecline"
                        : item.status
                    }
                  />
                  <div className={style.info}>
                    <h5>{item.text}</h5>
                    <p>
                      {moment(item.createDate).format("L") +
                        " " +
                        moment(item.createDate).format("LT")}
                    </p>
                  </div>
                </a>
              );
            })}
          </>
        ) : (
          <h6>Hiç bildiriminiz bulunmuyor.</h6>
        )}
      </div>
    </div>
  );
};

const NotificationButton = ({ userInfo, hamburgerClick, width, homepage }) => {
  const [isLoad, setLoad] = useState(true);
  const [isNotification, setNotification] = useState(false);
  const [data, setData] = useState();
  const dispatch = useDispatch();

  const getNotificationData = () => {
    AxiosRequest("post", ApiRoutes.user.getNotifications, {
      userId: userInfo._id,
      type: userInfo.type,
    })
      .then((res) => {
        setData(res.data.reverse());
        setLoad(false);
      })
      .catch((err) => {
        if (err.response.data) {
          if (
            err.response.data === "User Blocked" ||
            err.response.data === "Invalid Token"
          ) {
            localStorage.removeItem("token");
            dispatch(logoutUser());
          }
        }
        setLoad(false);
      });
  };

  const readNotifications = (value) => {
    AxiosRequest("post", ApiRoutes.user.readNotifications, {
      notificationId: value,
    })
      .then((res) => {
        setLoad(false);
        setTimeout(() => {
          setData(
            data.map((i) => {
              return {
                ...i,
                isRead: true,
              };
            })
          );
        }, 1500);
      })
      .catch((err) => {
        console.error("Error fetching offers:", err);
        setLoad(false);
      });
  };

  useEffect(() => {
    getNotificationData();
  }, []);

  console.log("data", data);

  return (
    <>
      {width < 960 && !homepage ? (
        <div
          className={`${style.container} ${
            userInfo.type === "personal" ? style.personalWrapper : null
          }`}
        >
          <button
            onClick={() => hamburgerClick()}
            className={style.notificationButton}
          >
            <HamburgerIcon />
          </button>
        </div>
      ) : null}
      {isLoad && !data ? null : (
        <div
          className={`${style.container} ${
            userInfo.type === "personal" ? style.personalWrapper : null
          }`}
        >
          <button
            onClick={() => {
              setNotification(true);

              if (data && data.length) {
                const newReadData = data
                  .filter((item) => !item.isRead)
                  .map((i) => i._id);
                if (newReadData && newReadData.length) {
                  readNotifications(newReadData);
                }
              }
            }}
            className={style.notificationButton}
          >
            <NotificationIcon />
            {data && data.filter((i) => !i.isRead).length > 0 ? (
              <div className={style.count}>
                {data.filter((i) => !i.isRead).length}
              </div>
            ) : null}
          </button>
          {isNotification ? (
            <NotificationPopup
              data={data}
              closeClick={() => setNotification(false)}
              userInfo={userInfo}
            />
          ) : null}
        </div>
      )}
    </>
  );
};

export default NotificationButton;
