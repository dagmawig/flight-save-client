// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3gcwY7lYroN7uwlkT2FY7M7Fa3W5HX_8",
  authDomain: "flight-save.firebaseapp.com",
  projectId: "flight-save",
  storageBucket: "flight-save.appspot.com",
  messagingSenderId: "905558999687",
  appId: "1:905558999687:web:e1e3dc0481ae0e36a8ee22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;