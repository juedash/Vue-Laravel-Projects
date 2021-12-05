import axios from "axios";
import router from '../router';
import store from '../store'
import routes from "../router/routes";

let instance = axios.create({
    withCredentials: true,
    baseURL: process.env.VUE_APP_BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

instance.interceptors.request.use(
    async request => {
        const token = localStorage.getItem('token');
        console.log(token)
        if (token) {
            request.headers['Authorization'] = `Bearer ${token}`;
        }
        return request;
    },
    (error) => {
        if (error.response.status === 401) {
            store.dispatch('logout').then(() => {
                router.push({name: routes.login}).catch(() => {
                });
            });
        }
        return Promise.reject(error.response.data);
    }
);

instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response.status === 401) {
            sessionStorage.removeItem('user');
            window.location.reload();
        }

        return Promise.reject(error);
    }
);


export default instance;
