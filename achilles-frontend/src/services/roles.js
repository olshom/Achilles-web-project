import axios from "./index.js";
const baseURL = "/api/roles/";

const getAllRoles = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const deleteRole = async (id) => {
  const response = await axios.delete(`${baseURL}/${id}`);
  return response.data;
};

const addRole = async (role) => {
  const response = await axios.post(baseURL, role);
  return response.data;
};

const updateRole = async (id, role) => {
  const response = await axios.put(`${baseURL}/${id}`, role);
  return response.data;
};

export default { getAllRoles, addRole, deleteRole, updateRole };
