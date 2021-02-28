// js script for loading txt,csv file 
// <script src="./core/readRaster.js"></script>
// Author : konstantinos Vasili
// Date: /2/21


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

// var image = new DataFromImage("data/rgbDems/HellasGeoid-rgb.tif"); 
// var image = new DataFromImage("data/rgbDems/free-air-rgb.tif"); 
// image.getResults();