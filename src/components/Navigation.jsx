import { Link, useLocation } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import useAuthenticated from "../hooks/useAuthenticated";
import { useEffect, useRef, useState } from "react";

const Links = [
  { name: "Home", link: "/" },
  { name: "Events", link: "/events" },
  { name: "About", link: "/about" },
  { name: "Contact", link: "/contact" },
];

const Navigation = () => {
  const authenticated = useAuthenticated();
  const location = useLocation();
  const [scrollY, setScrollY] = useState(0);
  const nav = useRef(null);
  const loginBtn = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    if (scrollY > 80 && location?.pathname === "/") {
      nav.current.classList.remove("bg-transparent");
      nav.current.classList.remove("text-white");
      nav.current.classList.add("bg-white");
      loginBtn.current && loginBtn.current.classList.add("border-[#0A075F]");
    } else if (scrollY <= 80 && location?.pathname === "/") {
      nav.current.classList.remove("bg-white");
      nav.current.classList.add("text-white");
      nav.current.classList.add("bg-transparent");
      loginBtn.current && loginBtn.current.classList.remove("border-[#0A075F]");
    } else {
      loginBtn.current && loginBtn.current.classList.add("border-[#0A075F]");
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location?.pathname, scrollY]);

  return (
    <nav
      ref={nav}
      className={`sticky top-0 p-5 py-0 md:px-14 flex items-center justify-between ${
        location?.pathname !== "/"
          ? "bg-white shadow-sm"
          : "bg-transparent shadow-sm text-white transition ease-in duration-500"
      } z-10`}
    >
      <div>
        <Link to="/" onClick={scrollToTop}>
          <img
            className="inline h-20 p-0"
            src="eventku.svg"
            alt="Eventku logo"
          />
        </Link>
      </div>

      <div className="md:hidden">
        <button
          className="flex items-center px-3 py-2 border-2 rounded text-gray-500 border-gray-600 hover:text-gray-400 hover:border-x-gray-400"
          onClick={() => {}}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path
              fillRule="evenodd"
              d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <ul className="items-center font-medium hidden md:flex">
        {Links.map((link, index) => (
          <li key={index} className="mr-10">
            <Link
              to={link.link}
              className="hover:text-[#F5167E] transition duration-500"
              onClick={scrollToTop}
            >
              {link.name}
            </Link>
          </li>
        ))}

        {authenticated ? (
          <ProfileCard />
        ) : (
          <li className="hover:text-[#F5167E] duration-500">
            <Link
              ref={loginBtn}
              className="px-7 py-2 rounded-full border-2 border-[#0A075F]"
              to="/login"
              onClick={scrollToTop}
            >
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
