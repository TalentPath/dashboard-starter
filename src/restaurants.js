class Restaurants {
    constructor(lat, lon) {
        this.lat = lat;
        this.lon = lon;
        this.restaurantContainer = document.getElementById('restaurants');
        this.restaurantKey = '44b4e42d38793b31f55325a775609ffe';
        this.size = 100;
        this.restaurantUrl = `https://api.documenu.com/v2/restaurants/search/geo?key=${this.restaurantKey}&lat=${this.lat}&lon=${this.lon}&distance=20&size=${this.size}`;
        this.restaurants = null;
        this.index = 0;
    }


    getRestaurants(url = this.restaurantUrl) {
        fetch(url) 
            .then((response) => response.json())
            .then((response) => {
                this.restaurants = response.data;
                console.log(response)
                this.displayResults();
            })
    }

    displayResults() {
        this.restaurantContainer.innerHTML = '';
        this.restaurants.forEach((restaurant, i) => {
            if (i >= this.index && i < this.index + 5) {
                const restaurantDiv = document.createElement('div');
                restaurantDiv.innerHTML = `<p>${restaurant.restaurant_name} <span>${restaurant.price_range}</span></p><p>${restaurant.cuisines.join(', ')}</p>`;
                this.restaurantContainer.appendChild(restaurantDiv);
                restaurantDiv.addEventListener('click', (event) => {
                    this.restaurantContainer.innerHTML = `<h2>${restaurant.restaurant_name} ${restaurant.price_range}</h2>
                    <p>${restaurant.cuisines.join(',')}</p>
                    <a href=${restaurant.restaurant_website} target="_blank" >Website</a>
                    <a href="tel:${restaurant.restaurant_phone}" target="_blank" >Phone</a>
                    <p>${restaurant.address.formatted}<p>
                    <p id="restaurant-directions">Click Here for Directions</p>`;

                    const restaurantDirections = document.getElementById('restaurant-directions');
                    restaurantDirections.addEventListener('click', (event) => {
                        const directions = document.getElementById('directions');
                        directions.style.visibility = 'visible';
                        const toAddress = document.getElementById('toAddress');
                        const toCity = document.getElementById('toCity');
                        const toState = document.getElementById('toState');
                        toAddress.value = restaurant.address.street;
                        toCity.value = restaurant.address.city;
                        toState.value = restaurant.address.state;
                    })
                })
            }
        })
    }

    render() {
        this.page = 1;
        this.getRestaurants(this.restaurantUrl);
        const restaurantFilter = document.getElementById('restaurant-filter');
        const cuisine = document.getElementById('cuisine');
        const forward = document.getElementById('forward');
        const back = document.getElementById('back');
        restaurantFilter.addEventListener('click', (event) => {
            cuisine.style.visibility === 'visible' ? cuisine.style.visibility = 'hidden' : cuisine.style.visibility = 'visible';
        })
        cuisine.addEventListener('change', (event) => {
            const filteredUrl = `https://api.documenu.com/v2/restaurants/search/geo?key=${this.restaurantKey}&lat=${localStorage.lat}&lon=${localStorage.lon}&distance=20&cuisine=${event.target.value}`;
            console.log(filteredUrl);
            this.restaurantContainer.innerHTML = '';
            this.getRestaurants(filteredUrl);
            cuisine.style.visibility = 'hidden';
        })
        forward.addEventListener('click', (event) => {
            if (this.index === 0) {
                back.style.display = 'contents';
            }
            this.index += 5;
            if (this.index + 5 >= this.restaurants.length) {
                forward.style.display = 'none';
            }
            this.displayResults();
        })
        back.addEventListener('click', (event) => {
            if (this.index + 5 >= this.restaurants.length) {
                forward.style.display = 'contents';
            }
            this.index -= 5;
            if (this.index === 0) {
                back.style.display = 'none';
            }
            this.displayResults();
        })
    }
}

export default Restaurants;