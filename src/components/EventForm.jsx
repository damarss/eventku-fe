import { useEffect, useState } from "react";
import { axiosAuth } from "../api/axios";

const EventForm = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [venue, setVenue] = useState("");
  const [price, setPrice] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [image, setImage] = useState(null);
  const Swal = require("sweetalert2");

  const emptyForm = () => {
    setTitle("");
    setDescription("");
    setStart("");
    setEnd("");
    setVenue("");
    setPrice("");
    setOrganizer("");
    setImage(null);
  };

  const addAction = async (e) => {
    e.preventDefault();

    const confirmation = await Swal.fire({
      title: "Add Confirmation!",
      text: "Do you want to add event?",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
    });

    if (confirmation.isConfirmed) {
      let data = new FormData();
      data.append("title", title);
      data.append("description", description);
      data.append("start", start);
      data.append("end", end);
      data.append("venue", venue);
      data.append("price", price);
      data.append("organizer", organizer);
      data.append("image", image);

      const res = await axiosAuth.post("/event", data, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        },
      });
      await Swal.fire({
        title: "Success!",
        text: "Event has been added!",
        icon: "success",
      });
      emptyForm();
      props.showHideModal();
    }
  };

  const editAction = async (e) => {
    e.preventDefault();
    const confirmation = await Swal.fire({
      title: "Edit Confirmation!",
      text: "Do you want to edit event?",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
    });

    if (confirmation.isConfirmed) {
      let data = new FormData();
      data.append("title", title);
      data.append("description", description);
      data.append("start", start);
      data.append("end", end);
      data.append("venue", venue);
      data.append("price", price);
      data.append("organizer", organizer);
      data.append("image", image);

      const res = await axiosAuth.post(`/event/${props.event.id}`, data, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        },
      });
      await Swal.fire({
        title: "Success!",
        text: "Event has been updated!",
        icon: "success",
      });
      emptyForm();
      props.showHideModal();
    }
  };

  useEffect(() => {
    emptyForm();
    if (props.title === "Edit") {
      setTitle(props.event.title);
      setDescription(props.event.description);
      setStart(props.event.start);
      setEnd(props.event.end);
      setVenue(props.event.venue);
      setPrice(props.event.price);
      setOrganizer(props.event.organizer);
    }
  }, [props]);

  return (
    <div>
      <div className="my-5 bg-white border border-gray-200 rounded-xl shadow-sm p-4 pb-7">
        <div className="px-7 pt-3">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800">
              {props.title} Event
            </h1>
          </div>
        </div>

        <form
          onSubmit={props.title !== "Edit" ? addAction : editAction}
          encType="multipart/form-data"
        >
          <div className="mb-2">
            <label htmlFor="title" className="block text-sm mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:outline-blue-500"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Input title event"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="image" className="block text-sm mb-2">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              id="image"
              name="image"
              className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:outline-blue-500"
              onChange={(e) => setImage(e.target.files[0])}
              placeholder="Input title event"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="description" className="block text-sm mb-2">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:outline-blue-500"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Input description"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="start" className="block text-sm mb-2">
              Start
            </label>
            <input
              type="datetime-local"
              id="start"
              name="start"
              className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:outline-blue-500"
              value={start}
              onChange={(e) => {
                setStart(e.target.value);
              }}
              placeholder="Input start date"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="end" className="block text-sm mb-2">
              End
            </label>
            <input
              type="datetime-local"
              id="end"
              name="end"
              className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:outline-blue-500"
              value={end}
              onChange={(e) => {
                setEnd(e.target.value);
              }}
              placeholder="Input end date"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="venue" className="block text-sm mb-2">
              Venue
            </label>
            <input
              type="text"
              id="venue"
              name="venue"
              className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:outline-blue-500"
              value={venue}
              onChange={(e) => {
                setVenue(e.target.value);
              }}
              placeholder="Input venue"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="price" className="block text-sm mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:outline-blue-500"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              placeholder="Input price"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="organizer" className="block text-sm mb-2">
              Organizer
            </label>
            <input
              type="text"
              id="organizer"
              name="organizer"
              className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:outline-blue-500"
              value={organizer}
              onChange={(e) => {
                setOrganizer(e.target.value);
              }}
              placeholder="Input organizer"
              required
            />
          </div>
          <div className="mt-5 ">
            <button
              type="submit"
              className="text-center bg-blue-500 rounded-md text-white font-bold text-sm py-3 w-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
            >
              {props.title}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
