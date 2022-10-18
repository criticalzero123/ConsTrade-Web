import { doc, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { db } from "../../firebase/firebase-config";
import MessageInput from "./MessageInput";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { soldItemTransaction } from "../../actions/transactionActions";
import { BsCheckSquareFill } from "react-icons/bs";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

import { useDispatch } from "react-redux";

import Swal from "sweetalert2";

const MessagesComponent = ({
  chatId,
  currentUserId,
  otherUserProfile,
  otherUserId,
  completed,
  displayName,
  product,
  currentUser_Id,
}) => {
  const [messages, setMessages] = useState([]);
  const [showHeader, setShowHeader] = useState(true);

  const scrollDown = useRef();
  const dispatch = useDispatch();

  const onClickScrollDown = () => {
    if (scrollDown.current !== undefined && scrollDown.current !== null) {
      scrollDown.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (doc) => {
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
    Swal.fire({
      title: "Transaction Completed?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Hoooray!",
          "Transaction of this item is completed.",
          "success"
        );

        dispatch(
          soldItemTransaction(product._id, currentUser_Id, product.userId)
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire("Cancelled", "Transaction Cancelled.", "error");
      }
    });
  };

  return (
    <div className="bg-[#EFF3F8] rounded-md relative">
      <div className="h-[30rem] p-5 overflow-y-auto  rounded">
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
      {completed !== true && (
        <MessageInput
          chatId={chatId}
          otherUserId={otherUserId}
          onClickScrollDown={onClickScrollDown}
        />
      )}
      {!completed &&
        product &&
        product.userId === currentUser_Id &&
        (showHeader ? (
          <div
            className={`absolute top-0 p-4 bg-[rgba(100%,100%,100%,60%)] backdrop-blur-md w-full flex place-items-center justify-between`}
          >
            <Link
              to={`/product/item/${product._id}`}
              className="hover:text-red-400 font-semibold text-gray-500"
            >
              {product.title}
            </Link>
            <div className="relative top-5">
              <div className="absolute top">
                <RiArrowUpSLine
                  size={30}
                  className="text-gray-300 cursor-pointer"
                  onClick={() => setShowHeader(!showHeader)}
                />
              </div>
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

export default MessagesComponent;
