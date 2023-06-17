<template>
    <form @submit.prevent="ajoutTache">
        <div class="row">
            <div class="input-field col s24 m6">
                <input v-model="description" id="description" type="text" class="validate">
                <label for="description">Description</label>
            </div>
            <div class="input-field col s12 m6">
                <input v-model="dateDebut" id="dateDebut" type="date" class="datepicker">
                <label for="dateDebut">Date de début</label>
            </div>
            <div class="input-field col s12 m6">
                <input v-model="dateFin" id="dateFin" type="date" class="datepicker">
                <label for="dateFin">Date de fin</label>
            </div>
            <div class="input-field col s12 m6">
                <select v-model="etat" class="browser-default">
                    <option value="" disabled selected>Choisir un état</option>
                    <option value="À faire">À faire</option>
                    <option value="En cours">En cours</option>
                    <option value="Terminé">Terminé</option>
                </select>
            </div>
            <div class="input-field col s12 m6">
                <select v-model="priorite" class="browser-default">
                    <option value="" disabled selected>Choisir une priorité</option>
                    <option value="Haute">Haute</option>
                    <option value="Moyenne">Moyenne</option>
                    <option value="Basse">Basse</option>
                </select>
            </div>
        </div>
        <div class="container-form-validate-buttons">
            <div class="form-bloc-buttons">
                <button class="btn" type="submit">Valider</button>
                <button class="btn red" type="button" @click="$emit('cancel')">Retour</button>
            </div>
        </div>
    </form>
</template>
  
<script>
export default {
    data() {
        return {
            description: '',
            dateDebut: '',
            dateFin: '',
            etat: '',
            priorite: '',
        };
    },
    methods: {
        ajoutTache() {
            const newTache = {
                description: this.description,
                dateDebut: this.dateDebut,
                dateFin: this.dateFin,
                etat: this.etat,
                priorite: this.priorite,
                id: Date.now() // ID unique pour chaque tâche (utilisation de la timestamp actuelle)
            };

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

            // Vérifie que dateDebut < dateFin
            const dateDebutObj = new Date(this.dateDebut);
            const dateFinObj = new Date(this.dateFin);

            if (dateDebutObj > dateFinObj) {
                alert('La date de début doit être antérieure à la date de fin.');
                return;
            }

            this.$emit('task-added', newTache); 

            // Réinitialise les valeurs des champs
            this.description = '';
            this.dateDebut = '';
            this.dateFin = '';
            this.etat = '';
            this.priorite = '';
        },
    },
};
</script>
<style>
</style>