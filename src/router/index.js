import { createRouter, createWebHistory } from 'vue-router';
import Posts from '@/pages/posts/Posts.vue';

const routes = [
    {path:'/', component: Posts},
    {path:'/posts', component: Posts},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;