<template>
  <div v-if="visible" class="custom-overlay">
    <Loading v-if="!pokemonDetails" />
    <div class="custom-modal" v-else>
      <div class="card">
        <i class="pi pi-times-circle close-button" @click="$emit('close')"></i>
        <div class="image-container">
          <img
            src="../assets/fondoDetail.png"
            alt="Background"
            class="background-image"
          />
          <img
            v-if="
              pokemonDetails?.sprites?.other['official-artwork']
                ?.front_default || pokemonDetails?.sprites?.front_default
            "
            :src="
              pokemonDetails?.sprites?.other['official-artwork']
                ?.front_default || pokemonDetails?.sprites?.front_default
            "
            alt="Pokemon Image"
            class="pokemon-image"
          />
          <div v-else style="top: 30%; position: absolute; right: 25%">
            <p><b>Pokemon image not available</b></p>
            <img src="../assets/Loader.png" alt="" />
          </div>
        </div>
        <div class="pokemon-details">
          <p><strong>Name:</strong> {{ capitalize(pokemonDetails?.name) }}</p>
          <p><strong>Weight:</strong> {{ pokemonDetails?.weight }}</p>
          <p><strong>Height:</strong> {{ pokemonDetails?.height }}</p>
          <p><strong>Types:</strong> {{ formattedTypes }}</p>
        </div>
        <div class="button-group d-flex justify-content-between">
          <div style="justify-content: start; display: flex; width: 70%">
            <Button
              label="Share to my friends"
              severity="danger"
              rounded
              raised
              @click="copyToClipboard"
            />
          </div>
          <div style="justify-content: end; display: flex; width: 30%">
            <Button rounded severity="secondary" raised text disabled>
              <i :class="isFavorite ? 'pi pi-star-fill' : 'pi pi-star'" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";
import { mapGetters, mapActions } from "vuex";
import Loading from "@/components/Loading.vue";
import "@/css/globalStyles.css";
import { useToast } from "primevue/usetoast";

export default {
  name: "PokemonDetail",
  components: {
    Button,
    Loading,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  props: {
    pokemonId: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(["pokemonDetails"]),

    formattedTypes() {
      if (!this.pokemonDetails || !this.pokemonDetails.types) {
        return "Unknown";
      }
      return this.pokemonDetails.types
        .map((type) => this.capitalize(type.type.name))
        .join(", ");
    },
  },
  watch: {
    pokemonId: {
      immediate: true,
      handler(newId) {
        this.loadPokemonDetails(newId);
      },
    },
  },
  methods: {
    ...mapActions(["fetchPokemonDetails"]), // Mapa la acción fetchPokemonDetails

    async loadPokemonDetails(id) {
      await this.fetchPokemonDetails(id); // Utiliza la acción de Vuex
    },
    capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    },
    closeModal() {
      this.$emit("close");
    },
    copyToClipboard() {
      if (!this.pokemonDetails) return;

      const name = this.capitalize(this.pokemonDetails.name);
      const weight = this.pokemonDetails.weight;
      const height = this.pokemonDetails.height;
      const types = this.formattedTypes;

      const textToCopy = `Name: ${name}, Weight: ${weight}, Height: ${height}, Types: ${types}`;

      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          this.toast.add({
            severity: "success",
            summary: "Success",
            detail: "Pokemon details copied to clipboard!",
            life: 3000,
          });
        })
        .catch(() => {
          this.toast.add({
            severity: "error",
            summary: "Error",
            detail: "Failed to copy text to clipboard.",
            life: 3000,
          });
        });
    },
  },
};
</script>

<style scoped>
.custom-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.custom-modal {
  background: white;
  width: 90%;
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  background: transparent;
}

.image-container {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pokemon-image {
  position: absolute;
  bottom: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  z-index: 2;
  max-width: 200px;
  height: 200px;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
  z-index: 3;
}

.pokemon-details {
  margin-top: 20px;
  text-align: left;
  font-family: Arial, sans-serif;
  font-size: 16px;
  color: #333;
  width: 90%;
}

.pokemon-details p {
  margin: 10px 0;
  border-bottom: 1px solid #e0dddd;
  padding-bottom: 10px;
}
.button-group {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 90%;
}
</style>
