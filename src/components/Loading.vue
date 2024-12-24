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
  /* Usamos las mismas reglas que las animaciones del CSS */
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  .pokeball {
    width: 120px; /* Hazla un poco más grande para un efecto más impresionante */
    height: 120px;
    margin-bottom: 20px;
    animation: bounce-spin 1.5s infinite ease-in-out;
  }
  
  /* Animación de rebote y giro */
  @keyframes bounce-spin {
    0% {
      transform: rotate(0deg) scale(1); /* Gira y escala normal */
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.3); /* Sombra suave */
    }
    50% {
      transform: rotate(15deg) scale(1.1); /* Rebota y se agranda ligeramente */
      box-shadow: 0 10px 20px rgba(255, 255, 255, 0.3); /* Sombra más prominente */
    }
    100% {
      transform: rotate(360deg) scale(1); /* Regresa a la rotación normal */
    }
  }
  </style>
  