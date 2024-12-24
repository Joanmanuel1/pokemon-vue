import { createStore } from 'vuex';
import pokemon from './pokemon';

export default createStore({
  modules: {
    pokemon,
  },
});
