<template>
    <table>
      <thead>
        <tr class="teal darken-1 teal-text text-lighten-5">
          <th class="th-description">To Do</th>
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

thead {
  position: relative;
}

th:last-child {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 30px;
}

.th-description {
  width: 100%;
  text-align: center;
  font-size: 30px;
}

tbody tr {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
}

tbody tr:hover {
    filter: brightness(1.3);
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