import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Error404 from "./pages/Error404";
import Events from "./pages/Events";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ManageEvent from "./pages/ManageEvent";
import ManageUser from "./pages/ManageUser";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Profile />} />
        <Route path="events" element={<Events />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="manage-user" element={<ManageUser />} />
        <Route path="manage-event" element={<ManageEvent />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
