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

import { RiSendPlaneFill } from "react-icons/ri";

const MessageInput = ({ chatId, otherUserId, onClickScrollDown }) => {
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
        sender_Id: currentUser._id,
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

    onClickScrollDown();
  };

  return (
    <div className="w-full p-3  h-1/6 flex place-items-end">
      <form
        onSubmit={handleSend}
        className="bg-white p-2 rounded-lg shadow-xl mb-2 w-full"
      >
        <div className="flex">
          <input
            type="text"
            placeholder="Type something..."
            onChange={(e) => setText(e.target.value)}
            value={text}
            required
            autoFocus
            className="w-full rounded border-0 focus:ring-0  mr-5"
          />
          <button className=" bg-[#2C61F6] px-2 rounded-md mr-2 hover:text-red-500">
            <RiSendPlaneFill size={25} color={"white"} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
