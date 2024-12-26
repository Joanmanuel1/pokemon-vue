<template>
  <div class="d-flex flex-column align-items-center mt-5">
    <img src="../assets/home.png" alt="" />
    <p class="text-center mb-3" style="font-weight: 700; font-size: 26px">
      Welcome to Pokédex
    </p>
    <p class="text-center mb-4" style="font-size: 18px">
      The digital encyclopedia created by Professor Oak is an invaluable tool to
      Trainers in the Pokémon world.
    </p>
    <Button
      class="red"
      @click="navigateToPokemonList"
      rounded
    >
      <span>Get Started</span>
    </Button>
  </div>
</template>

<script>
import Button from "primevue/button";
import "../css/globalStyles.css";

export default {
  name: "Home",
  components: {
    Button,
  },

  methods: {
    navigateToPokemonList() {
      console.log("Button clicked!");
      this.$router.push("/pokemon-list");
    },
  },
};
</script>

<style></style>
