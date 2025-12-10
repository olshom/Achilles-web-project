import axios from "./index.js";
const baseURL = "http://localhost:3003/api/events/";

const deleteEvent = async (id) => {
    const response = await axios.delete(`${baseURL}${id}`);
    return response.data;
}

export default {deleteEvent};