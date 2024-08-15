import axios from 'axios';
import { API_URL } from '../config/init-env';

const INSTANCE_TIMEOUT = 10_000;
const INSTANCE_HEADER = {
    'Content-Type': 'application/json',
};

export const apiInstance = axios.create({
    baseURL: API_URL,
    headers: INSTANCE_HEADER,
    timeout: INSTANCE_TIMEOUT,
});

apiInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('jwtToken');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

apiInstance.interceptors.response.use(
    response => response,
    error => {
        if (
            error.response &&
            error.response.status === 401 &&
            error.config &&
            error.config.url !== '/user/login'
        ) {
            localStorage.removeItem('jwtToken');
            window.location.href = '/user/login';
        }
        return Promise.reject(error);
    },
);
