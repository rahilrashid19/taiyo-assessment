import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const SideBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white flex flex-col justify-between transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-200 ease-in-out z-20`}
      >
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

      {/* Hamburger button for mobile view */}
      <div className="md:hidden fixed top-4 left-4 z-30">
        <button
          onClick={toggleSidebar}
          className="focus:outline-none bg-gray-800 p-2 rounded-md"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {/* mobile view */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 md:hidden z-10"
        ></div>
      )}
    </>
  );
};

export default SideBar;
