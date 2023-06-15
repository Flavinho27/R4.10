<template>
    <table>
      <thead>
        <tr class="teal darken-1 teal-text text-lighten-5">
          <th>Date de début</th>
          <th>Date de fin</th>
          <th>État</th>
          <th>Priorité</th>
          <th>Description</th>
          <th><i class="material-icons" @click="$emit('show-delete-all-confirmation')">delete_forever</i></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tache in taches" :key="tache.id">
          <td>{{ tache.dateDebut }}</td>
          <td>{{ tache.dateFin }}</td>
          <td>{{ tache.etat }}</td>
          <td>{{ tache.priorite }}</td>
          <td>{{ tache.description }}</td>
          <td><i class="material-icons" @click="suppressionTache(tache.id)">delete</i></td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  export default {
    props: {
      taches: {
        type: Array,
        required: true
      }
    },
    methods: {
      suppressionTache(tacheId) {
        this.$emit('task-deleted', tacheId); // Émet un événement avec l'id de la tâche à supprimer
      },
    }
  }
  </script>
  