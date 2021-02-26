
// main js for displaying map 
// Author : Konsantinos vasili
// Date: 10/2/21
//usage: <script src="core/mainIndex.js"></script>


////////////////////////////////////////////////////////////////////////////////

var app = {

    _map: new ol.Map({
        layers: [new ol.layer.Tile({
        
            source : new ol.source.XYZ({
                
                attributionsCollapsible: false,
                url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                maxZoom: 19
    
            })
           
        })]
        //overlays:[overlay]
     }),
    // initial map extend
    _extend: {
        extend: [23.7, 38],
        zoom: 6,
        rotation: 0
    },

    render:function(mapDiv){ //render map

        app._map.setTarget(mapDiv); 
        var viewMap = new ol.View({
            center: ol.proj.fromLonLat(app._extend.extend), //needs to be projected coords
            zoom : app._extend.zoom, 
            rotation : app._extend.rotation
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
        //calculates N, paints egsa, wgs84, N
        var coordsXY = evt.coordinate;
        var egsa = fl2EGSA87(ol.proj.toLonLat( coordsXY )[1], ol.proj.toLonLat( coordsXY )[0]);
        var geoidValue = idw.idwPow2(coordsXY[0], coordsXY[1]);

        ui.paintWgs84(ol.proj.toLonLat( coordsXY )); 
        ui.paintEgsa(egsa);
        ui.paintGeo(geoidValue);
    },

    putMarkers: function(places){
        // places must be array of arrays containing wgs84 coords eg. [[long, lat],[long, lat],[long, lat]..]
        var vectorSource = new ol.source.Vector({});
    
        for (var i = 0; i < places.length; i++) {
        
            var iconFeature = new ol.Feature({
                type: 'click',
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
            updateWhileAnimating: true,
            updateWhileInteracting: true
        });
    
        vectorLayer.set('name', 'vector');
        //add layer to map
        app._map.addLayer(vectorLayer);
        var viewMap = new ol.View({
            center: ol.proj.fromLonLat([places[0][0], places[0][1]]), //needs to be projected coords
            zoom : 10, 
            rotation : 0
        }); 
        //set view to marker
        app._map.setView(viewMap); 
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
            ui.stopPaintingAll();
            document.getElementById("fileInput").style.display = "none"; 
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
            app.removeMarker();
            document.getElementById("fileInput").style.display = "none"; 
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
                    app.putMarkers([[parseFloat(lamda), parseFloat(fi)]]); 
                   
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
                    app.putMarkers([[parseFloat(fl84[1]), parseFloat(fl84[0])]]); 
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
               
            }
        }

        checkBox3.onchange = function(){
            app.removeMarker();
            if (checkBox3.checked) {
                app.uncheckBox('checkbox1','checkbox2');
                ui.stopPaintingAll();
                app._map.un('pointermove', app.calculateN);
                app.disableCalcButtons("buttonOfN1", "buttonOfN2", true);
                //document.getElementById("fileInput").style.display = "block";
                if(document.getElementById("fileInput").style.display == "none" || document.getElementById("fileInput").style.display == ""){
                    document.getElementById("fileInput").style.display = "block";
                    //document.getElementById("fileInput").style.disabled = false;
                    file.loadFile();
                    
                }

                /// DO STUFF HERE ........ 
            }else{
                document.getElementById("fileInput").style.display = "none"; 
            }
        }

    }

}

app.render("map"); 
app.paintDivForScientificValue();


var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

var overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
      duration: 250,
    },
});

app._map.addOverlay(overlay);

closer.onclick = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};

app._map.on('singleclick', function (evt) {

    var f = app._map.forEachFeatureAtPixel(
                evt.pixel,
                function(ft, layer){return ft;}
    );

    if (f && f.get('type') == 'click') {

        var geometry = f.getGeometry();
        var coord = geometry.getCoordinates();
        app.calculateN(evt); 
        var coordsXY = evt.coordinate;
        var egsa = fl2EGSA87(ol.proj.toLonLat(coordsXY)[1], ol.proj.toLonLat(coordsXY)[0]);
        content.innerHTML = '<p>You clicked (Greek Grid):</p><code>' + egsa[0].toFixed(0) +',' + egsa[1].toFixed(0)+ '</code>';
        overlay.setPosition(coord);

    }
});

// calculateN:function(evt){
//     //calculates N, paints egsa, wgs84, N
//     var coordsXY = evt.coordinate;
//     var egsa = fl2EGSA87(ol.proj.toLonLat( coordsXY )[1], ol.proj.toLonLat( coordsXY )[0]);
//     var geoidValue = idw.idwPow2(coordsXY[0], coordsXY[1]);

//     ui.paintWgs84(ol.proj.toLonLat( coordsXY )); 
//     ui.paintEgsa(egsa);
//     ui.paintGeo(geoidValue);




//////////////////////////////////////////// XYZ TILES ////////////////////////////////////////

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

