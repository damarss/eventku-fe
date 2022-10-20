import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosAuth } from "../api/axios";
import EventCard from "../components/EventCard";
import useAuthenticated from "../hooks/useAuthenticated";

const Events = () => {
  const [events, setEvents] = useState([]);
  const authenticated = useAuthenticated();
  const [sortBy, setSortBy] = useState("start");

  const getEvents = async (sortBy) => {
    const res = await axiosAuth.get("event");
    const events = res.data.events;
    if (sortBy === "title") {
      events.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "start") {
      events.sort((a, b) => new Date(a.start) - new Date(b.start));
    } else if (sortBy === "price") {
      events.sort((a, b) => a.price - b.price);
    }
    setEvents(events);
  };

  useEffect(() => {
    getEvents("title");
    // sort event by title
  }, [sortBy]);

  return (
    <div className="min-h-screen mb-12">
      <h1 className="font-bold text-center text-4xl mt-4 mb-16">Events</h1>
      <div className="md:w-11/12 md:mx-auto flex my-7 gap-6 flex-wrap justify-center relative">
        <div className="absolute -top-14 right-2 md:right-20">
          <select
            onChange={(e) => getEvents(e.target.value)}
            className="bg-blue-50 border-none cursor-pointer text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option selected value="start">
              Sort By Start Date
            </option>
            <option value="title">Sort By Title</option>
            <option value="price">Sort By Price</option>
          </select>
        </div>
        {authenticated ? (
          events.map((event, index) => (
            <>
              <EventCard
                key={index}
                id={event.id}
                title={event.title}
                description={`${event.description.slice(0, 160)}${
                  event.description.length > 160 ? "..." : ""
                }`}
                image={`http://localhost:8080/uploads/images/${event.image_url}`}
                start={event.start}
                price={event.price}
              />
            </>
          ))
        ) : (
          <div className="">
            Silakan{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>{" "}
            terlebih dahulu untuk melihat event!
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
