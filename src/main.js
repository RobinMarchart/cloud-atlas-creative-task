import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import '@fortawesome/fontawesome-free/js/all'

var $=require("jquery");
import 'bootstrap';

$("body").append("<nav></nav>");
$("nav").addClass("navbar navbar-expand-lg navbar-dark bg-dark fixed-top").append("<ul class=\"navbar-nav\" id=\"navs\"></ul>");

function navbar_tab_hook(btn){
    $(".collapse.show.tab:not(#"+$(btn).data("target")+")").collapse("hide");
    $(".nav-link.active").removeClass("active");
    $('#'+$(btn).data("target")).collapse("show");
    $(btn).addClass("active");
}

$("#navs").append("<li class=\"nav-item\"><a data-target=\"settings-tab\">Settings</a></li>");
$("#navs").append("<li class=\"nav-item\"><a data-target=\"image-tab\">Images</a></li>");
$("#navs").append("<li class=\"nav-item\"><a data-target=\"about-tab\">About</a></li>");

$("body").addClass("bg-light").append("<div class=\"d-block d-lg-none\" style=\"height: 78px;\"></div>")
.append("<div id=\"root\" class=\"container-fluid bg-light\" style=\"padding-top: 55px;\"></div>");

var root=$("#root");

root.append("<div class=\"tab collapse container-fluid\" id=\"settings-tab\"></div>");
root.append("<div class=\"tab collapse container-fluid\" id=\"image-tab\"></div>");
root.append("<div class=\"tab collapse container-fluid\" id=\"about-tab\"></div>");

navbar_tab_hook($("#navs").children(".nav-item").children("a").addClass("text-light nav-link").on("click",function(event){navbar_tab_hook(event.currentTarget)}).attr("href","#").first().get());

$("#about-tab").html(eval(require("html-loader!./about.html")));

$("#image-tab").html(eval(require("html-loader!./image.html")));

$("#settings-tab").html(eval(require("html-loader!./settings.html")));

svg=require("./svg")
