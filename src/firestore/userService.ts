import { db } from "../firebase/firebase";
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import type { User } from "firebase/auth";

export interface AppUser {
  uid: string;
  email: string;
  displayName?: string;
  address?: string;
  createdAt: Date;
}

// Create user document (after registration)
export const createUserDoc = async (
  user: User,
  extraData?: Partial<AppUser>
) => {
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, {
    uid: user.uid,
    email: user.email,
    displayName: extraData?.displayName || "",
    createdAt: new Date(),
  });
};

// Read user document
export const getUserDoc = async (uid: string): Promise<AppUser | null> => {
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    const data = docSnap.data();

    return {
      uid: data.uid,
      email: data.email,
      displayName: data.displayName || "",
      createdAt: data.createdAt?.toDate
        ? data.createdAt.toDate()
        : data.createdAt,
    };
  }

  console.warn(`No user document found for UID: ${uid}`);
  return null;
};

// Update user document
export const updateUserDoc = async (uid: string, updates: Partial<AppUser>) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, updates);
};

// Delete user document
export const deleteUserDoc = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  await deleteDoc(userRef);
};
