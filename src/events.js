class Events {
    constructor() {
        this.eventId = 'MjQ1MTgwODh8MTYzNzI2NTk4OS4wODk3ODg';
        this.clientSecret = '8fd98486b0b4659cd1af37d374d7830c1e0bd7f90f615cad937ff1210fa893a1';
        this.eventUrl = `https://api.seatgeek.com/2/events?client_id=${this.eventId}&client_secret=${this.clientSecret}&lat=29.76&lon=-95.36&range=50mi&datetime_local.gte=2021-11-21`
        this.events = null;
        this.eventContainer = document.getElementById('events');
    }

    render() {
        fetch(this.eventUrl)
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                this.events = response.events;

                this.events.forEach(event => {
                    const current = document.createElement('div');
                    current.setAttribute('class', 'event');
                    current.innerHTML = `<p>${new Date(event.datetime_local).getMonth() + 1}/${new Date(event.datetime_local).getDate()}</p>
                        <p>${event.short_title}</p><p>${event.type}</p><p>${event.venue.name}</p>`;
                    this.eventContainer.appendChild(current);
                })
            })
    }
}

export default Events;