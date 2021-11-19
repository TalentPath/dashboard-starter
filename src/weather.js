class Weather {
    constructor(city = 'houston') {
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
        const currentTemp = document.createElement('p');
        const currentWind = document.createElement('p');

        currentImage.setAttribute('src', day.day.condition.icon);
        currentTemp.innerHTML = `${Math.floor(day.day.maxtemp_f)}&deg;`;
        currentWind.innerHTML = `${Math.floor(day.day.maxwind_mph)} mph`;
        current.appendChild(currentImage);
        current.appendChild(currentTemp);
        current.appendChild(currentWind);
        this.forecast.appendChild(current);
    }
    
    render() {
        fetch(this.apiUrl)
            .then(response => response.json())
            .then(response => {
                console.log(response.forecast);
                let currentIndex = 0;
                this.setWeather(response, currentIndex)
            })
    }
}

export default Weather;