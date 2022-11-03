import { doc, getDoc, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../firebase/firebase-config";

const NavbarNotificationCard = ({ notif, currentUserUid }) => {
  const handleOnClick = () => {
    switch (notif.notifType) {
      case "follow":
        handleReadNotif(notif.id);

        break;

      case "addproduct":
        handleReadNotif(
          notif.id,
          () => (window.location.href = "/product/item/list/" + notif.sender_Id)
        );
        break;

      default:
        break;
    }
  };

  const handleReadNotif = async (id, callback) => {
    const res = await getDoc(doc(db, "userNotification", currentUserUid));
    let _flag = false;

    const newNotif = res.data().notifications.map((notify) => {
      if (notify.id === id && notify.status === "unread") {
        notify.status = "read";
        _flag = true;
      }

      return notify;
    });

    if (_flag === true) {
      await updateDoc(doc(db, "userNotification", currentUserUid), {
        notifications: newNotif,

        totalUnread:
          res.data().totalUnread !== undefined ? res.data().totalUnread - 1 : 0,
      });
    }

    callback !== undefined && callback();
  };

  return (
    <div
      className={`flex place-items-center px-4 py-2 hover:bg-red-400 cursor-pointer
    ${notif.status === "unread" ? "bg-red-200" : "bg-gray-200"}`}
      onClick={handleOnClick}
    >
      <img
        src={notif.imagePhotoURL}
        alt={notif.senderName}
        className="w-10 h-10 object-contain rounded-full"
      />
      <div className="px-1"></div>
      <div className="text-sm font-poppins">
        <div>
          {" "}
          <span className="capitalize">{notif.senderName}</span> {notif.message}
        </div>
        <div className="text-gray-500 ">{notif.status}</div>
      </div>
    </div>
  );
};

export default NavbarNotificationCard;
