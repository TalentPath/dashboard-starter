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

    render() {
        this.weather.render();
        this.events.render();
        this.restaurants.render();
        this.map.render();
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