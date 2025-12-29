import axios from "./index.js";
const baseURL = "http://localhost:3003/api/events/";
const baseURL2 = "http://localhost:3003/api/schedules/";

const getAllEvents = async (start, end) => {
  const res = await axios.get(baseURL, {
    params: { start, end },
  });
  return res.data;
};

const postEvent = async (event) => {
  if (event.recurringDays) {
    console.log("But I am here");
    const response = await axios.post(baseURL2, event);
    return response.data;
  } else {
    console.log("Ineed to post single event");
    const response = await axios.post(baseURL, event);

    return response.data;
  }
};

const updateEvent = async (id, event) => {
  const response = await axios.put(`${baseURL}${id}`, event);
  return response.data;
};

const deleteEvent = async (id) => {
  const response = await axios.delete(`${baseURL}${id}`);
  return response.data;
};

export default { getAllEvents, postEvent, deleteEvent, updateEvent };
