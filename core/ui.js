
// class ui for painting div container with appropriate data

class UI{
    
    constructor(){
        // this.egsa_coords = document.getElementById("egsa-coords"); 
        // this.faa = document.getElementById('faa'); 
        // this.faa2 = document.getElementById('faa2'); 
        this.egsaX = document.getElementById('x'); 
        this.egsaY = document.getElementById('y'); 

        this.wgs84F = document.getElementById('lat'); 
        this.wgs84L = document.getElementById('lon'); 


        this.geoValue = document.getElementById('N'); 


    }


    paintEgsa(egsa){
        //this.egsa_coords.textContent = `X: ${egsa[0].toFixed(0)} ${'||'} Y:${egsa[1].toFixed(0)}`; 
        this.egsaX.value = egsa[0].toFixed(0);
        this.egsaY.value = egsa[1].toFixed(0); 
    }

    paintWgs84(wgs){
        this.wgs84F.value  =  wgs[1].toFixed(4); //`φ: ${wgs[1].toFixed(4)} ${'||'} λ:${wgs[0].toFixed(4)}`; 
        this.wgs84L.value =  wgs[0].toFixed(4);
    }

    paintGeo(val){
        this.geoValue.value = val.toFixed(2); 
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
        this.wgs84F.value  = ''; //`φ: ${wgs[1].toFixed(4)} ${'||'} λ:${wgs[0].toFixed(4)}`; 
        this.wgs84L.value = '';
        this.geoValue.value = ''; 

    }
}

var ui = new UI(); 