import React from "react";
import Layout from "../layouts/Layout";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <Layout>
       <div className="row mt-5">
            <div className="col-md-6 mx-auto">
                <div className="card">
                    <div className="card-body text-center py-5">
                        <h2 className="fw-bold">TASK MANAGEMENT APP</h2>
                        <NavLink className="btn btn-primary mt-4" to='/task'>
                            Create Your Task Now!
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  );
}
