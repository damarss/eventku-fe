import { useState, useEffect } from "react";
import axios from "../api/axios";
import Cookies from "universal-cookie";
import { useLocation, useNavigate } from "react-router-dom";
const cookies = new Cookies();

const Login = () => {
  const [error, setError] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
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
        setError(error.response.data.messages.error);
      });
  };

  useEffect(() => {
    if (cookies.get("token")) {
      setAuthenticated(true);
      setError("");
      setTimeout(() => {
        navigate(from || "/");
      }, 1000);
    } else {
      setAuthenticated(false);
      setError(location?.state?.error);
    }
  }, [authenticated, from, location?.state?.error, navigate]);

  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-lg-8"></div>
          <div className="col-lg-4">
            <form onSubmit={loginAction}>
              <div className="form-floating mb-3 border-0">
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  required
                />
                <label className="form-label" htmlFor="username">
                  Username
                </label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
                <button
                  id="show-password"
                  type="button"
                  className="d-none"
                  aria-label="Show password"
                ></button>
                <label className="form-label" htmlFor="password">
                  Password
                </label>
              </div>
              <div className="pt-1 mb-4">
                {authenticated ? (
                  <>Logged in</>
                ) : (
                  <button
                    className="btn btn-primary btn-lg btn-block"
                    type="submit"
                  >
                    Login
                  </button>
                )}
              </div>
            </form>
            {error ? (
              <>
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              </>
            ) : (
              <>
                {authenticated ? (
                  <>
                    <div className="alert alert-success" role="alert">
                      Login Berhasil
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
