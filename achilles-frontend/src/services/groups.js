import axios from "./index.js";
const baseURL = "/api/groups/";

const getAllGroups = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const addGroup = async (group) => {
  const response = await axios.post(baseURL, group);
  return response.data;
};

const deleteGroup = async (id) => {
  const response = await axios.delete(baseURL + id);
  return response.data;
};

const updateGroup = async (id, group) => {
  const response = await axios.put(baseURL + id, group);
  return response.data;
};

export default { getAllGroups, addGroup, deleteGroup, updateGroup };
