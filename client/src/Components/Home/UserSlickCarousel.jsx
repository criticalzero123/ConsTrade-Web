import React from "react";

const UserSlickCarousel = ({ users, title, icon }) => {
  return users.length !== 0 ? (
    <div className="">
      <div className="mb-4 ">
        <h1 className="ml-2 text-xl flex place-items-center  font-poppins">
          {icon && icon}
          {title}
        </h1>
      </div>
      <div className="bg-gray-100 py-3 rounded-lg">
        <Slider {...settings}>
          {users &&
            users.map((user) => <SlickCard user={user} key={user._id} />)}
        </Slider>
      </div>
    </div>
  ) : (
    <div>no product </div>
  );
};

export default UserSlickCarousel;
