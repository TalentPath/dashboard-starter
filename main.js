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

    setLatLon(lat, lon) {
        this.events.lat = lat;
        this.events.lon = lon;
        this.restaurants.lat = lat;
        this.restaurants.lon = lon;
        this.map.lat = lat;
        this.map.lon = lon;
    }

    setCity (city) {
        this.weather.setCity(city);
        const cityH1 = document.getElementById('city');
        const observer = new MutationObserver(() => {
            this.setLatLon(localStorage.lat, localStorage.lon)
            this.events.getEvents(`https://api.seatgeek.com/2/events?client_id=${this.events.eventId}&client_secret=${this.events.clientSecret}&lat=${localStorage.lat}&lon=${localStorage.lon}&range=50mi`);
            this.restaurants.getRestaurants(`https://api.documenu.com/v2/restaurants/search/geo?key=${this.restaurants.restaurantKey}&lat=${localStorage.lat}&lon=${localStorage.lon}&distance=20`);
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
        const reload = document.getElementById('reload');

        reload.addEventListener('click', (event) => {
            this.render();
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