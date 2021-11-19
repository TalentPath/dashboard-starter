import days from './days.js';

class Weather {
    constructor(city = 'atlanta') {
        this.city = city;
        this.apiKey = '6ba7ddab25b8409c97d164306211811';
        this.apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=6ba7ddab25b8409c97d164306211811&q=${this.city}&days=5&aqi=no`;
        this.forecast = document.getElementById('forecast');
    }

    setCity(city) {
        this.city = city;
    }

    getCity() {
        return this.city;
    }

    setWeather(response, index) {
        const day = response.forecast.forecastday[index];
        const current = document.createElement('div');
        const currentImage = document.createElement('img');
        const currentDate = document.createElement('p');
        const currentTemp = document.createElement('p');
        const currentWind = document.createElement('p');

        currentImage.setAttribute('src', day.day.condition.icon);
        currentDate.innerHTML = index === 0 ? 'Today' : days[new Date(day.date).getUTCDay()];
        currentTemp.innerHTML = `${Math.floor(day.day.maxtemp_f)}&deg;`;
        currentWind.innerHTML = `${Math.floor(day.day.maxwind_mph)} mph`;
        current.appendChild(currentImage);
        current.appendChild(currentDate);
        current.appendChild(currentTemp);
        current.appendChild(currentWind);
        this.forecast.appendChild(current);
    }
    
    render() {
        fetch(this.apiUrl)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                let currentIndex = 0;
                this.setWeather(response, currentIndex);
                const weatherInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % response.forecast.forecastday.length;
                    this.forecast.innerHTML = '';
                    this.setWeather(response, currentIndex);
                }, 5000)
            })
    }
}

export default Weather;