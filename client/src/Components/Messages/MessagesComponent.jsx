import { doc, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase-config";

const MessagesComponent = ({ chatId, currentUserId, otherUserProfile }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
          {message.senderId === currentUserId ? (
            <div className="grid justify-end">
              <div className="flex h-12 mt-3">
                <div className="place-self-center mr-3">{message.text}</div>
                <img
                  src={otherUserProfile}
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
    </div>
  );
};

export default MessagesComponent;
