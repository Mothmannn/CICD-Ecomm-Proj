/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import type { Product } from "../models/Product.model";
import "../css/OrderDetails.css";



const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);
  const navigate = useNavigate();
  const handleNavigate = () => navigate("/");
  useEffect(() => {
    const fetchOrder = async () => { 
        try { 
            if (!orderId) { 
                console.log("No orderId found"); 
                return; 
            } 
                
            const snap = await getDoc(doc(db, "orders", orderId)); 
            console.log("SNAP EXISTS:", snap.exists()); 
            console.log("SNAP DATA:", snap.data()); 
            if (snap.exists()) { 
                setOrder({ id: snap.id, ...snap.data() }); 
            } else { 
                console.log("Order not found in Firestore"); 
            } 
        } catch (err) { 
            console.error("FIRESTORE ERROR:", err); 
        } 
    };
    fetchOrder();
    }, [orderId]);
    
  if(!orderId) return <p>Invalid order ID</p>;
  if (!order) return <p>Loading...</p>;
  if (!order.products) return <p>No products found for the order</p>;



  return (
    <div className="order-details-container">
      {" "}
      <h1>Order #{order.id}</h1>{" "}
      <div className="order-info">
        {" "}
        <p>
          <strong>Date:</strong> {new Date(order.order_date.toDate()).toLocaleString()}
        </p>{" "}
        <p>
          <strong>Total:</strong> ${order.total_price}
        </p>{" "}
      </div>{" "}
      <h2>Products</h2>{" "}
      <div className="product-list">
        {" "}
        {order.products.map((product: Product) => (
          <div key={product.id} className="product-card">
            {" "}
            <img src={product.image} alt={product.title} />{" "}
            <div className="product-details">
              {" "}
              <h3>{product.title}</h3> <p>Quantity: {product.quantity}</p>{" "}
              <p>Price: ${product.price}</p>{" "}
            </div>{" "}
          </div>
        ))}{" "}
      </div>{" "}
      <Button variant="primary" onClick={handleNavigate}>Return Home</Button>
    </div>
  );
};
export default OrderDetails;
