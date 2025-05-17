import React from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import * as UI from "./components/ui";
import DetailedListingsPage from './pages/DetailedListingsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
