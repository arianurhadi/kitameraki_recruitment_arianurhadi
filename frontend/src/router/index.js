import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import TaskList from "../pages/Task/TaskList";
import TaskCreate from "../pages/Task/TaskCreate";
import Setting from "../pages/Setting/Setting";

export default function index() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task" element={<TaskList />} />
          <Route path="/task/create" element={<TaskCreate />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}