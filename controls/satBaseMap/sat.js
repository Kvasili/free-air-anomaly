
var satControl = /*@__PURE__*/(function (Control) {

    function satControl(opt_options) {

        var options = opt_options || {}; 

        satControl.prototype.logo = {

            imageLogoUrl: "controls/satBaseMap/satellite.png",

            resetLayer:function(){

                map.removeLayer(layerFAA);

            }
        }

        var div=document.createElement("div");
        div.style=loaderDOM.olControlPosition(options); 
        var elementLogo = document.createElement("img");
        elementLogo.src = satControl.prototype.logo.imageLogoUrl;
        elementLogo.width = "40";
        elementLogo.className="satPng";
       // elementLogo.height = "60";
        elementLogo.style = loaderDOM.olControlPosition(opt_options);

        div.appendChild(elementLogo);
        Control.call(this, {
            element: div
        });

        //map.addLayer(satControl.prototype.logo.resetLayer());
        div.onclick = satControl.prototype.logo.resetLayer;
    }

    if (Control) satControl.__proto__ = Control;
    satControl.prototype = Object.create(Control && Control.prototype);
    satControl.prototype.constructor = satControl;

    return satControl;

}(ol.control.Control));

map.addControl(new satControl(controlSettings[2].options)); 