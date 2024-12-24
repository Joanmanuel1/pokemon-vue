<template>
  <div class="container">
    <Loading v-if="isLoading" />
    <div v-else>



    <div class="filter-input">
      <InputText
        v-model="nameFilter"
        @input="onInputChange"
        placeholder="Filter by name"
        style="margin-bottom: 20px"
      />
    </div>

    <DataTable1
      ref="dataTable"
      removableSort
      :value="
        showFavorites
          ? filteredPokemons
          : nameFilter
          ? filteredPokemons
          : pokemons
      "
      stripedRows
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
              raised
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
          <h2>Uh-oh!</h2>
          <p><b> You look lost in your journey! </b></p>
          <Button
            severity="danger"
            rounded
            raised
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
        :severity="showFavorites ? 'secondary' : 'danger'"
        @click="toggleFilter(false)"
        rounded
        raised
      >
        <i class="pi pi-list icono" />
        <span>All</span>
      </Button>
      <Button
        :severity="showFavorites ? 'danger' : 'secondary'"
        @click="toggleFilter(true)"
        rounded
        raised
      >
        <i class="pi pi-star icono" />
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
import PokemonDetail from "@/components/PokemonDetail.vue";
import Loading from '@/components/Loading.vue';
import '@/css/globalStyles.css'

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
    Loading
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
    reset(){
      this.nameFilter = null;
      this.showFavorites = false;
    }
  },
};
</script>

<style scoped>

.container {
  max-width: 500px;
  margin: 0 auto;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
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
  width: 30px; /* Ancho del botón */
  height: 30px; /* Altura del botón */
  font-size: 12px; /* Tamaño del texto/icono */
  padding: 0; /* Elimina relleno adicional */
}
</style>
