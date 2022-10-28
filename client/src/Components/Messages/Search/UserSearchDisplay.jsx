import React from "react";
import { firstLetterUpper } from "../../../service/userService";

const UserSearchDisplay = ({ user }) => {
  return (
    <div className="grid grid-cols-6 h-20 place-items-center bg-gray-100 text-black hover:bg-gray-200  rounded p-1">
      <div className="col-span-1 w-full flex justify-center ">
        <img
          src={user.imagePhotoURL}
          alt={user.name}
          className="h-14 w-14 rounded-full"
        />
      </div>
      <div className="col-span-5 w-11/12">
        <p className="text-ellipsis overflow-hidden whitespace-nowrap w-11/12 md:w-32 lg:w-full text-black font-poppins">
          {firstLetterUpper(user.name)}
        </p>
        <p className="text-ellipsis overflow-hidden whitespace-nowrap w-11/12 md:w-32 lg:w-full text-gray-400 text-sm font-poppins">
          {user.email}
        </p>
      </div>
    </div>
  );
};

export default UserSearchDisplay;
