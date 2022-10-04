import { storage } from "../firebase/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export const saveImageStorage = (imageUpload, title, user, callback) => {
  const imageRef = ref(
    storage,
    `product_images/${
      user.uid + "_" + title + "_" + imageUpload.name + "_" + v4()
    }`
  );

  uploadBytes(imageRef, imageUpload).then((res) => {
    getDownloadURL(res.ref).then((downloadUrl) => {
      callback(downloadUrl);
    });
  });
};

// This is for having a progress bar
// const [progressPercent, setProgressPercent] = useState(0);
// const [imageTemp, setImageTemp] = useState();
//const uploadTask = uploadBytesResumable(imageRef, imageUpload);
// uploadTask.on(
//   "state_changed",
//   (snapshot) => {
//     const progress = Math.round(
//       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//     );
//     setProgressPercent(progress);
//   },
//   (error) => {
//     alert(error);
//   },
//   () => {
//     getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
//       setImageTemp(downloadUrl);
//     });
//   }
// );
