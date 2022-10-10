import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { db } from "../../firebase/firebase-config";
import { doc, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";

import SideUserDisplay from "../../Components/Messages/SideUserDisplay";

const Messages = () => {
  // To get the current URL
  const location = useLocation();
  const splitName = location.pathname.split("/");
  //
  const [chats, setChats] = useState();
  const [chatId, setChatId] = useState("");
  const [otherUserProfile, setOtherUserProfile] = useState("");
  const { currentUser } = useSelector((state) => state.userInfoReducer);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  return (
    <div className="grid grid-cols-6 gap-4">
      <aside className="col-span-2 lg:col-span-1 overflow-y-hidden hover:overflow-y-auto h-[50rem] bg-gray-400 p-5 rounded">
        {chats !== undefined &&
          Object.entries(chats)
            ?.sort((a, b) => b[1].date - a[1].date)
            .map((chat) => (
              <Link
                key={chat[0]}
                to={`user/${chat[1].userInfo._id}`}
                onClick={() => {
                  setChatId(chat[0]);
                  setOtherUserProfile(chat[1].userInfo.photoURL);
                }}
              >
                <SideUserDisplay
                  lastMessage={chat[1].lastMessage?.text}
                  displayName={chat[1].userInfo.displayName}
                  photoURL={chat[1].userInfo.photoURL}
                />
              </Link>
            ))}
      </aside>
      <div className="col-span-4">
        <div className="bg-gray-400 rounded p-5 overflow-y-hidden hover:overflow-y-auto h-[50rem]">
          {splitName.length < 3 && <div>Select Someone to chat</div>}
          <Outlet context={[chatId, otherUserProfile]} />
        </div>
      </div>
    </div>
  );
};

export default Messages;
