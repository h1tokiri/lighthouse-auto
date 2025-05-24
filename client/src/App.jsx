// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./index.css";
// import { AuthProvider } from "./contexts/AuthContext";
// import * as UI from "./components/ui";
// import Navbar from "./components/Navbar";
// import HomePage from "./components/HomePage";
// import DetailedListingsPage from "./pages/DetailedListingsPage";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import CreateVehiclePage from "./pages/CreateVehiclePage";
// import EditVehiclePage from "./pages/editVehiclePage";
// import MyVehiclesPage from "./pages/MyVehiclesPage";

// export default function App() {
//   return (
//     <div className="app-root">
//       <Navbar />
//       <main className="app-main">
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/vehicles/new" element={<CreateVehiclePage />} />
//           <Route path="/vehicles/:id" element={<DetailedListingsPage />} />
//           <Route path="/vehicles/edit/:id" element={<EditVehiclePage />} />
//           <Route path="/my-vehicles" element={<MyVehiclesPage />} />
//         </Routes>
//       </main>
//     </div>
//   );
// }

import React from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import DetailedListingsPage from "./pages/DetailedListingsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateVehiclePage from "./pages/CreateVehiclePage";
import EditVehiclePage from "./pages/editVehiclePage";
import MyVehiclesPage from "./pages/MyVehiclesPage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <div className="app-root">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/vehicles/:id" element={<DetailedListingsPage />} />

            {/* Protected routes */}
            <Route
              path="/vehicles/new"
              element={
                <ProtectedRoute>
                  <CreateVehiclePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vehicles/edit/:id"
              element={
                <ProtectedRoute>
                  <EditVehiclePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-vehicles"
              element={
                <ProtectedRoute>
                  <MyVehiclesPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}
