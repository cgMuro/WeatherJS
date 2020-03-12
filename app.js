//Init stogare
const storage = new Storage();

//Get stored location data
const weatherLocation = storage.getLocationData();

//Init weather object
const weather = new Weather(weatherLocation.city, weatherLocation.state);

//Init UI
const ui = new UI();


// Selectors
const cityList = document.querySelector('#city-list');
const city = document.getElementById('city');
const state = document.getElementById('state');



//Change location event
document.getElementById('w-change-btn').addEventListener('click', (e) => {

    //Change Location
    if (!city.value == '' && !state.value == '') {
        weather.changeLocation(city.value, state.value);

        //Set location in LS
        storage.setLocationData(city.value, state.value);

        //Get and display weather
        getWeather();

        city.value = '';
        state.value = '';
    } else {
        locationNotFound();
    }

    e.preventDefault();
});


function locationNotFound() {

    const div = document.createElement('div');
    div.textContent = 'PLEASE CHOOSE A VALID CITY AND STATE';
    div.id = 'warning-message'
    div.classList.add('text-light', 'text-center', 'bg-warning', 'mt-5', 'py-3');
    document.querySelector('body').insertBefore(div, document.querySelector('.container-fluid'));
    setTimeout(() => {
        div.remove()
    }, 5000);

    city.value = '';
    state.value = '';
}



// Change temperature
const temp = document.querySelector('#w-temp');
const tempMin = document.querySelector('#w-temp-min');
const tempMax = document.querySelector('#w-temp-max');
const feelsLike = document.querySelector('#w-feels-like');

temp.addEventListener('click', (e) => {

    const temperature = e.target.textContent.split(' ');
    const celsiusTemp = Math.round((temperature[0] - 32) * (5 / 9));
    const fahrenheitTemp = Math.round(temperature[0] * (9 / 5) + 32);

    const temperatureMin = tempMin.textContent.split(' ');
    const celsiusTempMin = Math.round((temperatureMin[2] - 32) * (5 / 9));
    const fahrenheitTempMin = Math.round(temperatureMin[2] * (9 / 5) + 32);

    const temperatureMax = tempMax.textContent.split(' ');
    const celsiusTempMax = Math.round((temperatureMax[2] - 32) * (5 / 9));
    const fahrenheitTempMax = Math.round(temperatureMax[2] * (9 / 5) + 32);

    const temperatureFL = feelsLike.textContent.split(' ');
    const celsiusTempFL = Math.round((temperatureFL[2] - 32) * (5 / 9));
    const fahrenheitTempFL = Math.round(temperatureFL[2] * (9 / 5) + 32);

    if (temperature[1] === 'F') {
        temp.textContent = `${celsiusTemp} °C`;
        tempMin.textContent = `Minimum Temperature: ${celsiusTempMin} °C`;
        tempMax.textContent = `Maximum Temperature: ${celsiusTempMax} °C`;
        feelsLike.textContent = `Feels Like: ${celsiusTempFL} °C`;
    } else {
        temp.textContent = `${fahrenheitTemp} F`;
        tempMin.textContent = `Minimum Temperature: ${fahrenheitTempMin} F`;
        tempMax.textContent = `Maximum Temperature: ${fahrenheitTempMax} F`;
        feelsLike.textContent = `Feels Like: ${fahrenheitTempFL} F`;
    }

})





//Get weather on DOM load
document.addEventListener('DOMContentLoaded', () => {

    getWeather();
    getMultipleWeather();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            getWeatherByCoord(position.coords.latitude, position.coords.longitude);
        });
    } else {
        getWeather();
    }



});


// Get Weather Function
function getWeather() {
    weather.getWeather()
        .then(results => {
            ui.paint(results);
        })
        .catch(err => {
            console.log(err);
            locationNotFound();
        });
};


// Get Weather with Coordinates Function
function getWeatherByCoord(lat, long) {
    weather.getWeatherByCoord(lat, long)
        .then(results => {
            ui.paint(results);

            //Set location in LS
            storage.setLocationData(results.name, results.sys.country);
        })
        .catch(err => console.log(err));
};


// Get Multiple Weather Locations with ids Function
function getMultipleWeather() {
    weather.getMultipleWeather()
        .then(results => {
            let output = '';
            results.list.forEach(data => {

                output += `
                    <div class="row city-list-item px-4 py-4" id="${data.id}">
                        <h5 class="text-light col-md-3 my-auto">${data.name.toUpperCase()}</h5>
                        <!-- <canvas width="128" height="128" id="${data.id}"></canvas> -->
                        <h6 class="col-md-3 my-auto"><span class="text-white">Weather:</span> ${data.weather[0].main.toUpperCase()}</h6>
                        <p class="text-light col-md my-auto">T: ${tempInFahrenheit(data.main.temp)} F</p>
                        <p class="text-light col-md my-auto">TMin: ${tempInFahrenheit(data.main.temp_min)} F</p>
                        <p class="text-light col-md my-auto">TMax: ${tempInFahrenheit(data.main.temp_max)} F</p>
                        <p class="text-light col-md my-auto">Humidity: ${data.main.humidity}%</p>
                    </div>
                `;
            });

            cityList.innerHTML = output;
            

        })
        .catch(err => console.log(err));
}


// Change city through city list
const cityListItem = document.querySelector('.city-list-item');

cityList.addEventListener('click', (e) => {
    if (e.target.id && !e.target.width) {
        const id = e.target.id;
        getWeatherById(id);
    } else if (e.target.parentElement.id && e.target.parentElement.id !== 'city-list') {
        const id = e.target.parentElement.id;
        getWeatherById(id);
    }

    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
})



// Get Weather through id Function
function getWeatherById(id) {
    weather.getWeatherById(id)
        .then(data => {
            weather.changeLocation(data.list[0].name, data.list[0].sys.country);

            //Set location in LS
            storage.setLocationData(city, state);

            //Get and display weather
            getWeather();
        })
        .catch(err => console.log(err));
};