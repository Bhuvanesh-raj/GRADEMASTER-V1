import axios from "axios";
const BASE_URL='http://localhost:3500';

export const axiosPrivate=axios.create({
    baseURL:BASE_URL,
    withCredentials:true,
    headers:{"Content-Type":'application/json'}
})

export default axios.create({
    baseURL:BASE_URL,
    withCredentials:true,
    headers:{"Access-Control-Allow-Credentials": true}
});
