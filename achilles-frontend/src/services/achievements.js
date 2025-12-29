import axios from "./index.js";
const baseURL = `/api/achievements/`;

const getAllAchievements = async () => {
  const res = await axios.get(baseURL);
  return res.data;
};

const getAchievementById = async (id) => {
  const res = await axios.get(baseURL + id);
  return res.data;
};

const deleteAchievement = async (id) => {
  const res = await axios.delete(baseURL + id);
  return res.data;
};

const addAchievement = async (newAchievement) => {
  const res = await axios.post(baseURL, newAchievement);
  return res.data;
};

const updateAchievement = async (id, updatedAchievement) => {
  const res = await axios.put(baseURL + id, updatedAchievement);
  return res.data;
};

export default {
  getAllAchievements,
  getAchievementById,
  addAchievement,
  updateAchievement,
  deleteAchievement,
};
