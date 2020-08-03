import * as axios from 'axios';
import { store } from '../redux/storeConfig/store';

axios.defaults.baseURL = 'http://localhost:3002';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(config => {
    const JWT_TOKEN = store.getState().auth.token;

    if (JWT_TOKEN)
        config.headers.Authorization = `Bearer ${JWT_TOKEN}`;

    return config;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(
    response => {
        return response;
    }, 
    error => {
    const status  = error.response.status;

    if (status === 401) {
        store.dispatch({ type: "LOGOUT" })
    }

    return Promise.reject(error);
});

export default axios;
