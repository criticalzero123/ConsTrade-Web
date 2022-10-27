import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getProductByUserId } from "../../../actions/productActions";
import PostsCard from "./PostsCard";

const UserProfilePosts = ({ user }) => {
  const { currentUser } = useSelector((state) => state.userInfoReducer);
  const { products } = useSelector((state) => state.getProductByUserIdReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    user && dispatch(getProductByUserId(user._id));
  }, [user, dispatch]);

  if (user.countPost === 0) {
    return (
      <div>
        <h3>No Post/s</h3>
        {user._id === currentUser._id && (
          <h4>
            Add posts{" "}
            <Link
              to="/product/add"
              className="text-blue-500 hover:text-orange-500"
            >
              Here!
            </Link>
          </h4>
        )}
      </div>
    );
  }
  return (
    <div>
      <h3>Items ({user.countPost})</h3>
      <div className="grid md:gap-2 lg:gap-4 md:grod-cols-2 lg:grid-cols-3 w-full ">
        {products &&
          products.map((product) => (
            <PostsCard product={product} key={product._id} />
          ))}
      </div>
    </div>
  );
};

export default UserProfilePosts;
