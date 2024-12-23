import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import OtherView from '../views/PokemonList.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/pokemon-list',
    name: 'pokemon-list',
    component: OtherView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
