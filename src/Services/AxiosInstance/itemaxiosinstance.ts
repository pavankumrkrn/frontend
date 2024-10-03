import axios from 'axios';
import Cookies from 'js-cookie';
import { RouteStrings } from '../../Utils/RouteStrings';
import { apiUrls } from '../../Config/apiurls';


const itemsAxiosInstance = axios.create({
    baseURL: 'http://localhost:4002/',
    withCredentials: true
    // headers: {
    //     'Content-Type': 'application/json',
    // }
});

itemsAxiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

itemsAxiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            console.error('Request data:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
        return Promise.reject(error);
    }
);

export default itemsAxiosInstance;





