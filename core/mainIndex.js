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

        }),
        dem: false
    })
]

var app = {

    _map: new ol.Map({
        layers: layersMap
     }),

     extend:function(){
        return [23.7, 38];
     },

    render:function(mapDiv){ //render map

        var extend = [23.7, 38];
        app._map.setTarget(mapDiv); 
        var viewMap = new ol.View({
            center: ol.proj.fromLonLat(extend), //needs to be projected coords
            zoom : 6, 
            rotation : 0
        }); 
        app._map.setView(viewMap);
    },

    uncheckBox:function(id1,id2){

        document.getElementById(id1).checked = false; 
        document.getElementById(id2).checked = false; 

    },

    calculateN:function(evt){
 
        var coordsXY = evt.coordinate;
        var egsa = fl2EGSA87(ol.proj.toLonLat( coordsXY )[1], ol.proj.toLonLat( coordsXY )[0]);
        var geoidValue = idw.idwPow2(coordsXY[0], coordsXY[1]);

        ui.paintWgs84(ol.proj.toLonLat( coordsXY )); 
        ui.paintEgsa(egsa);
        ui.paintGeo(geoidValue);
    },

    paintDivForScientificValue: function(){

        var checkBox1 = document.getElementById("checkbox1");
        var checkBox2 = document.getElementById("checkbox2");
        var checkBox3 = document.getElementById("checkbox3");

        app._map.on('pointermove', app.calculateN);//because checkbox1 is initially checked

        checkBox1.onchange = function(){

            if(document.getElementById("checkbox1").checked){
                app._map.on('pointermove', app.calculateN);
                app.uncheckBox('checkbox2','checkbox3');
        
            }else{
                console.log('It works'); 
                ui.stopPaintingAll();
                app._map.un('pointermove', app.calculateN);
            }
        }

        checkBox2.onchange = function(){

            if (checkBox2.checked) {
                app.uncheckBox('checkbox1','checkbox3');
                ui.stopPaintingAll();
                app._map.un('pointermove', app.calculateN);

                /// DO STUFF HERE ........ 

            }
        }

        checkBox3.onchange = function(){

            if (checkBox3.checked) {
                app.uncheckBox('checkbox1','checkbox2');
                ui.stopPaintingAll();
                app._map.un('pointermove', app.calculateN);

                /// DO STUFF HERE ........ 
            }
        }



    }

}


app.render("map"); 
//app.validateCheckBox(); 
app.paintDivForScientificValue(); 
//app._map.on('pointermove', app.calculateN);

// app._map.on('pointermove', function (evt) {  //  , 'pointermove' 'click'

//     //var map = evt.map;
//     //get coordinates of center map view
//     //center = ol.proj.toLonLat( map.getView().getCenter() );
//     //console.log(center); 
    
//     //var fl = ol.proj.toLonLat( coordsXY );
//     //console.log(ol.proj.toLonLat( coordsXY )); 

//     //console.log(coordsXY);
    
//     var coordsXY = evt.coordinate;
//     var egsa = fl2EGSA87(ol.proj.toLonLat( coordsXY )[1], ol.proj.toLonLat( coordsXY )[0]);
//     var geoidValue = idw.idwPow2(coordsXY[0], coordsXY[1]);

//     //console.log(egsa.toFixed(0));

//     ui.paintWgs84(ol.proj.toLonLat( coordsXY )); 
//     ui.paintEgsa(egsa);
//     ui.paintGeo(geoidValue); 
    
//     //var faa = idw.calculatePixelsDem(coordsXY[0], coordsXY[1]);
//     //console.log(faa);

//     //ui.paintEgsa(egsa);
//     //console.log(geoidValue); 
//     //ui.paintFaa(faa); 
//     //ui.paintFaa2(faa); 

// })


var layerGroup = new ol.layer.Group({

    layers: [

        new ol.layer.Tile({
    
            source : new ol.source.XYZ({
                        
                attributionsCollapsible: false,
                url:'data/hellas-geoid-rgb-tiles/{z}/{x}/{y}.png',
                maxZoom: 19
        
            }),
            visible:true,
            //zIndex:2,
            dem: false
            
        }),

        new ol.layer.Tile({
    
            source : new ol.source.XYZ({
                        
                attributionsCollapsible: false,
                url:'data/faa-rgb-tiles/{z}/{x}/{y}.png',
                maxZoom: 19
        
            }),
            visible:false,
            zIndex:2,
            dem: true,
            opacity: 1
            
        })
    ],

})


//app._map.addLayer(layerGroup);

