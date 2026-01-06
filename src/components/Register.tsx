import { useState } from "react";
import { registerUser } from "../auth/authService";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
      await signOut(auth);
      alert("Registration successful!");
      navigate("/");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    }
  };

  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit}>
      <NavBar />
      <h2>Register</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

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

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
