import React from "react";

import { firstLetterUpper } from "../../service/userService";

const SideUserDisplay = ({ photoURL, displayName, lastMessage }) => {
  return (
    <div className="flex place-items-center bg-gray-300 rounded mb-5 cursor-pointer">
      <div className="w-10 mx-3 my-2">
        <img src={photoURL} alt={displayName} className="rounded-full" />
      </div>
      <div>
        <p className="text-ellipsis overflow-hidden whitespace-nowrap w-28">
          {firstLetterUpper(displayName)}
        </p>
        <p className="text-ellipsis overflow-hidden whitespace-nowrap w-28">
          {lastMessage}
        </p>
      </div>
    </div>
  );
};

export default SideUserDisplay;
