import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <div style={{
      display: "flex",
      gap: "20px",
      padding: "10px",
      background: "#222",
      color: "#fff"
    }}>
      <Link to="/dashboard" style={{ color: "#fff" }}>Dashboard</Link>
      <Link to="/users" style={{ color: "#fff" }}>Users</Link>
      <Link to="/profile" style={{ color: "#fff" }}>Profile</Link>

      <button onClick={logout} style={{ marginLeft: "auto" }}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;