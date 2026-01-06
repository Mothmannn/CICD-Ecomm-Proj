import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

const getCategories = async (): Promise<string[]> => {
  const snap = await getDocs(collection(db, "products"));
  const categories = snap.docs.map((doc) => doc.data().category);
  return Array.from(new Set(categories));
};

export default getCategories;