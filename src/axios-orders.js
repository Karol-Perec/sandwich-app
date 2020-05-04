import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sandwich-app-37958.firebaseio.com/',
});

export default instance;
