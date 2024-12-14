import { createStore } from 'vuex';
import api from '../api/api';

// Create a new store instance.
const store = createStore({
  state: {
    posts: [],
    post: {}
  },

  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts
    },

    SET_POST(state, post) {
      state.post = post
    },

    REMOVE_POST(state, id) {
      state.posts = state.posts.filter(post => post.id !== id)
    }
  },

  actions: {
    async fetchPosts({ commit }) {
      const response = await api.getItems();
      commit('SET_POSTS', response.data)
    },

    async fetchPostById({ commit }, id) {
      try {
        const response = await api.getItem(id);
        commit('SET_POST', response.data);
      } catch (erroe) {
        console.error('Error for fetch by Id', erroe);
      }
    },

    async delete({ commit }, id) {
      try {
        const response = await api.deleteItem(id);
        commit("REMOVE_POST", id)

      } catch (erroe) {
        console.error('Delete failed', erroe);
      }
    }
  },

  getters: {

  }


});
export default store