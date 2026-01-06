import { Routes, Route } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import HomePage from "./components/HomePage";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import ProfilePage from "./components/ProfilePage";
import ProductEditor from "./components/ProductEditor";
import OrderHistory from "./components/OrderHistory";
import OrderDetails from "./components/OrderDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/productdetails" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product-editor" element={<ProductEditor />} />
        <Route path="/orders" element={<OrderHistory />} />{" "}
        <Route path="/orders/:orderId" element={<OrderDetails />} />
      </Routes>
    </>
  );
}

export default App;
