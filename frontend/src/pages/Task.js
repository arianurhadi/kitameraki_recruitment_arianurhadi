import React from "react";
import Layout from "../layouts/Layout";
import { NavLink } from "react-router-dom";
import TaskCreate from "../components/TaskCreate";

export default function Task() {
  return (
    <Layout>
      <div className="container">
        <div className="card">
            <div className="card-body">
                <h2>Task Page</h2>
                <TaskCreate/>
            </div>
        </div>
      </div>
    </Layout>
  );
}
