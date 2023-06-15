<template>
    <form @submit.prevent="rechercherTache">
        <div class="row">
            <div class="input-field col s12 m6">
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
                    <option value="Aucun">Aucun</option>
                    <option value="À faire">À faire</option>
                    <option value="En cours">En cours</option>
                    <option value="Terminé">Terminé</option>
                </select>
            </div>
            <div class="input-field col s12 m6">
                <select v-model="priorite" class="browser-default">
                    <option value="" disabled selected>Choisir une priorité</option>
                    <option value="Aucune">Aucune</option>
                    <option value="Haute">Haute</option>
                    <option value="Moyenne">Moyenne</option>
                    <option value="Basse">Basse</option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col s12">
                <button class="btn" type="submit">Rechercher</button>
                <button class="btn red" type="button" @click="$emit('cancel')">Annuler</button>
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
        rechercherTache() {
            const filtre = {
                description: this.description,
                dateDebut: this.dateDebut,
                dateFin: this.dateFin,
                etat: this.etat,
                priorite: this.priorite,
            };

            this.$emit('task-search', filtre);

            // Réinitialise les valeurs des champs
            this.description = '';
            this.dateDebut = '';
            this.dateFin = '';
            this.etat = '';
            this.priorite = '';
        }
    }

};
</script>
  