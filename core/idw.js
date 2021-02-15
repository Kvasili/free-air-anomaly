
// see link bellow for more information
// https://github.com/syncpoint/terrain-rgb



////////////////// class for reading tiff image  ///////////////////

var DemRaster, geoTransformDem, imageDem;

class DataFromImage{

    constructor(path){
        this.path = path; 
    }

    async getImage(){ //returns a promise

        d3.request(this.path).responseType("arraybuffer").get(function (error, request) { //

            if (error) throw error;

            var tiff = GeoTIFF.parse(request.response);
            imageDem = tiff.getImage();
            DemRaster = imageDem.readRasters();
            var tiepoint = imageDem.getTiePoints()[0];
            //console.log(tiepoint);
            var pixelScale = imageDem.getFileDirectory().ModelPixelScale;
            
            geoTransformDem = [tiepoint.x, pixelScale[0], 0, tiepoint.y, 0, -1 * pixelScale[1]];
            //return geoTransformDem; 
            //console.log(geoTransformDem);
    
        });

        //return [imageDem, DemRaster, geoTransformDem]
    }

   async getResults(){
    return await this.getImage(); 
   }

}

var image = new DataFromImage("data/rgbDems/HellasGeoid-rgb.tif"); 
//var image = new DataFromImage("data/rgbDems/free-air-rgb.tif"); 
image.getResults();


///////////////////////////////////////////////////////////////////////////////
//////////////// Inverse Distance Weighted function  //////////////////////////
function IDW(){}

IDW.prototype.pixelToHeight = function (value) {
    return (
      -10000 +
      (value[0] * 256 * 256 + value[1] * 256 + value[2]) * 0.1
    );
}

IDW.prototype.calculatePixelsDem = function (Xmerc, Ymerc) {

    // input X, Y in Web Merc
    // output Xpixel, Ypixel
    var Xpixel = parseInt((Xmerc - geoTransformDem[0]) / geoTransformDem[1]);
    var Ypixel = parseInt((Ymerc - geoTransformDem[3]) / geoTransformDem[5]);
    
    var count = Ypixel * imageDem.getWidth();
    count = count + Xpixel;
    var value = [DemRaster[0][count], DemRaster[1][count], DemRaster[2][count]]
    var height = this.pixelToHeight(value); 

    // returns 
    return {
        X: Xpixel,
        Y: Ypixel,
        value: value, //rgb value
        height: height //height value
    };
}

IDW.prototype.pixelsCenterToWebMerc = function(Xpixel, Ypixel){

    // function for converting center's pixel coords to Web Merc(x, y)
    // input (x,y) of RGB pixel
    // output (X,Y) of RGB pixel's center in web merc

    var cx = Xpixel-1 + 0.5 ; 
    var cy = Ypixel-1 + 0.5 ; 

    var x = geoTransformDem[0] + cx * geoTransformDem[1] ;
    var y = geoTransformDem[3] + cy * geoTransformDem[5] ; 

    return [x, y] ; 
}

IDW.prototype.getDistance = function ([x1,y1],[x2,y2]){

    return Math.sqrt( Math.pow((x2-x1),2) + Math.pow((y2-y1),2));
}

IDW.prototype.idwPow2 = function(x,y){

    // function for calculating value applying IDW interpolation method

    var X = this.calculatePixelsDem(x, y).X; 
    var Y = this.calculatePixelsDem(x, y).Y;
    //var egsaCurrent = fl2EGSA87(f, l);
    var IDWup = 0 ; 
    var IDWdown = 0 ; 

    for (var i=-1;i<=1;i++){
        Y = Y + i ; 

        for(j=-1;j<=1;j++){
            X = X + j ; 

            var center = this.pixelsCenterToWebMerc(X, Y); 
            //var egsaCenter = fl2EGSA87(center[0], center[1]);

            var left = X-1;
            var right = X;
            var top = Y-1;
            var bottom = Y;

            var valueN = imageDem.readRasters({ window: [left, top, right, bottom] });
            var valueRGB = [valueN[0][0], valueN[1][0], valueN[2][0]]; 
            var value = this.pixelToHeight(valueRGB); 
            var dist = this.getDistance([x,y], center) ;  

            IDWup += value / Math.pow(dist,2) ;
            IDWdown += 1/ Math.pow(dist,2) ; 

        }
    
    }

    return IDWup/IDWdown;
}


var idw = new IDW(); 