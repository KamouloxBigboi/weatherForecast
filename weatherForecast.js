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
        else console.log(`Erreur lorsqu'on a tenté de récupérer les data`);
        })
        .then(data => {
            console.log(data.results[0].geometry);
        })
    .   catch(err => console.log(err))
        
        let lat = geometry.lat;
        let lng = geometry.lng;

        const API_KEY_2 = "c512e8d95b8c68fbc1f680cf5953680f"

        let URL2 = 'https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key_2}'
        .then(response2 => { 
            if (response2.status == 200) {
                return response2.json() 
        }
        else console.log(`Erreur lorsqu'on a tenté de récupérer les data`);
        })
        .then(data2 => {
            console.log(data2)
        })
        
    });
});