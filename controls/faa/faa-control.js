
var faaControl= /*@__PURE__*/(function (Control) {

    function faaControl(opt_options) {

        var options = opt_options || {}; 

        faaControl.prototype.logo = {
            imageLogoUrl: "controls/faa/faa.png",
            resetLayer:function(){

                map.addLayer(layerFAA);
        
            }
        }

        var div=document.createElement("div");
        div.width = "50";
        div.style.backgroundColor='green'; 
        div.style=loaderDOM.olControlPosition(options); 
        var elementLogo = document.createElement("img");
        elementLogo.src = faaControl.prototype.logo.imageLogoUrl;
        elementLogo.width = "40";
        elementLogo.className="faaPng";
       // elementLogo.height = "60";
        elementLogo.style = loaderDOM.olControlPosition(opt_options);

        div.appendChild(elementLogo);
        Control.call(this, {
            element: div
        });

        //map.addLayer(faaControl.prototype.logo.resetLayer());
        div.onclick = faaControl.prototype.logo.resetLayer;
        
    }

    if (Control) faaControl.__proto__ = Control;
    faaControl.prototype = Object.create(Control && Control.prototype);
    faaControl.prototype.constructor = faaControl;

    return faaControl;

}(ol.control.Control));

map.addControl(new faaControl(controlSettings[1].options)); 