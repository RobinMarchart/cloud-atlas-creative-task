const svg = require("svg.js");
var $ = require("jquery");
import 'bootstrap';

var image_id = -1;

function set_display_image(num) {
    $(".image-btn.active").removeClass("active");
    $("#image-button-" + num).addClass("active");
    $(".image-tab.collapse.show:not(#image-container-" + num + ")").collapse("hide");
    $("#image-container-" + num).collapse("show");
}
document.addEventListener("image-created", data => set_display_image(data.id))

function generate_path(x,y,rot,size,max_size){
    var str="M "+x+' '+y+" "
    while(size<max_size){
        str+="A "+size+" "+size+" "+rot+" 0 1 "+(x+Math.cos((rot+=180)/180*Math.PI)*size)+" "+(y+Math.sin((rot+=180)/180*Math.PI)*size)+" ";
        size=size*2
    }
    return str;

}

function create() {
    console.log("Creating new graphic");
    var i = image_id++
    $("ul.nav-tabs").append("<li class=\"nav-item\"><a class=\"nav-link image-btn\" href=\"#\" data-target=\"" + i + "\" id=\"image-button-" + i + "\">Image " + i + "</a></li>");
    $("#image-button-" + i).on("click", data => set_display_image(parseInt(data.currentTarget.getAttribute("data-target"))));
    $("#image-container").append("<div id=\"image-container-" + i + "\" class=\"image-tab collapse\"></div>");

    var draw = svg("image-container-" + i).size(500,500);
    draw.path(generate_path(100,100,0,5,200));

    document.getElementById("create").dispatchEvent(new Event("image-created", { id: i }));
}



$("#create").on("click", create);
