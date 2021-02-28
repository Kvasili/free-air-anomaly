
// class for choosing which data to display on containerGeoid div



class Info{

    constructor(){

        this.header1 = document.getElementById("header-for-geoid");
        this.header2 = document.getElementById("header-for-gravity");

        this.p1 = document.getElementById("p-geo");
        this.p2 = document.getElementById("p-grav");
        
    }

    geoid(){

        this.header1.style.display = "block"; 
        this.p1.style.display="block";

        this.header2.style.display = "none"; 
        this.p2.style.display="none";

        var image = new DataFromImage("data/rgbDems/HellasGeoid-rgb.tif"); 
        image.getResults();
    }

    gravity(){

        this.header1.style.display = "none"; 
        this.p1.style.display="none";

        this.header2.style.display = "block";
        this.p2.style.display="block";

        var image = new DataFromImage("data/rgbDems/free-air-rgb.tif");
        image.getResults(); 
    }

    
}

var info = new Info();
//info.geoid(); 
info.gravity();