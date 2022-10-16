import { useState, useEffect } from "react";
import useAuthorized from "../hooks/useAuthenticated";
import { axiosAuth } from "../api/axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const authorized = useAuthorized();
  const navigate = useNavigate();

  const getUsers = async () => {
    const res = await axiosAuth.get("user");
    setUsers(res.data.users);
  };

  useEffect(() => {
    const isAdmin = cookies.get("user")?.role === "admin";

    if (isAdmin) {
      getUsers();
    } else {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="container mx-auto mt-5 px-4">
      <h1 className="font-bold text-4xl text-center">Manage User</h1>
      <table className="table-auto mx-auto">
        <thead>
          <tr>
            <th>No</th>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
            <td>Malcolm Lockyer</td>
            <td>1961</td>
          </tr>
          <tr>
            <td>Witchy Woman</td>
            <td>The Eagles</td>
            <td>1972</td>
          </tr>
          <tr>
            <td>Shining Star</td>
            <td>Earth, Wind, and Fire</td>
            <td>1975</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ManageUser;
