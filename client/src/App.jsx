import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./components/misc/ProtectedRoutes";
import StartQuizSession from "./pages/StartQuizSession";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          {/* Protected routes */}
          <Route path="/" element={<Home />} />
          <Route path="/start_quiz" element={<StartQuizSession />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
