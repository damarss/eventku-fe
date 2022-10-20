import { FaFacebookF, FaHeart, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <footer className="bg-[#0A075F] text-white px-3 md:px-12 pt-14 pb-6">
      <div className="grid  md:grid-cols-12 sm:grid-cols-4 gap-4">
        <div className="col-span-4">
          <div className="-mt-2">
            <img
              className="inline h-20 p-0 filter brightness-0 invert"
              src="eventku.svg"
              alt="Eventku logo"
            />
            <p className="text-sm mt-1">
              Eventku merupakan sebuah website untuk memberikan informasi
              mengenai berbagai event yang ada di Indonesia sehingga masyarakat
              lebih mudah dalam mencari event yang tersedia.
            </p>
            <div className="btn-group text-2xl mt-4">
              <button className="bg-[#3B5998] p-2 rounded-full transition duration-300 transform hover:-scale-x-100">
                <FaFacebookF />
              </button>
              <button className="bg-[#55ACEE] p-2 rounded-full transition duration-300 transform hover:-scale-x-100 ml-3">
                <FaTwitter />
              </button>
              <button className="bg-[#007AB9] p-2 rounded-full transition duration-300 transform hover:-scale-x-100 ml-3">
                <FaLinkedinIn />
              </button>
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <div className="">
            <h3 className="text-xl font-bold">Events</h3>
            <ul className="mt-4">
              <li className="mb-2">
                <Link className="hover:text-cyan-500 duration-500" to="#">
                  Ajukan Event
                </Link>
              </li>
              <li className="mb-2">
                <Link className="hover:text-cyan-500 duration-500" to="#">
                  Event Offline
                </Link>
              </li>
              <li className="mb-2">
                <Link className="hover:text-cyan-500 duration-500" to="#">
                  Event Online
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-span-2">
          <div className="">
            <h3 className="text-xl font-bold">Company</h3>
            <ul className="mt-4">
              <li className="mb-2">
                <Link
                  onClick={scrollToTop}
                  className="hover:text-cyan-500 duration-500"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  onClick={scrollToTop}
                  className="hover:text-cyan-500 duration-500"
                  to="/events"
                >
                  Events
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  onClick={scrollToTop}
                  className="hover:text-cyan-500 duration-500"
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  onClick={scrollToTop}
                  className="hover:text-cyan-500 duration-500"
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-span-4">
          <div className="">
            <h3 className="text-xl font-bold">Stay Updated</h3>
            <p className="text-sm mt-1">
              Subscribe ke email kami untuk mendapatkan informasi terbaru
              mengenai event-event yang ada di Indonesia.
            </p>
            <div className="mt-6 relative">
              <input
                type="text"
                className="border-none py-5 px-5 w-full rounded-full text-black"
                placeholder="email@example.com"
              />
              <button className="bg-[#F5167E] hover:bg-[#c63176] transition ease-in-out duration-300 text-white py-3 px-6 rounded-full absolute right-2.5 top-2">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid-cols-4 mt-12">
        <hr className="" />
        <div className="text-center mt-4">
          <p className="text-sm mt-3">
            Created with{" "}
            <span className="text-red-500">
              <FaHeart className="inline" />
            </span>{" "}
            by{" "}
            <a
              className="text-cyan-300 hover:text-cyan-500"
              href="https://github.com/damarss"
              target="_blank"
              rel="noreferrer"
            >
              Damar Septia Nugraha
            </a>
            {" | "}
            Design inspired by{" "}
            <a
              href="https://www.figma.com/community/file/1090519574420411612"
              className="text-cyan-300 hover:text-cyan-500"
              target="_blank"
              rel="noreferrer"
            >
              Avi Yansah
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
