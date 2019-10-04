const svg = require("svg.js");
var $ = require("jquery");
import 'bootstrap';

var image_id = 1;

function set_display_image(num) {
    $(".image-btn.active").removeClass("active");
    $("#image-button-" + num).addClass("active");
    $(".image-tab.collapse.show:not(#image-container-" + num + ")").collapse("hide");
    $("#image-container-" + num).collapse("show");
}
document.addEventListener("image-created", data => set_display_image(data.id))

function* get_next_rad(distance_radius,distance_line,max_rad){
    let rad=0;
    while (true){
        rad=Math.sqrt((distance_line*distance_radius/2/Math.PI)+(rad*rad));
        //console.info(rad);
        if (rad<max_rad)yield rad;
        else return rad;
    }
}

function get_point(distance_radius,rad,base){
    var ang=base+(rad*2*Math.PI/distance_radius);
    return{x:Math.cos(ang)*rad,y:Math.sin(ang)*rad,arc:ang};
}

function print_flame(draw,base_x,base_y,min_x,min_y,max_x,max_y,point){
    var x=point.x+base_x;
    var y=point.y+base_y;
    var arc=point.arc*180;
    console.info(arc);
    if((x>=min_x)&&(y>=min_y)&&(x<=max_x)&&(y<=max_y))draw.plain("\u{1F525}").move(x,y).rotate(arc,x,y);
}

function create() {
    console.log("Creating new graphic");
    var i = image_id++
    $("ul.nav-tabs").append("<li class=\"nav-item\"><a class=\"nav-link image-btn\" href=\"#\" data-target=\"" + i + "\" id=\"image-button-" + i + "\">Image " + i + "</a></li>");
    $("#image-button-" + i).on("click", data => set_display_image(parseInt(data.currentTarget.getAttribute("data-target"))));
    $("#image-container").append("<div id=\"image-container-" + i + "\" class=\"image-tab collapse\"></div>");
    var distance_radius=parseInt(document.getElementById("spiral-steep").value);
    var distance_line=parseInt(document.getElementById("icon_dist").value);
    var num_startpoint=parseInt(document.getElementById("spiral-num").value);
    var draw = svg("image-container-" + i).size(500,500);
    var radii=get_next_rad(distance_radius,distance_line,250*Math.sqrt(2));
    var offsets=[];
    for(var x=0;x<num_startpoint;x++){
        offsets.push(x*2*Math.PI/num_startpoint);
    }
    var pnt=get_point.bind(null,distance_radius);
    var flm=print_flame.bind(null,draw,250,250,-40,-40,540,540);
    for (let rad of radii){
        for(let offset of offsets){
            flm(pnt(rad,offset));
        };
    };
    document.dispatchEvent(new Event("image-created", { id: i }));
}



$("#create").on("click", create);
