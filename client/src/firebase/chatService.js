import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase-config";

export const creationOfUserChats = async (uid) => {
  await setDoc(doc(db, "userChats", uid), {
    //
  });
};

export const creationOfProductChats = async (uid) => {
  await setDoc(doc(db, "productChats", uid), {
    //
  });
};

export const existInUserChatsSocialMediaAuth = async (uid) => {
  const docRef = await doc(db, "userChats", uid);
  const docSnap = await getDoc(docRef);

  const docRefP = await doc(db, "productChats", uid);
  const docSnapP = await getDoc(docRefP);

  if (docSnap.exists() && docSnapP.exists()) {
    // if nag exists
  } else {
    // if wala pa
    creationOfUserChats(uid);
    creationOfProductChats(uid);
  }
};
