import { useState, useEffect } from "react";
import axios from "../api/axios";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";
const cookies = new Cookies();

const Register = () => {
  const [error, setError] = useState("");
  const [isValid, setisValid] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const registerAction = async (e) => {
    e.preventDefault();
    setUsername(e.target.username.value);
    setPassword(e.target.password.value);
    setName(e.target.name.value);
    setEmail(e.target.email.value);

    // validasi input
    const nameRegex = /^[a-z ,.'-]+$/i;
    const usernameRegex = /^[a-z0-9_-]{3,16}$/;

    if (
      nameRegex.test(name) &&
      usernameRegex.test(username) &&
      password.length >= 6
    ) {
      axios
        .post("/register", {
          username: username,
          password: password,
          name: name,
          email: email,
        })
        .then((response) => {
          console.log(response.data);
          setisValid(true);
        })
        .catch((error) => {
          setError(error.response.data.messages.error);
        });
    } else {
      setisValid(false);
      setError("Input Anda tidak valid");
    }
  };

  useEffect(() => {
    if (isValid) {
      setError("");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  }, [isValid, error, navigate]);

  return (
    <main className="w-full max-w-md mx-auto p-6">
      <div className="my-5 bg-white border border-gray-200 rounded-xl shadow-sm p-4 pb-7">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800">Sign up</h1>
            <p className="mt-2 text-sm text-gray-600">
              Sudah punya akun?{" "}
              <Link className="text-blue-500 font-semibold" to="/login">
                Login disini
              </Link>
            </p>
          </div>
        </div>

        <form onSubmit={registerAction}>
          <div className="mb-3">
            {error ? (
              <div className="w-full bg-red-100 text-red-700 text-center py-3 rounded-lg">
                {error}
              </div>
            ) : (
              <>
                {isValid && (
                  <div className="w-full bg-green-100 text-green-700 text-center py-3 rounded-lg">
                    Register berhasil!
                  </div>
                )}
              </>
            )}
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
              onChange={(e) => setName(e.target.value)}
              placeholder="Input name"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="username" className="block text-sm mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:outline-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Input username"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="block text-sm mb-2">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:outline-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              required
            />
          </div>
          <div className="mt-2">
            <label htmlFor="password" className="block text-sm mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:outline-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Input password"
              required
            />
          </div>
          <div className="mt-5 ">
            <button
              type="submit"
              className="text-center bg-blue-500 rounded-md text-white font-bold text-sm py-3 w-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;
