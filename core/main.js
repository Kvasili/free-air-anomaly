
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
                url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                maxZoom: 19

                }),
            //visible:false,
            //zIndex:2
        })
    ],

    target: "map",
    keyboardEventTarget: document
})


var layerFAA = new ol.layer.Tile({
    
    source : new ol.source.XYZ({
                
        attributionsCollapsible: false,
        //url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        url:'data/test/{z}/{x}/{y}.png',
        maxZoom: 19

    }),
    visible:true,
    zIndex:2
    
})

// map.addLayer(layerFAA);
// map.removeLayer(layerFAA);


function getWeather(){


    weather.getWeather()
        .then(res => ui.paintWeather(res)) // console.log(res)
        .catch(err => console.log(err)); 
    
    }

// map.on('pointermove', function (evt) {  //  , 'pointermove' 'click'
// //document.getElementById('info').innerHTML = '';

//     var ckickedCoord = evt.coordinate; //epsg:3857
//     //console.log(ckickedCoord); 
//     var lonlat = ol.proj.transform(ckickedCoord, 'EPSG:3857', 'EPSG:4326');
//     console.log(lonlat); 
//     ui.paintWgs(lonlat); 
//     // set data to localStorage
//     storage.setLocationData(lonlat[1], lonlat[0]); 
//     //weather conditon of clicked coords
//     // weather.changeLocation([storage.getLocationData().lat, storage.getLocationData().lat]);
//     // weather.getWeather()
//     //       .then(res => ui.paintWeather(res)) // console.log(res)
//     //       .catch(err => console.log(err));

//     var X = idw.calculatePixelsDem(lonlat[1], lonlat[0]);
//     console.log(X); 

//     var egsa = fl2EGSA87(lonlat[1], lonlat[0]);
//     //console.log(egsa[0].toFixed(0));
//     ui.paintEgsa(egsa); 

//     var faa = idw.idwPow2(lonlat[1], lonlat[0]);
//     console.log(faa); 
//     ui.paintFaa(faa); 
//     ui.paintFaa2(faa); 

// });

map.on('pointermove', function (evt) {  //  , 'pointermove' 'click'

    var map = evt.map;
    //get coordinates of center map view
    center = ol.proj.toLonLat( map.getView().getCenter() );
    console.log(center); 
    ui.paintWgs(center); 

    var X = idw.calculatePixelsDem(center[1], center[0]);
    // console.log(X); 

    var egsa = fl2EGSA87(center[1], center[0]);
    // //console.log(egsa[0].toFixed(0));
    ui.paintEgsa(egsa); 

    var faa = idw.idwPow2(center[1], center[0]);
    // console.log(faa); 
    ui.paintFaa(faa); 
    ui.paintFaa2(faa); 

});

