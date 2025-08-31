// authService.ts
import { auth, googleProvider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// Register with Email & Password
export const registerWithEmail = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Sign In with Email & Password
export const loginWithEmail = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Google Sign-In
export const loginWithGoogle = async () => {
  return await signInWithPopup(auth, googleProvider);
};

// Logout
export const logout = async () => {
  return await signOut(auth);
};
