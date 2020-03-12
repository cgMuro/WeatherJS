class UI {
    constructor() {
        this.location = document.getElementById('w-location');
        this.desc = document.getElementById('w-desc');
        this.temp = document.getElementById('w-temp');
        this.details = document.getElementById('w-details');
        this.icon = document.getElementById('w-icon');
        this.tempMin = document.getElementById('w-temp-min');
        this.tempMax = document.getElementById('w-temp-max');
        this.humidity = document.getElementById('w-humidity');
        this.feelsLike = document.getElementById('w-feels-like');
        this.dewpoint = document.getElementById('w-dewpoint');
        this.wind = document.getElementById('w-wind');
    }

    paint(weather) {
        this.location.textContent = weather.name;
        this.desc.textContent = weather.weather[0].main;
        this.temp.textContent = tempInFahrenheit(weather.main.temp) + ' F';
        setIcons(weather, this.icon);
        this.tempMin.textContent = `Minimum Temperature: ${tempInFahrenheit(weather.main.temp_min)} F`;
        this.tempMax.textContent = `Maximum Temperature: ${tempInFahrenheit(weather.main.temp_max)} F`;
        this.humidity.textContent = `Relative Humidity: ${weather.main.humidity}%`;
        this.feelsLike.textContent = `Feels Like: ${tempInFahrenheit(weather.main.feels_like)} F`;
        this.wind.textContent = `Wind: ${weather.wind.speed} meter/sec`;
    }

    createIconInList(icon, weather, id) {

        const skycons = new Skycons({ color: 'white' });
        let currentIcon;
        const strIcon = icon;

        if (strIcon.slice(strIcon.length - 1) === 'd') {

            //Weather day
            if (weather === 'Clear') {
                currentIcon = 'CLEAR_DAY';
            } else if (weather === 'Partly Cloudy') {
                currentIcon = 'PARTLY_CLOUDY_DAY';
            } else if (weather === 'Clouds') {
                currentIcon = 'CLOUDY';
            } else if (weather === 'Rain') {
                currentIcon = 'RAIN';
            } else if (weather === 'Clear') {
                currentIcon = 'SLEET';
            } else if (weather === 'Snow') {
                currentIcon = 'SNOW';
            } else if (weather === 'Wind') {
                currentIcon = 'WIND';
            } else if (weather === 'Fog') {
                currentIcon = 'FOG';
            }

        } else if (strIcon.slice(strIcon.length - 1) === 'n') {

            //Weather night
            if (weather === 'Clear') {
                currentIcon = 'CLEAR_NIGHT';
            } else if (weather === 'Clear') {
                currentIcon = 'PARTLY_CLOUDY_NIGHT';
            } else if (weather === 'Clouds') {
                currentIcon = 'CLOUDY';
            } else if (weather === 'Rain') {
                currentIcon = 'RAIN';
            } else if (weather === 'Clear') {
                currentIcon = 'SLEET';
            } else if (weather === 'Snow') {
                currentIcon = 'SNOW';
            } else if (weather === 'Wind') {
                currentIcon = 'WIND';
            } else if (weather === 'Fog') {
                currentIcon = 'FOG';
            }
        }

        skycons.play();
        return skycons.set(id, Skycons[currentIcon]);
    }
}



// Set Icons
function setIcons(object, iconID) {


    const skycons = new Skycons({ color: 'white' });
    let currentIcon;
    const strIcon = object.weather[0].icon;

    if (strIcon.slice(strIcon.length - 1) === 'd') {

        //Weather day
        if (object.weather[0].main === 'Clear') {
            currentIcon = 'CLEAR_DAY';
        } else if (object.weather[0].main === 'Partly Cloudy') {
            currentIcon = 'PARTLY_CLOUDY_DAY';
        } else if (object.weather[0].main === 'Clouds') {
            currentIcon = 'CLOUDY';
        } else if (object.weather[0].main === 'Rain') {
            currentIcon = 'RAIN';
        } else if (object.weather[0].main === 'Clear') {
            currentIcon = 'SLEET';
        } else if (object.weather[0].main === 'Snow') {
            currentIcon = 'SNOW';
        } else if (object.weather[0].main === 'Wind') {
            currentIcon = 'WIND';
        } else if (object.weather[0].main === 'Fog') {
            currentIcon = 'FOG';
        }

    } else if (strIcon.slice(strIcon.length - 1) === 'n') {

        //Weather night
        if (object.weather[0].main === 'Clear') {
            currentIcon = 'CLEAR_NIGHT';
        } else if (object.weather.main === 'Clear') {
            currentIcon = 'PARTLY_CLOUDY_NIGHT';
        } else if (object.weather[0].main === 'Clouds') {
            currentIcon = 'CLOUDY';
        } else if (object.weather[0].main === 'Rain') {
            currentIcon = 'RAIN';
        } else if (object.weather[0].main === 'Clear') {
            currentIcon = 'SLEET';
        } else if (object.weather[0].main === 'Snow') {
            currentIcon = 'SNOW';
        } else if (object.weather[0].main === 'Wind') {
            currentIcon = 'WIND';
        } else if (object.weather[0].main === 'Fog') {
            currentIcon = 'FOG';
        }
    }

    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
}




// Transforming temperature from Kelvin to Fahrenheit
function tempInFahrenheit(temp) {
    return Math.round((temp - 273.15) * (9 / 5) + 32);
}