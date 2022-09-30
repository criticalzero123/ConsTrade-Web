import React from "react";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Link to="/" className="mr-5">
        LOGO
      </Link>
      <Link to="/register" className="mr-5">
        Sign Up
      </Link>
      <Link to="/signin" className="mr-5">
        Sign in
      </Link>
    </div>
  );
};

export default Navbar;
