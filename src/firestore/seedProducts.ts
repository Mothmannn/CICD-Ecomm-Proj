import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const products = [
  // Electronics
  {
    title: "Wireless Headphones",
    price: 79.99,
    description: "Noise-canceling over-ear headphones",
    image: "https://via.placeholder.com/300",
    category: "electronics",
  },
  {
    title: "Smart Watch",
    price: 149.99,
    description: "Track fitness and notifications",
    image: "https://via.placeholder.com/300",
    category: "electronics",
  },
  {
    title: "Bluetooth Speaker",
    price: 59.99,
    description: "Portable speaker with deep bass",
    image: "https://via.placeholder.com/300",
    category: "electronics",
  },
  {
    title: "Laptop Stand",
    price: 29.99,
    description: "Ergonomic aluminum stand",
    image: "https://via.placeholder.com/300",
    category: "electronics",
  },

  // Clothing
  {
    title: "Hoodie",
    price: 49.99,
    description: "Comfortable cotton hoodie",
    image: "https://via.placeholder.com/300",
    category: "clothing",
  },
  {
    title: "T-Shirt",
    price: 19.99,
    description: "Soft everyday t-shirt",
    image: "https://via.placeholder.com/300",
    category: "clothing",
  },
  {
    title: "Jeans",
    price: 59.99,
    description: "Slim fit denim jeans",
    image: "https://via.placeholder.com/300",
    category: "clothing",
  },
  {
    title: "Jacket",
    price: 89.99,
    description: "Lightweight fall jacket",
    image: "https://via.placeholder.com/300",
    category: "clothing",
  },

  // Home
  {
    title: "Coffee Maker",
    price: 99.99,
    description: "Automatic drip coffee maker",
    image: "https://via.placeholder.com/300",
    category: "home",
  },
  {
    title: "Throw Pillow",
    price: 24.99,
    description: "Decorative couch pillow",
    image: "https://via.placeholder.com/300",
    category: "home",
  },
  {
    title: "Desk Lamp",
    price: 34.99,
    description: "LED adjustable desk lamp",
    image: "https://via.placeholder.com/300",
    category: "home",
  },

  // Books
  {
    title: "React Handbook",
    price: 39.99,
    description: "Learn React step by step",
    image: "https://via.placeholder.com/300",
    category: "books",
  },
  {
    title: "TypeScript Guide",
    price: 44.99,
    description: "Master TypeScript",
    image: "https://via.placeholder.com/300",
    category: "books",
  },
  {
    title: "Firebase in Action",
    price: 42.99,
    description: "Build apps with Firebase",
    image: "https://via.placeholder.com/300",
    category: "books",
  },
  {
    title: "Clean Code",
    price: 49.99,
    description: "Writing maintainable code",
    image: "https://via.placeholder.com/300",
    category: "books",
  },
];

export const seedProducts = async () => {
  const ref = collection(db, "products");

  for (const product of products) {
    await addDoc(ref, {
      ...product,
      createdAt: new Date(),
    });
  }

  console.log("✅ Products seeded");
};
