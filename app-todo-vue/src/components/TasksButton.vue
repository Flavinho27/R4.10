<template>
    <div class="button-bottom">
      <div class="center">
        <button class="btn button-margin waves-effect waves-ligh pulse" @click="addTask">Ajouter <i class="material-icons right">add_task</i></button>
      </div>
  
      <div class="center">
        <button class="btn button-margin waves-effect waves-ligh" @click="searchTask">Rechercher <i class="material-icons right">search</i></button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      addTask() {
        this.$emit('add-task');
      },
      searchTask() {
        this.$emit('search-task');
      },
    },
  };
  </script>
  