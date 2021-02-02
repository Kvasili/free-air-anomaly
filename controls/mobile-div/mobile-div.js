

var MobileControl = /*@__PURE__*/(function (Control) {

    function MobileControl(opt_options) {

        var options = opt_options || {}; 

        var div=document.createElement("div");
        div.style=loaderDOM.olControlPosition(options);
        
        

        var element = document.createElement("input");
        element.id = "B";
        element.className = "input-for-mobile";

        // elementLogo.width = "50";
        // elementLogo.className="logo";
       // elementLogo.height = "60";
        //elementLogo.style = loaderDOM.olControlPosition(opt_options)

        div.appendChild(element);

        Control.call(this, {
            element: div
        });
        //div.onclick=logoControl.prototype.logo.resetView;
    }

    if (Control) MobileControl.__proto__ = Control;
    MobileControl.prototype = Object.create(Control && Control.prototype);
    MobileControl.prototype.constructor = MobileControl;

    return MobileControl;
    
}(ol.control.Control));