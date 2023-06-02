// --------------(\\
// Composants Vue  \\
// -----------------\\

Vue.component('heure-prevision-bloc', {
    props: ['nom', 'valeur'],
    template: `
      <div class="bloc-h">
        <p class="heure-prevision-nom">{{ nom }}</p>
        <p class="heure-prevision-valeur">{{ valeur }}</p>
      </div>
    `
});

new Vue({
    el: '#heure-prevision-bloc',
    data: {
        previsions: [
            { id: 1, nom: 'lorem', valeur: 'lorem' },
            { id: 2, nom: 'lorem', valeur: 'lorem' },
            { id: 3, nom: 'lorem', valeur: 'lorem' },
            { id: 4, nom: 'lorem', valeur: 'lorem' },
            { id: 5, nom: 'lorem', valeur: 'lorem' },
            { id: 6, nom: 'lorem', valeur: 'lorem' }
        ]
    }
});


Vue.component('jour-prevision-bloc', {
    props: ['id', 'nom', 'numero'],
    template: `
    <div :id="id">
        <p class="jour-prevision-nom">{{ nom }}</p>
        <p class="numero-du-jour">{{ numero }}</p>
    </div>
    `
});

new Vue({
    el: '#jour-prevision-bloc',
    data: {
        jours: [
            { id: -1, nom: 'lorem', numero: 'lorem' },
            { id: 0, nom: 'lorem', numero: 'lorem' },
            { id: 1, nom: 'lorem', numero: 'lorem' },
            { id: 2, nom: 'lorem', numero: 'lorem' },
            { id: 3, nom: 'lorem', numero: 'lorem' },
            { id: 4, nom: 'lorem', numero: 'lorem' }
        ],
        jourActif: -1
    }
});


// ----------------------- \\
// Gestion de l'affichage   \\
// ------------------------- \\

import tabJoursEnOrdre from './Utilitaire/gestionTemps.js';

const APIKEY = '1db618f01129e97ae866956a56ec549f';
let resultatsAPI;


$('.bloc-j').click(function () {
    $('.bloc-j').removeClass('active');
    $(this).addClass('active');
    majInfos($(this).attr('id'));
});



