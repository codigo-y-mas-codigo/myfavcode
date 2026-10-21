// I'm aware the dimensions are not correct, will look to fix shortly.

$("input#title").keyup(function(){
   $('.book .spine').html(this.value);
});
$("input#image").keyup(function(){
  var bgimg = this.value;
  $('.cover').css('background-image', 'url("' + bgimg + '")');
});