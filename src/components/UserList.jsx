import React, { useEffect } from "react";
import { chatList } from "../redux/slices/chatSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import image from "../assets/images/profile1.png";
const UserList = () => {
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(chatList());
  }, [dispatch]);

  if (loading) {
    return <p className="p-4">Loading...</p>;
  }

  return (
    <div className=" w-[100%]">
      <div className="p-2">
        <p className="text-[#383E42] text-[18px]">Mesaj yaz</p>

        {data?.length === 0 && (
          <div className="bg-gray-300 p-2">
            <h3>You have no active chats</h3>
          </div>
        )}
        <div class="message-box-search-bar ">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Mesaj ara..." />
        </div>
        {data?.map((user) => {
          const otherUser = user?.receiver || user?.sender;
          return (
            otherUser && (
              <Link to={`/message/${otherUser._id}`} key={otherUser._id}>
                <div className="w-[100%] min-w-[250px] max-w-[300px] bg-[#FF9A00] rounded-[5px] mt-4">
                  <div className="message-contact">
                    <div className="message-contact-profile">
                      <div className="message-profile">
                        {otherUser.image ? (
                          <img
                            width="30px"
                            src={otherUser.image}
                            alt="profile"
                          />
                        ) : (
                          <img width="30px" src={image} alt="profile" />
                        )}
                      </div>
                      <div>
                        <div className="message-name text-white">
                          {otherUser.fullName}
                        </div>
                        <p className="opacity-[0.7] text-[16px] text-white">
                          {user?.latestMessage?.length > 50
                            ? `${user?.latestMessage?.slice(0, 20)}...`
                            : user?.latestMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          );
        })}
      </div>
    </div>
  );
};

export default UserList;
