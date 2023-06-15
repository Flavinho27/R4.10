<template>
    <nav class="teal darken-3" role="navigation">
      <div class="nav-wrapper container">
        <a href="index.html" @click="showToutesTaches">
          <img src="../assets/logo.png" alt="Logo" width="50rem" class="logo"/>
        </a>
        <ul class="right hide-on-med-and-down">
          <li><a href="../../aide.html">Aide</a></li>
        </ul>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    methods: {
      showToutesTaches() {
        // Logique pour afficher toutes les tâches
      }
    }
  }
  </script>
  
  <style scoped>
  /* Styles CSS spécifiques au composant Navbar */
  </style>
  