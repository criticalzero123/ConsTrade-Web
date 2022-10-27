import React from "react";
import { firstLetterUpper } from "../../service/userService";

const UserProfileInfo = ({ user }) => {
  const dateToTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
      day: "2-digit",
      month: "short",
      hour12: true,
    });
  };
  return (
    <div>
      <div>Name: {firstLetterUpper(user.name)}</div>
      <div>Email: {firstLetterUpper(user.email)}</div>
      <div>
        User Type: {user.emailVerified ? "Semi-Verified" : "Non-verified"}
      </div>
      <div>Last Active: {dateToTime(user.lastActiveAt)}</div>
    </div>
  );
};

export default UserProfileInfo;
