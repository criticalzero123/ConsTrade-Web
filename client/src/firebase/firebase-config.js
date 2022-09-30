// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbM6OvRB2K1FA1LgN007IoIIwidaDr578",
  authDomain: "constrade-web.firebaseapp.com",
  projectId: "constrade-web",
  storageBucket: "constrade-web.appspot.com",
  messagingSenderId: "208981149421",
  appId: "1:208981149421:web:d1fd5be2c035d243c06ee4",
  measurementId: "G-STVCK1TVDH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
getAnalytics(app);
