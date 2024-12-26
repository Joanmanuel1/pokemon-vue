<template>
  <div class="container">
    <Loading v-if="isLoading" />
    <div v-else>
      <div class="filter-input">
        <InputGroup style="margin-bottom: 20px"
        >
          <InputGroupAddon style="background-color: transparent;">
            <i class="pi pi-search icon"></i>
          </InputGroupAddon>
          <InputText
            v-model="nameFilter"
            @input="onInputChange"
            placeholder="Filter by name"
          >
          </InputText>
        </InputGroup>
      </div>
      <DataTable1
        ref="dataTable"
        removableSort
        style="border: none;"
        :value="
          showFavorites
            ? filteredPokemons
            : nameFilter
            ? filteredPokemons
            : pokemons
        "
        tableStyle="min-width: 5rem"
        paginator
        :rows="10"
        :rowsPerPageOptions="[10, 25, 50, 100]"
        @row-click="fetchPokemonDetails"
      >
        <Column field="name" header="Name" sortable></Column>
        <Column field="id" header="Favorite" sortable style="width: 50px">
          <template #body="pokemon">
            <div style="justify-content: center; display: flex">
              <Button
                rounded
                severity="secondary"
                text
                @click.stop="toggleFavorite(pokemon.data.id)"
                small
                class="small-button"
              >
                <i
                  :class="
                    pokemon.data.favorite ? 'pi pi-star-fill' : 'pi pi-star'
                  "
                  style="cursor: pointer"
                />
              </Button>
            </div>
          </template>
        </Column>
        <template #empty>
          <div style="text-align: center">
            <h2 style="font-size: 36px; font-weight: 700;">Uh-oh!</h2>
            <p style="font-size: 20px;">You look lost in your journey!</p>
            <Button
              class="red"
              rounded
              label="Go back home"
              @click="reset()"
            />
          </div>
        </template>
      </DataTable1>
      <PokemonDetail
        v-if="selectedPokemonId"
        :pokemonId="selectedPokemonId"
        :visible="isModalVisible"
        @close="closeModal()"
        :isFavorite="selectedPokemonFavorite"
      />

      <div class="button-group">
        <Button
          @click="toggleFilter(false)"
          rounded
          style="font-family: 'Lato'; color: white; border: 1px solid white;"
          :style="{
            backgroundColor: showFavorites ? '#aaa' : '#F22539',
            color: 'white',
            border: '1px solid #ccc',
          }"
        >
          <i class="pi pi-list icono" />
          <span>All</span>
        </Button>
        <Button
          @click="toggleFilter(true)"
          rounded
          style="font-family: 'Lato'; color: white; border: 1px solid white;"
          :style="{
            backgroundColor: showFavorites ? '#F22539' : '#aaa',
            color: 'white',
            border: '1px solid #ccc',
          }"
        >
          <i class="pi pi-star-fill icono" />
          <span>Favorites</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DataTable1 from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import PokemonDetail from "../components/PokemonDetail.vue";
import Loading from "../components/Loading.vue";
import "../css/globalStyles.css";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";

export default {
  name: "pokemon-list",
  data() {
    return {
      showFavorites: false,
      nameFilter: "",
      selectedPokemonId: null,
      isModalVisible: false,
      selectedPokemonFavorite: false,
    };
  },

  components: {
    DataTable1,
    Column,
    Button,
    InputText,
    PokemonDetail,
    Loading,
    InputGroup,
    InputGroupAddon
  },

  mounted() {
    this.loadPokemons();
  },
  computed: {
    ...mapGetters(["allPokemons", "favoritePokemons", "isLoading"]),
    pokemons() {
      return this.allPokemons.map((pokemon) => {
        const id = pokemon.url.split("/").filter(Boolean).pop();
        return {
          ...pokemon,
          id,
          favorite: this.favoritePokemons[id] || false,
          name: this.capitalize(pokemon.name)
        };
      });
    },
    filteredPokemons() {
      let filtered = this.pokemons;

      if (this.showFavorites) {
        filtered = filtered.filter((pokemon) => pokemon.favorite);
      }

      if (this.nameFilter) {
        filtered = filtered.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(this.nameFilter.toLowerCase())
        );
      }
      return filtered;
    },
  },

  methods: {
    ...mapActions(["fetchPokemons", "toggleFavorite"]),
    loadPokemons() {
      this.fetchPokemons();
    },
    toggleFavorite(id) {
      this.$store.dispatch("toggleFavorite", id);
    },
    toggleFilter(showFavorites) {
      this.showFavorites = showFavorites;
    },
    onInputChange() {
      this.filteredPokemons;
    },
    fetchPokemonDetails(pokemon) {
      this.selectedPokemonId = pokemon.data.id;
      this.selectedPokemonFavorite = pokemon.data.favorite;
      this.isModalVisible = true;
    },
    closeModal() {
      this.$store.dispatch("clearPokemonDetails");
      this.selectedPokemonId = null;
      this.selectedPokemonFavorite = null;
      this.isModalVisible = false;
    },
    reset() {
      this.nameFilter = null;
      this.showFavorites = false;
    },
    capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 570px;
  padding: 0 15px;
  margin: 0 auto;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  position: sticky;
  bottom: 0;
  background-color: white; 
  padding: 10px;
  border-top: 1px solid #ccc; 
}

button {
  align-items: center;
  justify-content: center;
  width: 200px;
}

.icono {
  margin-right: 10px;
  color: white;
}

.small-button {
  width: 30px;
  height: 30px;
  font-size: 12px; 
  padding: 0; 
}

</style>
