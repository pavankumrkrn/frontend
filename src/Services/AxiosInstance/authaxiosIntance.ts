import axios from 'axios';
import Cookies from 'js-cookie';
import { RouteStrings } from '../../Utils/RouteStrings';
import { apiUrls } from '../../Config/apiurls';


const authAxiosInstance = axios.create({
    baseURL: 'http://localhost:4000/',
    withCredentials: true,
    // headers: {
    //     'Content-Type': 'application/json',
    // }
});

authAxiosInstance.interceptors.request.use(
    (config) => {
        // Skip adding token for login and signup endpoints
        // if (!config.url?.includes(apiUrls.login) && !config.url?.includes(apiUrls.signup)) {
        //     const token = Cookies.get('token'); // Retrieve token from cookie
        //     if (token) {
        //         config.headers.Authorization = `Bearer ${token}`; // Attach token to request headers
        //     }
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

authAxiosInstance.interceptors.response.use(
    (response) => {
        // Handle successful response
        return response;
    },
    (error) => {
        // Handle response error
        if (error.response) {
            // Request made and server responded
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Request data:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
        }
        return Promise.reject(error);
    }
);

export default authAxiosInstance;





