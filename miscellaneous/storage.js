class Storage{

    constructor(){
        this.Xegsa; 
        this.Yegsa;
        this.defaultlat = 37.983810; 
        this.defaultlong = 23.727539; 
    }

    // get data from localstorage
    getLocationData(){

        if (localStorage.getItem('lat') === null){
            this.lat = this.defaultlat;
            
        }else{
            this.lat = localStorage.getItem("lat"); 
            
        }

        if(localStorage.getItem('long') === null){
            this.long = this.defaultlong; 
        }else{
            this.long = localStorage.getItem("long"); 
        }

        return {
            lat:this.lat,
            long:this.long
        }
    }

    // set data to local storage
    setLocationData(lat, long){
        localStorage.setItem('lat', lat); 
        localStorage.setItem('long', long); 
    }
}

var storage = new Storage(); 