import axios from "./index.js";
const baseURL = "http://localhost:3003/api/schedules/";

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const deleteSchedule = async (id) => {
  const response = await axios.delete(`${baseURL}${id}`);
  return response.data;
};

const updateSchedule = async (id, newEndDate) => {
  const response = await axios.put(`${baseURL}${id}`, newEndDate);
  return response.data;
};

export default { getAll, deleteSchedule, updateSchedule };
