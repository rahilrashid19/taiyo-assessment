import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">COVID-19 Dashboard</h1>
      <nav>
        <ul className="flex space-x-4">
          <NavLink
            to="linechart"
            className={({ isActive }) =>
              `text-xl rounded-md px-4 py-2 cursor-pointer ${
                isActive ? "underline text-blue-600" : "hover:bg-gray-700"
              }`
            }
          >
            <li>Line Chart</li>
          </NavLink>
          <NavLink
            to="map"
            className={({ isActive }) =>
              `text-xl rounded-md px-4 py-2 cursor-pointer ${
                isActive ? "underline text-blue-600" : "hover:bg-gray-700"
              }`
            }
          >
            <li>Map</li>
          </NavLink>
        </ul>
      </nav>
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
