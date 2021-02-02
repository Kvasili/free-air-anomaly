
var faaControl = /*@__PURE__*/(function (Control) {

    function faaControl(opt_options) {

        var options = opt_options || {}; 

        faaControl.prototype.logo = {
            imageLogoUrl: "controls/gys-logo/gys.png",
            resetView:function(){
                var _view = new ol.View({
                    center: ol.proj.fromLonLat([23, 38]),
                    zoom:6,
                    rotation: 0
                })
                map.setView(_view);
            }
        }

        var div=document.createElement("div");
        div.style=loaderDOM.olControlPosition(options); 
        var elementLogo = document.createElement("img");
        elementLogo.src = faaControl.prototype.logo.imageLogoUrl;
        elementLogo.width = "50";
        elementLogo.className="logo";
       // elementLogo.height = "60";
        elementLogo.style = loaderDOM.olControlPosition(opt_options);

        div.appendChild(elementLogo);
        Control.call(this, {
            element: div
        });
        div.onclick=faaControl.prototype.logo.resetView;
    }

    if (Control) faaControl.__proto__ = Control;
    faaControl.prototype = Object.create(Control && Control.prototype);
    faaControl.prototype.constructor = faaControl;

    return faaControl;

}(ol.control.Control));

map.addControl(new faaControl(controlSettings[1].options)); 