import React from "react";

import Slider from "react-slick";
import { userSettings } from "../../service/slickService";
import UserSlickCard from "./UserSlickCard";
import { BsArrowRight } from "react-icons/bs";

import "./UserSlickCss.css";

// TODO: FIX THIS SHOW THE ARROW UP AND DOWN SEE MORE AT https://cdn.dribbble.com/users/3550736/screenshots/15871472/media/eced6fc8edf87fe01577cbfa08fca0ef.jpg?compress=1&resize=840x630&vertical=top
const UserSlickCarousel = ({ users, title, icon }) => {
  return (
    users.length !== 0 && (
      <div className="">
        <div className="flex justify-between  mb-4 ">
          <h1 className="ml-2 text-xl flex place-items-center  font-poppins">
            {icon && icon}
            {title}
          </h1>
          <h3 className="px-3 py-1 text-sm shadow-md flex place-items-center rounded-lg cursor-pointer hover:text-orange-500 text-gray-600">
            View all <BsArrowRight className="ml-1" />
          </h3>
        </div>
        <div className="bg-[#d3d0f5] py-3 rounded-lg">
          <Slider {...userSettings}>
            {users &&
              users.map((user) => <UserSlickCard user={user} key={user._id} />)}
          </Slider>
        </div>
      </div>
    )
  );
};

export default UserSlickCarousel;
