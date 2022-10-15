import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import useAuthenticated from "../hooks/useAuthenticated";

const bootstrap = {
  /* <nav className="navbar navbar-expand-lg">
<div className="container">
  <Link className="navbar-brand" to="/">Navbar</Link>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link className="nav-link" to="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/events">Events</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/about">About</Link>  
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/contact">Contact</Link>
      </li>
      {authorized ? 
        (
          <ProfileCard />
        ) : (
          <li className="nav-item">
            <Link className="btn border-3 border-dark rounded-5 px-4" type="button" to="/login">Login</Link>
          </li>
        )
      }
    </ul>
  </div>
</div>
    </nav> */
};

const Navigation = () => {
  const authenticated = useAuthenticated();

  return (
    <nav className="p-5 py-0 bg-white shadow-sm md:flex md:items-center md:justify-between md:static absolute">
      <div className="">
        <Link to="/">
          <img
            className="inline h-20 p-0"
            src="eventku.svg"
            alt="Eventku logo"
          />
        </Link>
      </div>

      <ul className="md:flex md:gap-5">
        <li className="">
          <Link className="hover:text-cyan-500 duration-500" to="/">
            Home
          </Link>
        </li>
        <li className="">
          <Link className="" to="/events">
            Events
          </Link>
        </li>
        <li className="">
          <Link className="" to="/about">
            About
          </Link>
        </li>
        <li className="">
          <Link className="" to="/contact">
            Contact
          </Link>
        </li>
        {authenticated ? (
          <ProfileCard />
        ) : (
          <li className="">
            <Link className="btn" type="button" to="/login">
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
