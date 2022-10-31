import { doc, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { db } from "../../firebase/firebase-config";
import UserMessageInput from "./UserMessageInput";
import { Link } from "react-router-dom";

const UserMessagesComponent = ({
  chatId,
  currentUserId,
  otherUserProfile,
  otherUserId,
  displayName,
}) => {
  const [messages, setMessages] = useState([]);
  const [isOtherTyping, setIsOtherTyping] = useState(false);

  const scrollDown = useRef();

  const onClickScrollDown = () => {
    if (scrollDown.current !== undefined && scrollDown.current !== null) {
      scrollDown.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Messages Logs
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "userMessages", chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    // This is for the ref scroll
    messages.length !== 0 &&
      scrollDown.current !== undefined &&
      onClickScrollDown();
    return () => {
      unSub();
    };
  }, [chatId, messages.length]);

  // Getting the Typing
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "userMessages", chatId), (doc) => {
      if (doc.exists() && doc.data().isTyping !== undefined) {
        const otherUserValue = Object.entries(doc.data().isTyping).find(
          (chat) => chat[0] === otherUserId
        );

        if (otherUserValue) {
          setIsOtherTyping(otherUserValue[1]);
          scrollDown.current !== undefined && onClickScrollDown();
        }
      }
    });

    return () => {
      unSub();
    };
  }, [chatId, otherUserId]);

  const dateToTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
      day: "2-digit",
      month: "short",
      hour12: true,
    });
  };

  return (
    <div className="bg-[#EFF3F8] h-[85vh] sm:h-[88vh] rounded-md relative">
      <div className="h-[78vh] p-5 overflow-y-auto  rounded">
        {messages.map((message) => (
          <div key={message.id}>
            {message.senderId === currentUserId ? (
              <div>
                <div className="flex justify-end mt-5 mb-2 text-sm text-gray-400">
                  {dateToTime(message.date.toDate())}
                </div>
                <div className=" flex justify-end">
                  <div className=" flex justify-end w-3/5">
                    <div className="text-end bg-[#CCE6FB]  p-3 rounded-l-2xl rounded-b-2xl max-w-fit">
                      {message.text}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center mt-7 text-sm ">
                  <Link to={`/user/${message.sender_Id}`}>
                    <img
                      src={otherUserProfile}
                      alt={message.senderId}
                      className="rounded-full h-8 md:h-10 mr-2"
                    />
                  </Link>
                  <Link
                    to={`/user/${message.sender_Id}`}
                    className="hover:text-red-500"
                  >
                    {displayName}
                  </Link>
                  <span className="ml-2 text-gray-500">
                    {dateToTime(message.date.toDate())}
                  </span>
                </div>

                <div className="flex justify-start w-3/5">
                  <div className="text-start mr-3 bg-white mt-2 p-3 rounded-r-2xl rounded-b-2xl max-w-fit">
                    {message.text}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {isOtherTyping && (
          <div>
            <div className="flex items-center mt-7 text-sm">
              <div>
                <img
                  src={otherUserProfile}
                  alt="profile"
                  className="rounded-full h-8 md:h-10 mr-2"
                />
              </div>
              <div className="hover:text-red-500">{displayName}</div>
            </div>

            <div className="flex justify-start w-3/5">
              <div className="text-start mr-3 bg-gray-300 mt-2 p-3 rounded-r-2xl rounded-b-2xl max-w-fit">
                Typing...
              </div>
            </div>
          </div>
        )}
        <div ref={scrollDown}></div>
      </div>
      <UserMessageInput
        chatId={chatId}
        otherUserId={otherUserId}
        onClickScrollDown={onClickScrollDown}
      />
    </div>
  );
};

export default UserMessagesComponent;
