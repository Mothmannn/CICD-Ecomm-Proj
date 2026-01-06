import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKB3BGN9BLa9sKTVjHMRuHovIgtY12qmU",
  authDomain: "ecommerce-assignment-1be56.firebaseapp.com",
  projectId: "ecommerce-assignment-1be56",
  storageBucket: "ecommerce-assignment-1be56.firebasestorage.app",
  messagingSenderId: "259456845462",
  appId: "1:259456845462:web:396121fb9e91bf1895a4b7",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);