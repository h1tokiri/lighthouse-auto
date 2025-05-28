import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as UI from "../components/ui";

export default function RegisterPage() {
  // Change this:
  // const [name, setName] = useState("");
  // To this:
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Register";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError("Passwords don't match");
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://lighthouse-auto.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Change this:
        // body: JSON.stringify({ name, email, password }),
        // To this:
        body: JSON.stringify({ firstname: firstName, lastname: lastName, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Store token in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/"); // Redirect to homepage on success
    } catch (err) {
      setError(err.message || "Failed to create an account.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 p-4">
      <UI.Card className="w-full max-w-md">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center mb-6">Create Account</h2>

          {error && <UI.Alert className="alert-error mb-4">{error}</UI.Alert>}

          <form onSubmit={handleSubmit}>
            {/* Replace the single name field with these two fields */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <UI.Input
                label="First Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                required
              />
              <UI.Input
                label="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
              />
            </div>

            <UI.Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="mb-4"
            />

            {/* Rest of the form remains the same */}
            <UI.Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="mb-4"
            />

            <UI.Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="mb-6"
            />

            <UI.Button type="submit" className="w-full btn-primary" disabled={loading}>
              {loading ? "Creating Account..." : "Register"}
            </UI.Button>
          </form>

          <div className="divider">OR</div>

          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Sign In
            </Link>
          </p>
        </div>
      </UI.Card>
    </div>
  );
}
