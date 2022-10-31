import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useOutletContext, Link } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../../firebase/firebase-config";
import { getUserById } from "../../../actions/userActions";
import UserMessagesComponent from "../../../Components/Messages/UserMessagesComponent";

const PersonalMessagesUser = () => {
  const { uid } = useParams();
  const dispatch = useDispatch();

  const [chatId, otherUserProfile, displayName, chats] = useOutletContext();

  const [newChatUserId, setNewChatUserId] = useState("");

  const { user, error, loading } = useSelector(
    (state) => state.getUserByIdReducer
  );

  const { currentUser } = useSelector((state) => state.userInfoReducer);

  var onRenderChatKey = "";
  var onRenderChat = null;

  useEffect(() => {
    dispatch(getUserById(uid));
  }, [dispatch, uid]);

  if (user && chats) {
    onRenderChatKey = Object.keys(chats).find((chat) =>
      chat.includes(user.uid)
    );
    onRenderChat = Object.entries(chats).find((chat) =>
      chat[0].includes(user.uid)
    );
  }

  useEffect(() => {
    const onRenderChat = async () => {
      if (currentUser && user) {
        const combinedId =
          currentUser.uid > user.uid
            ? currentUser.uid + user.uid
            : user.uid + currentUser.uid;

        setNewChatUserId(combinedId);

        const res = await getDoc(doc(db, "userMessages", combinedId));
        try {
          if (!res.exists()) {
            await setDoc(doc(db, "userMessages", combinedId), {
              messages: [],
              isTyping: {
                [currentUser.uid]: false,
                [user.uid]: false,
              },
            });

            // create user chats
            await updateDoc(doc(db, "userChats", currentUser.uid), {
              [combinedId + ".userInfo"]: {
                uid: user.uid,
                _id: user._id,
                displayName: user.name,
                photoURL: user.imagePhotoURL,
              },
              [combinedId + ".lastMessage"]: {
                text: "",
              },
              [combinedId + ".date"]: serverTimestamp(),
            });

            await updateDoc(doc(db, "userChats", user.uid), {
              [combinedId + ".userInfo"]: {
                uid: currentUser.uid,
                _id: currentUser._id,
                displayName: currentUser.name,
                photoURL: currentUser.imagePhotoURL,
              },
              [combinedId + ".lastMessage"]: {
                text: "",
              },
              [combinedId + ".date"]: serverTimestamp(),
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    onRenderChat();
  });

  // TODO: optimize this
  const chatKey =
    chatId !== ""
      ? chatId
      : newChatUserId !== ""
      ? newChatUserId
      : onRenderChatKey !== ""
      ? onRenderChatKey
      : "";

  if (error) {
    return <div>Error.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    user && (
      <>
        {chatKey !== "" && chatKey !== undefined && (
          <div>
            <Link
              to="/messages/user"
              className="cursor-pointer flex place-items-center hover:text-orange-500 mb-2 sm:hidden"
            >
              <MdOutlineKeyboardBackspace className="mr-1 " /> Back
            </Link>

            <UserMessagesComponent
              chatId={chatKey}
              currentUserId={currentUser.uid}
              otherUserId={user.uid}
              otherUserProfile={
                otherUserProfile === ""
                  ? onRenderChat && onRenderChat[1].userInfo.photoURL
                  : otherUserProfile
              }
              displayName={
                displayName === ""
                  ? onRenderChat && onRenderChat[1].userInfo.displayName
                  : displayName
              }
            />
            <br />
          </div>
        )}
      </>
    )
  );
};

export default PersonalMessagesUser;
