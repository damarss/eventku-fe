import { FaMailBulk, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="mt-4 mb-8">
      <h1 className="text-4xl font-bold text-center">Contact</h1>
      <p className="bg-blue-50 p-2 md:p-7 mt-4 mx-2 md:mx-24 rounded-xl">
        Untuk informasi lebih lanjut terkait kerja sama ataupun hal lain,
        silahkan hubungi kami di: <br />
        <span className="font-semibold">
          <FaMailBulk className="inline text-blue-700 text-2xl" />
        </span>{" "}
        <Link to="#" className="text-blue-500">
          evenkucp@eventku.id
        </Link>
        <br />
        <span className="font-semibold">
          <FaPhone className="inline text-blue-700 text-2xl" />
        </span>{" "}
        081234567890
      </p>
    </div>
  );
};

export default Contact;
