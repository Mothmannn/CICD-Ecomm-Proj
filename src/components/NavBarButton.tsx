import { useAuth } from "../auth/useAuth";
import { logoutUser } from "../auth/authService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Alert } from "react-bootstrap";

const AuthButton: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    await logoutUser();
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000); // hide after 3 seconds
    navigate("/"); // optional: redirect to homepage
  };

  return (
    <>
      {showMessage && (
        <Alert variant="info" className="mt-2">
          You have successfully logged out.
        </Alert>
      )}
      
      {user ? (
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Button variant="primary" onClick={handleLogin}>
          Login
        </Button>
      )}
    </>
  );
};

export default AuthButton;
