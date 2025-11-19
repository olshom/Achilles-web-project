import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users/'

let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
};

const getAllUsers = async () => {
    const response = await axios.get(baseUrl)
//    console.log("users", response.data)
    return response.data
}

const getUserById = async (id) => {
    const response = await axios.get(baseUrl + id)
    console.log('I am here' ,response.data)
    return response.data
}

const deleteUser = async (id) => {
    const config = {
        headers: {Authorization: token},
    }
    const response = await axios.delete(baseUrl + id)
    return response.data
}

const updateUser = async (id, newUser) => {
    const config = {
        headers: {Authorization: token}
    }
    const res = await axios.put(baseUrl + id, newUser, config);
    return res.data;
}

export default {getAllUsers, getUserById, deleteUser, updateUser}