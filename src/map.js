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
        const directions = document.getElementById('directions');

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
        directions.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData);
            const from = `${data.fromAddress.split(' ').join('+')},${data.fromCity},${data.fromState}`;
            const to = `${data.toAddress.split(' ').join('+')},${data.toCity},${data.toState}`;
            const directionBox = document.getElementById('direction-box');
            event.target.style.visibility = 'hidden';

            fetch(`http://www.mapquestapi.com/directions/v2/route?key=${this.mapKey}&from=${from}&to=${to}`)
                .then(response => response.json())
                .then(response => {
                    console.log(response);
                    const map = document.getElementById('map');
                    response.route.legs[0].maneuvers.forEach((maneuver, i) => {
                        const current = document.createElement('div');
                        const text = document.createElement('span');
                        const lineBreak = document.createElement('br');
                        const image = document.createElement('img');
                        image.setAttribute('src', maneuver.iconUrl);
                        text.innerHTML = `${maneuver.narrative} - ${maneuver.distance.toFixed(1)} miles`;
                        current.appendChild(image);
                        current.appendChild(text);
                        current.appendChild(lineBreak);
                        if (i !== response.route.legs[0].maneuvers.length - 1) {
                            const mapFull = document.createElement('img');
                            mapFull.setAttribute('src', maneuver.mapUrl);
                            current.appendChild(mapFull);
                        }
                        directionBox.appendChild(current);
                        
                    })
                })
        })
    }
}

export default Map;