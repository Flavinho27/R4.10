<template>
    <table>
      <thead>
        <tr class="teal darken-1 teal-text text-lighten-5">
          <th>Description</th>
          <th><i class="material-icons" @click="$emit('show-delete-all-confirmation')">delete_forever</i></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tache in taches" :key="tache.id" @click="afficherDetails(tache)">
          <td>{{ tache.description }}</td>
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
      afficherDetails(tache) {
        this.$emit('task-selected', tache);
      }
    }
  }
  </script>
<style>

th:last-child {
    cursor: pointer;
}

thead tr {
    display: flex;
    justify-content: space-between;
}

tbody tr {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
}

tbody tr:nth-child(odd) {
    background: #e0f2f1;
    color: #00897b;
}
tbody tr:nth-child(even) {
    background: #4db6ac;
    color: #e0f2f1;
}

tbody td {
    width: 100%;
    text-align: center;
}

</style>