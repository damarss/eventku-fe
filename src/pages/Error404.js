import { FaLessThan } from "react-icons/fa";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="text-center h-96 mt-32">
      <h1 className="text-9xl font-bold">404</h1>
      <p className="text-gray-600">
        Oops, something went wrong. <br />
        Sorry, we couldn't find your page. <br />
        <Link className="text-blue-500 font-semibold inline-block mt-5" to="/">
            <FaLessThan className="inline"/>{" "}
            Back to home
        </Link>
      </p>
    </div>
  );
};

export default Error404;
