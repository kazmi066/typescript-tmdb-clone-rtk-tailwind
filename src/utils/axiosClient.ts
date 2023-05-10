import axios from 'axios';
import { API_BASE_URL } from '../data/endpoints';

const axiosClient = axios.create({
	baseURL: API_BASE_URL
});

export default axiosClient;