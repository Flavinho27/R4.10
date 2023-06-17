<template>
    <div class="button-bottom">
      <div class="center">
        <button class="btn button-margin waves-effect waves-ligh pulse" @click=" this.$emit('add-task')">Ajouter <i class="material-icons right">add_task</i></button>
      </div>
  
      <div class="center">
        <button class="btn button-margin waves-effect waves-ligh" @click="  this.$emit('search-task')">Rechercher <i class="material-icons right">search</i></button>
      </div>
    </div>
  </template>
  
  
<style>
.button-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #00897b;
    color: #e0f2f1;
    padding: 10px;
    display: flex;
    justify-content: space-around;
}

@media screen and (min-width: 600px) {
  .button-bottom {
    padding: 30px;
  }
}
</style>