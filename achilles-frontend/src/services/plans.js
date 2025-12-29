import axios from "./index.js";
const baseURL = "http://localhost:3003/api/plans/";

const getAllPlans = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const addPlan = async (plan) => {
  const response = await axios.post(baseURL, plan);
  return response.data;
};

const deletePlan = async (id) => {
  const response = await axios.delete(baseURL + id);
  return response.data;
};

const updatePlan = async (id, plan) => {
  const response = await axios.put(baseURL + id, plan);
  return response.data;
};

export default { getAllPlans, addPlan, deletePlan, updatePlan };
