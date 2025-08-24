import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import AccountTypeSelection from "./pages/AccountTypeSelection";
import DonorDashboard from "./pages/DonorDashboard";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/select-account" element={<AccountTypeSelection />} />
            <Route path="/donor-dashboard" element={<DonorDashboard />} />
            <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

function MainLayout() {
  return (
    <>
      <Header />
      <HomePage />
    </>
  );
}

export default App;