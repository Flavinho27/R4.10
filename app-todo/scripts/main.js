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
            AddForm: false,
            // Formulaire de recherche d'une activité
            SearchForm: false,
            // Message de confirmation lors de l'ajout d'une activité
            AddConfirmation: false,
            // Message de confirmation pour la suppression de toutes les activités
            DeleteAllConfirmation: false,

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

            if (dateDebutObj > dateFinObj) {
                alert('La date de début doit être antérieure à la date de fin.');
                return;
            }

            const newtache = {
                description: this.description,
                dateDebut: this.dateDebut,
                dateFin: this.dateFin,
                etat: this.etat,
                priorite: this.priorite,
                id: Date.now() // ID unique pour chaque tâche (utilisation de la timestamp actuelle)
            };

            // Afficher la confirmation
            this.AddForm = false;
            this.AddConfirmation = true;

            this.taches.push(newtache); // Ajouter la nouvelle tâche au tableau

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
            this.DeleteAllConfirmation = false;
            localStorage.removeItem('taches');
            this.taches = [];
        },
        hideAddConfirmation() {
            this.AddConfirmation = false;
        },
        showDeleteAllConfirmation() {
            if (this.taches.length == 0) {
                alert('Il n\'y a aucune tache à supprimer.');
            } else {
                this.DeleteAllConfirmation = true;
            }
        },
        hideDeleteAllConfirmation() {
            this.DeleteAllConfirmation = false;
        },
        rechercherTache() {
            this.SearchForm = false;

            this.taches = this.taches.filter((tache) => {
                // Effectuer les conditions de filtrage en fonction des valeurs des champs de recherche
                const matchDescription = tache.description.includes(this.description);
                const matchDateDebut = this.dateDebut ? tache.startDate === this.dateDebut : true;
                const matchDateFin = this.dateFin ? tache.endDate === this.dateFin : true;
                const matchEtat = this.etat ? (tache.etat === this.etat || "Aucun") : true;
                const matchPriorite = this.priorite ? (tache.priorite === this.priorite || "Aucune") : true;

                console.log(tache.etat)
            
                // Retourner true si toutes les conditions sont remplies, sinon false
                return matchDescription && matchDateDebut && matchDateFin && matchEtat && matchPriorite;
              });
        }
    }

});

app.mount('#app');
