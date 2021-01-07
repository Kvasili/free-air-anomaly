

window.onload = init() ; // will run the function when window is fully loaded - better option than simple init()

function init(){

    var extend = [23.7, 38]

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

    map.addControl(new logoControl(controlSettings[0].options)); 



    map.on('click', function (evt) {  //  , 'pointermove' 'click'
    //document.getElementById('info').innerHTML = '';

    var ckickedCoord = evt.coordinate; //epsg:3857
    //console.log(ckickedCoord); 
    var lonlat = ol.proj.transform(ckickedCoord, 'EPSG:3857', 'EPSG:4326');
    //console.log(lonlat); 

    var X = idw.calculatePixelsDem(lonlat[1], lonlat[0]);
    console.log(X); 

    var egsa = fl2EGSA87(lonlat[1], lonlat[0]);
    console.log(egsa);

    var faa = idw.idwPow2(lonlat[1], lonlat[0]);
    console.log(faa); 


  });

}