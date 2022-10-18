import { useState, useEffect } from "react";
import axios from "../api/axios";
import Cookies from "universal-cookie";
import { Link, useLocation } from "react-router-dom";
const cookies = new Cookies();

const Login = () => {
  const [error, setError] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const from = location?.state?.from || "/";

  const loginAction = async (e) => {
    e.preventDefault();
    setUsername(e.target.username.value);
    setPassword(e.target.password.value);

    axios
      .post("/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        const { name, token, role, uid } = response.data;
        const userGet = { name: name, role: role, uid: uid };
        setAuthenticated(true);
        cookies.set("token", token, {
          sameSite: "strict",
          path: "/",
          expires: new Date(Date.now() + 3600 * 24 * 1000),
        });
        cookies.set("user", userGet, {
          sameSite: "strict",
          path: "/",
          expires: new Date(Date.now() + 3600 * 24 * 1000),
        });
        setError("");
      })
      .catch((error) => {
        setError(
          error.response?.data?.messages?.error
            ? error.response.data.messages.error
            : "Server error"
        );
      });
  };

  useEffect(() => {
    if (cookies.get("token")) {
      setAuthenticated(true);
      setError("");
      setTimeout(() => {
        window.location.href = from || "/";
        // navigate(from || "/", { replace: true });
      }, 1000);
    } else {
      setAuthenticated(false);
      setError(location?.state?.error);
    }
  }, [authenticated, from, location?.state?.error]);

  return (
    <main className="w-full max-w-md mx-auto p-6">
      <div className="my-5 bg-white border border-gray-200 rounded-xl shadow-sm p-4 pb-7">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800">Sign in</h1>
            <p className="mt-2 text-sm text-gray-600">
              Tidak punya akun?{" "}
              <Link className="text-blue-500 font-semibold" to="/register">
                Daftar disini
              </Link>
            </p>
          </div>
        </div>

        <form onSubmit={loginAction}>
          <div className="mb-3">
            {error ? (
              <div className="w-full bg-red-100 text-red-700 text-center py-3 rounded-lg">
                {error}
              </div>
            ) : (
              <>
                {authenticated && (
                  <div className="w-full bg-green-100 text-green-700 text-center py-3 rounded-lg">
                    Login berhasil!
                  </div>
                )}
              </>
            )}
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
              Sign in
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
