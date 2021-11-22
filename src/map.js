class Map {
    constructor() {
        this.mapKey = 'FeoKqJXdzODDQEfKjHvIGWdIRJj6kEr1';
        this.zoom = 10;
        this.mapUrl = `https://www.mapquestapi.com/staticmap/v5/map?key=${this.mapKey}&center=29.76,-95.36&zoom=${this.zoom}`
        this.mapContainer = document.getElementById('map-image');
    }

    zoomIn() {
        if (this.zoom < 18) {
            this.zoom++;
        }
    }

    zoomOut() {
        if (this.zoom > 0) {
            this.zoom--;
        }
    }

    render() {
        this.zoom = 10;
        this.mapContainer.setAttribute('src', this.mapUrl);
        const plus = document.getElementById('plus');
        const minus = document.getElementById('minus')
    }
}

export default Map;