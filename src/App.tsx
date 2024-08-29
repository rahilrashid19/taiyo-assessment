import ContactPage from "./components/ContactPage";
import Dashboard from "./components/Dashboard";
import SideBar from "./components/SideBar";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="flex">
      <SideBar />
      <Routes>
        <Route path="/" element={<ContactPage />} />
        <Route path="/contacts" element={<ContactPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
