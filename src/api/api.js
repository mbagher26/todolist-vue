import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com', // آدرس API
    headers: {
      'Content-Type': 'application/json',
    },
  });

  export default {
    getItems(){
        return apiClient.get('/posts')
    },

    getItem(id){
      return apiClient.get(`/posts/${id}`)
    },

    deleteItem(id){
      return apiClient.delete(`/posts/${id}`)
    },

    updateItem(id){
      return apiClient.put(`/posts/${id}`)
    }
  }