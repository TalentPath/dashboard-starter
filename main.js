import Weather from './src/weather.js';
import Events from './src/events.js';
import Restaurants from "./src/restaurants.js";
import Map from './src/map.js';

class Main {
    constructor() {
        this.city = localStorage.city || 'houston';
        this.lat = localStorage.lat || '29.76';
        this.lon = localStorage.lon || '-95.36';
        this.weather = new Weather(this.city);
        this.events = new Events(this.lat, this.lon);
        this.restaurants = new Restaurants(this.lat, this.lon);
        this.map = new Map(this.lat, this.lon);
    }

    setCity (city) {
        this.weather.setCity(city);
        const cityH1 = document.getElementById('city');
        const observer = new MutationObserver(() => {
            this.events.getEvents(localStorage.lat, localStorage.lon);
            this.restaurants.getRestaurants(localStorage.lat, localStorage.lon);
            this.map.setMap(localStorage.lat, localStorage.lon)
        })
        observer.observe(cityH1, {attributes: true});
    }

    render() {
        this.weather.render();
        this.events.render();
        this.restaurants.render();
        this.map.render();
        const changeForm = document.getElementById('change-form');
        const change = document.getElementById('change');
        const cityInput = document.getElementById('city-input');

        window.addEventListener('storage', (event) => {
            console.log('worked');
        })
        change.addEventListener('click', (event) => {
            changeForm.style.visibility = 'visible';
        })
        changeForm.addEventListener('submit', (event) => {
            event.preventDefault();

            this.city = cityInput.value;
            console.log(cityInput.value);
            this.setCity(cityInput.value);
        })
    }
}

const main = new Main();
main.render();

// const weather = new Weather();
// weather.render();

// const events = new Events();
// events.render();

// const restaurants = new Restaurants();
// restaurants.render();

// const map = new Map();
// map.render();