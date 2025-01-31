import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Login from "./components/Login/Login";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default App;

// react query library for fetch api calls of supabase
// table with crud operations (Books)
// book name, description, rating,
// flowbite react library for ui components
