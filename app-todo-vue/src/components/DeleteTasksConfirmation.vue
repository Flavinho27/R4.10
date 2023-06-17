<template>
  <div class="center confirmation">
    <p>Voulez-vous vraiment supprimer toutes vos tâches ?</p>
    <div>
      <button class="btn button-margin" @click="$emit('delete-all')">Valider</button>
      <button class="btn button-margin" @click="$emit('cancel')">Annuler</button>
    </div>
  </div>
</template>
  
<script>
</script>
<style>

.confirmation {
    position: absolute;
    width: 100%;
    top: 30%;
}
  
  .button-margin {
    margin: 10px;
  }
</style>