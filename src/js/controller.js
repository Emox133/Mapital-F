import mapView from './views/MapView'

const controlMap = () => {
    mapView.loadMap()
}

const init = () => {
    mapView.addHandlerRender(controlMap)
}

init()