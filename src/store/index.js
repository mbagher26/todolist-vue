import { createStore } from 'vuex';
import api from '../api/api';

// Create a new store instance.
const store = createStore({
  state: {
    posts: [],
    post: {},
    post_selected: null
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
    },

    SELECTED_POST(state, selected_for_update) {
      state.post_selected = selected_for_update
    },

    UPDATE_POST(state ,post_selected){
      const Index = state.posts.findIndex(post => post.id ===post_selected.id)
      state.post[Index] = {...post_selected}
    },

    ADD_POST(state , data){
      state.posts.push(data)
    }
  },

  actions: {
    async fetchPosts({ commit }) {
      const response = await api.getItems();
      commit('SET_POSTS', response.data)
    },

    async fetchPostById({ commit, state }, id) {
      const existingPost = state.posts.find(post => post.id === id)
      if (!existingPost) {
        console.error(`Post with ID ${id} has been deleted.`);
        return;
      }
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
    },

    async update({commit , state} , id){
      const selected_for_update = state.posts.find(post => post.id === id)
      commit("SELECTED_POST" , selected_for_update)
    },

    async saveUpdated({commit , state} , post_selected){
      commit("UPDATE_POST" , post_selected)
      state.post_selected = null
    },

    async addItem({commit} , post){
      console.log(post);
      
      try{
        const response = await api.createItem(post)
        commit("ADD_POST", post)
      }catch(erroe){
        console.error("addItem failed");
        
      }
    }
  },

  getters: {

  }


});
export default store