import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;