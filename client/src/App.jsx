import { useState } from "react";
import React from "react";
import "./index.css"; // or remove if already imported in main.jsx
import { Routes, Route } from "react-router-dom";
import * as UI from "./components/ui"; // Import all UI components as a namespace

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">
        🚗 Welcome to Lighthouse Auto!
      </h1>
      <UI.Button>Click me</UI.Button>
    </div>
  );
}
