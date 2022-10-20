import { useState, useEffect } from "react";
import useAuthenticated from "../hooks/useAuthenticated";
import { axiosAuth } from "../api/axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Profile = () => {
  const authorized = useAuthenticated();
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const Swal = require("sweetalert2");

  const getUser = async () => {
    const id = cookies.get("user")?.uid;
    const res = await axiosAuth.get(`user/${id}`);
    setUser(res.data);
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    const confirmation = await Swal.fire({
      title: "Edit Confirmation!",
      text: "Do you want to edit profile?",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
    });

    if (confirmation.isConfirmed) {
      const data = JSON.stringify({
        username: username,
        password: password,
        email: email,
        name: name,
      });
      const id = cookies.get("user")?.uid;
      const res = await axiosAuth.put(`user/${id}`, data, {
        headers: { "Content-type": "application/json" },
      });
      console.log(res.data);
      Swal.fire({
        title: "Success!",
        text: "Profile has been updated!",
        icon: "success",
      });
      getUser();
    }
  };

  useEffect(() => {
    getUser();
    setUsername(user.username);
    setEmail(user.email);
    setName(user.name);
    setPassword("");
  }, [user.email, user.name, user.username]);

  return (
    <div className="min-h-screen mt-4">
      <h1 className="text-4xl font-bold text-center">Edit Profile</h1>
      {authorized && (
        <div className="w-full my-4 flex justify-center">
          <form
            onSubmit={updateProfile}
            className="bg-blue-50 w-11/12 md:w-6/12 rounded-lg py-10 px-12"
          >
            <div className="mb-2">
              <label
                htmlFor="username"
                className="block text-sm mb-2 font-semibold"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="py-3 px-4 block w-full outline-2 outline-blue-200 rounded-md text-sm focus:outline-indigo-700 cursor-not-allowed"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Input username"
                disabled
                required
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm mb-2 font-semibold"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="py-3 px-4 block w-full outline-2 outline-blue-200 rounded-md text-sm focus:outline-indigo-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={user.role === "admin" ? true : false}
                placeholder="email@example.com"
                required
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="name"
                className="block text-sm mb-2 font-semibold"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="py-3 px-4 block w-full outline-2 outline-blue-200 rounded-md text-sm focus:outline-indigo-700"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={user.role === "admin" ? true : false}
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm mb-2 font-semibold"
              >
                New password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="py-3 px-4 block w-full outline-2 outline-blue-200 rounded-md text-sm focus:outline-indigo-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Input your new password (optional)"
              />
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
      )}
    </div>
  );
};

export default Profile;
