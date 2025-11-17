import axios from "axios";
const baseURL = "http://localhost:3003/api/roles/";

const getAllRoles = async () => {
    return await axios.get(baseURL);
}

const deleteRole = async (id) => {
    return await axios.delete(`${baseURL}/${id}`);
}

const addRole = async (role) => {
    return await axios.post(baseURL, role);
}

const updateRole = async (id, role) => {
    return await axios.put(`${baseURL}/${id}`, role);
}

export default {getAllRoles, addRole, deleteRole, updateRole};