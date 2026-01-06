import { db } from "../firebase/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
export const createOrder = async (
  userId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  products: any[],
  total: number
) => {
  const order = { userId, products: [...products], total_price:total, order_date: Timestamp.now() };
  const docRef = await addDoc(collection(db, "orders"), order);
  return docRef.id;
};
