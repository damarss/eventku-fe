import { Link } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import useAuthenticated from "../hooks/useAuthenticated";

const Navigation = () => {
  const authenticated = useAuthenticated();

  return (
    <nav className="p-5 py-0 shadow-sm md:flex md:items-center md:justify-between md:static absolute">
      <div>
        <Link to="/">
          <img
            className="inline h-20 p-0"
            src="eventku.svg"
            alt="Eventku logo"
          />
        </Link>
      </div>

      <ul className="md:flex md:gap-5">
        <li>
          <Link className="hover:text-cyan-500 duration-500" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link
            className="hover:text-cyan-500 duration-500"
            to="/events"
          >
            Events
          </Link>
        </li>
        <li>
          <Link
            className="hover:text-cyan-500 duration-500"
            to="/about"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            className="hover:text-cyan-500 duration-500"
            to="/contact"
          >
            Contact
          </Link>
        </li>
        {authenticated ? (
          <ProfileCard />
        ) : (
          <li className="hover:text-cyan-500 duration-500">
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
