$(document).ready(function () {
  $(".ham-btn").click(function () {
    $(".nav-links").addClass("show");
  });
  $(".close-btn").click(function () {
    $(".nav-links").removeClass("show");
  });
});

var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene);
