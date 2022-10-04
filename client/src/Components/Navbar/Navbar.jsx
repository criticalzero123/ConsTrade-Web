import React from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/userActions";
import { isUserLoggedIn, userInfo } from "../../service/userService";

const Navbar = () => {
  const useLoggedIn = isUserLoggedIn();

  const user = useLoggedIn && userInfo();

  const dispatch = useDispatch();

  const logoutUserButton = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <div className="flex justify-between place-items-center">
        <Link to={user ? "/home" : "/"} className="mr-5 ">
          <span className="text-2xl font-mono">
            <span className="text-gray-500">Cons</span>
            <span className="text-orange-900">Trade</span>
          </span>
        </Link>
        {useLoggedIn ? (
          <>
            <div>Search</div>
            <div>add item</div>
            <div>notification</div>
            <div>
              <Link>{user.email}</Link>
              <button className="ml-5" onClick={logoutUserButton}>
                LOG OUT
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/register" className="mr-5">
              Sign Up
            </Link>
            <Link to="/signin" className="mr-5">
              Sign in
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
