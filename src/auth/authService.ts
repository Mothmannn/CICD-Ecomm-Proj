import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    type User
} from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

export const registerUser = async (
  email: string,
  password: string,
) => {
  try {
    // This will throw if the email is already in use
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Optional: create a user document in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      createdAt: new Date(),
    });

    return user;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      throw new Error(
        "This email is already registered. Please log in instead."
      );
    }
    throw error;
  }
};

export const loginUser = async (
    email: string,
    password: string
) : Promise<User> => {
    const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
    );
    return userCredential.user;
}

export const logoutUser = async (): Promise<void> => {
    await signOut(auth);
}