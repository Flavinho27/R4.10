const app = Vue.createApp({
    data() {
      return {
        description: '',
        startDate: '',
        endDate: '',
        etat: '',
        priorite: ''
      };
    },
    methods: {
      addTask() {
        // Créez un nouvel objet tâche avec les données saisies
        const newTask = {
          description: this.description,
          startDate: this.startDate,
          endDate: this.endDate,
          etat: this.etat,
          priorite: this.priorite
        };
  
        // Emettre un événement pour transmettre la nouvelle tâche à un composant parent
        this.$emit('task-added', newTask);
  
        // Réinitialiser les valeurs du formulaire après l'ajout de la tâche
        this.description = '';
        this.startDate = '';
        this.endDate = '';
        this.etat = '';
        this.priorite = '';
      }
    }
  });
  
  app.mount('#app');

  