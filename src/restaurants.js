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
        this.restaurantContainer.innerHTML = 'Loading...';
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
                restaurantDiv.setAttribute('class', 'restaurant active');
                restaurantDiv.innerHTML = `<p>${restaurant.restaurant_name} <span>${restaurant.price_range}</span></p>`;
                this.restaurantContainer.appendChild(restaurantDiv);
                restaurantDiv.addEventListener('click', (event) => {
                    this.restaurantContainer.innerHTML = `<h2>${restaurant.restaurant_name} ${restaurant.price_range}</h2>
                    <p>${restaurant.cuisines.join(',')}</p>
                    <a href=${restaurant.restaurant_website} target="_blank" class="active">Website</a>
                    <a href="tel:${restaurant.restaurant_phone}" target="_blank" class="active">Phone</a>
                    <p>${restaurant.address.formatted}<p>
                    <p id="restaurant-directions" class="active">Click Here for Directions</p>
                    <p id="close" class="active">Close<p>`;

                    const close = document.getElementById('close');
                    close.addEventListener('click', (event) => {
                        this.displayResults();
                    })
                    const restaurantDirections = document.getElementById('restaurant-directions');
                    
                    restaurantDirections.addEventListener('click', (event) => {
                        const directions = document.getElementById('directions');
                        const getDirections = document.getElementById('get-directions');
                        directions.style.visibility = 'visible';
                        getDirections.innerHTML = 'Hide Directions';
                        const toAddress = document.getElementById('toAddress');
                        const toCity = document.getElementById('toCity');
                        const toState = document.getElementById('toState');
                        const fromAddress = document.getElementById('from-address');
                        const fromCity = document.getElementById('from-city');
                        const fromState = document.getElementById('from-state');
                        toAddress.value = restaurant.address.street;
                        toCity.value = restaurant.address.city;
                        toState.value = restaurant.address.state;
                        fromAddress.value = localStorage.address;
                        fromCity.value = localStorage.city;
                        fromState.value = localStorage.state;
                    })
                })
            }
        })
    }

    render() {
        this.index = 0;
        this.page = 1;
        this.getRestaurants(this.restaurantUrl);
        const restaurantFilter = document.getElementById('restaurant-filter');
        const cuisine = document.getElementById('cuisine');
        const forward = document.getElementById('forward');
        const back = document.getElementById('back');
        back.style.visibility = 'hidden';
        restaurantFilter.addEventListener('click', (event) => {
            cuisine.style.visibility === 'visible' ? cuisine.style.visibility = 'hidden' : cuisine.style.visibility = 'visible';
        })
        cuisine.addEventListener('change', (event) => {
            const filteredUrl = `https://api.documenu.com/v2/restaurants/search/geo?key=${this.restaurantKey}&lat=${localStorage.lat}&lon=${localStorage.lon}&distance=20&cuisine=${event.target.value}`;
            console.log(filteredUrl);
            this.index = 0;
            back.style.visibility = 'hidden';
            this.restaurantContainer.innerHTML = '';
            this.getRestaurants(filteredUrl);
            cuisine.style.visibility = 'hidden';
        })
        forward.addEventListener('click', (event) => {
            if (this.index === 0) {
                back.style.visibility = 'visible';
            }
            this.index += 5;
            if (this.index + 5 >= this.restaurants.length) {
                forward.style.visibility = 'hidden';
            }
            this.displayResults();
        })
        back.addEventListener('click', (event) => {
            if (this.index + 5 >= this.restaurants.length) {
                forward.style.visibility = 'visible';
            }
            this.index -= 5;
            if (this.index === 0) {
                back.style.visibility = 'hidden';
            }
            this.displayResults();
        })
    }
}

export default Restaurants;