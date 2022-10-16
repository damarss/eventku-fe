import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosAuth } from "../api/axios";
import Navigation from "../components/Navigation";

const EventDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [idEvent, setIdEvent] = useState(null);
  const [event, setEvent] = useState(null);

  const getEvent = async () => {
    const res = await axiosAuth.get(`event/${idEvent}`);
    setEvent(res.data.event);
  };

  useEffect(() => {
    location?.state?.id ? setIdEvent(location.state.id) : navigate("/");
    console.log("berhasil");
    event && console.log(event);
  }, [location.state.id]);
  return <></>;
};

export default EventDetail;
