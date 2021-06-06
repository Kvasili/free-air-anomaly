
var extend = [23.7, 38];

var map = new ol.Map({
  
    view: new ol.View({
        center: ol.proj.fromLonLat(extend), //needs to be projected coords
        zoom : 6, 
        //maxZoom: 23,
        minZoom: 0,
        rotation : 0
    }),

    layers:[

        new ol.layer.Tile({

            source : new ol.source.XYZ({
                
                attributionsCollapsible: false,
                url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'

                }),
            //visible:false,
            //zIndex:2
            dem: false
        })
    ],

    target: "map",
    keyboardEventTarget: document
})


var layerGeoid = new ol.layer.Tile({
    
    source : new ol.source.XYZ({
                
        attributionsCollapsible: false,
        url:'data/hellas-geoid-rgb-tiles/{z}/{x}/{y}.png',
        crossOrigin:'anonymous'

    }),
    visible:true,
    //zIndex:2,
    dem: true
    
})

//map.addLayer(layerGeoid);


var layerFaa = new ol.layer.Tile({
    
    source : new ol.source.XYZ({
                
        attributionsCollapsible: false,
        url:'data/faa-rgb-tiles/{z}/{x}/{y}.png',
        crossOrigin:'anonymous'

    }),
    visible:true,
    zIndex:2,
    dem: true,
    opacity: 1
    
})

map.addLayer(layerFaa); 
var _pixelToHeight = function (value) {
    return (
      -10000 +
      (value[0] * 256 * 256 + value[1] * 256 + value[2]) * 0.1
    ).toFixed(0);
}

var _getElevationByPixel = function (pixel) {

    return map.forEachLayerAtPixel(pixel,
        function (layer, value) {
            console.log(value);
            return _pixelToHeight(value); //convert rgb to height value
        }
    );
  }

  map.on('click', function (evt) {  //  , 'pointermove' 'click'

    var map = evt.map;
    //get coordinates of center map view
    var center = ol.proj.toLonLat( map.getView().getCenter() );
    var clicked = evt.coordinate;
    console.log(clicked);
    //ui.paintWgs(center); 

    //var egsa = fl2EGSA87(center[1], center[0]);
    // //console.log(egsa[0].toFixed(0));
    //ui.paintEgsa(egsa); 

    //var faa = idw.idwPow2(center[1], center[0]);
    //console.log(faa); 
    // ui.paintFaa(faa); 
    // ui.paintFaa2(faa); 
    // var coordsWgs=ol.proj.transform(evt.coordinate,"EPSG:3857","EPSG:4326");
    var _pixel = map.getPixelFromCoordinate(evt.coordinate);
    console.log(_pixel);
    var test = _getElevationByPixel(_pixel); 
    console.log(test); 

});


// map.getPixelFromCoordinate(coordB);

// _pixelToHeight: function (value) {
//     return (
//       -10000 +
//       (value[0] * 256 * 256 + value[1] * 256 + value[2]) * 0.1
//     ).toFixed(0);
//   },
//   _getElevationByPixel: function (pixel) {
//     return app._map.forEachLayerAtPixel(
//       pixel,
//       function (layer, value) {
//         return ownrgControl._pixelToHeight(value); //convert rgb to height value
//       },
//       {
//         layerFilter: function (layer) {
//           return layer.getProperties().dem; //filter for retrieve only dem rgb value -at the respective dem TMS layer, a dem boolean value should be defined, with value true
//         },
//       }
//     );
//   }