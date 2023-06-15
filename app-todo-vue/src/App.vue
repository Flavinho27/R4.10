<script setup>
import Navbar from './components/Navbar.vue'
import TasksTable from './components/TasksTable.vue'
import AddTaskForm from './components/AddTaskForm.vue'
import SearchTaskForm from './components/SearchTaskForm.vue'
import TasksButton from './components/TasksButton.vue'
import Footer from './components/Footer.vue'
import DeleteTasksConfirmation from './components/DeleteTasksConfirmation.vue'
</script>

<template>
  <div>
    <Navbar></Navbar>

    <div v-if="!AddForm && !SearchForm && !DeleteAllConfirmation">
      <TasksTable :taches="taches" @task-deleted="supprimerTache"
        @show-delete-all-confirmation="this.DeleteAllConfirmation = true"></TasksTable>
      <TasksButton @add-task="AddForm = true" @search-task="SearchForm = true"></TasksButton>
    </div>

    <div v-if="AddForm">
      <AddTaskForm @task-added="ajouterTache" @cancel="AddForm = false"></AddTaskForm>
    </div>


    <div v-if="SearchForm">
      <SearchTaskForm @task-search="rechercherTaches" @cancel="SearchForm = false"></SearchTaskForm>
    </div>



    <div v-if="DeleteAllConfirmation">
      <DeleteTasksConfirmation @delete-all="supprimerToutesTaches" @cancel="DeleteAllConfirmation = false">
      </DeleteTasksConfirmation>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taches: JSON.parse(localStorage.getItem('taches')) || [],
      AddForm: false,
      SearchForm: false,
      DeleteAllConfirmation: false,
    };
  },
  methods: {
    ajouterTache(nouvelleTache) {
      this.taches.push(nouvelleTache);
      localStorage.setItem('taches', JSON.stringify(this.taches));

      this.AddForm = false;
    },
    supprimerTache(tacheId) {
      localStorage.setItem('taches', JSON.stringify(this.taches.filter(tache => tache.id !== tacheId)));
      this.taches = this.taches.filter(tache => tache.id !== tacheId);
    },
    supprimerToutesTaches() {
      localStorage.removeItem('taches');
      this.taches = [];

      this.DeleteAllConfirmation = false;

    },
    rechercherTaches(filtre) {
      this.taches = JSON.parse(localStorage.getItem('taches')).filter((tache) => {
        // Effectuer les conditions de filtrage en fonction des valeurs des champs de recherche
        const matchDescription = filtre.description ? tache.description.includes(filtre.description) : true;
        const matchDateDebut = filtre.dateDebut ? tache.dateDebut === filtre.dateDebut : true;
        const matchDateFin = filtre.dateFin ? tache.dateFin === filtre.dateFin : true;
        const matchEtat = filtre.etat ? (tache.etat === filtre.etat || filtre.etat === "Aucun") : true;
        const matchPriorite = filtre.priorite ? (tache.priorite === filtre.priorite || filtre.priorite === "Aucune") : true
        // Retourner true si toutes les conditions sont remplies, sinon false
        return matchDescription && matchDateDebut && matchDateFin && matchEtat && matchPriorite;
      });
      this.SearchForm = false;
    }
  },
};
</script>
