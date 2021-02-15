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
    }
}

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
app.render("map"); 




app._map.on('pointermove', function (evt) {  //  , 'pointermove' 'click'

    //var map = evt.map;
    //get coordinates of center map view
    //center = ol.proj.toLonLat( map.getView().getCenter() );
    //console.log(center); 
    var coordsXY = evt.coordinate;
    //var fl = ol.proj.toLonLat( coordsXY );
    console.log(ol.proj.toLonLat( coordsXY )); 

    console.log(coordsXY);
    ui.paintWgs84(ol.proj.toLonLat( coordsXY )); 

    var egsa = fl2EGSA87(ol.proj.toLonLat( coordsXY )[1], ol.proj.toLonLat( coordsXY )[0]);
    //console.log(egsa.toFixed(0));
    ui.paintEgsa(egsa); 



    //var faa = idw.calculatePixelsDem(coordsXY[0], coordsXY[1]);
    //console.log(faa);
   
    //ui.paintEgsa(egsa); 

    var geoidValue = idw.idwPow2(coordsXY[0], coordsXY[1]);
    ui.paintGeo(geoidValue); 
    //console.log(geoidValue); 
    //ui.paintFaa(faa); 
    //ui.paintFaa2(faa); 

});

