import axios from "./index.js";
const baseURL = "http://localhost:3003/api/eventEntries/";

const getAllEvents = async (start, end) => {
    const res = await axios.get(baseURL, {
        params: { start, end}
    });
    return res.data;
}

const postEvent = async (event) => {
    const response = await axios.post(baseURL, event);
    return response.data;
}

const deleteEvent = async (id) => {
    const response = await axios.delete(`${baseURL}${id}`);
    return response.data;
}

export default {getAllEvents, postEvent, deleteEvent}