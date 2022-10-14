import React from "react";

import { firstLetterUpper } from "../../service/userService";

const SideUserDisplay = ({ photoURL, displayTitle, displayName }) => {
  return (
    <div className="flex w-full h-16 place-items-center bg-gray-100 hover:bg-gray-300 rounded mb-5 cursor-pointer">
      <div className="col-span-1 mx-3 my-2">
        <img
          src={photoURL}
          alt={displayTitle}
          className="h-8 w-8 rounded-full"
        />
      </div>
      <div className="col-span-2">
        <p className="text-ellipsis overflow-hidden whitespace-nowrap w-16 md:w-32 lg:w-full text-orange-600 font-bold">
          {firstLetterUpper(displayTitle)}
        </p>
        <p className="text-ellipsis overflow-hidden whitespace-nowrap w-16 md:w-32 lg:w-full">
          {firstLetterUpper(displayName)}
        </p>
      </div>
    </div>
  );
};

export default SideUserDisplay;
