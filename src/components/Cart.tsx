import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import NavBar from "./NavBar";
import { useAuth } from "../auth/useAuth";
import { createOrder } from "../firestore/orders";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { removeFromCart, clearCart } from "../redux/CartActionsSlice";

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  const cartItems = useAppSelector((state) => state.cart.items);

  // Calculate total items and total price
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Container>
      <NavBar />
      <h1 className="text-center mb-4">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          <Row className="g-4">
            {cartItems.map((item) => (
              <Col key={item.id} md={6} lg={4}>
                <Card className="h-100">
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{item.title}</Card.Title>

                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        height: "150px",
                        objectFit: "contain",
                        marginBottom: "1rem",
                      }}
                    />

                    <Card.Text>Price: ${item.price}</Card.Text>
                    <Card.Text>Quantity: {item.quantity}</Card.Text>
                    <Button
                      variant="outline-danger"
                      className="mt-auto m-2"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove Item
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-4">
            <h4>Total Items: {totalItems}</h4>
            <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
          </div>

          <Button
            variant="danger"
            className="mt-auto"
            onClick={async () => {
              console.log("Checkout clicked");
              if (!user) {
                alert("You must be logged in to place an order.");
                navigate("/login");
                return;
              }

              console.log("User:", user.uid);
              console.log("Cart items:", cartItems);
              console.log("Total:", totalPrice);

              try {
                const orderId = await createOrder(
                  user.uid,
                 [...cartItems],
                  totalPrice,
                );
                console.log("Order created with ID:", orderId);
                dispatch(clearCart());
                navigate(`/orders/${orderId}`);
              } catch (error) {
                console.error("Error creating order:", error);
                alert("Something went wrong placing your order.");
              }
            }}
          >
            Checkout
          </Button>
        </>
      )}
    </Container>
  );
};

export default Cart;
