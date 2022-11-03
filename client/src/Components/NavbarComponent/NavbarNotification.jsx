import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import { MdNotifications } from "react-icons/md";
import { useSelector } from "react-redux";
import { db } from "../../firebase/firebase-config";
import NavbarNotificationCard from "./NavbarNotificationCard";

const NavbarNotification = () => {
  const { currentUser } = useSelector((state) => state.userInfoReducer);
  const [notifications, setNotifications] = useState(null);
  const [totalUnread, setTotalUnread] = useState(0);
  const [show, setShow] = useState(false);

  const onOpenNotif = () => {
    setShow(!show);
  };

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userNotification", currentUser.uid),
      (doc) => {
        if (doc.exists()) {
          setNotifications(doc.data().notifications);
          setTotalUnread(doc.data().totalUnread);
        }
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser.uid]);

  return (
    <div className="relative">
      <MdNotifications
        size={23}
        className="mr-4 cursor-pointer"
        onClick={onOpenNotif}
      />
      {/* pulse */}
      <div
        className={`absolute top-1 right-5 z-10 h-2 w-2 rounded-full  ${
          totalUnread > 0 && " animate-ping bg-red-600 "
        } cursor-pointer`}
        onClick={onOpenNotif}
      ></div>
      <div
        className={`z-10 h-[30vh] w-[40vh] bg-[#f0f0f0] shadow-lg top-6 -right-20 md:right-5 absolute  rounded-lg ${
          show ? " block" : " hidden"
        }`}
      >
        <div className="px-4 py-2 bg-[#f0f0f0] text-black">
          Notifications ({totalUnread})
        </div>
        <div className="overflow-auto h-full">
          {/* TODO: optimize this shit */}
          {notifications &&
            notifications
              .sort((a, b) => b.dateCreated - a.dateCreated)
              .map((notif, index) => (
                <NavbarNotificationCard
                  notif={notif}
                  index={index}
                  key={notif.id}
                  currentUserUid={currentUser.uid}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default NavbarNotification;
