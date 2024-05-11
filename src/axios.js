import axios from "axios";
import store from "./store";

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
    withXSRFToken: true    
});

axiosClient.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${store.state.user.token}`;
    // config.headers['X-XSRF-TOKEN'] = decodeURIComponent(store.state.user.token);
    return config;
});


export default axiosClient;