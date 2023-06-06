const app = Vue.createApp({
    data() {
        return {
            description: '',
            dateDebut: '',
            dateFin: '',
            etat: '',
            priorite: '',
            taches: JSON.parse(localStorage.getItem('taches')) || [],
            // Formulaire d'ajout d'une activité
            showAddForm: false,
            // Formulaire de recherche d'une activité
            showSearchForm: false,
            // Message de confirmation lors de l'ajout d'une activité
            showConfirmation: false,
        };
    },
    methods: {
        ajoutTache() {
            // Vérifie que tous les champs du formulaire aient été remplis
            // if (
            //     this.description.trim() === '' ||
            //     this.dateDebut.trim() === '' ||
            //     this.dateFin.trim() === '' ||
            //     this.etat.trim() === '' ||
            //     this.priorite.trim() === ''
            // ) {
            //     alert('Veuillez remplir tous les champs du formulaire.');
            //     return;
            // }

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

            // Afficher la confirmation
            this.showAddForm = false;
            this.showConfirmation = true;

            this.taches.push(newTask); // Ajouter la nouvelle tâche au tableau

            // Sauvegarder les tâches dans le localStorage
            localStorage.setItem('taches', JSON.stringify(this.taches));

            this.description = '';
            this.dateDebut = '';
            this.dateFin = '';
            this.etat = '';
            this.priorite = '';
        },
        suppressionTache(tacheId) {
            localStorage.setItem('taches', JSON.stringify(this.taches.filter(tache => tache.id !== tacheId)));
            this.taches = this.taches.filter(tache => tache.id !== tacheId);
        },
        suppressionToutesTaches() {
            if (this.taches.length == 0) {
                alert('Il n\'y a aucune tache à supprimer.');
            } else {
                localStorage.removeItem('taches');
                this.taches = [];
            }
        },
        resetForm() {
            // Réinitialiser le formulaire et masquer la confirmation
            this.showAddForm = false;
            this.showConfirmation = false;
        },
        rechercherTache() {



            this.showSearchForm = false;
        }
    }

});

app.mount('#app');
