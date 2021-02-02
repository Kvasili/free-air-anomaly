
class Weather{

    constructor(coords){
        //this.apikey = "nFCcWd40z5eLTONwEWqcEA0byqNcpe53"; // your-apikey from windy.com
        this.apikey = 'D3jQSl6BTvKQSwOJYLAJyAPTgwUG3Wga';
        this.lat = coords[0];
        this.lon = coords[1]; 
    }

    // get weather 
    async getWeather(){

        var _data = {
            "lat": this.lat,
            "lon": this.lon,
            "model": "gfs", //"IconEU"
            "parameters": ["temp"],//["wind", "dewpoint", "rh", "pressure"],
            "levels": ["surface"],
            "key": this.apikey
        };

        // var response = await fetch(`http://api.wunderground.com/api/${this.apikey}/${this.city}.json`);
        // var responseData = await response.json(); 

        // return responseData.current_observation;

        var response = await fetch('https://api.windy.com/api/point-forecast/v2', {
            method: "POST",
            body: JSON.stringify(_data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        });
        
        var responseData = await response.json(); 
        return responseData; 
    }


    // cahnge weather location
    changeLocation(newCoords){
        this.lat = newCoords[0];
        this.lon = newCoords[1];  
    }
}

// init weather object
var weather = new Weather([37.983810, 23.727539]);

// weather.changeLocation([40.629269, 22.947412]);
// weather.getWeather()
//   .then(res => console.log(res))
//   .catch(err => console.log(err)); 