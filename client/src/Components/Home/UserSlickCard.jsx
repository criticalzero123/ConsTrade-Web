import React from "react";

import { Link } from "react-router-dom";

import { FaCrown } from "react-icons/fa";

const UserSlickCard = ({ user, index }) => {
  const crownIcon = (index) => {
    if (index === 0) return <FaCrown className="text-[#FFD700] mr-1 mb-1" />;
    else if (index === 1)
      return <FaCrown className="text-[#c0c0c0] mr-1 mb-1" />;
    else if (index === 2)
      return <FaCrown className="text-[#CD7F32] mr-1 mb-1" />;
    else return;
  };

  return (
    <div className="p-3 flex justify-between items-center bg-[#161449] m-3 rounded-lg text-white">
      <div className="flex place-items-center">
        <img
          src={user.imagePhotoURL}
          alt={user.name}
          className="w-10 rounded-xl mr-3"
        />{" "}
        <div>
          <Link
            to={`/user/${user._id}`}
            className="flex place-items-center tracking-tight text-ellipsis overflow-hidden whitespace-nowrap w-32 lg:w-full font-poppins hover:text-orange-500 capitalize"
          >
            {crownIcon(index)} {user.name}
          </Link>
          <p className="text-gray-100 text-sm flex">
            {user.countPost} Item
            <span className={`${user.countPost > 1 ? "block" : "hidden"}`}>
              s
            </span>
          </p>
        </div>
      </div>
      <Link
        to={`/user/${user._id}`}
        className="px-5 py-2 text-sm cursor-pointer rounded-lg  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-poppins text-white hover:text-orange-500"
      >
        Visit
      </Link>
    </div>
  );
};

export default UserSlickCard;
