
var logoControl = /*@__PURE__*/(function (Control) {

    function logoControl(opt_options) {

        var options = opt_options || {}; 

        logoControl.prototype.logo = {
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
        div.style.borderRadius = '20px'; 
        var elementLogo = document.createElement("img");
        elementLogo.src = logoControl.prototype.logo.imageLogoUrl;
        elementLogo.width = "50";
        elementLogo.className="logo";
        //elementLogo.style.borderRadius = '25px';
       // elementLogo.height = "60";
        elementLogo.style = loaderDOM.olControlPosition(opt_options);

        div.appendChild(elementLogo);
        Control.call(this, {
            element: div
        });
        div.onclick=logoControl.prototype.logo.resetView;
    }

    if (Control) logoControl.__proto__ = Control;
    logoControl.prototype = Object.create(Control && Control.prototype);
    logoControl.prototype.constructor = logoControl;

    return logoControl;

}(ol.control.Control));

map.addControl(new logoControl(controlSettings[0].options)); 