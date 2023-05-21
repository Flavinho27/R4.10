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
   quand on clique sur une autre date qu'aujourd'hui */
blocsJoursIdPositif.on('click', function () {
    $(".heure-prevision-nom").css("visibility", "hidden");
    $(".heure-prevision-valeur").css("visibility", "hidden");
    $('.info-supp-nom p').filter(function() {
        return $(this).text() === 'Température Ressenti';
      }).text('Température Maximale');
      $('.temperatureRessenti').removeClass('temperatureRessenti').addClass('temperatureMax');
});


/* Montre les valeurs blocs de météo détaillée des 18 prochaines heures 
   quand on clique sur la date d'aujourd'hui */
$('.bloc-j[id="-1"]').on('click', function () {
    $(".heure-prevision-nom").css("visibility", "visible");
    $(".heure-prevision-valeur").css("visibility", "visible");
    $('.info-supp-nom p').filter(function() {
        return $(this).text() === 'Température Maximale';
      }).text('Température Ressenti');
      $('.temperatureMax').removeClass('temperatureMax').addClass('temperatureRessenti');
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
                $(".heure-prevision-nom").css("visibility", "visible");
                $(".heure-prevision-valeur").css("visibility", "visible");
                $(".avant-appel-api-logo-meteo").removeClass("avant-appel-api-logo-meteo");

                $(".jour-prevision-nom").css("visibility", "visible");
                $(".numero-du-jour").css("visibility", "visible");

                AppelAPI(lat, lon)
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
        $(".humidite").text(resultatsAPI.current.humidity);
        $(".vent").text(resultatsAPI.current.wind_speed);
        $(".pressionAtmospherique").text(resultatsAPI.current.pressure);

        console.log(resultatsAPI.current);

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
        console.log(resultatsAPI);
        $(".jour").text(jourFormate);
        $(".temps").text(resultatsAPI.daily[numJour].weather[0].description);
        $(".temperature").text(`${Math.trunc(resultatsAPI.daily[numJour].temp.day)}°`);
        $(".humidite").text(resultatsAPI.daily[numJour].humidity);
        $(".vent").text(resultatsAPI.daily[numJour].wind_speed);
        $(".UV").text(`${Math.trunc(resultatsAPI.daily[numJour].uvi)}°`);
        $(".temperatureMax").text(`${Math.trunc(resultatsAPI.daily[numJour].temp.max)}°`);
        $(".pressionAtmospherique").text(resultatsAPI.daily[numJour].pressure);

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
            resultatsAPI = response;
            majInfos(-1);
        }
    });
}
