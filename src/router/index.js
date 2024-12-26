import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import pokemonList from '../views/PokemonList.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/pokemon-list',
    name: 'pokemon-list',
    component: pokemonList,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
