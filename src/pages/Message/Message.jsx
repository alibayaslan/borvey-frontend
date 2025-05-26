/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { FolderIcon, SearchIcon, SendIcon } from "../../assets/icon";
import style from "./message.module.scss";
import Avatar from "../../assets/images/avatar.png";
import { useEffect, useState, useRef } from "react";
import { ApiRoutes } from "../../utils/ApiRoutes";
import { AxiosRequest } from "../../utils/AxiosRequest";
import { useSelector } from "react-redux";
import useWebSocket from "./useWebSocket";
import moment from "moment/moment";
import { useLocation } from "react-router-dom";
import { RatePopup } from "../../components";

const SideBar = ({ selectedUser, changeUser, data, newMessages }) => {
  const [isNewMessage, setNewMessage] = useState([]);

  useEffect(() => {
    if (data) {
      const newMessageFind =
        newMessages && newMessages.length
          ? data
              .filter((item, index) => index !== selectedUser)
              .map((i) => i._id)
              .includes(newMessages[newMessages.length - 1].messageId)
          : false;

      if (newMessageFind) {
        setNewMessage((prevData) => [
          ...prevData,
          newMessages[newMessages.length - 1].messageId,
        ]);
      }
    }
  }, [newMessages]);

  return (
    <div className={style.sideBar}>
      <h1>Mesajlar</h1>
      {/* <label>
        <SearchIcon />
        <input placeholder="Arama" type="text" />
      </label> */}

      <div className={style.userCardWrapper}>
        {data.map((item, index) => {
          const newMessageFind = newMessages.length
            ? newMessages.filter((i) => item._id === i.messageId)
            : [];
          return (
            <div
              onClick={() => {
                changeUser(index);
                setNewMessage(isNewMessage.filter((i) => i !== item._id));
              }}
              className={`${style.userCard} ${
                selectedUser === index ? style.selectedUser : null
              }`}
            >
              <div className={style.left}>
                <img src={item.sender.avatar ? item.sender.avatar : Avatar} />
                <div className={style.info}>
                  <h5>{item.sender.name}</h5>
                  <p>
                    {newMessageFind.length
                      ? `${newMessageFind[newMessageFind.length - 1].text.slice(
                          0,
                          10
                        )}${
                          newMessageFind[newMessageFind.length - 1].text
                            .length > 10
                            ? "..."
                            : ""
                        }`
                      : item.messageData && item.messageData.length
                      ? `${item.messageData[
                          item.messageData.length - 1
                        ].text.slice(0, 10)}${
                          item.messageData[item.messageData.length - 1].text
                            .length > 10
                            ? "..."
                            : ""
                        }`
                      : null}
                  </p>
                </div>
              </div>
              <h6>
                {newMessageFind.length
                  ? `${moment(
                      newMessageFind[newMessageFind.length - 1].sendDate
                    ).format("LT")}`
                  : item.messageData && item.messageData.length
                  ? `${moment(
                      item.messageData[item.messageData.length - 1].sendDate
                    ).format("LT")}`
                  : null}
              </h6>
              {isNewMessage &&
              isNewMessage.length &&
              isNewMessage.filter((i) => i === item._id).length ? (
                <p className={style.newMessage}>
                  {isNewMessage.filter((i) => i === item._id).length}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MessageContent = ({
  data,
  messageChange,
  sendClick,
  currentMessage,
  userInfo,
  newMessage,
  handleKeyDown,
  selectedUser,
  report,
}) => {
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [newMessage, selectedUser]);

  return (
    <div className={style.messageContent}>
      <div className={style.topBar}>
        <div className={style.avatarWrapper}>
          <img src={data.sender.avatar ? data.sender.avatar : Avatar} />
          <div className={style.info}>
            <h5>{data.sender.name}</h5>
            {/* <p>Online</p> */}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            report();
          }}
          className={style.report}
        >
          İhlal Bildir
        </button>
      </div>
      <div className={style.content}>
        <div ref={divRef} className={style.messageContainer}>
          {newMessage && newMessage.length
            ? [
                ...data.messageData,
                ...newMessage.filter((i) => i.messageId === data._id),
              ].map((item) => {
                return (
                  <div
                    className={`${style.message} ${
                      userInfo.type === item.type ? style.sender : null
                    }`}
                  >
                    <div className={style.info}>
                      {userInfo.type === item.type ? null : (
                        <img src={Avatar} />
                      )}
                      <p>
                        <span>{moment(item.sendDate).format("L")}</span>
                        <div className={style.dot} />
                        {moment(item.sendDate).format("LT")}
                      </p>
                    </div>
                    <div className={style.messageContent}>
                      <p>{item.text}</p>
                    </div>
                  </div>
                );
              })
            : data.messageData.map((item) => {
                return (
                  <div
                    className={`${style.message} ${
                      userInfo.type === item.type ? style.sender : null
                    }`}
                  >
                    <div className={style.info}>
                      {userInfo.type === item.type ? null : (
                        <img src={Avatar} />
                      )}
                      <p>
                        <span>{moment(item.sendDate).format("L")}</span>
                        <div className={style.dot} />
                        {moment(item.sendDate).format("LT")}
                      </p>
                    </div>
                    <div className={style.messageContent}>
                      <p>{item.text}</p>
                    </div>
                  </div>
                );
              })}
        </div>
        <div className={style.bottom}>
          {/* <button onClick={(e) => e.preventDefault()}>
            <FolderIcon />
          </button> */}
          <label>
            <input
              onKeyDown={handleKeyDown}
              value={currentMessage}
              onChange={messageChange}
              type="text"
              placeholder="Mesajınızı buraya yazınız."
            />
          </label>
          <button
            onClick={(e) => {
              e.preventDefault();
              sendClick();
            }}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

const Message = () => {
  const location = useLocation();
  const [isLoad, setLoad] = useState(true);
  const [selectedUser, setSelectedUser] = useState(0);
  const [data, setData] = useState();
  const userInfo = useSelector((state) => state.user);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isReport, setReport] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const userParam = queryParams.get("id");

  const getMessageList = (value) => {
    AxiosRequest("post", ApiRoutes.message.getMessageList, {
      userId: userInfo._id,
      type: userInfo.type,
    })
      .then(async (res) => {
        if (res.data && res.data.length) {
          setData(
            res.data.map((item) => {
              return {
                ...item,
                sender:
                  userInfo.type === "personal"
                    ? {
                        name: item.serviceUserID.firm.name,
                        avatar: item.serviceUserID.firm.logo,
                      }
                    : {
                        name:
                          item.personalUserID.name +
                          " " +
                          item.personalUserID.surname,
                        avatar: item.personalUserID.avatar,
                      },
              };
            })
          );

          if (userParam) {
            const findPerson = res.data.findIndex((i) =>
              userInfo.type === "personal"
                ? i.serviceUserID._id === userParam
                : i.personalUserID._id === userParam
            );

            if (findPerson >= 0) {
              setSelectedUser(findPerson);
            }
          }
        }
        setLoad(false);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setLoad(false);
        }
      });
  };

  useEffect(() => {
    getMessageList();
  }, []);

  const { messages, status, sendMessage } = useWebSocket(
    `wss://borvey-backend-a8f223c668a5.herokuapp.com/connect?userId=${userInfo._id}`
  );

  // const { messages, status, sendMessage } = useWebSocket(
  //   `ws://localhost:5050/connect?userId=${userInfo._id}`
  // );
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && event.target.value && currentMessage) {
      // navigate(`/search?keyword=${word}`);

      sendMessage(
        JSON.stringify({
          text: currentMessage,
          messageId: data[selectedUser]._id,
          type: userInfo.type,
          receiver: {
            id:
              userInfo.type === "personal"
                ? data[selectedUser].serviceUserID._id
                : data[selectedUser].personalUserID._id,
            type: userInfo.type === "personal" ? "service" : "personal",
          },
        })
      );
      setCurrentMessage("");
    }
  };

  const reportMessage = (value) => {
    AxiosRequest("post", ApiRoutes.user.reportMessage, {
      ...isReport,
      reason: value,
      type: userInfo.type,
    })
      .then(async (res) => {
        setSuccess(true);

        setTimeout(() => {
          setReport(false);
          setSuccess(false);
        }, 2000);
      })
      .catch((err) => {});
  };

  if (data) {
    console.log("selected", data[selectedUser]);
  }

  return (
    <>
      {isReport ? (
        <RatePopup
          closeClick={() => {
            setReport(false);
          }}
          rateClick={(e) => {
            reportMessage(e);
          }}
          report
          isSuccess={isSuccess}
        />
      ) : null}
      {isLoad ? null : (
        <div className={style.wrapper}>
          <>
            {data && data.length ? (
              <>
                <SideBar
                  selectedUser={selectedUser}
                  changeUser={(e) => setSelectedUser(e)}
                  data={data}
                  newMessages={messages}
                />
                <MessageContent
                  report={() => {
                    setReport({
                      personalUserId:
                        userInfo.type === "personal"
                          ? userInfo._id
                          : data[selectedUser].personalUserID._id,
                      serviceUserId:
                        userInfo.type === "service"
                          ? userInfo._id
                          : data[selectedUser].serviceUserID._id,
                      messageId: data[selectedUser]._id,
                    });
                  }}
                  messageChange={(e) => setCurrentMessage(e.target.value)}
                  currentMessage={currentMessage}
                  sendClick={() => {
                    sendMessage(
                      JSON.stringify({
                        text: currentMessage,
                        messageId: data[selectedUser]._id,
                        type: userInfo.type,
                        receiver: {
                          id:
                            userInfo.type === "personal"
                              ? data[selectedUser].serviceUserID._id
                              : data[selectedUser].personalUserID._id,
                          type:
                            userInfo.type === "personal"
                              ? "service"
                              : "personal",
                        },
                      })
                    );
                    setCurrentMessage("");
                  }}
                  userInfo={userInfo}
                  data={data[selectedUser]}
                  newMessage={messages}
                  handleKeyDown={handleKeyDown}
                  selectedUser={selectedUser}
                />
              </>
            ) : (
              <h4>mesajınız bulunmamaktadır</h4>
            )}
          </>
        </div>
      )}
    </>
  );
};

export default Message;
