import React from "react";
import Navbar from "./components/landingpage/utils/nav";
import LandingPage from "./components/landingpage/LandingPage";
import AuthSignIn from "./components/auth/SignIn";
import AuthSignUp from "./components/auth/SignUp";
import MovieDetails from "./components/bookseatsinterface/intermediate";
import { HashRouter, Routes, Route } from "react-router-dom";
import BookTickets from "./components/bookseatsinterface/bookingcomponents/booktickets";
import FAQ from "./components/others/faq";
import ProgressBarComponent from "./components/bookseatsinterface/progressbar";
import UserProfilePage from "./components/landingpage/utils/profile";
import AboutUs from "./components/others/aboutus";
import Footer from "./components/landingpage/utils/footer";

function App() {
  return (
    <HashRouter>
      <div
        style={{ fontFamily: "'Open Sans', sans-serif" }}
        className={`container-fluid p-0 min-vh-100 ${
          localStorage.getItem("darkmode") === "yes" ? "bg-dark" : "bg-light"
        }`}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<AuthSignIn />} />
          <Route path="/signup" element={<AuthSignUp />} />
          <Route path="/moviedetails/:id" element={<MovieDetails />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/booktickets/:id" element={<ProgressBarComponent />} />
          <Route path="/profile/:id" element={<UserProfilePage />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
}
export default App;
