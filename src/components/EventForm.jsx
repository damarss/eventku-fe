import { Link } from "react-router-dom";

const EventForm = () => {
  return (
    <div>
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

        <form onSubmit={() => {}}>
          <div className="mb-2">
            <label htmlFor="username" className="block text-sm mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:outline-blue-500"
              value={""}
              onChange={(e) => {}}
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
              value={""}
              onChange={(e) => {}}
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
    </div>
  );
};

export default EventForm;
