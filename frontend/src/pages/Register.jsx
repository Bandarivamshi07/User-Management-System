import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await API.post("/auth/register", form);

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
    }}>
      <form style={{
        border: "1px solid #ccc",
        padding: "30px",
        borderRadius: "10px",
        width: "300px",
        background: "#f9f9f9"
      }} onSubmit={handleSubmit}>

        <h2>Register</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          placeholder="Name"
          required
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <button style={{
          width: "100%",
          padding: "10px",
          background: "green",
          color: "#fff",
          border: "none"
        }}>
          {loading ? "Creating..." : "Register"}
        </button>

        <p style={{ marginTop: "10px" }}>
          Already have account? <a href="/login">Login</a>
        </p>

      </form>
    </div>
  );
};

export default Register;