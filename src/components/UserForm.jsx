import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { axiosAuth } from "../api/axios";

const UserForm = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const editUserAction = async (e) => {
    e.preventDefault();

    const confirmation = await Swal.fire({
      title: "Edit Confirmation!",
      text: "Do you want to edit user?",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
    });

    if (confirmation.isConfirmed) {
      const data = {
        username: username,
        email: email,
        name: name,
        role: role,
      };
      if (password) {
        data.password = password;
      }
      axiosAuth
        .put(`/user/${id}`, JSON.stringify(data), {
          headers: { "Content-type": "application/json" },
        })
        .then((res) => {
          Swal.fire({
            title: "Success!",
            text: "User has been updated!",
            icon: "success",
          });
          props.showHideModal();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    setUsername(props.user.username);
    setEmail(props.user.email);
    setName(props.user.name);
    setRole(props.user.role);
    setPassword("");
    setId(props.user.id);
  }, [props.user]);

  return (
    <div>
      <div className="my-5 bg-white border border-gray-200 rounded-xl shadow-sm p-4 pb-7">
        <div className="px-7 pt-3">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800">
              Edit User
            </h1>
          </div>
        </div>

        <form onSubmit={editUserAction}>
          <div className="mb-2">
            <label htmlFor="username" className="block text-sm mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:outline-blue-500 cursor-not-allowed"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Input username"
              disabled
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block text-sm mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:outline-blue-500"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Input new password (optional)"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="name" className="block text-sm mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:outline-blue-500"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Input name"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="block text-sm mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:outline-blue-500"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="email@example.com"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="role" className="block text-sm mb-2">
              Role
            </label>
            <select
              value={role}
              className="border text-sm py-1 px-3 rounded-md focus:bg-indigo-500 focus:text-white"
              id="role"
              onChange={(e) => {
                setRole(e.target.value);
              }}
            >
              <option value="-1" className="bg-white text-gray-300" disabled>
                Select Role
              </option>
              <option value="admin" className="bg-white text-gray-800">
                Admin
              </option>
              <option value="user" className="bg-white text-gray-800">
                User
              </option>
            </select>
          </div>
          <div className="mt-5 ">
            <button
              type="submit"
              className="text-center bg-blue-500 rounded-md text-white font-bold text-sm py-3 w-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
