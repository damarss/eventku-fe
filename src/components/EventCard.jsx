import { useNavigate } from "react-router-dom";
import EVentDescription from "./EventDescription";
import Tanggal from "./Tanggal";

const EventCard = (props) => {
  const navigate = useNavigate();
  const redirectEvent = (id) => {
    navigate("/event", { state: { id: id } });
  };

  const { id, title, description, start, image } = props;
  const date = new Date(start);
  let newBulan = date.toLocaleString("default", { month: "short" }).toUpperCase();
  let newTanggal = date.getDate();

  return (
    <div
      className="rounded-3xl overflow-hidden w-80 cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
      onClick={() => redirectEvent(id)}
    >
      <div className="h-52 overflow-hidden">
        <img className="h-full w-full object-cover" src={image} alt={title} />
      </div>
      <div className="bg-white px-3 py-4 flex gap-4">
        <Tanggal bulan={newBulan} tanggal={newTanggal} />
        <EVentDescription title={title} description={description} />
      </div>
    </div>
  );
};

export default EventCard;
