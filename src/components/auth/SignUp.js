import React, { useState } from "react";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/users/register", form);
      setMsg(res.data.message);
      if (res.status === 201) setTimeout(() => navigate("/signin"), 1200);
    } catch (err) {
      setMsg(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: 400 }}>
      <h3 className="mb-3">Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          className="form-control mb-2"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          className="form-control mb-2"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          className="form-control mb-2"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-success w-100">
          Sign Up
        </button>
        <div className="text-danger mt-2">{msg}</div>
      </form>
    </div>
  );
}
