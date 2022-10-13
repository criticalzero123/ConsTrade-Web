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
  const [productId, setProductId] = useState("");
  const [displayName, setDisplayName] = useState("");
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
    <div className="grid grid-cols-6 gap-4 ">
      <aside className="col-span-2 xl:col-span-1 overflow-y-auto h-[35rem] bg-[#F5F7FB] p-5 rounded">
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
                  setProductId(chat[1].productInfo.productId);
                  setDisplayName(chat[1].userInfo.displayName);
                }}
              >
                <SideUserDisplay
                  displayTitle={chat[1].productInfo.title}
                  displayName={chat[1].userInfo.displayName}
                  photoURL={chat[1].productInfo.imageURL}
                />
              </Link>
            ))}
      </aside>
      <div className="col-span-4 ">
        <div className="">
          {splitName.length < 3 && (
            <div className="text-black h-[30rem] bg-[#F5F7FB] flex place-items-center justify-center text-4xl">
              Select Someone to chat
            </div>
          )}
          <Outlet
            context={[chatId, otherUserProfile, productId, displayName]}
          />
        </div>
      </div>
    </div>
  );
};

export default Messages;
