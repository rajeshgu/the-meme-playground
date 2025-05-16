import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css"; // Create this if you want custom styles

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
      } else {
        // Registration successful, navigate to login
        navigate("/");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>
        {error && <div className="error-message">{error}</div>}
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a Password"
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        <div className="login-link">
          Already have an account?{" "}
          <span
            className="login-clickable"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
