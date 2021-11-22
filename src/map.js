class Map {
    constructor(lat, lon) {
        this.lat = lat;
        this.lon = lon;
        this.mapKey = 'FeoKqJXdzODDQEfKjHvIGWdIRJj6kEr1';
        this.zoom = 10;
        this.mapUrl = `https://www.mapquestapi.com/staticmap/v5/map?key=${this.mapKey}&center=${this.lat},${this.lon}&zoom=${this.zoom}`
        this.mapContainer = document.getElementById('map-image');
        this.traffic = false;
    }

    setMap(lat, lon) {
        const currentUrl = `https://www.mapquestapi.com/staticmap/v5/map?key=${this.mapKey}&center=${lat},${lon}&zoom=${this.zoom}`
        this.mapContainer.setAttribute('src', currentUrl);
        this.lat = lat;
        this.lon = lon;
    }

    zoomIn() {
        if (this.zoom < 18) {
            this.zoom++;
            this.mapUrl = this.traffic ? `https://www.mapquestapi.com/staticmap/v5/map?key=${this.mapKey}&center=${this.lat},${this.lon}&zoom=${this.zoom}&traffic=flow`
                : `https://www.mapquestapi.com/staticmap/v5/map?key=${this.mapKey}&center=${this.lat},${this.lon}&zoom=${this.zoom}`;
            this.mapContainer.setAttribute('src', this.mapUrl);
        }
    }

    zoomOut() {
        if (this.zoom > 0) {
            this.zoom--;
            this.mapUrl = this.traffic ? `https://www.mapquestapi.com/staticmap/v5/map?key=${this.mapKey}&center=${this.lat},${this.lon}&zoom=${this.zoom}&traffic=flow`
                : `https://www.mapquestapi.com/staticmap/v5/map?key=${this.mapKey}&center=${this.lat},${this.lon}&zoom=${this.zoom}`;
            this.mapContainer.setAttribute('src', this.mapUrl);
        }
    }

    render() {
        this.mapContainer.setAttribute('src', this.mapUrl);
        const plus = document.getElementById('plus');
        const minus = document.getElementById('minus');
        const traffic = document.getElementById('traffic');

        plus.addEventListener('click', (event) => {
            this.zoomIn();
        })
        minus.addEventListener('click', (event) => {
            this.zoomOut();
        })
        traffic.addEventListener('click', (event) => {
            event.preventDefault();

            if (event.target.innerHTML === 'See Traffic') {
                event.target.innerHTML = 'Hide Traffic';
                const currentUrl = `https://www.mapquestapi.com/staticmap/v5/map?key=${this.mapKey}&center=${this.lat},${this.lon}&zoom=${this.zoom}&traffic=flow`;
                this.mapContainer.setAttribute('src', currentUrl);
                this.traffic = true;
            } else {
                event.target.innerHTML = 'See Traffic';
                this.mapContainer.setAttribute('src', `https://www.mapquestapi.com/staticmap/v5/map?key=${this.mapKey}&center=${this.lat},${this.lon}&zoom=${this.zoom}`);
                this.traffic = false;
            }
        })
    }
}

export default Map;