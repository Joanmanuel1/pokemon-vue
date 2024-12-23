import { createStore } from 'vuex';
import pokemon from './pokemon'; // Importa el módulo de Pokémon

export default createStore({
  modules: {
    pokemon, // Registra el módulo Pokémon
  },
});
