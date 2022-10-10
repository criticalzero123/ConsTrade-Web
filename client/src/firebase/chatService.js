import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase-config";

export const creationOfUserChats = async (uid) => {
  await setDoc(doc(db, "userChats", uid), {
    //
  });
};
