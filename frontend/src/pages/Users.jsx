import { useEffect, useState } from "react";
import API from "../api/axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await API.get("/users");
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Users</h2>

      {users.map((u) => (
        <div key={u._id} style={{
          border: "1px solid #ddd",
          padding: "15px",
          margin: "10px 0",
          borderRadius: "8px"
        }}>
          <p><b>Name:</b> {u.name}</p>
          <p><b>Email:</b> {u.email}</p>
          <p><b>Role:</b> {u.role}</p>
        </div>
      ))}
    </div>
  );
};

export default Users;