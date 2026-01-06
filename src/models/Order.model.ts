import type { Timestamp } from "firebase/firestore";
import type { Product } from "./Product.model"

export type Order = {
  id: string;
  userId: string;
  order_date: Timestamp;
  total_price: number;
  products: Product[];
};
