// js script for loading txt,csv file 
// <script src="./core/loadFile.js"></script>
// 
// see : https://stackoverflow.com/questions/30453409/reading-a-text-file-using-javascript


class FileInput{

    constructor(fileInput){
        //html input id
        this.input = document.getElementById(fileInput);
    }

    loadFile(){

        var fileInput = this.input; 

        fileInput.addEventListener('change', function() {

            var file = fileInput.files[0];
            var textType = /text.*/;
            if (file.type.match(textType)) {
        
                var reader = new FileReader();
                
                reader.onload = function(e) {
                    app.removeMarker();
                    var content = reader.result; 
                    var newContent = []; 
                    //console.log(content);
                    var lines = content.split("\n");
                    //console.log(lines.length); 
        
                    for(var i=0;i<lines.length;i++){ 

                        // accepts only 4 inputs
                        if(i >= 4) break;   
                        var x = lines[i].split(",")[1];
                        var y = lines[i].split(",")[2] ;
                        var fl84 = Egsa2fl84(x, y); 
                        app.putMarkers([[parseFloat(fl84[1]), parseFloat(fl84[0])]]); 
                                               
                    }
                }
                
                reader.readAsText(file);
                    
            } else {
                console.log("File not supported!");
                alert("File not supported!");
                //fileDisplayArea.innerText= "File not supported!"
            }
        });  
    }  
}


var file = new FileInput("fileInput");