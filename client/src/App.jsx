// import React from "react";
// import "./index.css";
// import { Routes, Route } from "react-router-dom";
// import * as UI from "./components/ui";
// import DetailedListingsPage from "./pages/DetailedListingsPage";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import * as UI from "./components/ui";
import DetailedListingsPage from "./pages/DetailedListingsPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <h1 className="app-title">🚗 Welcome to Lighthouse Auto!</h1>
        <UI.Button>Click me</UI.Button>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/vehicles/:id" element={<DetailedListingsPage />} />
        </Routes>
      </main>
    </div>
  );
}
