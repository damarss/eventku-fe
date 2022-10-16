import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const useAuthenticated = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (cookies.get("token")) {
      setAuthenticated(true);
      setTimeout(() => {
        location?.pathname === "/register" && navigate("/");
      }, 500);
    } else {
      setAuthenticated(false);
      setTimeout(() => {
        ["/profile", "/manage-event", "/manage-user"].includes(
          location?.pathname
        ) &&
          navigate("/login", {
            state: {
              from: location?.pathname,
              error: "Silakan login terlebih dahulu!",
            },
          });
      }, 500);
    }
  }, [authenticated, location?.pathname, navigate]);

  return authenticated;
};

export default useAuthenticated;
