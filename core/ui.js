// calss ui for painting div container with weather data

class UI{
    
    constructor(){
        this.egsa_coords = document.getElementById("egsa-coords"); 
        this.faa = document.getElementById('faa'); 
        this.faa2 = document.getElementById('faa2'); 
        this.wgs84 = document.getElementById('wgs84'); 
    }

    paintWeather(weather){
        
        this.wind.textContent = `${(weather['temp-surface'][0]-273.15).toFixed(0)} C` ;  
    }

    paintEgsa(egsa){
        this.egsa_coords.textContent = `X: ${egsa[0].toFixed(0)} ${'||'} Y:${egsa[1].toFixed(0)}`; 
    }

    paintFaa(faa){
        this.faa.textContent = `${faa.toFixed(4)} mgal`; 

    }

    paintFaa2(faa){
        this.faa2.textContent = `${faa.toFixed(4)} mgal`; 

    }

    paintWgs(wgs){
        this.wgs84.textContent  = `φ: ${wgs[1].toFixed(4)} ${'||'} λ:${wgs[0].toFixed(4)}`;  
    }
}

var ui = new UI(); 