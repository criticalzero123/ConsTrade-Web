import { storage } from "../firebase/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export const saveImageStorage = async (imageUpload, title, user, callback) => {
  const imagesUrlArray = [];
  for (let i = 0; i < imageUpload.length; i++) {
    const imageRef = ref(
      storage,
      `product_images/${
        user.uid + "_" + title + "_" + imageUpload[i].name + "_" + v4()
      }`
    );

    const upload = await uploadBytes(imageRef, imageUpload[i]);
    const imageUrl = await getDownloadURL(upload.ref);

    imagesUrlArray.push(imageUrl);
  }

  callback(imagesUrlArray);
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
