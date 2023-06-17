<script setup>
import Navbar from './components/Navbar.vue'
import TasksTable from './components/TasksTable.vue'
import AddTaskForm from './components/AddTaskForm.vue'
import SearchTaskForm from './components/SearchTaskForm.vue'
import TasksButton from './components/TasksButton.vue'
import DeleteTasksConfirmation from './components/DeleteTasksConfirmation.vue'
import ActiveFilters from './components/ActiveFilters.vue'
import TaskDetails from './components/TaskDetails.vue'
</script>

<template>
  <div id="body-app">
    <Navbar></Navbar>

    <div id="container-app">

      <div v-if="!AddForm && !SearchForm && !DeleteAllConfirmation && !tacheSelectionnee">
        <ActiveFilters :filtres="filtres" @new-search="rechercherAvecFiltres"></ActiveFilters>
        <TasksTable :taches="taches" @task-selected="voirTacheDetails"
          @show-delete-all-confirmation="this.DeleteAllConfirmation = true"></TasksTable>
        <TasksButton @add-task="AddForm = true" @search-task="SearchForm = true"></TasksButton>
      </div>
  
      <div v-if="tacheSelectionnee">
        <TaskDetails :tache="tacheSelectionnee" @task-updated="miseAjourTache" @cancel="tacheSelectionnee = null" @task-deleted="supprimerTache"></TaskDetails>
      </div>
  
  
      <div v-if="AddForm">
        <AddTaskForm @task-added="ajouterTache" @cancel="AddForm = false"></AddTaskForm>
      </div>
  
  
      <div v-if="SearchForm">
        <SearchTaskForm @task-search="rechercherTaches" @cancel="SearchForm = false">
        </SearchTaskForm>
      </div>
  
  
  
      <div v-if="DeleteAllConfirmation">
        <DeleteTasksConfirmation @delete-all="supprimerToutesTaches" @cancel="DeleteAllConfirmation = false">
        </DeleteTasksConfirmation>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taches: JSON.parse(localStorage.getItem('taches')) || [],
      filtres: {},
      AddForm: false,
      SearchForm: false,
      DeleteAllConfirmation: false,
      tacheSelectionnee: null,
    };
  },
  methods: {
    ajouterTache(nouvelleTache) {
      this.taches.push(nouvelleTache);
      localStorage.setItem('taches', JSON.stringify(this.taches));

      this.AddForm = false;
    },
    voirTacheDetails(tache) {
      this.tacheSelectionnee = tache;
    },
    miseAjourTache(tache) {
      this.taches = this.taches.map((t) => {
        if (t.id === tache.id) {
          return tache;
        }
        return t;
      });
      localStorage.setItem('taches', JSON.stringify(this.taches));
      this.tacheSelectionnee = null;
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
    /**
     * Est appelé lorsque l'utilisateur va effectuer une recherche
     * @param {*} filtre champs renseigné par l'utilisateur
     */
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
      this.filtres = filtre;
      this.SearchForm = false;
    },
    /**
     * Est activé lorsque l'utisateur va supprimer un filtre
     * @param {*} filtres filtres actifs restants
     */
    rechercherAvecFiltres(filtres) {
      this.filtres = filtres; // Met à jour les filtres actifs
      this.rechercherTaches(filtres); // Effectue une nouvelle avec les filtres restants
    },
  },
};
</script>
<style>
#body-app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#container-app {
  flex-grow: 1;
  position: relative;
}

i {
  cursor: pointer;
}

/* Formulaire boutons de validation */

form {
  margin-top: 20px;
}

.container-form-validate-buttons {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 40px;
  width: 100%;
}

.form-bloc-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-bloc-buttons button, i {
  margin: 0 20px;
}

</style>