import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import TaskList from "../pages/Task/TaskList";
import TaskCreate from "../pages/Task/TaskCreate";

export default function index() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task" element={<TaskList />} />
          <Route path="/task/create" element={<TaskCreate />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}