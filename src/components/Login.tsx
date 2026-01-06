// src/pages/LoginPage.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { loginUser } from "../auth/authService"; // your login function

const Login: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate("/"); // go to homepage/dashboard
    }
  }, [user, loading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      // no need to navigate here; useEffect handles redirect
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  if (loading) return <p>Checking authentication...</p>;

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>
        Don't have an account?{" "}
        <button onClick={() => navigate("/register")}>Register</button>
      </p>
    </div>
  );
};

export default Login;
