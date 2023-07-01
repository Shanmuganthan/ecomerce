import  axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';

const API_URL = process.env.REACT_APP_API_URL;
console.log(API_URL)
const Service = axios.create({
    baseURL: API_URL,
    headers: {
        Accept: 'application/json',
    },
});

Service.interceptors.request.use((data) => {
        const config = data;
        const accessToken = localStorage.getItem('current_user_token');
        if (accessToken) {
            config.headers.common = { Authorization: `Bearer ${accessToken}` };
        }
        return config;
    },
    error => {
        Promise.reject(error.response || error.message);
    }
);


Service.interceptors.response.use((res) => {
    return Promise.resolve(res);
}, (error) => {
       if (!window.location.pathname.includes("user/login") && error!== null && error.status === 401) {
        localStorage.setItem("current_user_token","")
       
        } else if(!error.status){
            NotificationManager.error(error.message , "Error" ,  3000)
    }
    return Promise.reject(error);
})

export default Service;