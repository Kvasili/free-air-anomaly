// window is a global variable of browser

window.onload = init() ; 

function init(){

    var extend = [23.7, 38];

    var map = new ol.Map({
        // view
        // layers
        // target
        view: new ol.View({
            center: ol.proj.fromLonLat(extend), //needs to be projected coords
            zoom : 6,
            maxZoom: 23,
            minZoom: 0,
            rotation : 0
        }),

        layers:[ 
            new ol.layer.Tile({

                source : new ol.source.XYZ({
                    
                    attributionsCollapsible: false,
                    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                    maxZoom: 19

                    }),

                //visible:false,
                //zIndex:2

            })
        ],

        target: "map",
        keyboardEventTarget: document
        // controls : ol.control.defaults().extend([

        //     controlFullScreen,
        //     scaleLIne,
        //     mousePositon,
        //     mapOverVIew

        // ]) 
        
    })

    // uncomment for first edition of free-air-anomalies
    // var wmsTiledLayer = new ol.layer.Tile({
    //   visible: true, //false
    //   source: new ol.source.TileWMS({
    //     url: "http://localhost:8080/geoserver/it.geosolutions/wms",
    //     params: {
    //       FORMAT: "image/png",
    //       VERSION: "1.1.1",
    //       tiled: true,
    //       STYLES: "",
    //       LAYERS: "it.geosolutions:geotiff_coverage",
    //       exceptions: "application/vnd.ogc.se_inimage",
    //       tilesOrigin: 19.4045 + "," + 34.80396388870029,
    //     },
    //   }),
    // });

    var wmsTiledLayer  = new ol.layer.Tile({
      visible: false,
      source: new ol.source.TileWMS({
        url: 'http://localhost:8080/geoserver/it.geosolutions/wms',
        params: {'FORMAT': "image/png", 
                 'VERSION': '1.1.1',
                 tiled: true,
              "STYLES": '',
              "LAYERS": 'it.geosolutions:geotiff_free-air-final',
              "exceptions": 'application/vnd.ogc.se_inimage',
           tilesOrigin: 18.999833333 + "," + 33.000166667
        }
      })
    });

    //map.addLayer(wmsTiledLayer);

    var wmsTiledDEMLayer = new ol.layer.Tile({
      visible: true,
      source: new ol.source.TileWMS({
        url: 'http://localhost:8080/geoserver/it.geosolutions/wms',
        params: {'FORMAT': "image/png", 
                 'VERSION': '1.1.1',
                 tiled: true,
              "STYLES": '',
              "LAYERS": 'it.geosolutions:geotiff_dem-SRTM-WGS-30',
              "exceptions": 'application/vnd.ogc.se_inimage',
           tilesOrigin: 18.610904998 + "," + 34.697753939
        }
      })
    });

    //map.addLayer(wmsTiledDEMLayer);

    map.on('click', function (evt) {  //  , 'pointermove'
        //document.getElementById('info').innerHTML = '';

        var view = map.getView();
        var viewResolution = /** @type {number} */ (view.getResolution());
        var wmsSource = wmsTiledLayer.getSource();
        var url = wmsSource.getFeatureInfoUrl(
          evt.coordinate,
          viewResolution,
          view.getProjection(),
          {'INFO_FORMAT': 'text/html', 'FEATURE_COUNT': 50}
        );
        
        if (url) {
          fetch(url)
            .then(function (response) { 
              return response.text(); })
            .then(function (val) {
              console.log(val); 
            })
            .catch(function(err){ // in case an error occurs 
                console.log(err); 
            });
        }

      });


      map.on('click', function (evt) {  //  , 'pointermove'
          //document.getElementById('info').innerHTML = '';
  
          var view = map.getView();
          var viewResolution = /** @type {number} */ (view.getResolution());
          var wmsSource = wmsTiledDEMLayer.getSource();
          var url = wmsSource.getFeatureInfoUrl(
            evt.coordinate,
            viewResolution,
            view.getProjection(),
            {'INFO_FORMAT': 'text/html', 'FEATURE_COUNT': 50}
          );
          
          if (url) {
            fetch(url)
              .then(function (response) { 
                return response.text(); })
              .then(function (val) {
                console.log(val); 
              })
              .catch(function(err){ // in case an error occurs 
                  console.log(err); 
              });
          }
  
        });
}

//$(document).ready(init());