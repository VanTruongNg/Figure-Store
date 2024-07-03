import "./components/styles/home.scss";
import Navbar from "./components/AdminLayout/NavBar";
import Sidebar from "./components/AdminLayout/SideBar";
import { Outlet, Route } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
