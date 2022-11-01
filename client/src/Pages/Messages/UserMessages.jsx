import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { db } from "../../firebase/firebase-config";
import { doc, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import UserSideDisplay from "../../Components/Messages/UserSideDisplay";
import { searchUser } from "../../actions/userActions";
import UserSearchDisplay from "../../Components/Messages/Search/UserSearchDisplay";

const UserMessages = () => {
  const dispatch = useDispatch();
  // To get the current URL
  const location = useLocation();
  const splitName = location.pathname.split("/");
  const pathLength = splitName.length;

  //searching
  const [userSearch, setUserSearch] = useState("");
  const [timer, setTimer] = useState(null);
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

  const userSearchHandler = (e) => {
    const query = e.target.value;
    setUserSearch(query);

    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(() => {
        if (query.toString().trim() !== "") {
          dispatch(searchUser(query));
        }
      }, 500)
    );
  };

  const usersChatSearch = useSelector((state) => state.searchUserReducer);
  const usersChat = usersChatSearch.users;

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
        {/* Search */}
        <input
          type="text"
          value={userSearch}
          onChange={userSearchHandler}
          placeholder="Search Name..."
          className="w-full mb-5 rounded-full border-1 border-gray-200 shadow-lg text-sm"
        />
        {userSearch.toString().trim() !== "" &&
          (usersChat !== undefined && usersChat.length !== 0 ? (
            usersChat.map((userChat) => (
              <Link
                to={`${userChat._id}`}
                key={userChat._id}
                onClick={() => {
                  setChatId(
                    currentUser.uid > userChat.uid
                      ? currentUser.uid + userChat.uid
                      : userChat.uid + currentUser.uid
                  );
                  setOtherUserProfile(userChat.imagePhotoURL);
                  setDisplayName(userChat.name);
                  setUserSearch("");
                }}
              >
                <UserSearchDisplay user={userChat} />
              </Link>
            ))
          ) : (
            <div>No users found</div>
          ))}

        {/* Chat logs */}
        {userSearch.toString().trim() === "" &&
          (arrayOfChatsUser.length === 0 ? (
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
          ))}
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
