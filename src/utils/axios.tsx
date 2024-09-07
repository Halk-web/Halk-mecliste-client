import axios from 'axios';

export const BASE_URL='https://halk-mecliste-server.onrender.com';

const axiosServices = axios.create({ baseURL: 'https://halk-mecliste-server.onrender.com' });

export default axiosServices;