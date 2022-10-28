import React from "react";

import { firstLetterUpper } from "../../service/userService";
import { Link } from "react-router-dom";
const UserSlickCard = ({ user }) => {
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
            className="tracking-tight text-ellipsis overflow-hidden whitespace-nowrap w-32 lg:w-full font-poppins hover:text-orange-500"
          >
            {firstLetterUpper(user.name)}
          </Link>
          <p className="text-gray-100 text-sm">{user.countPost} Items</p>
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
