import { useState, useEffect } from "react";
import useAuthenticated from "../hooks/useAuthenticated";
import { axiosAuth } from "../api/axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Profile = () => {
  const authorized = useAuthenticated();
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(cookies.get("user"));
  }, []);

  return (
    <div className="min-h-screen">
      <h1>Profile</h1>
      {user && (
        <div>
          <p>{user.name}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
