# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
📦 E‑Commerce App with Firebase Integration
A full‑stack e‑commerce application built with React, TypeScript, and Firebase, featuring user authentication, product management, and order handling. This project replaces the previous FakeStore API with Firestore and implements complete CRUD operations for users, products, and orders.

🚀 Features Overview
✅ Firebase Authentication
User registration (email/password)

Login & logout

User document creation in Firestore

Secure access to user‑specific data

✅ User Management (Firestore CRUD)
Create: Add user profile on registration

Read: Display user profile information

Update: Edit profile fields (e.g., name, address)

Delete: Remove user account + Firestore data

✅ Product Management (Firestore CRUD)
Replace FakeStore API with Firestore

Fetch all products from Firestore

Create new products

Update existing products

Delete products

Admin‑style product editor

✅ Order Management
Create orders from cart contents

Store full order details in Firestore

Order history page

View individual order details

Display order date, total price, and product list

🛠️ Tech Stack
Category	Tools
Frontend	React, TypeScript, React Router
Backend	Firebase Authentication, Firestore
Styling	CSS / Bootstrap
State	React Hooks
📁 Project Structure
Code
src/
 ├── components/
 │    ├── HomePage.tsx
 │    ├── ProductDetails.tsx
 │    ├── ProductEditor.tsx
 │    ├── Cart.tsx
 │    ├── Login.tsx
 │    ├── Register.tsx
 │    ├── ProfilePage.tsx
 │    ├── OrderHistory.tsx
 │    └── OrderDetails.tsx
 ├── firebase/
 │    └── firebase.ts
 ├── models/
 │    ├── Product.model.ts
 │    └── Order.model.ts
 ├── css/
 └── App.tsx
📚 Assignment Instructions
Below is the full breakdown of the assignment requirements implemented in this project.

🔥 Part 1: Firebase Setup
1. Create a Firebase Project
Go to Firebase Console

Create a new project

Add a Web App

Install Firebase SDK in your React project

2. Enable Services
Authentication → Email/Password

Firestore Database → Start in test mode (or secure rules later)

3. Configure Firebase
Add your Firebase config to firebase.ts and initialize:

ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
🔐 Part 2: Firebase Authentication
✔ User Registration
Register with email/password

Create a Firestore user document in users/

✔ Login & Logout
Authenticate with Firebase Auth

Logout button clears session

👤 Part 3: User Management (Firestore CRUD)
✔ Create
Add user document on registration.

✔ Read
Fetch user profile to display in ProfilePage.

✔ Update
Allow editing profile fields.

✔ Delete
Remove user account + Firestore data.

🛒 Part 4: Product Management
✔ Replace FakeStore API
All products now come from Firestore.

✔ CRUD Operations
Fetch all products

Create new product

Update product

Delete product

Products are stored in:

Code
products/
   productId/
      title
      price
      description
      image
      category
📦 Part 5: Order Management
✔ Create Orders
When a user checks out, save:

ts
{
  userId,
  products: [...],
  total_price,
  order_date: Timestamp.now()
}
✔ Order History
Users can view:

Order ID

Date

Total price

✔ Order Details
Clicking an order shows:

All products

Quantities

Prices

Order metadata

▶️ Running the Project
Install dependencies
Code
npm install
Start development server
Code
npm run dev