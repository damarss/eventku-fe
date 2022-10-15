import { useState, useEffect } from "react";
import useAuthorized from "../hooks/useAuthenticated";
import { axiosAuth } from "../api/axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const authorized = useAuthorized();
  const navigate = useNavigate();

  const getUsers = async () => {
    const res = await axiosAuth.get("user");
    setUsers(res.data.users);
  };

  useEffect(() => {
    cookies.get("user")?.role === "admin"
      ? setIsAdmin(true)
      : setIsAdmin(false);
    if (isAdmin) {
      getUsers();
    } else {
      navigate("/", { replace: true });
    }
  }, [isAdmin, navigate]);

  return (
    <>
      {users?.length > 0 &&
        users.map((user) => (
          <div key={user.id}>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        ))}
    </>
  );
};

export default ManageUser;
