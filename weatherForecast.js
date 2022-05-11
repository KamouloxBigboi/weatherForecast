document.addEventListener("DOMContentLoaded", function() {

    let input = document.getElementById('search').value;
    let buttonClick = document.getElementById('search_button');

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

            let URL2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY_2}`

            fetch(URL2)

            .then(response2 => { 
                if (response2.status == 200) {
                    return response2.json() 
                }
                else console.log(`Erreur lorsqu'on a tenté de récupérer les data d'OpenWheatherMap`);
            })
            .then(data2 => {
                let result2 = data2.weather[0].id
                console.log(result2)
                let el = document.getElementById("result");
                
                if (result2 == 800) {
                    el.innerHTML = "<img src=\"./icons/sun.svg\" width=\"400px\" height=\"150px\">";
                }
                if (result2 == 600) {
                    el.innerHTML = "<img src=\"./icons/snow.svg\" width=\"400px\" height=\"150px\">";
                }
                if (result2 == 801) {
                    el.innerHTML = "<img src=\"./icons/cloudy.svg\" width=\"400px\" height=\"150px\">";
                }
                if (result2 == 803) {
                    el.innerHTML = "<img src=\"./icons/clouds.svg\" width=\"400px\" height=\"150px\">";
                }
                if (result2 == 500) {
                    el.innerHTML = "<img src=\"./icons/rain.svg\" width=\"400px\" height=\"150px\">";
                }
            });
        })
        .catch(err => console.log(err))
    });
});