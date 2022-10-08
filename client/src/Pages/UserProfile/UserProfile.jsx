import { Avatar, Rating } from "flowbite-react/lib/cjs/components";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getUserById } from "../../actions/userActions";
import { firstLetterUpper } from "../../service/userService";

const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const getUser = useSelector((state) => state.getUserByIdReducer);

  const { user, loading, error } = getUser;

  useEffect(() => {
    dispatch(getUserById(id));
  }, [id, dispatch]);
  return (
    <div>
      {error && <p>Something went wrong...</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        user && (
          <>
            <Avatar
              alt={user.name}
              img={user.imagePhotoURL}
              size="xl"
              rounded={true}
            />
            <div className="flex">
              <p>{firstLetterUpper(user.name)}</p>
              <div>
                {user.reviews && (
                  <div>
                    <Rating>
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star filled={false} />
                      <Rating.Star filled={false} />
                      <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                        {/* average rating */}3
                      </p>
                      <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
                      <Link className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">
                        {user.reviews.length} reviews
                      </Link>
                    </Rating>
                  </div>
                )}
              </div>
            </div>
            <div className="flex">
              <p>{user.email}</p>
              <p className="ml-5">
                {user.emailVerified ? "Verified" : "Not Verified"}
              </p>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default UserProfile;
