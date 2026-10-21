console.clear();
let reiniciado = false;

$('.wizard-slide-container').slick({
	dots: true,
	appendDots: '.wizard-controls',
	appendArrows: '.wizard-controls',
	prevArrow: '',
	nextArrow: '<a href="#" class="next-step"><span>Next</span> <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-chevrons-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7l5 5l-5 5" /><path d="M13 7l5 5l-5 5" /></svg></a>',
	dotsClass: 'pagination',
	speed: 225,
	easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
	infinite: false
});

$('.wizard-slide-container').on('afterChange', function(event, slick, direction){
  if(slick.currentSlide == 0) {
		$(this).parent().removeClass('finalStep stepTwo');
	}
	if(slick.currentSlide == 1) {
		$(this).parent().removeClass('finalStep').addClass('stepTwo');
	}
	if(slick.currentSlide == 2) {
		console.log(slick.$nextArrow);
		$(this).parent().addClass('finalStep');
		$('.next-step').removeClass('slick-disabled').addClass('is-done').find('span').text('done').next().remove();
		slick.$nextArrow.onclick = closeModal;
		$('.is-done').click(closeModal);
		$('.skip-wizard').addClass('disable');
	} else {
		$('.skip-wizard').removeClass('disable');
		$('.next-step').removeClass('is-done').html('<span>Next</span> <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-chevrons-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7l5 5l-5 5" /><path d="M13 7l5 5l-5 5" /></svg><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-chevrons-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7l5 5l-5 5" /><path d="M13 7l5 5l-5 5" /></svg>');
	}
});
$('.skip-wizard, .is-done').click(function(){
	$(this).parent().parent().parent().removeClass('active');
});
$('#modalLaunch').click(function(){
	$('.transparent-modal').addClass('active');
	reiniciado = false; // agregar esta línea
});

function closeModal() {
  console.log('hellow');
  $('.transparent-modal').removeClass('active');
  setTimeout(function() {
    $('.wizard-slide-container').slick('slickGoTo', 0);
    $('.transparent-modal').addClass('active');
    reiniciado = true;
  }, 30000); // 30000 milisegundos = 30 segundos - 15 dias son 13,140,000,000
}
$('.wizard-slide-container').on('afterChange', function(event, slick, direction){
  if(slick.currentSlide == 0) {
    $(this).parent().removeClass('finalStep stepTwo');
    $('.next-step').off('click').click(function() {
      $('.wizard-slide-container').slick('slickNext');
    });
  }
  if(slick.currentSlide == 1) {
    $(this).parent().removeClass('finalStep').addClass('stepTwo');
    $('.next-step').off('click').click(function() {
      $('.wizard-slide-container').slick('slickNext');
    });
  }
  if(slick.currentSlide == 2) {
    console.log(slick.$nextArrow);
    $(this).parent().addClass('finalStep');
    $('.next-step').removeClass('slick-disabled').addClass('is-done').find('span').text('done').next().remove();
    slick.$nextArrow.onclick = closeModal;
    $('.is-done').click(closeModal);
    $('.skip-wizard').addClass('disable');
  } else {
    $('.skip-wizard').removeClass('disable');
    $('.next-step').removeClass('is-done').html('<span>Next</span> <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-chevrons-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7l5 5l-5 5" /><path d="M13 7l5 5l-5 5" /></svg>');
  }
});
