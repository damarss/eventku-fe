import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosAuth } from "../api/axios";

const EventDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  const getEvent = async (id) => {
    const res = await axiosAuth.get(`event/${id}`);
    setEvent(res.data);
  };

  useEffect(() => {
    if (location?.state?.id) {
      getEvent(location?.state?.id);
    } else {
      navigate("/events");
    }
  }, [location?.state?.id, navigate]);
  return <>{event && event.title}</>;
};

export default EventDetail;
