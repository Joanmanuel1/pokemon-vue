import axios from 'axios';

const state = {
  pokemons: [],
  loading: false,
  error: null,
  favoritePokemons: {},
};

const getters = {
  allPokemons: (state) => state.pokemons,
  isLoading: (state) => state.loading,
  error: (state) => state.error,
  favoritePokemons: (state) => state.favoritePokemons,
  isFavorite: (state) => (id) => state.favoritePokemons[id] || false, 
};

const mutations = {
  setPokemons(state, pokemons) {
    state.pokemons = pokemons;
  },
  setLoading(state, status) {
    state.loading = status;
  },
  setError(state, error) {
    state.error = error;
  },
  setFavoritePokemon(state, { id, isFavorite }) {
    state.favoritePokemons[id] = isFavorite;
  },
};

const actions = {
  async fetchPokemons({ commit }) {
    commit('setLoading', true);
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1500');
      commit('setPokemons', response.data.results);
      commit('setLoading', false);
    } catch (error) {
      commit('setError', error.message);
      commit('setLoading', false);
    }
  },

  toggleFavorite({ commit, getters }, id) {
    const isFavorite = !getters.isFavorite(id);
    commit('setFavoritePokemon', { id, isFavorite });
  },
  
};

export default {
  state,
  getters,
  mutations,
  actions,
};
