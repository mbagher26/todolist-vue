import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com', // آدرس API
    headers: {
      'Content-Type': 'application/json',
    },
  });

