import { useState, useEffect, useRef } from "react";
import useAuthenticated from "../hooks/useAuthenticated";
import { axiosAuth } from "../api/axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { CgCloseO } from "react-icons/cg";
import UserForm from "../components/UserForm";

const cookies = new Cookies();

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const authorized = useAuthenticated();
  const navigate = useNavigate();
  const [userSelected, setUserSelected] = useState({});
  const modalRef = useRef(null);
  const Swal = require("sweetalert2");

  const getUsers = async () => {
    const res = await axiosAuth.get("user");
    setUsers(res.data.users);
  };

  const selectUser = (user) => {
    setUserSelected(user);
  };

  const deleteUser = async (id) => {
    const confirmation = await Swal.fire({
      title: "Delete Confirmation!",
      text: "Do you want to delete user?",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
    });
    if (confirmation.isConfirmed) {
      await axiosAuth.delete(`user/${id}`);
      getUsers();
    }
  };

  const showHideModal = () => {
    const modal = modalRef.current;

    if (modal.classList.contains("hidden")) {
      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    } else {
      modal.classList.add("hidden");
      document.body.style.overflow = "auto";
    }
  };

  useEffect(() => {
    const isAdmin = cookies.get("user")?.role === "admin";
    if (isAdmin) {
      getUsers();
    } else {
      navigate("/", { replace: true });
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        showHideModal();
      }
    });
  }, [navigate, showHideModal]);

  return (
    <div className="min-h-screen mx-auto my-5 px-4">
      <h1 className="font-bold text-4xl text-center">Manage User</h1>
      {userSelected && (
        <div
          ref={modalRef}
          className="w-full h-full bg-gray-500 bg-opacity-50 fixed top-0 left-0 z-20 flex items-center hidden"
        >
          <div id="modal" className="w-11/12 md:w-1/2 mx-auto relative">
            <button
              onClick={showHideModal}
              className="text-blue-500 absolute top-5 right-0 p-3 bg-blue-100 rounded-tr-md rounded-bl-md"
            >
              <CgCloseO className="text-3xl" />
            </button>
            <UserForm showHideModal={showHideModal} user={userSelected} />
          </div>
        </div>
      )}
      <div className="overflow-x-auto mt-4">
        <table className="table-auto mx-auto w-full text-sm text-left mt-4">
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
            {authorized &&
              users.map((user, index) => (
                <tr className="border-b" key={index}>
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">{user.username}</td>
                  <td className="py-3 px-6">{user.name}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6">{user.role}</td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => {
                        selectUser(user);
                        showHideModal();
                      }}
                      className="mx-2 my-1 ml-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => {
                        deleteUser(user.id);
                      }}
                      className="my-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      <FaTrash />
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
