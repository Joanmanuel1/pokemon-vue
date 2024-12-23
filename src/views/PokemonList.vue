<template>
  <h1>Lista de Pokémon</h1>
  <div class="container">
    <div class="filter-input">
      <InputText
        v-model="nameFilter"
        @input="onInputChange"
        placeholder="Filtrar por nombre"
        style="margin-bottom: 20px"
      />
    </div>

    <DataTable1
      ref="dataTable"
      removableSort
      :value="showFavorites ? filteredPokemons : nameFilter ? filteredPokemons : pokemons"
      stripedRows
      tableStyle="min-width: 5rem"
      paginator
      :rows="10"
      :rowsPerPageOptions="[10, 25, 50, 100]"
    >
      <Column field="name" header="Name" sortable></Column>
      <Column field="id" header="Favorite" style="width: 25px">
        <template #body="pokemon">
          <div style="text-align: center">
            <i
              :class="pokemon.data.favorite ? 'pi pi-star-fill' : 'pi pi-star'"
              style="cursor: pointer"
              @click="toggleFavorite(pokemon.data.id)"
            />
          </div>
        </template>
      </Column>
    </DataTable1>

    <div class="button-group">
      <Button
        :severity="showFavorites ? 'secondary' : 'danger'"
        @click="toggleFilter(false)"
        rounded
        raised
        style="width: 240px"
      >
        <i
          class="pi pi-list"
          style="cursor: pointer; color: white; margin-right: 10px"
        />
        <span>All</span>
      </Button>
      <Button
        :severity="showFavorites ? 'danger' : 'secondary'"
        @click="toggleFilter(true)"
        rounded
        raised
        style="width: 240px"
      >
        <i
          class="pi pi-star"
          style="cursor: pointer; color: white; margin-right: 10px"
        />
        <span>Favorites</span>
      </Button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DataTable1 from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import InputText from "primevue/inputtext";

export default {
  name: "pokemon-list",
  data() {
    return {
      showFavorites: false,
      nameFilter: "",
    };
  },

  components: {
    DataTable1,
    Column,
    Button,
    InputText,
  },

  mounted() {
    this.loadPokemons();
  },
  computed: {
    ...mapGetters(["allPokemons", "favoritePokemons"]),
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

      console.log("Filtered Pokemons:", filtered);
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
  },
};
</script>

<style scoped>
.error {
  color: red;
}

.pi-star {
  cursor: pointer;
  color: #ffcc00;
}

.pi-star-fill {
  color: #ffd700;
}

.container {
  max-width: 500px;
  margin: 0 auto;
}

.button-group {
  display: flex;
  justify-content: space-between;
}
</style>
