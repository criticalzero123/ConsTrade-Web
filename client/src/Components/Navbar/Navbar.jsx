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
      <Link to="/" className="mr-5">
        LOGO
      </Link>
      {useLoggedIn ? (
        <>
          <Link>{user.email}</Link>
          <button className="ml-5" onClick={logoutUserButton}>
            LOG OUT
          </button>
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
  );
};

export default Navbar;
