import axios from 'axios';


const mockAPI = axios.create({
  baseURL: `https://jsonplaceholder.typicode.com`
});


export default {
  mockAPI
};