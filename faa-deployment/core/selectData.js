
// class for choosing which data to display on containerGeoid div


class Info{

    constructor(){

        this.header1 = document.getElementById("header-for-geoid");
        this.header2 = document.getElementById("header-for-gravity");

        this.p1 = document.getElementById("p-geo");
        this.p2 = document.getElementById("p-grav");

        this.doc1 = document.getElementById("geo-documentation");
        this.doc2 = document.getElementById("gravity-documentation");
        
    }

    geoid(){

        this.header1.style.display = "block"; 
        this.p1.style.display="block";
        this.doc1.style.display="block";

        this.header2.style.display = "none"; 
        this.p2.style.display="none";
        this.doc2.style.display="none";

        var image = new DataFromImage("data/rgbDems/HellasGeoid-rgb.tif"); 
        image.getResults();
    }

    gravity(){

        this.header1.style.display = "none"; 
        this.p1.style.display="none";
        this.doc1.style.display="none";

        this.header2.style.display = "block";
        this.p2.style.display="block";
        this.doc2.style.display="block";

        var image = new DataFromImage("data/rgbDems/free-air-rgb.tif");
        image.getResults(); 
    }

    // both(){
    //     var image1 = new DataFromImage("data/rgbDems/HellasGeoid-rgb.tif");
    //     image1.getResults(); 

    //     var image2 = new DataFromImage("data/rgbDems/free-air-rgb.tif");
    //     image2.getResults(); 
    // }
}

var info = new Info();
//info.geoid(); //because huey is checked
//info.gravity();