<template>
    <div class="active-filtres" v-if="hasActiveFilters">
        <p>Filtres actifs :</p>
        <ul>
            <li v-if="filtres.description">
                <span>Description :</span> {{ filtres.description }}
                <button class="remove-filter" @click="removeFilter('description')">
                    <i class="material-icons">clear</i>
                </button>
            </li>
            <li v-if="filtres.dateDebut">
                <span>Date de début :</span> {{ filtres.dateDebut }}
                <button class="remove-filter" @click="removeFilter('dateDebut')">
                    <i class="material-icons">clear</i>
                </button>
            </li>
            <li v-if="filtres.dateFin">
                <span>Date de fin :</span> {{ filtres.dateFin }}
                <button class="remove-filter" @click="removeFilter('dateFin')">
                    <i class="material-icons">clear</i>
                </button>
            </li>
            <li v-if="filtres.etat && filtres.etat !== 'Aucun'">
                <span>État :</span> {{ filtres.etat }}
                <button class="remove-filter" @click="removeFilter('etat')">
                    <i class="material-icons">clear</i>
                </button>
            </li>
            <li v-if="filtres.priorite && filtres.priorite !== 'Aucune'">
                <span>Priorité :</span> {{ filtres.priorite }}
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
        /**
         * Permet de savoir quand afficher la ligne montrant les filtres actifs
         */
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
  
<style scoped>
.active-filtres p {
    margin: 0;
    font-weight: bold;
    text-align: center;
}

.active-filtres ul {
    list-style-type: none;
    padding: 0;
    margin: 10px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.active-filtres ul li {
    margin: 0 10px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    align-items: center;
    background-color: #eee;
}

.active-filtres ul li span {
    margin-right: 10px;
    font-weight: bold;
}

.active-filtres ul li button {
    cursor: pointer;
    transform: scale(0.8);
}

</style>
