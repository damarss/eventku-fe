import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { useNavigate, useLocation } from "react-router-dom";

const cookies = new Cookies();

const ProfileCard = () => {
  const name = cookies.get("name");
  const [user, setUser] = useState({});
  const [logoutClicked, setLogoutClicked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    cookies.remove("token");
    cookies.remove("user");
    setLogoutClicked(true);
  };

  useEffect(() => {
    setUser(cookies.get("user"));
    if (logoutClicked) {
      setLogoutClicked(false);
      navigate("/login", { state: { from: location?.pathname } });
    }
  }, [location?.pathname, logoutClicked, navigate]);

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle ps-4 ms-3"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="bi bi-person-circle"></i>
      </button>
      <ul className="dropdown-menu">
        <li>
          <Link className="dropdown-item" to="/profile">
            Profile
          </Link>
        </li>
        {user?.role === "admin" && (
          <>
            <li>
              <Link className="dropdown-item" to="/manage-event">
                Manage Event
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/manage-user">
                Manage User
              </Link>
            </li>
          </>
        )}
        <li>
          <Link className="dropdown-item" to="#" onClick={logout}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileCard;
