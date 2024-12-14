<template>
    <div>
    <h1>Posts List</h1>

    <div>
      <input v-model="searchId" type="number" placeholder="Enter Post ID" />
      <button @click="getPostById(searchId)">Search</button>
      <div v-if="post.id" class="post-item">
        <h2>{{ post.title }}</h2>
        <p><strong>User ID:</strong> {{ post.userId }}</p>
        <p>{{ post.body }}</p>
      </div>
    </div>

    <ul>
      <li v-for="post in posts" :key="post.id" class="post-item">
        <h2>{{ post.title }}</h2>
        <p><strong>User ID:</strong> {{ post.userId }}</p>
        <p>{{ post.body }}</p>
        <button class="delete-btn" @click="deletePost(post.id)">DELETE</button>

      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { ref } from 'vue';


const store = useStore();
const posts = computed(() => store.state.posts);
const post = computed(() => store.state.post);
const searchId = ref('')


store.dispatch("fetchPosts")

const getPostById = (searchId) => {
  store.dispatch("fetchPostById", searchId)
}

const deletePost = (id) => {
  store.dispatch("delete", id)
}

</script>

<style>
.post-item {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.post-item h2 {
  margin: 0 0 5px;
  font-size: 1.2rem;
  color: #333;
}

.post-item p {
  margin: 5px 0;
  line-height: 1.5;
  color: #555;
}

.delete-btn {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
}

.delete-btn:hover {
  background-color: #ff0000;
}
</style>