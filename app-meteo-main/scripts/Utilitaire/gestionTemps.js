const joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

let ajd = new Date();
let options = {weekday: 'long'};
let joursActuel = ajd.toLocaleDateString("fr-FR", options);

joursActuel = joursActuel.charAt(0).toUpperCase() + joursActuel.slice(1);

let tabJoursEnOrdre  = joursSemaine.slice(joursSemaine.indexOf(joursActuel)).concat(joursSemaine.slice(0, joursSemaine.indexOf(joursActuel)));

export default tabJoursEnOrdre;