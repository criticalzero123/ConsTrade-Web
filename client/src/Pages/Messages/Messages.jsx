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
  const pathLength = splitName.length;

  //
  const [chats, setChats] = useState();
  const [chatId, setChatId] = useState("");
  const [otherUserProfile, setOtherUserProfile] = useState("");
  const [productId, setProductId] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { currentUser } = useSelector((state) => state.userInfoReducer);

  const arrayOfChatsUser = chats !== undefined && Object.entries(chats);

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
    <div className="sm:grid sm:grid-cols-6 sm:gap-4">
      <aside
        className={`${
          pathLength > 3 && "hidden sm:block"
        } sm:col-span-2 w-full overflow-y-auto h-[35rem] bg-[#F5F7FB] p-5 rounded`}
      >
        {arrayOfChatsUser.length === 0 ? (
          <div className="mx-auto">No conversations</div>
        ) : (
          chats !== undefined &&
          Object.entries(chats)
            ?.sort((a, b) => b[1].date - a[1].date)
            .map((chat) => (
              <Link
                key={chat[0]}
                to={`user/${chat[1].userInfo._id}`}
                onClick={() => {
                  setChatId(chat[0]);
                  setOtherUserProfile(chat[1].userInfo.photoURL);
                  setProductId(chat[1].productInfo.productId);
                  setDisplayName(chat[1].userInfo.displayName);
                }}
              >
                <SideUserDisplay
                  displayTitle={chat[1].productInfo.title}
                  displayName={chat[1].userInfo.displayName}
                  photoURL={chat[1].productInfo.imageURL}
                  userId={chat[1].userInfo._id}
                />
              </Link>
            ))
        )}
      </aside>

      <div className={`${pathLength < 3 && "hidden sm:block"} sm:col-span-4 `}>
        {pathLength < 3 && (
          <div className="text-black h-[30rem] bg-[#F5F7FB] flex place-items-center justify-center text-4xl">
            Select Conversation
          </div>
        )}
        <Outlet
          context={[chatId, otherUserProfile, productId, displayName, chats]}
        />
      </div>
    </div>
  );
};

export default Messages;
