import axios from "axios";
const baseURL = "http://localhost:3003/api/events/";

let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
};

const getAllEvents = async (start, end) => {
    const res = await axios.get(baseURL, {
        params: { start, end}
    });
    return res.data;
}

const postEvent = async (event) => {
/*    const config = {
        headers: { Authorization: token },
    };*/
    const response = await axios.post(baseURL, event);
    return response.data;
}

export default {getAllEvents, postEvent}