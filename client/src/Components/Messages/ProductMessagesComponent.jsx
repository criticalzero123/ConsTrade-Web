import { doc, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { db } from "../../firebase/firebase-config";
import ProductMessageInput from "./ProductMessageInput";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { BsCheckSquareFill, BsArrowRight } from "react-icons/bs";

import { RiArrowDownSLine } from "react-icons/ri";

import { useDispatch } from "react-redux";

import { markAstransactedPopUpWithBuyerInApp } from "../../firebase/transactionHelper";

const ProductMessagesComponent = ({
  chatId,
  currentUserId,
  otherUserProfile,
  otherUserId,
  otherUser_Id,
  displayName,
  product,
  currentUser_Id,
}) => {
  const [messages, setMessages] = useState([]);
  const [showHeader, setShowHeader] = useState(false);

  const scrollDown = useRef();
  const dispatch = useDispatch();

  const onClickScrollDown = () => {
    if (scrollDown.current !== undefined && scrollDown.current !== null) {
      scrollDown.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "productMessages", chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    // This is for the ref scroll
    messages.length !== 0 &&
      scrollDown.current !== undefined &&
      onClickScrollDown();
    return () => {
      unSub();
    };
  }, [chatId, messages.length]);

  const dateToTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
      day: "2-digit",
      month: "short",
      hour12: true,
    });
  };

  const completeItemOnClick = () => {
    markAstransactedPopUpWithBuyerInApp(
      product._id,
      otherUser_Id,
      product.userId,
      dispatch
    );
  };

  return (
    <div className="bg-[#EFF3F8] h-[85vh] sm:h-[88vh] rounded-md relative">
      <div className="h-5/6 p-5 overflow-y-auto  rounded">
        {messages.map((message) => (
          <div key={message.id}>
            {message.senderId === currentUserId ? (
              <div>
                <div className="flex justify-end mt-5 mb-2 text-sm text-gray-400">
                  {dateToTime(message.date.toDate())}
                </div>
                <div className=" flex justify-end">
                  <div className=" flex justify-end w-3/5">
                    <div className="text-end bg-[#CCE6FB]  p-3 rounded-l-2xl rounded-b-2xl max-w-fit">
                      {message.text}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center mt-7 text-sm ">
                  <Link to={`/user/${message.sender_Id}`}>
                    <img
                      src={otherUserProfile}
                      alt={message.senderId}
                      className="rounded-full h-8 md:h-10 mr-2"
                    />
                  </Link>
                  <Link
                    to={`/user/${message.sender_Id}`}
                    className="hover:text-red-500"
                  >
                    {displayName}
                  </Link>
                  <span className="ml-2 text-gray-500">
                    {dateToTime(message.date.toDate())}
                  </span>
                </div>

                <div className="flex justify-start w-3/5">
                  <div className="text-start mr-3 bg-white mt-2 p-3 rounded-r-2xl rounded-b-2xl max-w-fit">
                    {message.text}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={scrollDown}></div>
      </div>
      {product ? (
        product.status !== "sold" ? (
          <ProductMessageInput
            chatId={chatId}
            otherUserId={otherUserId}
            onClickScrollDown={onClickScrollDown}
          />
        ) : (
          <div className="h-1/6 flex place-item-center">
            <div className="p-5 flex w-full justify-between items-center bg-[rgb(100%,100%,100%,50%)] backdrop-blur-md">
              <div>This item is already Transacted.</div>
              <Link to={`/product/item/${product._id}`}>
                <Button gradientDuoTone="greenToBlue">
                  Go to Product <BsArrowRight size={20} className="ml-2" />
                </Button>{" "}
              </Link>
            </div>
          </div>
        )
      ) : (
        <div>Loading...</div>
      )}
      {product &&
        product.status !== "sold" &&
        product.userId === currentUser_Id &&
        (showHeader ? (
          <div
            className={`absolute top-0 p-4 bg-[rgba(100%,100%,100%,60%)] backdrop-blur-md w-full flex place-items-center justify-between`}
          >
            <div
              className="hover:text-red-400 font-semibold text-gray-500 cursor-pointer"
              onClick={() => setShowHeader(!showHeader)}
            >
              Hide
            </div>

            <Button gradientDuoTone="greenToBlue" onClick={completeItemOnClick}>
              <BsCheckSquareFill size={20} className="mr-2" />
              Transaction Completed
            </Button>
          </div>
        ) : (
          <div className="absolute top-0 flex w-full justify-center ">
            <RiArrowDownSLine
              size={30}
              className="text-gray-300 cursor-pointer mr-24"
              onClick={() => setShowHeader(!showHeader)}
            />{" "}
          </div>
        ))}
    </div>
  );
};

export default ProductMessagesComponent;
