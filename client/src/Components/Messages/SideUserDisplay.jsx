import React from "react";

import { firstLetterUpper } from "../../service/userService";

const SideUserDisplay = ({ photoURL, displayTitle, displayName }) => {
  return (
    <div className="flex place-items-center bg-gray-300 rounded mb-5 cursor-pointer">
      <div className="w-13 mx-3 my-2">
        <img src={photoURL} alt={displayTitle} className="rounded-full" />
      </div>
      <div>
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
