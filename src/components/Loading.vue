<template>
    <div class="loading-container">
      <img
        src="../assets/Loader.png" 
        alt="Loading Pokéball" 
        class="pokeball" 
      />
    </div>
  </template>
  
  <script>
  export default {
    name: "Loading",
  };
  </script>
  
  <style scoped>
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  .pokeball {
    width: 120px;
    height: 120px;
    margin-bottom: 20px;
    animation: bounce-spin 1.5s infinite ease-in-out;
  }
  
  @keyframes bounce-spin {
    0% {
      transform: rotate(0deg) scale(1);
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    }
    50% {
      transform: rotate(15deg) scale(1.1);
      box-shadow: 0 10px 20px rgba(255, 255, 255, 0.3);
    }
    100% {
      transform: rotate(360deg) scale(1);
    }
  }
  </style>
  