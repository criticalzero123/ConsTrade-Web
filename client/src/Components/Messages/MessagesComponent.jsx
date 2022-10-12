import { doc, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { db } from "../../firebase/firebase-config";
import MessageInput from "./MessageInput";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { soldItemTransaction } from "../../actions/transactionActions";
import { getProductById } from "../../actions/productActions";

const MessagesComponent = ({
  chatId,
  currentUserId,
  currentUser_Id,
  otherUserProfile,
  currentUserProfile,
  otherUserId,
  productId,
  otherUser_Id,
}) => {
  const [messages, setMessages] = useState([]);

  const scrollDown = useRef();
  const dispatch = useDispatch();

  const onClickScrollDown = () => {
    if (scrollDown.current !== undefined && scrollDown.current !== null) {
      scrollDown.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { product } = useSelector((state) => state.getProductByIdReducer);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    dispatch(getProductById(productId));
    // This is for the ref scroll
    messages.length !== 0 &&
      scrollDown.current !== undefined &&
      onClickScrollDown();

    return () => {
      unSub();
    };
  }, [chatId, messages.length, dispatch, productId]);

  return (
    <div className="">
      {product && product.status === "sold" ? (
        <div>sold</div>
      ) : (
        product &&
        product.userId === currentUser_Id && (
          <button
            onClick={() =>
              dispatch(soldItemTransaction(productId, otherUser_Id))
            }
          >
            Mark As Sold
          </button>
        )
      )}
      <div className="h-[30rem] p-5 overflow-y-auto  bg-gray-400 rounded">
        {messages.map((message) => (
          <div key={message.id}>
            {message.senderId === currentUserId ? (
              <div className="grid justify-end">
                <div className="flex h-12 mt-3">
                  <div className="place-self-center mr-3">{message.text}</div>
                  <img
                    src={currentUserProfile}
                    alt={message.senderId}
                    className="rounded-full"
                  />
                </div>
              </div>
            ) : (
              <div className="grid justify-start">
                <div className="flex h-12 mt-3">
                  <Link to={`/user/${message.sender_Id}`}>
                    <img
                      src={otherUserProfile}
                      alt={message.senderId}
                      className="rounded-full h-full"
                    />
                  </Link>
                  <div className="place-self-center ml-3">{message.text}</div>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={scrollDown}></div>
      </div>
      <hr />
      {product && product.status !== "sold" && (
        <MessageInput
          chatId={chatId}
          otherUserId={otherUserId}
          onClickScrollDown={onClickScrollDown}
        />
      )}
    </div>
  );
};

export default MessagesComponent;
