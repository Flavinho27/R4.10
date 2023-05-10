import tabJoursEnOrdre from './Utilitaire/gestionTemps.js';

const APIKEY = '1db618f01129e97ae866956a56ec549f';
let resultatsAPI;

const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const heure = document.querySelectorAll('.heure-prevision-nom');
const localisation = document.querySelector('.localisation');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');
const joursDiv = document.querySelectorAll('.jour-prevision-nom');
const tempJoursDiv = document.querySelectorAll('.jour-prevision-temp');
const imgIcone = document.querySelector('.logo-meteo');

const blocJours = document.querySelectorAll('.bloc-j');
blocJours.forEach(e => {
    e.addEventListener('click', () => {
        for (let i = 0; i < blocJours.length; i++) {
            blocJours[i].classList.remove('active');
        }
        e.classList.add('active');
        AppelDaily(e.id);
    })
});

document.getElementById("recupVille").addEventListener("submit", function(event) {
    // Empêche le rechargement de la page par défaut lors de la soumission du formulaire
    event.preventDefault(); 
    // Récupérer la valeur saisie
    var ville = document.getElementById("ville").value;
  
    convertVilleEnCoord(ville);

    document.getElementById("recupVille").reset();
  });


function convertVilleEnCoord(ville) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${ville}&limit=1&appid=${APIKEY}`)
    .then(reponse => {
        return reponse.json();
    })
    .then(data => {

        resultatsAPI = data
        var lat = resultatsAPI[0].lat;
        var lon = resultatsAPI[0].lon;
        AppelAPI(lat, lon)
    })
}

function AppelDaily(jourNumber) {
    temps.innerText = resultatsAPI.daily[jourNumber].weather[0].description;
    console.log(resultatsAPI.daily[jourNumber].weather[0].description);
    temperature.innerText = `${Math.trunc(resultatsAPI.daily.temp)}°`;
    localisation.innerText = resultatsAPI.timezone;

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

    for (let m = 0; m < tabJoursEnOrdre.length; m++) {
        tempJoursDiv[m].innerText = `${Math.trunc(resultatsAPI.daily[m + 1].temp.day)}°`;
    }

    if (6 < heureActuelle && heureActuelle < 21) {
        imgIcone.src = `ressources/jour/${resultatsAPI.daily.weather[jourNumber].icon}.svg`;
    } else {
        imgIcone.src = `ressources/nuit/${resultatsAPI.daily.weather[jourNumber].icon}.svg`
    }
}

function AppelAPI(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&lang=fr&appid=${APIKEY}`)
        .then(reponse => {
            return reponse.json();
        })
        .then(data => {

            resultatsAPI = data
            console.log(resultatsAPI);

            temps.innerText = resultatsAPI.current.weather[0].description;
            temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`;
            localisation.innerText = resultatsAPI.timezone;

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

            for (let m = 0; m < tabJoursEnOrdre.length; m++) {
                tempJoursDiv[m].innerText = `${Math.trunc(resultatsAPI.daily[m + 1].temp.day)}°`;
            }

            if (6 < heureActuelle && heureActuelle < 21) {
                imgIcone.src = `ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`;
            } else {
                imgIcone.src = `ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg`
            }

            chargementContainer.classList.add('disparition');
            AppelDaily(0);
        })
}