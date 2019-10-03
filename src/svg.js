const svg = require("svg.js");
var $ = require("jquery");
import 'bootstrap';


$("body").append("<div style=\"display: none;\" id=\"flame-shape-container-tmp\"></div>").append("<div style=\"display: none;\" id=\"flame-shape-container-tmp\"></div>").append("<div style=\"display: none;\" id=\"flame-container\"></div>");
$("#flame-shape-container-tmp").html(eval(require("html-loader!./flame-shape.html")));

var fire_icon_draw=svg("flame-container").size(10,15);

var fire_icon=fire_icon_draw.group()

var fire_path=svg.get("flame-path")

var color_ind=0;

["yellow","orange","red"].forEach(element => {
    fire_path.clone().size(10-2*color_ind).addTo(fire_icon).move(color_ind,color_ind).addClass(element);
    color_ind++;
});

var image_id = -1;

function set_display_image(num) {
    $(".image-btn.active").removeClass("active");
    $("#image-button-" + num).addClass("active");
    $(".image-tab.collapse.show:not(#image-container-" + num + ")").collapse("hide");
    $("#image-container-" + num).collapse("show");
}
document.addEventListener("image-created", data => set_display_image(data.id))

function create() {
    console.log("Creating new graphic");
    var i = image_id++
    $("ul.nav-tabs").append("<li class=\"nav-item\"><a class=\"nav-link image-btn\" href=\"#\" data-target=\"" + i + "\" id=\"image-button-" + i + "\">Image " + i + "</a></li>");
    $("#image-button-" + i).on("click", data => set_display_image(parseInt(data.currentTarget.getAttribute("data-target"))));
    $("#image-container").append("<div id=\"image-container-" + i + "\" class=\"image-tab collapse\"></div>");

    var draw = svg("image-container-" + i);

    document.getElementById("create").dispatchEvent(new Event("image-created", { id: i }));
}



$("#create").on("click", create);
