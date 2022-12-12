import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import {
  FaArrowLeft,
  FaCalendarDay,
  FaClock,
  FaDollarSign,
  FaMapSigns,
  FaPeopleArrows,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { axiosAuth } from "../api/axios";

const EventDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [daysToGo, setDaysToGo] = useState(0);
  const [monthsToGo, setMonthsToGo] = useState(0);

  // formatter mata uang
  const formatter = new Intl.NumberFormat("id-ID", {
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  const start = new Date(event?.start);
  // tampilkan hari tanggal bulan
  const startDate = start.toLocaleDateString();

  const getEvent = async (id) => {
    const res = await axiosAuth.get(`event/${id}`);
    setEvent(res.data);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (location?.state?.id) {
      getEvent(location?.state?.id);
      const startDate = new Date(event?.start);
      const now = new Date();

      const diff = startDate.getTime() - now.getTime();
      const days = diff / (1000 * 3600 * 24);
      const month = days / 30;
      setDaysToGo(Math.floor(days));
      setMonthsToGo(Math.floor(month));
    } else {
      navigate("/events");
    }
  }, [event?.start, location?.state?.id, navigate]);
  return (
    <div className="min-h-screen mb-7">
      <h1 className="mt-4 text-4xl font-bold text-center">Event Information</h1>
      <Link
        className="mt-7 inline-block ml-4 md:ml-36 py-2 px-4 rounded-md bg-blue-300 hover:bg-blue-500"
        to="/events"
      >
        <FaArrowLeft className="inline" /> Back
      </Link>
      {event && (
        <div className="mt-4 grid grid-cols-9 gap-5 mx-4 md:mx-36 p-4 py-6">
          <div className="col-span-9 md:col-span-6">
            <img
              src={`http://eventku-id.my.id/uploads/images/${event?.image_url}`}
              alt="event?.title"
              className="w-full rounded-md"
            />
          </div>
          <div className="col-span-9 md:col-span-3 h-fit md:sticky md:top-16 bg-blue-900 text-white p-5 rounded-md">
            <h1 className="text-3xl font-bold">{event?.title}</h1>
            <p className="text-sm mt-2">{event?.description}</p>
            <hr className="opacity-50 mt-3" />
            <div className="mt-4">
              <div className="mt-2">
                <h2 className="font-bold text-3xl mb-3">
                  <FaCalendarDay />
                </h2>
                <p className="mb-2 font-semibold">
                  {monthsToGo
                    ? `${monthsToGo} Bulan lagi`
                    : `${daysToGo ? `${daysToGo} Hari lagi` : "Hari ini"}`}
                </p>
                <p className="mb-3 text-sm">{`${new Date(
                  event?.start
                ).toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })} sampai ${new Date(event?.end).toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}`}</p>
                <hr className="opacity-50 mt-3" />
                <h2 className="mt-3 font-bold text-xl">IDR</h2>
                <p className="font-semibold text-2xl">
                  {event?.price > 0 ? formatter.format(event?.price) : "Gratis"}
                </p>
                <hr className="opacity-50 mt-3 mb-3" />
                <h2 className="font-bold text-3xl mb-3">
                  <FaClock className="inline" />
                </h2>
                <p className="mb-2 font-semibold">
                  {new Date(event?.start).toLocaleTimeString("id-ID", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </p>
                <hr className="opacity-50 mt-3 mb-3" />
                <h2 className="text-3xl font-bold d-flex">
                  <FaPeopleArrows className="inline" />{" "}
                  <span className="text-sm">Organizer</span>
                </h2>
                <p className="font-semibold mt-3">{event?.organizer}</p>
                <hr className="opacity-50 mt-3 mb-3" />
                <h2 className="font-bold text-3xl mt-3 mb-3">
                  <FaMapSigns />
                </h2>
                <p className="font-semibold">{event?.venue}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetail;
