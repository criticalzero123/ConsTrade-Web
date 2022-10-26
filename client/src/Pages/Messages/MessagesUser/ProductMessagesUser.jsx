import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { getUserById } from "../../../actions/userActions";
import { getProductById } from "../../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../../firebase/firebase-config";
import ProductMessagesComponent from "../../../Components/Messages/ProductMessagesComponent";

const ProductMessagesUser = () => {
  const { uid, productId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const [chatId, otherUserProfile, displayName, chats] = useOutletContext();

  const [newChatUserId, setNewChatUserId] = useState("");

  const { user, error, loading } = useSelector(
    (state) => state.getUserByIdReducer
  );

  const { currentUser } = useSelector((state) => state.userInfoReducer);
  const { product } = useSelector((state) => state.getProductByIdReducer);

  var onRenderChatKey = "";
  var onRenderChat = null;

  useEffect(() => {
    dispatch(getUserById(uid));
    dispatch(getProductById(productId));
  }, [dispatch, uid, productId]);

  if (user && chats) {
    onRenderChatKey = Object.keys(chats).find((chat) =>
      chat.includes(user.uid)
    );
    onRenderChat = Object.entries(chats).find((chat) =>
      chat[0].includes(user.uid)
    );
  }

  useEffect(() => {
    if (location.state === null) return;

    const onRenderChat = async () => {
      if (currentUser && user) {
        // const defaultMessage =
        //   "Hello i'm trying to negotiate for the item name " +
        //   location.state.title;

        const combinedId =
          currentUser.uid > user.uid
            ? currentUser.uid + user.uid + location.state.title
            : user.uid + currentUser.uid + location.state.title;

        setNewChatUserId(combinedId);

        const res = await getDoc(doc(db, "productMessages", combinedId));
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

            await setDoc(doc(db, "productMessages", combinedId), {
              messages: [],
            });

            // create user chats
            await updateDoc(doc(db, "productChats", currentUser.uid), {
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

            await updateDoc(doc(db, "productChats", user.uid), {
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
    onRenderChat();
  });

  // const _completed = product && product.status === "sold" ? true : false;

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
                <Link
                  to="/messages/product"
                  className="cursor-pointer flex place-items-center hover:text-orange-500 mb-2 sm:hidden"
                >
                  <MdOutlineKeyboardBackspace className="mr-1 " /> Back
                </Link>

                <ProductMessagesComponent
                  chatId={chatKey}
                  currentUserId={currentUser.uid}
                  currentUser_Id={currentUser._id}
                  otherUserId={user.uid}
                  otherUser_Id={user._id}
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

export default ProductMessagesUser;
