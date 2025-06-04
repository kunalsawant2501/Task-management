import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import TaskPage from "./pages/TaskPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<SignUp />}></Route>
        <Route path="/dashBoard" element={<Dashboard />}></Route>
        <Route path="/task" element={<TaskPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
