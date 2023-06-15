<template>
    <div class="active-filtres" v-if="hasActiveFilters">
        <p>Filtres actifs :</p>
        <ul>
            <li v-if="filtres.description">
                Description : {{ filtres.description }}
                <button class="remove-filter" @click="removeFilter('description')">
                    <i class="material-icons">clear</i>
                </button>
            </li>
            <li v-if="filtres.dateDebut">Date de début : {{ filtres.dateDebut }}
                <button class="remove-filter" @click="removeFilter('dateDebut')">
                    <i class="material-icons">clear</i>
                </button>
            </li>
            <li v-if="filtres.dateFin">Date de fin : {{ filtres.dateFin }}
                <button class="remove-filter" @click="removeFilter('dateFin')">
                    <i class="material-icons">clear</i>
                </button>
            </li>
            <li v-if="filtres.etat && filtres.etat !== 'Aucun'">État : {{ filtres.etat }}
                <button class="remove-filter" @click="removeFilter('etat')">
                    <i class="material-icons">clear</i>
                </button>
            </li>
            <li v-if="filtres.priorite && filtres.priorite !== 'Aucune'">Priorité : {{ filtres.priorite }}
                <button class="remove-filter" @click="removeFilter('priorite')">
                    <i class="material-icons">clear</i>
                </button>
            </li>
        </ul>
    </div>
</template>
  
<script>
export default {
    props: {
        filtres: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        hasActiveFilters() {
            return this.filtres.description || this.filtres.dateDebut || this.filtres.dateFin || this.filtres.etat || this.filtres.priorite;
        },
    },
    methods: {
        removeFilter(filterKey) {
            // Supprime le filtre correspondant de la liste des filtres
            delete this.filtres[filterKey];

            // Réalise une nouvelle recherche avec les filtres restants
            this.$emit('new-search', this.filtres);
        },
    },
};
</script>
  
<style scoped></style>
  