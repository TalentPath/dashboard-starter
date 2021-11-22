import days from './days.js';


class Weather {
    constructor(city) {
        this.city = city;
        this.apiKey = '6ba7ddab25b8409c97d164306211811';
        this.apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${this.city}&days=5&aqi=no`;
        this.forecast = document.getElementById('forecast');
        this.weatherInterval = null;
        this.weatherInfo = null;
        this.currentIndex = 0;
    }

    setCity(city) {
        this.city = city;
    }

    getCity() {
        return this.city;
    }

    startInterval = () => {
        this.weatherInterval = setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % this.weatherInfo.forecast.forecastday.length;
            this.setWeather(this.weatherInfo, this.currentIndex);
        }, 5000)
    }
    

    setWeather(response, index) {
        this.forecast.innerHTML = '';
        const day = response.forecast.forecastday[index];
        const current = document.createElement('div');
        const expand = document.createElement('p');
        const currentImage = document.createElement('img');
        const currentDate = document.createElement('p');
        const currentTemp = document.createElement('p');
        const currentWind = document.createElement('p');

        expand.setAttribute('id', 'expand');
        expand.innerHTML = 'See 5-day forecast';
        expand.addEventListener('click', (event) => {
            this.expandWeather();
        })
        currentImage.setAttribute('src', day.day.condition.icon);
        currentDate.innerHTML = index === 0 ? 'Today' : days[new Date(day.date).getUTCDay()];
        currentTemp.innerHTML = `${Math.floor(day.day.maxtemp_f)}&deg; F`;
        currentWind.innerHTML = `Wind: ${Math.floor(day.day.maxwind_mph)} mph`;
        current.appendChild(expand);
        current.appendChild(currentImage);
        current.appendChild(currentDate);
        current.appendChild(currentTemp);
        current.appendChild(currentWind);
        this.forecast.appendChild(current);
    }

    expandWeather() {
        clearInterval(this.weatherInterval);
        this.forecast.innerHTML = '';
        const back = document.createElement('p');
        back.setAttribute('id', 'back');
        back.innerHTML = 'Back to 1-day';
        back.addEventListener('click', (event) => {
            this.currentIndex = 0;
            this.setWeather(this.weatherInfo, this.currentIndex);
            this.startInterval();
        })
        this.forecast.appendChild(back);
        this.weatherInfo.forecast.forecastday.forEach((day, i) => {
            const current = document.createElement('div');
            const currentImage = document.createElement('img');
            const currentDate = document.createElement('p');
            const currentTemp = document.createElement('p');
            const currentWind = document.createElement('p');

            currentImage.setAttribute('src', day.day.condition.icon);
            currentDate.innerHTML = i === 0 ? 'Today' : days[new Date(day.date).getUTCDay()];
            currentTemp.innerHTML = `${Math.floor(day.day.maxtemp_f)}&deg; F`;
            currentWind.innerHTML = `Wind: ${Math.floor(day.day.maxwind_mph)} mph`;
            current.appendChild(currentImage);
            current.appendChild(currentDate);
            current.appendChild(currentTemp);
            current.appendChild(currentWind);
            this.forecast.appendChild(current);
        })
    }
    
    render() {
        fetch(this.apiUrl)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.weatherInfo = response;
                
                this.setWeather(this.weatherInfo, this.currentIndex);
                this.startInterval();
            })
    }
}

export default Weather;