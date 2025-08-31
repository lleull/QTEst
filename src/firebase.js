// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZ28KeVevuXvYfnn-C3ckb-RUFWmCcXjs",
  authDomain: "qtest-19613.firebaseapp.com",
  projectId: "qtest-19613",
  storageBucket: "qtest-19613.firebasestorage.app",
  messagingSenderId: "1062849016706",
  appId: "1:1062849016706:web:b69d9c1800d95513a2d59b",
  measurementId: "G-9MQDB3KKVL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth & Providers
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
