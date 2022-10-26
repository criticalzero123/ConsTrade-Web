import React from "react";
import { useLocation } from "react-router-dom";

import { firstLetterUpper } from "../../service/userService";

const UserSideDisplay = ({ photoURL, displayName, userId, lastMessage }) => {
  const location = useLocation();
  const splitPathname = location.pathname.split("/");
  const currentUserId = splitPathname[splitPathname.length - 1];
  return (
    <div
      className={`grid grid-cols-6 h-20 place-items-center ${
        currentUserId === userId
          ? "bg-gray-800 text-gray-200 "
          : "bg-gray-100 text-black hover:bg-gray-200 "
      } rounded cursor-pointer p-1`}
    >
      <div className="col-span-1 w-full flex justify-center ">
        <img
          src={photoURL}
          alt={displayName}
          className="h-14 w-14 rounded-full"
        />
      </div>
      <div className="col-span-5 w-11/12">
        <p className="text-ellipsis overflow-hidden whitespace-nowrap w-11/12 md:w-32 lg:w-full text-orange-600 font-bold">
          {firstLetterUpper(displayName)}
        </p>
        <p className="text-ellipsis overflow-hidden whitespace-nowrap w-11/12 md:w-32 lg:w-full">
          {lastMessage}
        </p>
      </div>
    </div>
  );
};

export default UserSideDisplay;
