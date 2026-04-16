import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>{children}</div>
      <Outlet />
    </div>
  );
};

export default MainLayout;