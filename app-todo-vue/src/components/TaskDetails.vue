<template>
  <div>
    <form @submit.prevent="modifTache">
      <div class="row">
        <div class="input-field col s12 m6">
          <input v-model="tache.description" id="description" type="text" class="validate">
          <label for="description">Description</label>
        </div>
        <div class="input-field col s12 m6">
          <input v-model="tache.dateDebut" id="dateDebut" type="date" class="datepicker">
          <label for="dateDebut">Date de début</label>
        </div>
        <div class="input-field col s12 m6">
          <input v-model="tache.dateFin" id="dateFin" type="date" class="datepicker">
          <label for="dateFin">Date de fin</label>
        </div>
        <div class="input-field col s12 m6">
          <select v-model="tache.etat" class="browser-default">
            <option value="" disabled selected>Choisir un état</option>
            <option value="À faire">À faire</option>
            <option value="En cours">En cours</option>
            <option value="Terminé">Terminé</option>
          </select>
        </div>
        <div class="input-field col s12 m6">
          <select v-model="tache.priorite" class="browser-default">
            <option value="" disabled selected>Choisir une priorité</option>
            <option value="Haute">Haute</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Basse">Basse</option>
          </select>
        </div>
      </div>
      <div class="container-form-validate-buttons">
        <div class="form-bloc-buttons">
          <button class="btn" type="submit">Valider</button>
          <button class="btn red" type="button" @click="$emit('cancel')">Retour</button>
          <i class="material-icons" @click="suppressionTache(tache.id)">delete</i>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ['tache'],
  methods: {
    modifTache() {
      this.$emit('task-updated', this.tache);
    },
    suppressionTache(tacheId) {
      this.$emit('task-deleted', tacheId);
      this.$emit('cancel'); 
    },
  },
};
</script>
<style>
</style>