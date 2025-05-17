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
import { Routes, Route } from "react-router-dom";
import * as UI from "./components/ui";
import DetailedListingsPage from "./pages/DetailedListingsPage";
import CreateVehiclePage from "./pages/CreateVehiclePage";

export default function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <h1 className="app-title">🚗 Welcome to Lighthouse Auto!</h1>
        <UI.Button>Click me</UI.Button>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/vehicles/new" element={<CreateVehiclePage />} />
          <Route path="/vehicles/:id" element={<DetailedListingsPage />} />
        </Routes>
      </main>
    </div>
  );
}
