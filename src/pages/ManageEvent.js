import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { axiosAuth } from "../api/axios";
import useAuthenticated from "../hooks/useAuthenticated";

const ManageEvent = () => {
  const authenticated = useAuthenticated();
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    const res = await axiosAuth.get("/event");
    console.log(res.data);
    setEvents(res.data.events);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="min-h-screen mx-auto my-5 px-4">
      <h1 className="text-center font-bold text-4xl mt-4">Manage Event</h1>
      <div className="overflow-x-auto relative mt-4">
        <table className="table-auto mx-auto w-full text-sm text-left mt-4">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="py-4 px-6">No</th>
              <th className="py-4 px-6">Image</th>
              <th className="py-4 px-6">Title</th>
              <th className="py-4 px-6">Description</th>
              <th className="py-4 px-6">Start</th>
              <th className="py-4 px-6">End</th>
              <th className="py-4 px-6">Venue</th>
              <th className="py-4 px-6">Price</th>
              <th className="py-4 px-6">Organizer</th>
              <th className="py-4 px-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {authenticated &&
              events.map((event, index) => (
                <tr className="border-b" key={index}>
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">
                    <img
                      src={`http://localhost:8080/uploads/images/${event.image_url}`}
                      alt={event.title}
                    />
                  </td>
                  <td className="py-3 px-6">{event.title}</td>
                  <td className="py-3 px-6">{event.description}</td>
                  <td className="py-3 px-6">{event.start}</td>
                  <td className="py-3 px-6">{event.end}</td>
                  <td className="py-3 px-6">{event.venue}</td>
                  <td className="py-3 px-6">{event.price}</td>
                  <td className="py-3 px-6">{event.organizer}</td>
                  <td className="py-3 px-6">
                    <button className="mx-2 my-1 ml-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      <FaEdit />
                    </button>
                    <button className="my-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageEvent;
