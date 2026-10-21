$(document).ready(function(){
  $("a.flapit").click(function(){
    $('div.dot').each(function(i) {
    var $li = $(this);
    setTimeout(function() {
      $li.addClass('dropFlap');
      }, i*200); // delay 100 ms
    });
    $("div.toggleButton").addClass("showReset");
    return false;
  });
  $("a.reset").click(function(){
    $('div.dot').removeClass("dropFlap");
    $("div.toggleButton").removeClass("showReset");
  });
});