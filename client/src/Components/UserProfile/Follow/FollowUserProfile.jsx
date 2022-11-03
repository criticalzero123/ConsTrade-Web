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
import {
  arrayUnion,
  doc,
  getDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import { v4 } from "uuid";

const FollowUserProfile = ({
  currentUser,
  id,
  user,
  onFollowAction,
  onUnFollowAction,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    currentUser._id !== id && dispatch(isFollowingUser(currentUser._id, id));
  }, [currentUser._id, id, dispatch]);

  const { payload, loading } = useSelector(
    (state) => state.isFollowingUserReducer
  );

  const handleFollow = async () => {
    if (payload) {
      Swal.fire({
        title: `Unfollow ${user.name}?`,
        text: "He/She will be sad 😔.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.isConfirmed) {
          dispatch(unFollowUser(currentUser._id, user._id));
          onUnFollowAction();

          //TODO: MAKE THIS A HELPER ALSO FROM THE BOTTOM ALSO
          const res = await getDoc(doc(db, "userNotification", user.uid));
          const _totalUnread =
            res.data().totalUnread === undefined ? 0 : res.data().totalUnread;
          await updateDoc(doc(db, "userNotification", user.uid), {
            notifications: arrayUnion({
              id: v4(),
              senderId: currentUser.uid,
              sender_Id: currentUser._id,
              senderName: currentUser.name,
              message: "unfollows you.",
              imagePhotoURL: currentUser.imagePhotoURL,
              status: "unread",
              notifType: "follow",
              dateCreated: Timestamp.now(),
            }),

            totalUnread: _totalUnread + 1,
          });
        }
      });
    } else {
      const _currentUser = {
        userId: currentUser._id,
        userUid: currentUser.uid,
        userName: currentUser.name,
        userImageURL: currentUser.imagePhotoURL,
      };

      const _user = {
        userId: user._id,
        userUid: user.uid,
        userName: user.name,
        userImageURL: user.imagePhotoURL,
      };
      dispatch(followUser(_currentUser, _user));
      onFollowAction();
      // MAKE THIS A HELPER
      const res = await getDoc(doc(db, "userNotification", user.uid));
      const _totalUnread =
        res.data().totalUnread === undefined ? 0 : res.data().totalUnread;
      await updateDoc(doc(db, "userNotification", user.uid), {
        notifications: arrayUnion({
          id: v4(),
          senderId: currentUser.uid,
          sender_Id: currentUser._id,
          senderName: currentUser.name,
          message: "started following you.",
          imagePhotoURL: currentUser.imagePhotoURL,
          status: "unread",
          notifType: "follow",
          dateCreated: Timestamp.now(),
        }),

        totalUnread: _totalUnread + 1,
      });
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
