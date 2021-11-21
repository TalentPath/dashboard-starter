class Restaurants {
    constructor() {
        this.restaurantContainer = document.getElementById('restaurants');
        this.restaurantKey = '44b4e42d38793b31f55325a775609ffe';
        this.restaurantUrl = `https://api.documenu.com/v2/restaurants/search/geo?key=${this.restaurantKey}&lat=29.76&lon=-95.36&distance=50`;
        this.restaurants = null;
        this.page = 1;
    }

    getRestaurants(url) {
        console.log('working')
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
        this.restaurants.forEach(restaurant => {
            const restaurantDiv = document.createElement('div');
            restaurantDiv.innerHTML = `<p>${restaurant.restaurant_name} <span>${restaurant.price_range}</span></p><p>${restaurant.cuisines.join(', ')}</p>`;
            this.restaurantContainer.appendChild(restaurantDiv);
        })
    }

    render() {
        this.page = 1;
        this.getRestaurants(this.restaurantUrl);
        const restaurantFilter = document.getElementById('restaurant-filter');
        const cuisine = document.getElementById('cuisine');
        restaurantFilter.addEventListener('click', (event) => {
            cuisine.style.visibility === 'visible' ? cuisine.style.visibility = 'hidden' : cuisine.style.visibility = 'visible';
        })
        cuisine.addEventListener('change', (event) => {
            const filteredUrl = this.restaurantUrl + `&cuisine=${event.target.value}`;
            console.log(filteredUrl);
            this.restaurantContainer.innerHTML = '';
            this.getRestaurants(filteredUrl);
            cuisine.style.visibility = 'hidden';
        })
    }
}

export default Restaurants;