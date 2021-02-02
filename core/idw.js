
    ////////////// idw ///////////////////

var DemRaster, geoTransformDem, imageDem;

d3.request("data/free-air-final.tif").responseType("arraybuffer").get(function (error, request) { //

    if (error) throw error;

    var tiff = GeoTIFF.parse(request.response); 
    imageDem = tiff.getImage();
    DemRaster = imageDem.readRasters();
    var tiepoint = imageDem.getTiePoints()[0];
    //console.log(tiepoint);
    var pixelScale = imageDem.getFileDirectory().ModelPixelScale;
    
    geoTransformDem = [tiepoint.x, pixelScale[0], 0, tiepoint.y, 0, -1 * pixelScale[1]];
    console.log(geoTransformDem);
});

    
function IDW(){}

var idw = new IDW(); 
//console.log(idw.path); 

IDW.prototype.calculatePixelsDem = function (f, l) {
    // input f, l
    // output Xpixel, Ypixel
    var Xpixel = parseInt((l - geoTransformDem[0]) / geoTransformDem[1]);
    var Ypixel = parseInt((f - geoTransformDem[3]) / geoTransformDem[5]);
    
    var count = Ypixel * imageDem.getWidth();
    count = count + Xpixel;
    var heigthDem = DemRaster[0][count];

    // returns 
    return [Xpixel, Ypixel, heigthDem];
}


IDW.prototype.pixelsCenterToLatLon = function(Xpixel, Ypixel){

    // function for converting center's pixel coords to lat lon

    var cx = Xpixel-1 + 0.5 ; 
    var cy = Ypixel-1 + 0.5 ; 

    var lon = geoTransformDem[0] + cx * geoTransformDem[1] ;
    var lat = geoTransformDem[3] + cy * geoTransformDem[5] ; 

    return [lat, lon] ; 
}

IDW.prototype.getDistance = function ([x1,y1],[x2,y2]){

    return Math.sqrt( Math.pow((x2-x1),2) + Math.pow((y2-y1),2));
}

IDW.prototype.idwPow2 = function(f,l){
    // function for calculating value applying IDW interpolation method
    var X = idw.calculatePixelsDem(f, l)[0] ; 
    var Y = idw.calculatePixelsDem(f, l)[1] ;
    var egsaCurrent = fl2EGSA87(f, l);
    var IDWup = 0 ; 
    var IDWdown = 0 ; 

    for (var i=-1;i<=1;i++){
        Y = Y + i ; 

        for(j=-1;j<=1;j++){
            X = X + j ; 

            var center = idw.pixelsCenterToLatLon(X, Y) ; 
            var egsaCenter = fl2EGSA87(center[0], center[1]);

            var left = X-1;
            var right = X;
            var top = Y-1;
            var bottom = Y;

            var valueN = imageDem.readRasters({ window: [left, top, right, bottom] });
            var dist = idw.getDistance(egsaCurrent, egsaCenter) ; 

            IDWup += valueN / Math.pow(dist,2) ;
            IDWdown += 1/ Math.pow(dist,2) ; 

        }
    
    }

    return IDWup/IDWdown;
}