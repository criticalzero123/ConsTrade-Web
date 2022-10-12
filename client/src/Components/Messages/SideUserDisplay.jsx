import React from "react";

import { firstLetterUpper } from "../../service/userService";

const SideUserDisplay = ({ photoURL, displayTitle, displayName }) => {
  return (
    <div className="grid grid-cols-3 w-full h-16 place-items-center bg-gray-300 rounded mb-5 cursor-pointer">
      <div className="col-span-1 mx-3 my-2">
        <img src={photoURL} alt={displayTitle} className="h-full" />
      </div>
      <div className="col-span-2">
        <p className="text-ellipsis overflow-hidden whitespace-nowrap w-28 text-orange-600 font-bold">
          {firstLetterUpper(displayTitle)}
        </p>
        <p className="text-ellipsis overflow-hidden whitespace-nowrap w-28">
          {firstLetterUpper(displayName)}
        </p>
      </div>
    </div>
  );
};

export default SideUserDisplay;
