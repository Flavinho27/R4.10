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
      <div class="container-taskDetails-buttons">
        <div class="taskDetails-bloc-buttons">
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
      // Vous pouvez accéder aux données de la tâche modifiée ici et effectuer des actions
      // par exemple, vous pouvez émettre un événement pour informer le composant parent
      // de la modification de la tâche.
      // Pour cet exemple, nous émettons un événement nommé 'task-updated' avec la tâche modifiée.
      this.$emit('task-updated', this.tache);
    },
    suppressionTache(tacheId) {
      this.$emit('task-deleted', tacheId); // Émet un événement avec l'id de la tâche à supprimer
      this.$emit('cancel'); // Émet un événement pour retourner à la liste des tâches
    },
  },
};
</script>
<style>
/* .row:has(.taskDetails-buttons) {
  display: flex;
  justify-content: center;
} */

.container-taskDetails-buttons {
  display: flex;
  justify-content: center;
  /* margin-top: 50px; */
  position: absolute;
  bottom: 40px;
  width: 100%;
}

.taskDetails-bloc-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* max-width: 400px; */
}

.taskDetails-bloc-buttons button, i {
  margin: 0 20px;
}

</style>