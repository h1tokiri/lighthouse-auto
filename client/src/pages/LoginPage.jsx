import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import * as UI from "../components/ui";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If redirected from a protected route, remember where to go back
  const from = location.state?.from?.pathname || "/";

    useEffect(() => {
      document.title = "Login";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(email, password); // Wait for login to finish
      navigate(from); // 🔁 Redirect back to the original page
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 p-4">
      <UI.Card className="w-full max-w-md">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center mb-6">
            Sign In
          </h2>

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

            <UI.Button
              type="submit"
              className="w-full btn-primary"
              disabled={loading}
            >
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
