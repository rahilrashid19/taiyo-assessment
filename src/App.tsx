import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CovidMap from "./components/charts/CovidMap";
import LineChart from "./components/charts/LineChart";
import ContactPage from "./components/ContactPage";
import Dashboard from "./components/Dashboard";
import SideBar from "./components/SideBar";

const App = () => {
  return (
    <div className="flex flex-col sm:flex-row h-screen">
      <div className="sm:w-64 flex-shrink-0">
        <SideBar />
      </div>
      <div className="flex-grow overflow-auto">
        <Routes>
          <Route path="/" element={<ContactPage />} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route index element={<Navigate to="linechart" />} />
            <Route path="linechart" element={<LineChart />} />
            <Route path="map" element={<CovidMap />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
