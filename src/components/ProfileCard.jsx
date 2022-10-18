import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Cookies from "universal-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const cookies = new Cookies();

const ProfileCard = () => {
  const [user, setUser] = useState({});
  const [showed, setShowed] = useState(false);
  const [logoutClicked, setLogoutClicked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownMenu = useRef(null);

  const scrollToTop = (e) => {
    setShowed(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const logout = () => {
    cookies.remove("token");
    cookies.remove("user");
    setLogoutClicked(true);
    scrollToTop();
  };

  const showDropdown = (e) => {
    if (showed) {
      setShowed(false);
    } else {
      setShowed(true);
    }
  };

  const handleClickOutside = (e) => {
    if (dropdownMenu.current && !dropdownMenu.current.contains(e.target)) {
      setShowed(false);
    }
  };

  useEffect(() => {
    setUser(cookies.get("user"));

    if (showed) {
      dropdownMenu.current.classList.remove("hidden");
    } else {
      dropdownMenu.current.classList.add("hidden");
    }

    if (logoutClicked) {
      setLogoutClicked(false);
      navigate("/login", {
        state: { from: location?.pathname },
        replace: true,
      });
    }

    document.addEventListener("mousedown", handleClickOutside);
  }, [location?.pathname, logoutClicked, navigate, showed]);

  return (
    <div className="relative border-2 bg-red-500 top-0 h-4">
      <button
        className="ps-4 ms-3 absolute -top-3.5 -left-2"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        onClick={showDropdown}
      >
        <span className="bg-[#0A075F] text-white inline-block p-3 rounded-full">
          <FaUser className="text-white" />
        </span>
      </button>
      <ul
        className="hidden bg-white text-center py-3 w-44 absolute top-8 border-2 shadow-sm rounded-lg border-[#0A075F] -right-7"
        ref={dropdownMenu}
      >
        <li className="mb-1 w-full hover:bg-red-50">
          <Link
            onClick={scrollToTop}
            className="hover:bg-gray-50 block text-left px-3 text-gray-900"
            to="/profile"
          >
            Profile
          </Link>
        </li>
        {user?.role === "admin" && (
          <>
            <li className="mb-1 w-full hover:bg-red-50">
              <Link
                onClick={scrollToTop}
                className="hover:bg-gray-50 block text-left px-3 text-gray-900"
                to="/manage-event"
              >
                Manage Event
              </Link>
            </li>
            <li className="mb-1 w-full hover:bg-red-50">
              <Link
                onClick={scrollToTop}
                className="hover:bg-gray-50 block text-left px-3 text-gray-900"
                to="/manage-user"
              >
                Manage User
              </Link>
            </li>
          </>
        )}
        <li className="mb-1 w-full hover:bg-red-50">
          <Link
            className="hover:bg-gray-50 block text-left px-3 text-gray-900"
            to="#"
            onClick={logout}
          >
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileCard;
