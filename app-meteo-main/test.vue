<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>


<script>

  Vue.component('heure-prevision-bloc', {
    props: ['nom', 'valeur'],
    template: `
      <div class="bloc-h">
        <p class="heure-prevision-nom">{{ nom }}</p>
        <p class="heure-prevision-valeur">{{ valeur }}</p>
      </div>
    `
  });

  new Vue({
    el: '#app',
    data: {
      previsions: [
        { id: 1, nom: 'lorem', valeur: 'lorem' },
        { id: 2, nom: 'lorem', valeur: 'lorem' },
        { id: 3, nom: 'lorem', valeur: 'lorem' },
        { id: 4, nom: 'lorem', valeur: 'lorem' },
        { id: 5, nom: 'lorem', valeur: 'lorem' },
        { id: 6, nom: 'lorem', valeur: 'lorem' }
      ]
    }
  });

</script>

<template>
  <div id="app">
    <heure-prevision-bloc v-for="prevision in previsions" :key="prevision.id" :nom="prevision.nom" :valeur="prevision.valeur"></heure-prevision-bloc>
  </div>
</template>


