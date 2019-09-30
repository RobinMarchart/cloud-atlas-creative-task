import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

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

$("#navs").append("<li class=\"nav-item\"><a data-target=\"about-tab\">About</a></li>");

$("body").addClass("bg-light").append("<div id=\"root\" class=\"container-fluid bg-light\" style=\"padding-top: 55px;\"></div>");

var root=$("#root");
root.append("<div class=\"tab collapse container-fluid\" id=\"about-tab\"></div>");

$("#about-tab").html(eval(require("html-loader!./about.html")));


navbar_tab_hook($("#navs").children(".nav-item").children("a").addClass("text-light nav-link").on("click",function(event){navbar_tab_hook(event.currentTarget)}).attr("href","#").first().get());

require("./svg")