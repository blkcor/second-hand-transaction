import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:8888/api',
  withCredentials: true
});

export default request
