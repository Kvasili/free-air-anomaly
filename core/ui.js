// calss ui for painting div container with weather data

class UI{
    constructor(){
        this.egsa_coords = document.getElementById("egsa-coords"); 
        this.faa = document.getElementById('faa'); 
        this.wind = document.getElementById('w-wind'); 
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
}

var ui = new UI(); 