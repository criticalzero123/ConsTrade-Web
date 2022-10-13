import React, { useEffect } from "react";
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
  Timestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../../firebase/firebase-config";
import MessagesComponent from "../../../Components/Messages/MessagesComponent";
import MessageModal from "../../../Components/Messages/MessageModal";
import { v4 } from "uuid";
import MessageModalSoldInfo from "../../../Components/Messages/MessageModalSoldInfo";

const MessagesUser = () => {
  const { uid } = useParams();

  const [chatId, otherUserProfile, productId, displayName] = useOutletContext();
  const location = useLocation();

  const dispatch = useDispatch();
  const { user, error, loading } = useSelector(
    (state) => state.getUserByIdReducer
  );

  const { currentUser } = useSelector((state) => state.userInfoReducer);
  const { product } = useSelector((state) => state.getProductByIdReducer);

  useEffect(() => {
    dispatch(getUserById(uid));
    productId && dispatch(getProductById(productId));
  }, [dispatch, uid, productId]);
  const handleClick = async () => {
    const defaultMessage =
      "Hello i'm trying to negotiate for the item name " + location.state.title;

    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid + location.state.title
        : user.uid + currentUser.uid + location.state.title;

    const res = await getDoc(doc(db, "chats", combinedId));
    try {
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), {
          messages: [
            {
              id: v4(),
              sender_Id: currentUser._id,
              text: defaultMessage,
              senderId: currentUser.uid,
              date: Timestamp.now(),
            },
          ],
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

          [combinedId + ".lastMessage"]: {
            text: defaultMessage,
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
          [combinedId + ".productInfo"]: {
            title: location.state.title,
            productId: location.state._id,
            imageURL: location.state.imageURL,
          },

          [combinedId + ".lastMessage"]: {
            text: defaultMessage,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const completed = product && product.status === "sold";

  return (
    <>
      {error && <div>error</div>}
      {loading ? (
        <div>loading...</div>
      ) : (
        user && (
          <>
            {chatId !== "" && (
              <div>
                <MessageModalSoldInfo product={product} completed={completed} />
                <MessagesComponent
                  chatId={chatId}
                  currentUserId={currentUser.uid}
                  currentUser_Id={currentUser._id}
                  otherUserProfile={otherUserProfile}
                  completed={completed}
                  displayName={displayName}
                  product={product}
                />
                <br />
              </div>
            )}
          </>
        )
      )}
      <MessageModal productState={location.state} onClickYes={handleClick} />
    </>
  );
};

export default MessagesUser;
