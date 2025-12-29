import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axios;
