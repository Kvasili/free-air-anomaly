
// class ui for painting div container with appropriate data
//var theUI=new
class UI{
    
    constructor(){
        this.egsaX = document.getElementById('x'); 
        this.egsaY = document.getElementById('y'); 
        this.wgs84F = document.getElementById('lat'); 
        this.wgs84L = document.getElementById('lon'); 
        this.geoValue = document.getElementById('N'); 
        // for mobile version only
        this.N2 = document.getElementById('N2'); 
    }

    paintEgsa(egsa){
       
        this.egsaX.value = egsa[0].toFixed(0);
        this.egsaY.value = egsa[1].toFixed(0); 
    }

    paintWgs84(wgs){
        this.wgs84F.value  =  wgs[1].toFixed(3); 
        this.wgs84L.value =  wgs[0].toFixed(3);
    }

    paintGeo(val){
        this.geoValue.value = val.toFixed(2); 
    }

    paintGeo2(val){
        this.N2.value = val.toFixed(2); 
    }

    paintFaa(faa){
        this.faa.textContent = `${faa.toFixed(2)} mGal`; 

    }

    paintFaa2(faa){
        this.faa2.textContent = `${faa.toFixed(2)} mGal`; 

    }

    stopPaintingAll(){

        this.egsaX.value = '';
        this.egsaY.value = ''; 
        this.wgs84F.value  = ''; 
        this.wgs84L.value = '';
        this.geoValue.value = ''; 

    }
}

var ui = new UI(); 