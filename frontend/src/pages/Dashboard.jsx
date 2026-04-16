import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <div style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px",
        background: "#f5f5f5"
      }}>
        <h2>Welcome {user?.name}</h2>
        <p><b>Email:</b> {user?.email}</p>
        <p><b>Role:</b> {user?.role}</p>
      </div>
    </div>
  );
};

export default Dashboard;