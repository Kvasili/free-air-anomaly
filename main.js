

window.onload = init() ; // will run the function when window is fully loaded - better option than simple init()

function init(){

    var extend = [23.7, 38]

    var map = new ol.Map({

        
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
    })


    var DemRaster, geoTransformDem, xPixelDem, yPixelDem, heightDem, imageDem;

    d3.request("data/free-air-final.tif").responseType("arraybuffer").get(function (error, request) {
    
        if (error) throw error;
    
        var tiff = GeoTIFF.parse(request.response); 
        imageDem = tiff.getImage();
        DemRaster = imageDem.readRasters();
        //console.log("getTiePoints : ");
        //console.log(imageDem.getTiePoints()) ; 
        //console.log(rasters);
        var tiepoint = imageDem.getTiePoints()[0];
        console.log(tiepoint);
        var pixelScale = imageDem.getFileDirectory().ModelPixelScale;
        
        geoTransformDem = [tiepoint.x, pixelScale[0], 0, tiepoint.y, 0, -1 * pixelScale[1]];
        console.log(geoTransformDem);
    
    });

    function calculatePixelsDem(f, l) {
        // input f, l
        // output Xpixel, Ypixel
        var Xpixel = parseInt((l - geoTransformDem[0]) / geoTransformDem[1]);
        var Ypixel = parseInt((f - geoTransformDem[3]) / geoTransformDem[5]);
        
        var count = Ypixel * imageDem.getWidth();
        count = count + Xpixel;
        var heigthDem = DemRaster[0][count];
    
        // returns 
        return [Xpixel, Ypixel, heigthDem.toFixed(2)];
    }

    map.on('pointermove', function (evt) {  //  , 'pointermove' 'click'
    //document.getElementById('info').innerHTML = '';

    var ckickedCoord = evt.coordinate;
    console.log(ckickedCoord); 
    var lonlat = ol.proj.transform(ckickedCoord, 'EPSG:3857', 'EPSG:4326')
    console.log(lonlat); 

    // var f = event.latlng.lat ; 
    // var l = event.latlng.lng ; 

    var X = calculatePixelsDem(lonlat[1], lonlat[0]);
    console.log(X); 

    var egsa = fl2EGSA87(lonlat[1], lonlat[0]);
    console.log(egsa);
  });


}