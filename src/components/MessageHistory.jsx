import React, { useEffect } from "react";
import ScrollableFeed from "react-scrollable-feed";
import "./message.css";
import { useSelector, useDispatch } from "react-redux";
import { detailsUser } from "../redux/slices/userSlice";

const MessageHistory = ({ messages }) => {
  const dispatch = useDispatch();
  const { user: activeUser } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(detailsUser());
  }, [dispatch]);

  return (
    <ScrollableFeed className="scrollbar-hide">
      {messages &&
        messages.map((m) => (
          <div
            className={`flex items-center gap-x-[6px] ${
              m.sender === activeUser._id ? "justify-end" : "justify-start"
            }`}
            key={m._id}
          >
            <span
              className={`tracking-wider text-[15px] font-medium p-2 my-1 rounded-lg ${
                m.sender === activeUser._id
                  ? "bg-[#FF9A00] text-white"
                  : "bg-[#383E42] text-white"
              }`}
            >
              {m.message}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default MessageHistory;
