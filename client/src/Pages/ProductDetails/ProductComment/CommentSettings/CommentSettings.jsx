import React, { useState } from "react";

import { MdDeleteForever } from "react-icons/md";

const CommentSettings = ({ deleteComment }) => {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };
  // const onBlurHandle = () => {
  //   setShowSettings(false);
  // };

  return (
    <div className="relative">
      <button
        onClick={toggleSettings}
        // onBlur={onBlurHandle}
        className="text-sm font-medium text-center focus:outline-none text-gray-300 
          hover:text-gray-700 focus:text-gray-700"
      >
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
        </svg>
      </button>

      <div
        className={`z-10 rounded  shadow bg-gray-700 divide-gray-600 right-2 top-5
        ${showSettings ? "absolute " : "hidden "} `}
      >
        <ul className="py-1 text-sm  text-gray-200 ">
          <li
            className="cursor-pointer flex hover:bg-gray-600 hover:text-red-500 place-items-center px-4"
            onClick={deleteComment}
          >
            <MdDeleteForever size={20} />
            <p className="block py-2 ml-2">Delete</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CommentSettings;
