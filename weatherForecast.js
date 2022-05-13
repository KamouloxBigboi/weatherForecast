document.addEventListener("DOMContentLoaded", function() {

    // Créer input et bouton

    let input = document.getElementById('search').value;
    let buttonClick = document.getElementById('search_button');
    let selectDays = document.getElementById('selectDays');
    let nDays = selectDays.options[selectDays.selectedIndex].value
    console.log(nDays)

    // Créer l'event qui suit le click sur le bouton

    buttonClick.addEventListener('click', function(event) {

        event.preventDefault();
        
        const API_KEY = "c46400a6732a496faadf147afdbd17f8"

        let URL = `https://api.opencagedata.com/geocode/v1/json?q=${input}&key=${API_KEY}&language=fr&pretty=1`

        fetch(URL) // on utilise la methode fetch, qui est asynchrone et qui existe par défaut dans le navigateur (on aurait aussi pu utiliser la librairie axios par exemple)
        // on utilise la méthode then() (NB: on pourrait aussi utiliser la syntaxe async/await)
        .then(response => { 
            if (response.status == 200) { // on vérifie que l'appel à l'API a fonctionné
                return response.json()  // ne pas oublier le return du callback
        }
        else console.log(`Erreur lorsqu'on a tenté de récupérer les data de géolocalisation`);
        })
        .then(data => {
            let result = data.results[0].geometry;
            console.log(result);

            let lat = result.lat
            let lon = result.lng 
            
        // Deuxième API; récupérer les data de geometry et afficher résultat en fonction de l'ID
        // i.e : if id = 800 innerhtml.src : icône du beau temps...

            const API_KEY_2 = "c512e8d95b8c68fbc1f680cf5953680f"


            let URL2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${API_KEY_2}`

            fetch(URL2)

            .then(response2 => { 
                if (response2.status == 200) {
                    return response2.json() 
                }
                else console.log(`Erreur lorsqu'on a tenté de récupérer les data d'OpenWheatherMap`);
            })
                .then(data2 => {
                
                    console.log(data2)

                    let selectDays = document.getElementById('selectDays');
                    let nDays = selectDays.options[selectDays.selectedIndex].value
                    console.log(nDays)
                    
                    for(i=0; i<nDays; i++) {

                        let newResult = data2.daily[i].weather[0].id;
                        console.log(newResult)

                        let el = document.getElementById("result");
                        let element2 = document.createElement("div");

                        if ( newResult == 800) {
                            el.appendChild(element2).innerHTML = "<img src=\"./icons/sun.svg\" width=\"200px\" height=\"75px\">";
                        }
                            else if (newResult >= 600 && newResult <= 631) {
                                el.appendChild(element2).innerHTML = "<img src=\"./icons/snow.svg\" width=\"200px\" height=\"75px\">";
                        }
                            else if (newResult > 800 ) {
                                el.appendChild(element2).innerHTML = "<img src=\"./icons/cloudy.svg\" width=\"200px\" height=\"75px\">";
                        }
                        //     else if (newResult == 803 && newResult == 804) {
                        //         el.appendChild(element2).innerHTML = "<img src=\"./icons/clouds.svg\" width=\"200px\" height=\"75px\">";
                        // }
                            else if ( newResult >= 500 && newResult <= 531) {
                                el.appendChild(element2).innerHTML = "<img src=\"./icons/rain.svg\" width=\"200px\" height=\"75px\">";
                        }

                    //Déclarer et Récupérer Date du jour

                        const myDate = new Date();
                        const curr_day = myDate.getDay();
                        let week = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche", "Lundi", "Mercredi", "Vendredi", "Samedi", "Dimanche"];

                    // Afficher 4 jours

                        let day = week[curr_day + i];
                        let element = document.createElement("h3");
                        let newDiv = document.getElementById("day");
                        newDiv.appendChild(element).innerHTML = `${day}`;
                        console.log(day);
                    
                        // Afficher icône météo en fonction de l'I
                    }
                });
            })
        .catch(err => console.log(err))
    });
});