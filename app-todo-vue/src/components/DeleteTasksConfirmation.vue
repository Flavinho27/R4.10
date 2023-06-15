<template>
      <div class="center">
        <p>Voulez-vous vraiment supprimer toutes vos tâches ?</p>
        <button class="btn button-margin" @click="$emit('delete-all')">Valider</button>
        <button class="btn button-margin" @click="$emit('cancel')">Annuler</button>
      </div>
  </template>
  
  <script>
  </script>
  