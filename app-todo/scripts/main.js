const app = Vue.createApp({
    data() {
      return {
        description: '',
        dateDebut: '',
        dateFin: '',
        etat: '',
        priorite: '',
        taches: [] 
      };
    },
    methods: {
      ajoutTache() {
        

        // Vérifie que tous les champs du formulaire aient été remplis
        if (
            this.description.trim() === '' ||
            this.dateDebut.trim() === '' ||
            this.dateFin.trim() === '' ||
            this.etat.trim() === '' ||
            this.priorite.trim() === ''
          ) {
            alert('Veuillez remplir tous les champs du formulaire.');
            return;
          }
        
          // dateDebut < dateFin
          const dateDebutObj = new Date(this.dateDebut);
          const dateFinObj = new Date(this.dateFin);
        
          if (dateDebutObj >= dateFinObj) {
            alert('La date de début doit être antérieure à la date de fin.');
            return;
          }

        const newTask = {
          description: this.description,
          dateDebut: this.dateDebut,
          dateFin: this.dateFin,
          etat: this.etat,
          priorite: this.priorite,
          id: Date.now() // ID unique pour chaque tâche (utilisation de la timestamp actuelle)
        };
  
        this.taches.push(newTask); // Ajouter la nouvelle tâche au tableau
  
        this.description = '';
        this.dateDebut = '';
        this.dateFin = '';
        this.etat = '';
        this.priorite = '';
      },
      suppressionTache(tacheId) {
        this.taches = this.taches.filter(tache => tache.id !== tacheId);
      },
      suppressionToutesTaches() {
        if (this.taches.length == 0) {
            alert('Il y a aucune tache à supprimer.');
        }
        this.taches = [];
      },
    }
    
  });
  
  app.mount('#app');
  