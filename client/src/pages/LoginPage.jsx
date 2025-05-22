// Replace client/src/pages/LoginPage.jsx with:
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as UI from "../components/ui";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Store token in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.user.id,
          firstname: data.user.firstname,
          lastname: data.user.lastname,
          email: data.user.email,
        })
      );

      navigate("/"); // Redirect to homepage on success
    } catch (err) {
      setError(err.message || "Failed to log in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 p-4">
      <UI.Card className="w-full max-w-md">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center mb-6">Sign In</h2>

          {error && <UI.Alert className="alert-error mb-4">{error}</UI.Alert>}

          <form onSubmit={handleSubmit}>
            <UI.Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="mb-4"
            />

            <UI.Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="mb-6"
            />

            <UI.Button type="submit" className="w-full btn-primary" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </UI.Button>
          </form>

          <div className="divider">OR</div>

          <p className="text-center">
            Don't have an account?{" "}
            <Link to="/register" className="link link-primary">
              Register
            </Link>
          </p>
        </div>
      </UI.Card>
    </div>
  );
}
