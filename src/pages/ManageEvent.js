import { useEffect, useRef, useState } from "react";
import { CgCloseO } from "react-icons/cg";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { axiosAuth } from "../api/axios";
import AddButton from "../components/AddButton";
import EventForm from "../components/EventForm";
import useAuthenticated from "../hooks/useAuthenticated";

const cookies = new Cookies();

const ManageEvent = () => {
  const authenticated = useAuthenticated();
  const [events, setEvents] = useState([]);
  const modalRef = useRef(null);
  const [isAddForm, setIsAddForm] = useState(false);
  const [isEditForm, setIsEditForm] = useState(false);
  const [eventSelected, setEventSelected] = useState({});
  const Swal = require("sweetalert2");
  const navigate = useNavigate();

  const getEvents = async () => {
    const res = await axiosAuth.get("/event");
    setEvents(res.data.events);
  };

  const showHideModal = () => {
    const modal = modalRef.current;
    if (modal.classList.contains("hidden")) {
      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    } else {
      modal.classList.add("hidden");
      document.body.style.overflow = "auto";
      setIsAddForm(false);
      setIsEditForm(false);
    }
  };

  const deleteEvent = async (id) => {
    const confirmation = await Swal.fire({
      title: "Delete Confirmation!",
      text: "Do you want to delete event?",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
    });

    if (confirmation.isConfirmed) {
      const res = await axiosAuth.delete(`/event/${id}`);
      await Swal.fire({
        title: "Success!",
        text: res.data.message,
        icon: "success",
      });
      getEvents();
    }
  };

  useEffect(() => {
    const isAdmin = cookies.get("user")?.role === "admin";
    if (isAdmin) {
      getEvents();
    } else {
      navigate("/", { replace: true });
    }
    getEvents();

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        showHideModal();
      }
    });

    if (isEditForm || isAddForm) {
      // update data
    }
  }, [isAddForm, isEditForm, navigate]);

  return (
    <div className="min-h-screen mx-auto my-5 px-4">
      <h1 className="text-center font-bold text-4xl mt-4">Manage Event</h1>
      <div
        ref={modalRef}
        className="w-full h-full bg-gray-500 bg-opacity-50 fixed top-0 left-0 z-20 hidden overflow-auto"
      >
        <div id="modal" className="w-11/12 md:w-1/2 mx-auto relative">
          <button
            onClick={showHideModal}
            className="text-blue-500 absolute right-0 p-3 bg-blue-100 rounded-tr-md rounded-bl-md"
          >
            <CgCloseO className="text-3xl" />
          </button>
          {isAddForm && <EventForm title="Add" showHideModal={showHideModal} />}
          {isEditForm && (
            <EventForm
              event={eventSelected}
              showHideModal={showHideModal}
              title="Edit"
            />
          )}
        </div>
      </div>
      <AddButton
        styling="mt-4 ml-auto"
        text="Add Event"
        action={() => {
          setIsAddForm(true);
          showHideModal();
        }}
      />
      <div className="overflow-x-auto ">
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
                      src={`http://eventku-id.my.id/uploads/images/${event.image_url}`}
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
                    <button
                      onClick={() => {
                        setIsEditForm(true);
                        setEventSelected(event);
                        showHideModal();
                      }}
                      className="mx-2 my-1 ml-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="my-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
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
