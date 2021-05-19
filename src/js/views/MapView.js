import {createAlert} from './../helpers'

class Map {
    #map;
    #mapZoomLevel = 13;
    #mapEvent;
    #northEastBounds = [44.49589310341624, 18.781642913818363]
    #southWestBounds = [44.40275975498712, 18.517971038818363]
    #message = 'Zahvaljujemo Vam se na unapređenju Sigurnih Staza Živinice! Obeležite lokaciju na mapi, koristeći alate za crtanje u donjem levom uglu, dodajte fotografiju i postavite kratak opis.'
    #parentEl = document.querySelector('.home')
    #alert = document.querySelector('.alert')

    addHandlerRender(handler) {
        window.addEventListener('load', handler)
    }

    loadMap() {
        this.#map = L.map('map', {
            center: [44.44929, 18.64978],
            zoom: this.#mapZoomLevel,
            maxBounds: [this.#northEastBounds, this.#southWestBounds],
            minZoom: 12
        })

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        this.loadToolbar()
    }

    loadToolbar() {
        var drawnItems = new L.FeatureGroup()
        this.#map.addLayer(drawnItems)

        var drawControl = new L.Control.Draw({
            position: 'topright',
            draw: {
                circlemarker: false
            },
            edit: {
                featureGroup: drawnItems
            }
        })
                
        this.#map.addControl(drawControl)
        drawControl._container.classList.add('toolbar-btn--hidden')

        L.easyButton({
            id: 'edit-shapes',
            position: 'topright',
            states: [{
                onClick: () => {
                    if(drawControl._container.classList.contains('toolbar-btn--hidden')) {
                        createAlert(this.#alert, this.#message, 10000)
                    }
                    drawControl._container.classList.toggle('toolbar-btn--hidden')
                },
                title: 'Omogući/Onemogući dodavanje podataka',
                icon: 'fas fa-edit'
            }]
        }).addTo(this.#map)
    }
}

export default new Map() 

