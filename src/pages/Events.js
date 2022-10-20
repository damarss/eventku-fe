import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosAuth } from "../api/axios";
import EventCard from "../components/EventCard";
import useAuthenticated from "../hooks/useAuthenticated";

const Events = () => {
  const [events, setEvents] = useState([]);
  const authenticated = useAuthenticated();

  const getEvents = async () => {
    const res = await axiosAuth.get("event");
    setEvents(res.data.events);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="min-h-screen mb-12">
      <h1 className="font-bold text-center text-4xl mt-4">Events</h1>
      <div className="flex my-7 px-7 gap-7 flex-wrap mx-auto justify-center">
        {authenticated ? (
          events.map((event, index) => (
            <>
              <EventCard
                key={index}
                id={event.id}
                title={event.title}
                description={`${event.description.slice(0, 70)}${
                  event.description.length > 70 ? "..." : ""
                }`}
                image={`http://localhost:8080/uploads/images/${event.image_url}`}
                start={event.start}
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
