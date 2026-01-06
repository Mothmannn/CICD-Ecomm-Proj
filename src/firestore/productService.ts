import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import type { Product } from "../models/Product.model";

export const getAllProducts = async (): Promise<Product[]> => { 
    const snap = await getDocs(collection(db, "products")); 
    const products: Product[] = snap.docs.map((doc) => { 
        const data = doc.data() as Omit<Product, "id">; 
        return { id: doc.id,  
            ...data, 
        }; 
    }); 
    return products; 
};

export const createProduct = async (product: Omit<Product, "id" | "quantity">) => {
    const productsRef = collection(db, "products");
    await addDoc(productsRef, {
        ...product,
        createdAt: new Date(),
    });
};

export const updateProduct = async (
    productID: string,
    updates: Partial<Product>
) => {
    const productRef = doc(db, "products", productID);
    await updateDoc(productRef, updates);
};

export const deleteProduct = async (productID: string) => {
    const productRef = doc(db, "products", productID);
    await deleteDoc(productRef);
};