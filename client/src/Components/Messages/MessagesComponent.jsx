import { doc, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { db } from "../../firebase/firebase-config";
import MessageInput from "./MessageInput";
import { Link } from "react-router-dom";

const MessagesComponent = ({
  chatId,
  currentUserId,
  otherUserProfile,
  currentUserProfile,
  otherUserId,
}) => {
  const [messages, setMessages] = useState([]);

  const scrollDown = useRef();

  const onClickScrollDown = () => {
    if (scrollDown.current !== undefined && scrollDown.current !== null) {
      scrollDown.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (doc) => {
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

  return (
    <div className="">
      <div className="h-[30rem] p-5 overflow-y-auto  bg-gray-400 rounded">
        {messages.map((message) => (
          <div key={message.id}>
            {message.senderId === currentUserId ? (
              <div className="grid justify-end">
                <div className="flex h-12 mt-3">
                  <div className="place-self-center mr-3">{message.text}</div>
                  <img
                    src={currentUserProfile}
                    alt={message.senderId}
                    className="rounded-full"
                  />
                </div>
              </div>
            ) : (
              <div className="grid justify-start">
                <div className="flex h-12 mt-3">
                  <Link to={`/user/${message.sender_Id}`}>
                    <img
                      src={otherUserProfile}
                      alt={message.senderId}
                      className="rounded-full h-full"
                    />
                  </Link>
                  <div className="place-self-center ml-3">{message.text}</div>
                </div>
              </div>
            )}
          </div>
        ))}

        <div ref={scrollDown}></div>
      </div>
      <hr />
      <MessageInput
        chatId={chatId}
        otherUserId={otherUserId}
        onClickScrollDown={onClickScrollDown}
      />
    </div>
  );
};

export default MessagesComponent;
