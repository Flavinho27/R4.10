import tabJoursEnOrdre from './Utilitaire/gestionTemps.js';

const APIKEY = '1db618f01129e97ae866956a56ec549f';

const heure = document.querySelectorAll('.heure-prevision-nom');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');
const joursDiv = document.querySelectorAll('.jour-prevision-nom');
const numeroDuJour = document.querySelectorAll('.numero-du-jour');

// blocJours.forEach(e => {
//     e.addEventListener('click', () => {
//         for (let i = 0; i < blocJours.length; i++) {
//             blocJours[i].classList.remove('active');
//         }
//         e.classList.add('active');
//         majInfos(e.id);
//     })
// });


$(document).ready(async function () {
    $(".bloc-h").hide();
    $(".bloc-j").hide();


    try {
        $("#recupVille").submit(function (event) {
            event.preventDefault();
            var ville = $("#ville").val();
            convertVilleEnCoord(ville);

            $("#recupVille")[0].reset();
        });
    } catch (error) {
    }
});


// Utilise la méthode filter pour filtrer les blocsJours avec un ID positif
const blocsJoursIdPositif = Array.from(blocJours).filter(function (bloc) {
    return parseInt(bloc.id) >= 0;
});

// Ajoute un gestionnaire d'événement de clic à chaque case avec un ID positif
for (let i = 0; i < blocsJoursIdPositif.length; i++) {
    blocsJoursIdPositif[i].addEventListener('click', function () {
        console.log(blocsJoursIdPositif.length);
        // Ajoute la classe .invisible à chaque bloc à cacher
        for (let j = 0; j < blocsHeure.length; j++) {
            blocsHeure[j].classList.add('invisible');
        }
    });
}

// Utilise la méthode filter pour filtrer les blocsJours avec un ID égal à -1
const blocsJoursIdNégatif = Array.from(blocJours).filter(function (bloc) {
    return parseInt(bloc.id) == -1;
});

// Ajoute un gestionnaire d'événement de clic à la case avec un ID égal à -1    
blocsJoursIdNégatif[0].addEventListener('click', function () {
    // Supprime la classe .invisible à chaque bloc à cacher
    for (let j = 0; j < blocsHeure.length; j++) {
        blocsHeure[j].classList.remove('invisible');
    }
});



/**
 * Permet d'obtenir les coordonnées d'une ville en fonction de son nom
 * @param {*} ville le nom de la ville dont on souhaite obtenir les coordonnées
 */
function convertVilleEnCoord(ville) {
    $.ajax({
        url: `http://api.openweathermap.org/geo/1.0/direct`,
        data: {
            q: ville,
            limit: 1,
            appid: APIKEY
        },
        success: function (response) {
            if (response[0]) {
                let infosApi = response[0];
                let lat = infosApi.lat;
                let lon = infosApi.lon;
                $(".localisation").text(infosApi.name);
                $(".bloc-h").show();
                $(".bloc-j").show();
                console.log(response);
                console.log(infosApi.name);
                AppelAPI(lat, lon)
            } else {
                $(".localisation").text('Ville non trouvée');
                $(".jour").text('');
                $(".temps").text('');
                $(".temperature").text('');
                $(".bloc-h").hide();
                $(".bloc-j").hide();
                $(".logo-meteo").attr("src", "ressources/meteo.png");
            }
        },
        error: function (error) {
            console.error("Erreur lors de l'appel de l'API :", error);
        }
    });
}


/**
 * Met à jour les informations de l'application (date, temps et température)
 * Par défaut les informations du jour sont affichés
 * Lors du clic sur une case correspondant à un jour, les informations correspondantes
 * seront affichées
 * @param {*} numJour numéro du jour. Par convention, -1 correspond à aujourd'hui, 
 * 0 correspond à demain, 1 correspond à après-demain, etc
 */
function majInfos(numJour, resultatsAPI) {
    const dateActuel = new Date()
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    // TODAY
    if (numJour == -1) {
        let jourFormate = dateActuel.toLocaleDateString('fr-FR', options);
        // Met la première lettre en majuscule
        jourFormate = jourFormate.charAt(0).toUpperCase() + jourFormate.slice(1);
        $(".jour").text(jourFormate);
        $(".temps").text(resultatsAPI.current.weather[0].description);
        $(".temperature").text(`${Math.trunc(resultatsAPI.current.temp)}°`);

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
        let jourFormate = jourClique.toLocaleDateString('fr-FR', options);
        // Met la première lettre en majuscule
        jourFormate = jourFormate.charAt(0).toUpperCase() + jourFormate.slice(1);
        $(".jour").text(jourFormate);
        $(".temps").text(resultatsAPI.daily[numJour].weather[0].description);
        $(".temperature").text(`${Math.trunc(resultatsAPI.daily[numJour].temp.day)}°`);

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
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/onecall`,
        data: {
            lat: lat,
            lon: lon,
            exclude: "minutely",
            units: "metric",
            lang: "fr",
            appid: APIKEY
        },
        success: function (response) {
            majInfos(-1, response);
        }
    });
}
