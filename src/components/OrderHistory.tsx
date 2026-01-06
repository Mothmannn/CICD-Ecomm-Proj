import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import "../css/OrderHistory.css";
const OrderHistory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid)
        );
        const snap = await getDocs(q);
        setOrders(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error("Failed to load orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);
  if (!user) return <p>Please log in to view your orders.</p>;
  if (loading) return <p>Loading your orders...</p>;
  return (
    <div className="order-history-container">
      {" "}
      <h1>Your Orders</h1>{" "}
      {orders.length === 0 && (
        <p className="empty-message">You haven't placed any orders yet.</p>
      )}{" "}
      <div className="order-list">
        {" "}
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            {" "}
            <div className="order-header">
              {" "}
              <h2>Order #{order.id}</h2>{" "}
              <span className="order-date">
                {" "}
                {order.order_date
                  ? new Date(order.order_date.toDate()).toLocaleDateString()
                  : "No date available"}{" "}
              </span>{" "}
            </div>{" "}
            <p className="order-total">
              {" "}
              Total: <strong>${order.total_price}</strong>{" "}
            </p>{" "}
            <button
              className="view-details-btn"
              onClick={() => navigate(`/orders/${order.id}`)}
            >
              {" "}
              View Details{" "}
            </button>{" "}
          </div>
        ))}{" "}
      </div>{" "}
    </div>
  );
};
export default OrderHistory;
