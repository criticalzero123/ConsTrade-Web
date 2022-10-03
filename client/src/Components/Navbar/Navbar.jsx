import React from "react";

import { Link } from "react-router-dom";
import { isUserLoggedIn, userInfo } from "../../service/userService";

const Navbar = () => {
  const useLoggedIn = isUserLoggedIn();

  const user = useLoggedIn && userInfo();

  return (
    <div>
      <Link to="/" className="mr-5">
        LOGO
      </Link>
      {useLoggedIn ? (
        <Link>{user.email}</Link>
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
