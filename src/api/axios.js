import axios from 'axios';
import Cookies from 'universal-cookie';

const BASE_URL = 'http://localhost:8080';
const cookies = new Cookies();

export default axios.create({
    baseURL: `${BASE_URL}/auth/`,
})

export const axiosAuth = axios.create({
    baseURL: `${BASE_URL}/api/v1/`,
    headers: {
        "Authorization": `Bearer ${cookies.get('token')}`
    }
});