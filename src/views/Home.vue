<template>
  <div class="d-flex flex-column align-items-center mt-5">
    <img src="../assets/home.png" alt="" />
    <p class="text-center mb-3 text-lg">Welcome to Pokédex</p>
    <p class="text-center mb-4 text-muted">
      The digital encyclopedia created by Professor Oak is an invaluable tool to
      Trainers in the Pokémon world.
    </p>
    <Button :severity="'danger'" @click="navigateToPokemonList" rounded raised>
      <span>Get Started</span>
    </Button>
  </div>
</template>

<script>
import Button from "primevue/button";

export default {
  name: "Home",
  components: {
    Button,
  },

  methods: {
    navigateToPokemonList() {
      this.$router.push("/pokemon-list");
    },
  },
};
</script>

<style></style>
