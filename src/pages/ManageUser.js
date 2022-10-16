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
    <div className="container mx-auto my-5 px-4">
      <h1 className="font-bold text-4xl text-center">Manage User</h1>
      <div className="overflow-x-auto relative mt-4">
        <table className="table-auto mx-auto w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="py-4 px-6">No</th>
              <th className="py-4 px-6">Username</th>
              <th className="py-4 px-6">Name</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6">Role</th>
              <th className="py-4 px-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr className="border-b" key={index}>
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{user.username}</td>
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">{user.role}</td>
                <td className="py-3 px-6">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Edit
                  </button>
                  <button className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Hapus
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
