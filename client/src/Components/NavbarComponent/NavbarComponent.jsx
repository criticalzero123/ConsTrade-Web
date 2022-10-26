import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Link, useLocation } from "react-router-dom";
import { logoutUser } from "../../actions/userActions";
import { IoIosArrowDown } from "react-icons/io";
import {
  isUserLoggedIn,
  userInfo,
  firstLetterUpper,
} from "../../service/userService";

import { Avatar, Dropdown, Navbar } from "flowbite-react/lib/cjs/components";
import logo from "../../Assets/Images/Branding/Web/SVG/IconWeb.svg";
import textLogo from "../../Assets/Images/Branding/ConsTrade.svg";

import { BiSearch } from "react-icons/bi";
import { BsChatDots } from "react-icons/bs";
import SearchHeader from "./SearchHeader/SearchHeader";

const NavbarComponent = () => {
  const useLoggedIn = isUserLoggedIn();
  // for the header active
  const location = useLocation();
  const splitLocation = location.pathname.split("/");

  const [showSearch, setShowSearch] = useState(false);

  const user = useLoggedIn && userInfo();

  const dispatch = useDispatch();

  const logoutUserButton = () => {
    dispatch(logoutUser());
  };

  const hasSome = (text) => {
    return splitLocation.some((val) => val === text);
  };

  return (
    <div className="">
      <Navbar fluid={true}>
        <Navbar.Brand href={useLoggedIn ? "/home" : "/"}>
          <img src={logo} className="mr-3 h-6 sm:h-10" alt="Constrade Logo" />
          <img
            src={textLogo}
            className="mr-3 h-3 sm:h-5"
            alt="Constrade text"
          />
          {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            ConsTrade
          </span> */}
        </Navbar.Brand>
        {useLoggedIn ? (
          <>
            <div className="flex md:order-2 place-items-center">
              <Link to="/messages">
                <BsChatDots size={20} className="mr-4 cursor-pointer" />
              </Link>
              <BiSearch
                size={20}
                className="mr-4 cursor-pointer"
                onClick={() => setShowSearch(!showSearch)}
              />
              <Dropdown
                arrowIcon={false}
                inline={true}
                label={
                  <>
                    <Avatar
                      alt="User settings"
                      img={user.imagePhotoURL}
                      rounded={true}
                      // status="online"
                      statusPosition="bottom-right"
                      size="sm"
                    >
                      <IoIosArrowDown size={10} className="-ml-3" />
                    </Avatar>
                  </>
                }
              >
                <Dropdown.Header>
                  <Link to={`user/${user._id}`}>
                    <span className="block text-sm hover:text-red-500">
                      {firstLetterUpper(user.name)}
                    </span>
                  </Link>
                  <span className="block truncate text-sm font-medium">
                    {user.email}
                  </span>
                </Dropdown.Header>
                <Link to={`/product/item/list/${user._id}`}>
                  <Dropdown.Item>Item List</Dropdown.Item>
                </Link>
                <Link to="/favorites">
                  <Dropdown.Item>Favorites</Dropdown.Item>
                </Link>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logoutUserButton}>
                  Sign out
                </Dropdown.Item>
              </Dropdown>
              <Navbar.Toggle />
            </div>
            {showSearch ? (
              <SearchHeader />
            ) : (
              <Navbar.Collapse>
                <Navbar.Link active={hasSome("home")} href="/home">
                  Home
                </Navbar.Link>
                <Navbar.Link
                  active={hasSome("list")}
                  href={`/product/item/list/${user._id}`}
                >
                  Item List
                </Navbar.Link>
                <Navbar.Link active={hasSome("favorites")} href="/favorites">
                  Favorites
                </Navbar.Link>
              </Navbar.Collapse>
            )}
          </>
        ) : (
          <>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Navbar.Link href="/register"> Sign Up</Navbar.Link>
              <Navbar.Link href="/signin">Sign in</Navbar.Link>
            </Navbar.Collapse>
          </>
        )}
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
