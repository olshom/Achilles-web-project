import axios from "./index.js";
const baseUrl = 'http://localhost:3003/api/users/'

const getAllUsers = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getUserById = async (id) => {
    const response = await axios.get(baseUrl + id)
    console.log('I am here' ,response.data)
    return response.data
}

const deleteUser = async (id) => {
    const response = await axios.delete(baseUrl + id)
    return response.data
}

const updateUser = async (id, newUser) => {
    const res = await axios.put(baseUrl + id, newUser);
    return res.data;
}

export default {getAllUsers, getUserById, deleteUser, updateUser}