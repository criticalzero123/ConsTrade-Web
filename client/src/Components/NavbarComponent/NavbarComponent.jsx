import React from "react";
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

const NavbarComponent = () => {
  const useLoggedIn = isUserLoggedIn();

  const user = useLoggedIn && userInfo();

  const dispatch = useDispatch();

  const logoutUserButton = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      {/* <div className="flex justify-between place-items-center">
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
      </div> */}

      <Navbar fluid={true} rounded={true} className="bg-black">
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
            <div className="flex md:order-2">
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
                      <IoIosArrowDown size={10} />
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
            <Navbar.Collapse>
              <Navbar.Link href="/home" active={true}>
                Home
              </Navbar.Link>
              <Navbar.Link href="/navbars">About</Navbar.Link>
              <Navbar.Link href="/navbars">Services</Navbar.Link>
              <Navbar.Link href="/navbars">Pricing</Navbar.Link>
              <Navbar.Link href="/navbars">Contact</Navbar.Link>
            </Navbar.Collapse>
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
