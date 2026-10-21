var size = $('#size').val(),
    strk = $('#stroke').val();

$(document).ready(function(){
  var firstIcon = $('button').eq(0).html();
  $('.preview').html(firstIcon);
  sizer()
  stroke()
  strokeColor()
});

$('button').click( function() {
  var icon = $(this).html();
  $('.preview').html(icon);
  stroke()
  sizer()
  strokeColor()
  $('button').removeClass('focus')
  $(this).addClass('focus')
});

$('.preview').click( function() {
  copyToClipboard(this)
});

$('.black, .white').click(function() {
  $('.color div').removeClass('focus')
  $(this).addClass('focus')
  strokeColor()
})


function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).html()).select();
  document.execCommand("copy");
  $temp.remove();
}

$(document).on('input', '#size', function(){
  sizer()
}); 

$(document).on('input', '#stroke', function(){
  stroke()
});

function sizer(){
  size = $('#size').val();
  $('.size-unit').html(size);
  $('.preview svg').attr( 'width', size )
  $('.preview svg').attr( 'height', size )
}

function stroke(){
  strk = $('#stroke').val();
  $('.stroke-unit').html(strk);
  $('.preview svg').attr( 'stroke-width', strk )
}

function strokeColor(){
  if($('.focus').hasClass('white')){
    $('.preview svg').attr( 'stroke', '#ffffff' )
    $('.preview').css('background','#222')
  } else {
    $('.preview svg').attr( 'stroke', '#222' )
    $('.preview').css('background','#f3f3f3')
  }
}
