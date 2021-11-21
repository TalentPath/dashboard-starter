class Restaurants {
    constructor() {
        this.restaurantContainer = document.getElementById('restaurants');
        this.restaurantKey = '44b4e42d38793b31f55325a775609ffe';
        this.restaurantUrl = `https://api.documenu.com/v2/restaurants/search/fields?key=${this.restaurantKey}&lat=29.76&lon=-95.36&pricerange&cuisines&limit=25`
        this.restaurants = null;
        this.restaurantIndex = 0;
    }

    getRestaurants(url) {
        fetch(url) 
            .then((response) => response.json())
            .then((response) => {
                this.restaurants = response.data.filter(restaurant => restaurant.price_range !== '');
                console.log(this.restaurants)
                this.displayResults();
            })
    }

    displayResults() {
        for (let i = this.restaurantIndex; i < this.restaurantIndex + 5; i++) {
            const restaurant = document.createElement('div');
            restaurant.innerHTML = `<p>${this.restaurants[i].restaurant_name}</p><p>${this.restaurants[i].cuisines.join(', ')}</p><p>${this.restaurants[i].price_range}</p>`;
            this.restaurantContainer.appendChild(restaurant);
        }
    }

    render() {
        this.restaurantIndex = 0;
        this.getRestaurants(this.restaurantUrl);
    }
}

export default Restaurants;