class Weather {
    constructor(city = 'houston') {
        this.city = city;
        this.apiKey = '6ba7ddab25b8409c97d164306211811';
        this.apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=6ba7ddab25b8409c97d164306211811&q=${this.city}&days=5&aqi=no`;
        this.forecast = document.getElementById('forecast');
    }

    static greet() {
        console.log('hello');
    }

    setCity(city) {
        this.city = city;
    }

    getCity() {
        return this.city;
    }
    
    render() {
        this.forecast.innerHTML = 'Hello';
        // fetch(this.apiUrl)
        //     .then(response => response.json)
        //     .then(response => {

        //     })
    }
}

export default Weather;