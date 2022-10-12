import { doc, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { db } from "../../firebase/firebase-config";
import MessageInput from "./MessageInput";

const MessagesComponent = ({
  chatId,
  currentUserId,
  otherUserProfile,
  currentUserProfile,
  otherUserId,
}) => {
  const [messages, setMessages] = useState([]);

  const scrollDown = useRef();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  const onClickScrollDown = () => {
    scrollDown.current.scrollIntoView({ behavior: "smooth" });
    console.log("");
  };

  return (
    <div className="">
      <div className="h-[47rem] p-5 overflow-y-auto  bg-gray-400 rounded">
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
                  <img
                    src={otherUserProfile}
                    alt={message.senderId}
                    className="rounded-full"
                  />
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
