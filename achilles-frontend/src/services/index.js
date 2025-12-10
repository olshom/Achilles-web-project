import axios from 'axios';

/*const api = axios.create({
    baseURL: 'http://localhost:3003/api'
});*/

axios.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    if (user&&user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})

export default axios;