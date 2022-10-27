import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { db } from "../../firebase/firebase-config";
import { doc, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import UserSideDisplay from "../../Components/Messages/UserSideDisplay";

const UserMessages = () => {
  // To get the current URL
  const location = useLocation();
  const splitName = location.pathname.split("/");
  const pathLength = splitName.length;

  //
  const [chats, setChats] = useState();
  const [chatId, setChatId] = useState("");
  const [otherUserProfile, setOtherUserProfile] = useState("");
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
        } sm:col-span-2 w-full overflow-y-auto h-[88vh] bg-[#F5F7FB] p-5 rounded`}
      >
        <div className="grid grid-cols-2 mb-5">
          <div className="flex justify-center">
            <Link className="text-orange-500 font-poppins font-semibold border-b-2 border-b-orange-500 ">
              Users
            </Link>
          </div>
          <div className="flex justify-center">
            <Link
              to="/messages/product"
              className=" hover:text-blue-500 font-poppins"
            >
              Products
            </Link>
          </div>
        </div>
        {arrayOfChatsUser.length === 0 ? (
          <div className="mx-auto">No conversations</div>
        ) : (
          chats !== undefined &&
          Object.entries(chats)
            ?.sort((a, b) => b[1].date - a[1].date)
            .map(
              (chat) =>
                chat[1].lastMessage.text !== "" && (
                  <Link
                    key={chat[0]}
                    to={`${chat[1].userInfo._id}`}
                    onClick={() => {
                      setChatId(chat[0]);
                      setOtherUserProfile(chat[1].userInfo.photoURL);
                      setDisplayName(chat[1].userInfo.displayName);
                    }}
                  >
                    <UserSideDisplay
                      lastMessage={chat[1].lastMessage.text}
                      displayName={chat[1].userInfo.displayName}
                      photoURL={chat[1].userInfo.photoURL}
                      userId={chat[1].userInfo._id}
                    />
                  </Link>
                )
            )
        )}
      </aside>
      <div className={`${pathLength < 4 && "hidden sm:block"} sm:col-span-4 `}>
        {pathLength < 4 && (
          <div className="text-black h-[88vh] bg-[#F5F7FB] flex place-items-center justify-center text-4xl">
            Select Conversation
          </div>
        )}
        <Outlet context={[chatId, otherUserProfile, displayName, chats]} />
      </div>
    </div>
  );
};

export default UserMessages;
