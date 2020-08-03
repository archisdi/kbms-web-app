import * as axios from 'axios';
import { store } from '../redux/storeConfig/store'

axios.defaults.baseURL = 'http://localhost:3002';
axios.defaults.headers.common['Authorization'] = `Bearer ${store.getState().auth.token}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(request => {
    // console.log(request);
    // Edit request config
    return request;
}, error => {
    // console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(
    response => response, 
    error => {
    const status  = error.response.status;

    if (status === 401) {
        store.dispatch({ type: "LOGOUT" })
    }

    return Promise.reject(error);
});

export default axios;
