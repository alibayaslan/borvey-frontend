import React, { useEffect, useState } from "react";
import { chatList } from "../redux/slices/chatSlice";
import "./../style.css";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../partials/Loader";
import io from "socket.io-client";
import image from "../assets/images/profile1.png";
import MessageHistory from "./MessageHistory";
import Typing from "./Typing";
import { createMessage, messageList } from "../redux/slices/messageSlice";
import ReportModalUser from "../components/ReportModalUser";
import BlockModal from "../components/BlockModal";

const socket = io("https://borvey-backend-two.vercel.app");

const Chat = ({ chatUser, chatUserLoading }) => {
  const id = window.location.pathname.split("/")[2];

  const { data, loading } = useSelector((state) => state.message);

  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(data);
  const [isTyping, setIsTyping] = useState(false);


  const [isOpenReport, setIsOpenReport] = useState(false);
  const [isOpenBlock, setIsOpenBlock] = useState(false);


  const handleKeyDown = async (e) => {
    if ((e.key === "Enter" || e.type === "click") && message.trim()) {
      e.preventDefault();
      const newMessage = { chatId: id, message };
      setMessage("");
      await dispatch(createMessage({ newMessage }));
      socket.emit("chat message", newMessage);
    }
  };

  useEffect(() => {
    const eventListener = (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    };
    socket.on("chat message", eventListener);
    return () => {
      socket.off("chat message", eventListener);
    };
  }, [socket]);

  useEffect(() => {
    dispatch(messageList({ id }));
    dispatch(chatList());
  }, [dispatch, id]);

  useEffect(() => {
    if (data) {
      setMessages(data);
    }
  }, [data]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
    <div className="p-2 w-[100%]">
      <div class="message-box-nav p-4">
        <div className="flex gap-2 ">
          <div className="message-profile">
            {chatUser?.image ? (
              <img
              width="50px"
              height="50px"
              src={chatUser?.image}
              alt="profile"
              className="rounded-[50%]"
            />
            ) : (
              <img
              width="50px"
              height="50px"
              src={image}
              alt="profile"
              className="rounded-[50%]"
            />
            )}
            
          </div>
          <div class="title">
            {chatUser?.fullName}
            <br />
            <span>
              <i class="fa-solid fa-circle"></i> Çevrimiçi
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div class="dot-line dot-line-report cursor-pointer" onClick={(e) => setIsOpenReport(!isOpenReport)}>
            <i class="fa-solid fa-flag"></i>
          </div>
          <div class="dot-line cursor-pointer" onClick={(e) => setIsOpenBlock(!isOpenBlock)}>
            <i class="fa-solid fa-ban"></i>
          </div>
        </div>
      </div>
      <div className="scrollbar-hide bg-white  rounded-md w-[100%] h-[70vh] md:h-[66vh] lg:h-[69vh] flex flex-col overflow-y-scroll p-4">
        <MessageHistory typing={isTyping} messages={messages} />
        <div className="ml-7 -mb-10">
          {isTyping && <Typing width="100" height="100" />}
        </div>
        <div className="border-[1px] border-[#aabac8]  bg-[#d8d9db] px-6 py-3 w-[100%] mt-12 rounded-md">
          <form onSubmit={handleKeyDown} className="flex gap-2 items-center">
            <input
              onChange={(e) => setMessage(e.target.value)}
              className="focus:outline-0 w-[100%] bg-transparent"
              type="text"
              name="message"
              placeholder="Enter message"
              value={message}
            />
            <button
              onClick={handleKeyDown}
              className="bg-[#006EDF] text-[14px] px-4 py-2 text-white font-medium rounded-[3px] "
            >
              Gönder
            </button>
          </form>
        </div>
      </div>
    </div>
     <ReportModalUser
     isOpenReport={isOpenReport}
     setIsOpenReport={setIsOpenReport}
     id={id}
   />
    <BlockModal
     isOpenReport={isOpenBlock}
     setIsOpenReport={setIsOpenBlock}
     id={id}
   />
   </>
  );
};

export default Chat;
