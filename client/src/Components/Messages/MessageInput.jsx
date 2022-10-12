import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase/firebase-config";
import { v4 } from "uuid";

import { MdSend } from "react-icons/md";

const MessageInput = ({ chatId, otherUserId }) => {
  const [text, setText] = useState("");

  const { currentUser } = useSelector((state) => state.userInfoReducer);

  const handleSend = async (e) => {
    e.preventDefault();

    setText("");

    await updateDoc(doc(db, "chats", chatId), {
      messages: arrayUnion({
        id: v4(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [chatId + ".lastMessage"]: {
        text,
      },
      [chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", otherUserId), {
      [chatId + ".lastMessage"]: {
        text,
      },
      [chatId + ".date"]: serverTimestamp(),
    });
  };

  return (
    <div className="w-full mt-2">
      <form onSubmit={handleSend}>
        <div className="flex">
          <input
            type="text"
            placeholder="Type something..."
            onChange={(e) => setText(e.target.value)}
            value={text}
            required
            className="w-full rounded"
          />
          <button>
            <MdSend size={30} className="ml-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
