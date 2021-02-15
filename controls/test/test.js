
GeoLoControl = (function (Control) {

    function GeoLoControl(opt_options) {
        options = opt_options || {}
 
        geoLocButton = document.createElement('button');
        geoLocButton.title = 'GeoLocation';

        element = document.createElement('div');
        element.className = 'geolocation ol-unselectable ol-control';
        element.appendChild(geoLocButton);

        Control.call(this, {
            element: element,
            target: options.target,
        })
        geoLocButton.addEventListener('click', this.handleGeoLoc.bind(this), false)
    }

    if (Control) GeoLoControl.__proto__ = Control
    GeoLoControl.prototype = Object.create(Control && Control.prototype)
    GeoLoControl.prototype.constructor = GeoLoControl

    GeoLoControl.prototype.handleGeoLoc = function () {
        ctrlMap = this.getMap();
        mapView = ctrlMap.getView();
    
        geoLocation = new ol.Geolocation({
            tracking: true,
            trackingOptions: {
                enableHighAccuracy: true
            },
            projection: mapView.getProjection()
        })
        geoLocation.on('change', function () {
            geoLocationCoors = this.getPosition()
            mapView.animate({ center: geoLocationCoors }, { zoom: 15 })
            locationImgElement = document.createElement('img')
            //locationImgElement.setAttribute('src', './iconfinder_location-alt_126573.svg')
            popup = new ol.Overlay({
                element: locationImgElement,
                positioning: 'bottom-center'
            })
            ctrlMap.addOverlay(popup);
            popup.setPosition(geoLocationCoors);
        })
    }

    return GeoLoControl;

}(ol.control.Control))

//map.addControl(new GeoLoControl()); 