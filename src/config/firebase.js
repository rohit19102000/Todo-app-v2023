import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from 'firebase/firestore';

// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBo6sDlF1YCDcPmbxSYZhP8KUevGUgsZD0",
  authDomain: "todo-list-82448.firebaseapp.com",
  projectId: "todo-list-82448",
  storageBucket: "todo-list-82448.appspot.com",
  messagingSenderId: "385067031734",
  appId: "1:385067031734:web:4beca5f18fe7ad36ee9a17",
  measurementId: "G-H16V620F94"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
