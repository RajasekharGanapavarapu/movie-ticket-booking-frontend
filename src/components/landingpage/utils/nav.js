import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkmode") === "yes"
  );
  const location = useLocation();

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkmode", newMode ? "yes" : "no");
    window.location.reload(); // To apply bg change everywhere
  };

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          🎬 MovieBooker
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navbarNav" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link
                className={
                  "nav-link" +
                  (location.pathname === "/" ? " active" : "")
                }
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  "nav-link" +
                  (location.pathname === "/FAQ" ? " active" : "")
                }
                to="/FAQ"
              >
                FAQ
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  "nav-link" +
                  (location.pathname === "/aboutus" ? " active" : "")
                }
                to="/aboutus"
              >
                About Us
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className={
                  "nav-link" +
                  (location.pathname === "/signin" ? " active" : "")
                }
                to="/signin"
              >
                Sign In
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  "nav-link" +
                  (location.pathname === "/signup" ? " active" : "")
                }
                to="/signup"
              >
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-outline-secondary ms-2"
                onClick={toggleDarkMode}
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
