import axios from "axios";
const baseURL = "http://localhost:3003/api/achievements/";

let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
};

const getAllAchievements = async () => {
    const res = await axios.get(baseURL);
    return res.data;
}

const getAchievementById = async (id) => {
    const res = await axios.get(baseURL + id);
    return res.data;
}

const deleteAchievement = async (id) => {
    const config = {
        headers: {Authorization: token},
    }
    const res = await axios.delete(baseURL + id, config);
    return res.data;
}

const addAchievement = async (newAchievement) => {
    const config = {
        headers: {Authorization: token},
    }
    const res = await axios.post(baseURL, newAchievement, config);
    return res.data;
}

const updateAchievement = async (id, updatedAchievement) => {
    const config = {
        headers: {Authorization: token},
    }
    const res = await axios.put(baseURL + id, updatedAchievement, config);
    return res.data;
}

export default {getAllAchievements, getAchievementById, addAchievement, updateAchievement, deleteAchievement};