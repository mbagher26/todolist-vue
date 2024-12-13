import { createStore } from 'vuex';
import api from '../api/api';

// Create a new store instance.
const store = createStore({
  state: {
   posts : []
  },

  mutations: {
   SET_POSTS(state , posts){
    state.posts = posts
   }
  },

  actions: {
    async fetchPosts({commit}){
        const response = await api.getItems();
        commit('SET_POSTS', response.data)
    }
  },

  getters: {

  }


});
export default store