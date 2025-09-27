import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import CharacterDetails from '@/views/CharacterDetails.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/character/:id', name: 'CharacterDetails', component: CharacterDetails }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
