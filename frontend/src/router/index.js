import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Task from "../pages/Task";

export default function index() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task" element={<Task />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}