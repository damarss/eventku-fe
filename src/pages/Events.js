import { useEffect, useState } from "react";
import { axiosAuth } from "../api/axios";
import EventCard from "../components/EventCard";

const Events = () => {
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    const res = await axiosAuth.get("event");
    console.log(res.data);
    setEvents(res.data.events);
  };

  useEffect(() => {
    getEvents();
  }, []);
  //   id, title, description, tanggal, bulan, image
  return (
    <div>
      <h1 className="font-bold text-center text-4xl mt-4">Events</h1>
      <div className="flex my-7 px-7 gap-5 flex-wrap mx-auto justify-center">
        {events?.length > 0 ? (
          events.map((event) => (
            <>
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                description={event.description}
                image={`http://localhost:8080/uploads/images/${event.image_url}`}
                tanggal={"3"}
                bulan={"DEC"}
              />
            </>
          ))
        ) : (
          <div className="h-52">
            Silakan Login terlebih dahulu untuk melihat event!
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
