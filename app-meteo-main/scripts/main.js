import tabJoursEnOrdre from './Utilitaire/gestionTemps.js';

const APIKEY = '1db618f01129e97ae866956a56ec549f';
let resultatsAPI;
let ville;

const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const jour = document.querySelector('.jour');
const heure = document.querySelectorAll('.heure-prevision-nom');
const localisation = document.querySelector('.localisation');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');
const joursDiv = document.querySelectorAll('.jour-prevision-nom');
const numeroDuJour = document.querySelectorAll('.numero-du-jour');
const imgIcone = document.querySelector('.logo-meteo');
const blocJours = document.querySelectorAll('.bloc-j');
const blocsJoursIdPositif = document.querySelectorAll('.bloc-j[id^="0"]');
const blocsJoursIdNégatif = document.querySelectorAll('.bloc-j[id="-1"]');
const blocsHeure = document.querySelectorAll('.bloc-h');

blocJours.forEach(e => {
    e.addEventListener('click', () => {
        for (let i = 0; i < blocJours.length; i++) {
            blocJours[i].classList.remove('active');
        }
        e.classList.add('active');
        majInfos(e.id);
    })
});

// Ajoute un gestionnaire d'événement de clic à chaque case avec un ID positif
for (let i = 0; i < blocsJoursIdPositif.length; i++) {
    blocsJoursIdPositif[i].addEventListener('click', function () {
        // Ajoute la classe .invisible à chaque bloc à cacher
        for (let j = 0; j < blocsHeure.length; j++) {
            blocsHeure[j].classList.add('invisible');
        }
    });
}

// Ajoute un gestionnaire d'événement de clic à la case avec un ID égal à -1
blocsJoursIdNégatif[0].addEventListener('click', function () {
    // Supprime la classe .invisible à chaque bloc à cacher
    for (let j = 0; j < blocsHeure.length; j++) {
        blocsHeure[j].classList.remove('invisible');
    }
});

document.getElementById("recupVille").addEventListener("submit", function (event) {
    // Empêche le rechargement de la page par défaut lors de la soumission du formulaire
    event.preventDefault();
    // Récupérer la valeur saisie
    ville = document.getElementById("ville").value;

    convertVilleEnCoord(ville);

    document.getElementById("recupVille").reset();
});


/**
 * Permet d'obtenir les coordonnées d'une ville en fonction de son nom
 * @param {*} ville le nom de la ville dont on souhaite obtenir les coordonnées
 */
function convertVilleEnCoord(ville) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${ville}&limit=1&appid=${APIKEY}`)
        .then(reponse => {
            return reponse.json();
        })
        .then(data => {

            resultatsAPI = data
            let lat = resultatsAPI[0].lat;
            let lon = resultatsAPI[0].lon;
            AppelAPI(lat, lon)
        })
}

/**
 * Met à jour les informations de l'application (date, temps et température)
 * Par défaut les informations du jour sont affichés
 * Lors du clic sur une case correspondant à un jour, les informations correspondantes
 * seront affichées
 * @param {*} numJour numéro du jour. Par convention, -1 correspond à aujourd'hui, 
 * 0 correspond à demain, 1 correspond à après-demain, etc
 */
function majInfos(numJour) {
    const dateActuel = new Date()
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    // TODAY
    if (numJour == -1) {
        jour.innerText = dateActuel.toLocaleDateString('fr-FR', options);
        temps.innerText = resultatsAPI.current.weather[0].description;
        temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`;
        localisation.innerText = ville;

        let heureActuelle = new Date().getHours();


        for (let i = 0; i < heure.length; i++) {
            let heureIncr = heureActuelle + i * 3;

            if (heureIncr > 24) {
                heure[i].innerText = `${heureIncr - 24} h`;
            } else if (heureIncr == 24) {
                heure[i].innerText = '00 h';
            } else {
                heure[i].innerText = `${heureIncr} h`;
            }
        }

        for (let j = 0; j < tempPourH.length; j++) {
            tempPourH[j].innerText = `${Math.trunc(resultatsAPI.hourly[j * 3].temp)}°`;
        }

        for (let k = 0; k < tabJoursEnOrdre.length; k++) {
            joursDiv[k].innerText = tabJoursEnOrdre[k].slice(0, 3);
        }

        for (let j = 0; j < 7; j++) {
            let jour = new Date(dateActuel);
            jour.setDate(jour.getDate() + j);
            numJour = jour.getDate()
            numeroDuJour[j].innerText = numJour;
        }

        if (6 < heureActuelle && heureActuelle < 21) {
            imgIcone.src = `ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`;
        } else {
            imgIcone.src = `ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg`
        }

    } else {

        let jourClique = new Date(dateActuel);
        jourClique.setDate(jourClique.getDate() + parseInt(numJour) + 1);
        jour.innerText = jourClique.toLocaleDateString('fr-FR', options);
        temps.innerText = resultatsAPI.daily[numJour].weather[0].description;
        temperature.innerText = `${Math.trunc(resultatsAPI.daily[numJour].temp.day)}°`;
        localisation.innerText = ville;

        imgIcone.src = `ressources/jour/${resultatsAPI.daily[numJour].weather[0].icon}.svg`;

    }

}

/**
 * Permet de récupérer les données météorologique d'une ville
 * en connaissant ses coordonnées
 * @param {*} lat latitude
 * @param {*} lon longitude
 */
function AppelAPI(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&lang=fr&appid=${APIKEY}`)
        .then(reponse => {
            return reponse.json();
        })
        .then(data => {

            resultatsAPI = data
            console.log(resultatsAPI);

            majInfos(-1);
        })
}