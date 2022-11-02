import React, { useEffect } from "react";

import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  followUser,
  isFollowingUser,
  unFollowUser,
} from "../../../actions/followActions";
import { Spinner } from "flowbite-react";
import Swal from "sweetalert2";

const FollowUserProfile = ({
  currentUserId,
  id,
  user,
  onFollowAction,
  onUnFollowAction,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    currentUserId !== id && dispatch(isFollowingUser(currentUserId, id));
  }, [currentUserId, id, dispatch]);

  const { payload, loading } = useSelector(
    (state) => state.isFollowingUserReducer
  );

  const handleFollow = () => {
    if (payload) {
      Swal.fire({
        title: `Unfollow ${user.name}?`,
        text: "He/She will be sad 😔.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(unFollowUser(currentUserId, user._id));
          onUnFollowAction();
        }
      });
    } else {
      const _user = {
        userId: user._id,
        userName: user.name,
        userImageURL: user.imagePhotoURL,
      };
      dispatch(followUser(currentUserId, _user));
      onFollowAction();
    }
  };

  if (loading)
    return (
      <div className="flex justify-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 ">
        <Spinner />
      </div>
    );

  return (
    <button
      onClick={handleFollow}
      className="flex justify-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 "
    >
      {payload ? (
        <>
          <AiOutlineUserDelete className="mr-2" size={20} />
          Unfollow
        </>
      ) : (
        <>
          <AiOutlineUserAdd className="mr-2" size={20} />
          Follow
        </>
      )}
    </button>
  );
};

export default FollowUserProfile;
