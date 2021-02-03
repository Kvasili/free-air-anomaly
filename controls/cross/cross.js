
var crossControl= /*@__PURE__*/(function (Control) {

    function crossControl() {

        crossControl.prototype.logo = {
            imageLogoUrl: "controls/cross/cross.png",
        }

        var div=document.createElement("div");
        var elementLogo = document.createElement("img");
        elementLogo.src = crossControl.prototype.logo.imageLogoUrl;
        elementLogo.width = "60";
        elementLogo.height = "60";
        elementLogo.id = 'mainCross';
        

        div.appendChild(elementLogo);
        Control.call(this, {
            element: div
        });
        
    }

    if (Control) crossControl.__proto__ = Control;
    crossControl.prototype = Object.create(Control && Control.prototype);
    crossControl.prototype.constructor = crossControl;

    return crossControl;

}(ol.control.Control));

map.addControl(new crossControl()); 