$(document).ready(async function () {
    $(".heure-prevision-nom").css("visibility", "hidden");
    $(".heure-prevision-valeur").css("visibility", "hidden");

    $(".jour-prevision-nom").css("visibility", "hidden");
    $(".numero-du-jour").css("visibility", "hidden");


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
const blocsJoursIdPositif = $('.bloc-j').filter(function () {
    return parseInt($(this).attr('id')) >= 0;
});

/* Cache les valeurs blocs de météo détaillée des 18 prochaines heures 
   quand on clique sur une autre date qu'aujourd'hui
   Permet aussi de remplacer la température minimale par la température
   ressenti */
blocsJoursIdPositif.on('click', function () {
    $(".heure-prevision-nom").css("visibility", "hidden");
    $(".heure-prevision-valeur").css("visibility", "hidden");
    $('.info-supp-nom p').filter(function () {
        return $(this).text() === 'Température Ressenti';
    }).text('Température Minimale');
    $('.temperatureRessenti').removeClass('temperatureRessenti').addClass('temperatureMin');
    majInfos($(this).attr('id'));
});


/* Montre les valeurs blocs de météo détaillée des 18 prochaines heures 
   quand on clique sur la date d'aujourd'hui 
   Permet aussi de remplacer la température ressenti par la température
   minimale */
$('.bloc-j[id="-1"]').on('click', function () {
    $(".heure-prevision-nom").css("visibility", "visible");
    $(".heure-prevision-valeur").css("visibility", "visible");
    $('.info-supp-nom p').filter(function () {
        return $(this).text() === 'Température Minimale';
    }).text('Température Ressenti');
    $('.temperatureMin').removeClass('temperatureMin').addClass('temperatureRessenti');
    $(".temperatureRessenti").text(`${Math.trunc(resultatsAPI.current.feels_like)}°`);
});



function convertVilleEnCoord(ville) {
    axios.get('http://api.openweathermap.org/geo/1.0/direct', {
        params: {
            q: ville,
            limit: 1,
            appid: APIKEY
        }
    })
        .then(response => {
            if (response.data[0]) {
                let infosApi = response.data[0];
                let lat = infosApi.lat;
                let lon = infosApi.lon;
                $(".localisation").text(infosApi.name);
                $(".heure-prevision-nom").css("visibility", "visible");
                $(".heure-prevision-valeur").css("visibility", "visible");
                $(".avant-appel-api-logo-meteo").removeClass("avant-appel-api-logo-meteo");

                $(".jour-prevision-nom").css("visibility", "visible");
                $(".numero-du-jour").css("visibility", "visible");
                AppelAPI(lat, lon);
            } else {
                $(".localisation").text('Ville non trouvée');
                $(".jour").text('');
                $(".temps").text('');
                $(".temperature").text('');
                $(".heure-prevision-nom").css("visibility", "hidden");
                $(".heure-prevision-valeur").css("visibility", "hidden");

                $(".jour-prevision-nom").css("visibility", "hidden");
                $(".numero-du-jour").css("visibility", "hidden");

                $(".logo-meteo").attr("src", "ressources/meteo.png");
            }
        })
        .catch(error => {
            console.error("Erreur lors de l'appel de l'API de conversion de la ville en coordonnées :", error);
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
function majInfos(numJour) {
    const dateActuel = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    // TODAY
    if (numJour == -1) {
        let jourFormate = dateActuel.toLocaleDateString('fr-FR', options);
        // Met la première lettre en majuscule
        jourFormate = jourFormate.charAt(0).toUpperCase() + jourFormate.slice(1);
        $(".jour").text(jourFormate);
        $(".temps").text(resultatsAPI.current.weather[0].description);
        $(".temperature").text(`${Math.trunc(resultatsAPI.current.temp)}°`);
        $(".temperatureRessenti").text(`${Math.trunc(resultatsAPI.current.feels_like)}°`);
        $(".UV").text(`${Math.trunc(resultatsAPI.current.uvi)}°`);
        $(".humidite").text(`${resultatsAPI.current.humidity}%`);
        let ventKMH = convertMSenKH(resultatsAPI.current.wind_speed);
        $(".vent").text(`${ventKMH} km/h`);
        $(".pressionAtmospherique").text(`${resultatsAPI.current.pressure} hpa`);

        let heureActuelle = new Date().getHours();
        const heureAffichee = $('.heure-prevision-nom');
        for (let i = 0; i < heureAffichee.length; i++) {
            let heureIncr = heureActuelle + (i + 1) * 3;

            if (heureIncr > 24) {
                heureAffichee.eq(i).text(`${heureIncr - 24} h`);
            } else if (heureIncr === 24) {
                heureAffichee.eq(i).text('00 h');
            } else {
                heureAffichee.eq(i).text(`${heureIncr} h`);
            }
        }


        const temperatureParHeureAffichee = $('.heure-prevision-valeur');
        for (let j = 0; j < temperatureParHeureAffichee.length; j++) {
            temperatureParHeureAffichee.eq(j).text(`${Math.trunc(resultatsAPI.hourly[(j + 1) * 3].temp)}°`);
        }

        const abbreviationJour = $('.jour-prevision-nom');
        for (let k = 0; k < tabJoursEnOrdre.length; k++) {
            abbreviationJour.eq(k).text(tabJoursEnOrdre[k].slice(0, 3));
        }

        const numeroJour = $('.numero-du-jour');
        for (let j = 0; j < 7; j++) {
            let jour = new Date(dateActuel);
            jour.setDate(jour.getDate() + j);
            numJour = jour.getDate();
            numeroJour.eq(j).text(numJour);
        }


        if (6 < heureActuelle && heureActuelle < 21) {
            $(".logo-meteo").attr("src", `ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`);

        } else {
            $(".logo-meteo").attr("src", `ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg`);

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
        $(".humidite").text(`${resultatsAPI.daily[numJour].humidity}%`);
        let ventKMH = convertMSenKH(resultatsAPI.daily[numJour].wind_speed);
        $(".vent").text(`${ventKMH} km/h`);
        $(".UV").text(`${Math.trunc(resultatsAPI.daily[numJour].uvi)}°`);
        $(".temperatureMin").text(`${Math.trunc(resultatsAPI.daily[numJour].temp.min)}°`);
        $(".pressionAtmospherique").text(`${resultatsAPI.daily[numJour].pressure} hpa`);

        $(".logo-meteo").attr("src", `ressources/jour/${resultatsAPI.daily[numJour].weather[0].icon}.svg`);

    }

}

/**
 * Permet de récupérer les données météorologique d'une ville
 * en connaissant ses coordonnées
 * @param {*} lat latitude
 * @param {*} lon longitude
 */
function AppelAPI(lat, lon) {
    axios.get('https://api.openweathermap.org/data/2.5/onecall', {
        params: {
            lat: lat,
            lon: lon,
            exclude: "minutely",
            units: "metric",
            lang: "fr",
            appid: APIKEY
        }
    })
        .then(function (response) {
            resultatsAPI = response.data;
            majInfos(-1);
        })
        .catch(function (error) {
            console.error("Erreur lors de l'appel de l'API de récupération des données météo :", error);
        });
}


/**
 * Permet de convertit une vitesse exprimé en mètre par seconde
 * en kilométre par heure
 * @param {*} vitesseMS vitesse en m/s
 * @returns vitesse en km/h
 */
function convertMSenKH(vitesseMS) {
    return (Math.trunc(vitesseMS * 3.6))
}
