// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
// import other pages as you build them:
// import LoginPage from './components/LoginPage';
// import CreateListingPage from './components/CreateListingPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/login" element={<LoginPage />} /> */}
      {/* <Route path="/create-listing" element={<CreateListingPage />} /> */}
    </Routes>
  );
};

export default App;

