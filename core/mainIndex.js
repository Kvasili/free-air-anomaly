
// main js for displaying map 
// Author : Konsantinos vasili
// Date: 10/2/21
//usage: <script src="core/mainIndex.js"></script>


////////////////////////////////////////////////////////////////////////////////

var layersMap = [

    new ol.layer.Tile({

        source : new ol.source.XYZ({
            
            attributionsCollapsible: false,
            url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            maxZoom: 19

        })
       
    })
]

var app = {

    _map: new ol.Map({
        layers: layersMap
     }),

    extend: [23.7, 38],

    render:function(mapDiv){ //render map

        app._map.setTarget(mapDiv); 
        var viewMap = new ol.View({
            center: ol.proj.fromLonLat(app.extend), //needs to be projected coords
            zoom : 6, 
            rotation : 0
        }); 
        app._map.setView(viewMap);  
    },

    uncheckBox:function(id1,id2){

        document.getElementById(id1).checked = false; 
        document.getElementById(id2).checked = false; 

    },

    disableCalcButtons:function(id1,id2, bool){
        document.getElementById(id1).disabled = bool;  
        document.getElementById(id2).disabled = bool;  
    },

    calculateN:function(evt){
 
        var coordsXY = evt.coordinate;
        var egsa = fl2EGSA87(ol.proj.toLonLat( coordsXY )[1], ol.proj.toLonLat( coordsXY )[0]);
        var geoidValue = idw.idwPow2(coordsXY[0], coordsXY[1]);

        ui.paintWgs84(ol.proj.toLonLat( coordsXY )); 
        ui.paintEgsa(egsa);
        ui.paintGeo(geoidValue);
    },

    removeMarker: function (){

        var layersToRemove = [];
    
        this._map.getLayers().forEach(function (layer) {
            if (layer.get('name') != undefined && layer.get('name') === 'vector') {
                layersToRemove.push(layer);
            }
        });
    
        var len = layersToRemove.length;
        for(var i = 0; i < len; i++) {
            app._map.removeLayer(layersToRemove[i]);
        }
    },

    paintDivForScientificValue: function(){

        var checkBox1 = document.getElementById("checkbox1");
        var checkBox2 = document.getElementById("checkbox2");
        var checkBox3 = document.getElementById("checkbox3");

        //var pointsForMarkers = []; 

        this._map.on('pointermove', this.calculateN);//because checkbox1 is initially checked

        checkBox1.onchange = function(){
            app.removeMarker();
            if(document.getElementById("checkbox1").checked){
                app._map.on('pointermove', app.calculateN);
                app.uncheckBox('checkbox2','checkbox3');
                app.disableCalcButtons("buttonOfN1", "buttonOfN2", true);
        
            }else{
                //console.log('It works'); 
                ui.stopPaintingAll();
                app._map.un('pointermove', app.calculateN);//stop from calculating 
            }
        }

        checkBox2.onchange = function(){

            if (checkBox2.checked) {
                app.uncheckBox('checkbox1','checkbox3');
                ui.stopPaintingAll();
                app._map.un('pointermove', app.calculateN);
                app.disableCalcButtons("buttonOfN1", "buttonOfN2", false);

                /// DO STUFF HERE 
                var buttonA = document.getElementById("buttonOfN1"); 
                var buttonB = document.getElementById("buttonOfN2");

                buttonA.onclick = function(){
                    app.removeMarker();
                    var fi = document.getElementById('lat').value;
                    var lamda = document.getElementById('lon').value;

                    //pointsForMarkers.push([parseFloat(lamda), parseFloat(fi)]);
                    putMarkers([[parseFloat(lamda), parseFloat(fi)]]); 
                   
                    var egsa = fl2EGSA87(fi, lamda); 
                    ui.paintEgsa(egsa);
                    
                    var x = ol.proj.fromLonLat([parseFloat(lamda), parseFloat(fi)])[0];
                    var y = ol.proj.fromLonLat([parseFloat(lamda), parseFloat(fi)])[1];
                    var geoidValue = idw.idwPow2(x, y);
                    ui.paintGeo(geoidValue);
                }

                buttonB.onclick = function(){
                    app.removeMarker();
                    var xegsa = document.getElementById('x').value;
                    var yegsa = document.getElementById('y').value;
                    //convert egsa coords to WGS84
                    var fl84 = Egsa2fl84(xegsa, yegsa); 
                    //console.log(fl84); 

                    putMarkers([[parseFloat(fl84[1]), parseFloat(fl84[0])]]); 
                    ui.paintWgs84([fl84[1], fl84[0]]);

                    var x = ol.proj.fromLonLat([parseFloat(fl84[1]), parseFloat(fl84[0])])[0];
                    var y = ol.proj.fromLonLat([parseFloat(fl84[1]), parseFloat(fl84[0])])[1];
                    var geoidValue = idw.idwPow2(x, y);
                    ui.paintGeo(geoidValue);                    
                }




            }else{
                // DO STUFF HERE ........
                app.disableCalcButtons("buttonOfN1", "buttonOfN2", true);
                ui.stopPaintingAll();
                app.removeMarker();
                //putMarkers([[parseFloat(fl84[1]), parseFloat(fl84[0])]], false); 
                //app._map.removeLayer(layerGroup);

                
            }
        }

        checkBox3.onchange = function(){
            app.removeMarker();
            if (checkBox3.checked) {
                app.uncheckBox('checkbox1','checkbox2');
                ui.stopPaintingAll();
                app._map.un('pointermove', app.calculateN);
                app.disableCalcButtons("buttonOfN1", "buttonOfN2", true);

                /// DO STUFF HERE ........ 
            }
        }

    }

}

app.render("map"); 
app.paintDivForScientificValue();


function putMarkers(places){

    var vectorSource = new ol.source.Vector({});

    for (var i = 0; i < places.length; i++) {
    
        var iconFeature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform([places[i][0], places[i][1]], 'EPSG:4326', 'EPSG:3857')),
        });
       
        var iconStyle = new ol.style.Style({
            image: new ol.style.Circle({
              radius: 6,
              fill: new ol.style.Fill({
                color: '#3399CC'
              }),
              stroke: new ol.style.Stroke({
                color: '#fff',
                width: 2
              })
            }),
            crossOrigin: 'anonymous'
          })
    
        iconFeature.setStyle(iconStyle);
        vectorSource.addFeature(iconFeature);
    }
    
    
    var vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        // updateWhileAnimating: true,
        // updateWhileInteracting: true
    });

    vectorLayer.set('name', 'vector');

    app._map.addLayer(vectorLayer);
    var viewMap = new ol.View({
        center: ol.proj.fromLonLat([places[0][0], places[0][1]]), //needs to be projected coords
        zoom : 10, 
        rotation : 0
    }); 
    app._map.setView(viewMap); 
}






// var layerGroup = new ol.layer.Group({

//     layers: [

//         new ol.layer.Tile({
    
//             source : new ol.source.XYZ({
                        
//                 attributionsCollapsible: false,
//                 url:'data/hellas-geoid-rgb-tiles/{z}/{x}/{y}.png',
//                 maxZoom: 19
        
//             }),
//             visible:true,
//             //zIndex:2,
//             dem: false
            
//         }),

//         new ol.layer.Tile({
    
//             source : new ol.source.XYZ({
                        
//                 attributionsCollapsible: false,
//                 url:'data/faa-rgb-tiles/{z}/{x}/{y}.png',
//                 maxZoom: 19
        
//             }),
//             visible:false,
//             zIndex:2,
//             dem: true,
//             opacity: 1
            
//         })
//     ],

// })


//app._map.addLayer(layerGroup);

