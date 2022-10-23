import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { getUserById } from "../../../actions/userActions";
import { getProductById } from "../../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../../firebase/firebase-config";
import MessagesComponent from "../../../Components/Messages/MessagesComponent";
import MessageModalSoldInfo from "../../../Components/Messages/MessageModalSoldInfo";

const MessagesUser = () => {
  const { uid } = useParams();

  const [chatId, otherUserProfile, productId, displayName, chats] =
    useOutletContext();
  const location = useLocation();

  const [newChatUserId, setNewChatUserId] = useState("");

  const dispatch = useDispatch();
  const { user, error, loading } = useSelector(
    (state) => state.getUserByIdReducer
  );

  const { currentUser } = useSelector((state) => state.userInfoReducer);
  const { product } = useSelector((state) => state.getProductByIdReducer);

  var onRenderChatKey = "";
  var onRenderChat = null;
  const [onProductId, setOnProductId] = useState(productId);

  if (user && chats) {
    onRenderChatKey = Object.keys(chats).find((chat) =>
      chat.includes(user.uid)
    );
    onRenderChat = Object.entries(chats).find((chat) =>
      chat[0].includes(user.uid)
    );
  }

  if (onProductId === "" && onRenderChat) {
    setOnProductId(onRenderChat[1].productInfo.productId);
  }

  useEffect(() => {
    dispatch(getUserById(uid));
    onProductId && dispatch(getProductById(onProductId));
  }, [dispatch, uid, onProductId]);

  useEffect(() => {
    if (location.state === null) return;

    const handleClick = async () => {
      if (currentUser && user) {
        // const defaultMessage =
        //   "Hello i'm trying to negotiate for the item name " +
        //   location.state.title;

        const combinedId =
          currentUser.uid > user.uid
            ? currentUser.uid + user.uid + location.state.title
            : user.uid + currentUser.uid + location.state.title;

        setNewChatUserId(combinedId);

        const res = await getDoc(doc(db, "chats", combinedId));
        try {
          if (!res.exists()) {
            //create a chat in chats collection
            // this is when creating a new chat
            // await setDoc(doc(db, "chats", combinedId), {
            //   messages: [
            //     {
            //       id: v4(),
            //       sender_Id: currentUser._id,
            //       text: defaultMessage,
            //       senderId: currentUser.uid,
            //       date: Timestamp.now(),
            //     },
            //   ],
            // });

            await setDoc(doc(db, "chats", combinedId), {
              messages: [],
            });

            // create user chats
            await updateDoc(doc(db, "userChats", currentUser.uid), {
              [combinedId + ".userInfo"]: {
                uid: user.uid,
                _id: user._id,
                displayName: user.name,
                photoURL: user.imagePhotoURL,
              },
              [combinedId + ".productInfo"]: {
                title: location.state.title,
                productId: location.state._id,
                imageURL: location.state.imageURL,
              },

              // [combinedId + ".lastMessage"]: {
              //   text: defaultMessage,
              // },
              [combinedId + ".date"]: serverTimestamp(),
            });

            await updateDoc(doc(db, "userChats", user.uid), {
              [combinedId + ".userInfo"]: {
                uid: currentUser.uid,
                _id: currentUser._id,
                displayName: currentUser.name,
                photoURL: currentUser.imagePhotoURL,
              },
              [combinedId + ".productInfo"]: {
                title: location.state.title,
                productId: location.state._id,
                imageURL: location.state.imageURL,
              },

              // [combinedId + ".lastMessage"]: {
              //   text: defaultMessage,
              // },
              [combinedId + ".date"]: serverTimestamp(),
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    handleClick();
  });

  const completed = product && product.status === "sold";

  // TODO: optimize this
  const chatKey =
    chatId !== ""
      ? chatId
      : newChatUserId !== ""
      ? newChatUserId
      : onRenderChatKey !== ""
      ? onRenderChatKey
      : "";

  return (
    <>
      {error && <div>error</div>}
      {loading ? (
        <div>loading...</div>
      ) : (
        user && (
          <>
            {chatKey !== "" && chatKey !== undefined && (
              <div>
                <MessageModalSoldInfo product={product} completed={completed} />
                <MessagesComponent
                  chatId={chatKey}
                  currentUserId={currentUser.uid}
                  currentUser_Id={currentUser._id}
                  otherUserProfile={
                    otherUserProfile === ""
                      ? onRenderChat && onRenderChat[1].userInfo.photoURL
                      : otherUserProfile
                  }
                  completed={completed}
                  displayName={
                    displayName === ""
                      ? onRenderChat && onRenderChat[1].userInfo.displayName
                      : displayName
                  }
                  product={product}
                />
                <br />
              </div>
            )}
          </>
        )
      )}
    </>
  );
};

export default MessagesUser;
