import React from "react";
import { NavLink } from "react-router-dom";

const SideBar: React.FC = () => {
  return (
    <nav className="w-64 h-screen bg-gray-800 text-white flex flex-col justify-between">
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Management App</h1>
        <ul className="space-y-4">
          <NavLink to="/contacts">
            <li className="hover:bg-gray-700 text-xl rounded-md px-4 py-2 cursor-pointer">
              Contacts
            </li>
          </NavLink>
          <NavLink to="/dashboard">
            <li className="hover:bg-gray-700 text-xl rounded-md px-4 py-2 cursor-pointer">
              Dashboard
            </li>
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default SideBar;
