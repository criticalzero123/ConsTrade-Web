import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/userActions";
import { IoIosArrowDown } from "react-icons/io";
import {
  isUserLoggedIn,
  userInfo,
  firstLetterUpper,
} from "../../service/userService";

import { Avatar, Dropdown, Navbar } from "flowbite-react/lib/cjs/components";

import { BiSearch } from "react-icons/bi";
import { BsChatDots } from "react-icons/bs";
import SearchHeader from "./SearchHeader/SearchHeader";

const NavbarComponent = () => {
  const useLoggedIn = isUserLoggedIn();

  const [showSearch, setShowSearch] = useState(false);

  const user = useLoggedIn && userInfo();

  const dispatch = useDispatch();

  const logoutUserButton = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <Navbar fluid={true}>
        <Navbar.Brand href="/">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            ConsTrade
          </span>
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
                <Navbar.Link href="/home" active={true}>
                  Home
                </Navbar.Link>
                <Navbar.Link href="/home">About</Navbar.Link>
                <Navbar.Link href="/home">Services</Navbar.Link>
                <Navbar.Link href="/home">Pricing</Navbar.Link>
                <Navbar.Link href="/home">Contact</Navbar.Link>
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
