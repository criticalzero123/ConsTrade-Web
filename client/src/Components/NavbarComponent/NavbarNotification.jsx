import { doc, setDoc, getDoc } from "firebase/firestore";
import React from "react";

import { MdNotifications } from "react-icons/md";
import { useSelector } from "react-redux";
import { db } from "../../firebase/firebase-config";

const NavbarNotification = () => {
  const { currentUser } = useSelector((state) => state.userInfoReducer);

  const onOpenNotif = async () => {
    const res = await getDoc(doc(db, "userMessages", currentUser.uid));
    try {
      if (!res.exists()) {
        await setDoc(doc(db, "userNotification", currentUser.uid), {
          notifications: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <MdNotifications
        size={20}
        className="mr-4 cursor-pointer"
        onClick={onOpenNotif}
      />
    </div>
  );
};

export default NavbarNotification;
