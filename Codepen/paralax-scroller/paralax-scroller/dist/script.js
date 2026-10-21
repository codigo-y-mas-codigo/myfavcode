var thewindow = $(window);

jQuery.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};

$(".paralax").css({ backgroundPosition: "50%" });

thewindow.on("resize, scroll", function() {
  $(".paralax").each(function() {
    if ($(this).isInViewport()) {
      var yPos =
        (thewindow.scrollTop() - $(this).offset().top) / $(this).data("speed");
      var coords = "50% " + yPos + "px";
      $(this).css({
        backgroundPosition: coords
      });
    }
  });
});