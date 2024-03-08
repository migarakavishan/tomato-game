// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA14owRvy81cNHN-kn55Bh0-E1_sCcpbMw",
  authDomain: "tomatogame-f0b4b.firebaseapp.com",
  projectId: "tomatogame-f0b4b",
  storageBucket: "tomatogame-f0b4b.appspot.com",
  messagingSenderId: "1085879190243",
  appId: "1:1085879190243:web:5a680fa72dcd0655923bd6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export {app, auth};

