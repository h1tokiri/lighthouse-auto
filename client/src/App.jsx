// <<<<<<< feature/navbar-listcard
// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import "./index.css";
import * as UI from "./components/ui";
import Navbar from './Navbar';
import HomePage from './components/HomePage';
import DetailedListingsPage from "./pages/DetailedListingsPage";
import CreateVehiclePage from "./pages/CreateVehiclePage";
import EditVehiclePage from "./pages/editVehiclePage";
import MyVehiclesPage from "./pages/MyVehiclesPage";
// import other pages as you build them:
// import LoginPage from './components/LoginPage';
// import CreateListingPage from './components/CreateListingPage';

// const App = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<HomePage />} />
      {/* <Route path="/login" element={<LoginPage />} /> */}
      {/* <Route path="/create-listing" element={<CreateListingPage />} /> */}
//     </Routes>
// =======
// import React from "react";
// import { Routes, Route } from "react-router-dom";

// integrate the code below from Andrew to Bill
export default function App() {
  return (
    <div className="app-root">
    <Navbar />
//       <header className="app-header">
//         <h1 className="app-title">🚗 Welcome to Lighthouse Auto!</h1>
//         <UI.Button>Click me</UI.Button>
//       </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vehicles/new" element={<CreateVehiclePage />} />
          <Route path="/vehicles/:id" element={<DetailedListingsPage />} />
          <Route path="/vehicles/edit/:id" element={<EditVehiclePage />} />
          <Route path="/my-vehicles" element={<MyVehiclesPage />} />
        </Routes>
      </main>
    </div>
// >>>>>>> dev
  );
};

export default App;

