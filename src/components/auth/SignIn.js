import React, { useState } from "react";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/users/login", form);
      setMsg(res.data.message);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: 400 }}>
      <h3 className="mb-3">Sign In</h3>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary w-100">
          Sign In
        </button>
        <div className="text-danger mt-2">{msg}</div>
      </form>
    </div>
  );
}
