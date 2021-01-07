var loaderDOM = {

    olControlPosition: function (options) {///options={position:{UD:"bottom"|"top", RL:"rigth"| "left"}, orderPosition:1}
        var positionStyle;
        var countposition=4+(options.orderPosition-1)*3;
        var verticalposition=0.3+(options.verticalPosition-1)*3;
        positionStyle='position: absolute;'+ options.position.UD+":"+countposition+'em;'+options.position.RL+": "+verticalposition+"em";
        return positionStyle;

    }

};