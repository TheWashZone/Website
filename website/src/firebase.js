import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMQZr8C9DY-wGW8rTnqSsajzlSvg6uOOo",
  authDomain: "washzone-cms.firebaseapp.com",
  projectId: "washzone-cms",
  storageBucket: "washzone-cms.firebasestorage.app",
  messagingSenderId: "941225952584",
  appId: "1:941225952584:web:5007a6ca27503cc28c9f7d",
  measurementId: "G-QN7RZQJMWE"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);