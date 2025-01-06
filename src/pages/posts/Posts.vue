<template>
  <div>
    <h1>Posts List</h1>

    <ul>
      <li v-for="post in posts" :key="post.id" class="post-item">
        <h2>{{ post.title }}</h2>
        <p><strong>User ID:</strong> {{ post.userId }}</p>
        <p>{{ post.body }}</p>
        <button class="delete-btn" @click="deletePost(post.id)">DELETE</button>
        <button class="update-btn" @click="updatePost(post.id)">UPDATE</button>
      </li>
    </ul>
  </div>

  <div class="rite-section">
    <div>
      <input
        class="input-search"
        v-model="searchId"
        type="number"
        placeholder="Enter Post ID"
      />
      <button @click="getPostById(searchId)">Search</button>
      <div v-if="post.id" class="post-item">
        <h2>{{ post.title }}</h2>
        <p><strong>User ID:</strong> {{ post.userId }}</p>
        <p>{{ post.body }}</p>
      </div>
    </div>

    <form v-on:submit.prevent="submitForm">
      <h1>title:</h1>
      <input type="text" v-model="itemTitle" />
      <h1>userId:</h1>
      <input type="number" v-model="itemUserId" />
      <h1>body:</h1>
      <input type="text" v-model="itemBody" />
      <button type="submit">CREATE</button>
    </form>

    <form v-if="post_selected">
      <h1>title:</h1>
      <input type="text" v-model="post_selected.title" />
      <h1>userId:</h1>
      <input type="number" v-model="post_selected.userId" />
      <h1>body:</h1>
      <input type="text" v-model="post_selected.body" />
      <button type="button" @click="savePostUpdated(post_selected)">
        SAVE UPDATE
      </button>
    </form>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { ref } from "vue";

const store = useStore();
const posts = computed(() => store.state.posts);
const post = computed(() => store.state.post);
const post_selected = computed(() => store.state.post_selected);

const searchId = ref("");
const itemTitle = ref("");
const itemUserId = ref("");
const itemBody = ref("");

store.dispatch("fetchPosts");

const getPostById = (searchId) => {
  store.dispatch("fetchPostById", searchId);
};

const deletePost = (id) => {
  store.dispatch("delete", id);
};

const updatePost = (id) => {
  store.dispatch("update", id);
};

const savePostUpdated = (post_selected) => {
  store.dispatch("saveUpdated", post_selected);
};

const submitForm = () => {
  if (itemTitle.value && itemUserId.value && itemBody.value) {
    store.dispatch("addItem", {
      id: posts.value.length + 1,
      title: itemTitle.value,
      userId: itemUserId.value,
      body: itemBody.value,
    });
  } else {
    console.log("submitForm failed!!");
  }
};
</script>

<style>
.rite-section {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 50px;
}

button {
  padding: 10px 15px;
  background-color: #4caf50; /* رنگ سبز */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.input-search {
  width: 80%;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

form {
  margin-top: 20px;
  padding: 20px;
  background-color: #f4f4f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 500px;
  margin: 20px auto;
  height: 400px;
}

form input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

form button {
  width: 100%;
  padding: 12px;
  background-color: #4caf50; /* سبز */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

form button:hover {
  background-color: #45a049; /* رنگ سبز تیره‌تر هنگام هاور */
}

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

.post-item button {
  padding: 10px 15px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
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

.post-item .update-btn {
  background-color: #008cba; /* آبی */
  color: white;
}

.post-item .update-btn:hover {
  background-color: #007bb5;
}
</style>