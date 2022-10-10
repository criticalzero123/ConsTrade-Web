import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase-config";

export const creationOfUserChats = async (uid) => {
  await setDoc(doc(db, "userChats", uid), {
    //
  });
};

export const existInUserChatsSocialMediaAuth = async (uid) => {
  const docRef = await doc(db, "userChats", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("ni exist na ");
  } else {
    console.log("wa pa ");
    creationOfUserChats(uid);
    console.log("na creatan na");
  }
};
