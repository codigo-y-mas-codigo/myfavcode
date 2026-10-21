/*
Código extraído del view source https://view-source-editor.vercel.app/
Fecha de descarga: 12/11/2025, 7:54:40 a.m.
¡Excelente día!
*/

//const { is } = require("core-js/core/object");

$(document).ready( function() {
	
	toggleMenu();

	if ($(window).width() >= 1280) {
		headerScroll();
	}
	
	if ($('select').not('#filter,#filter2,#order').length) {
		$('select').selectric();
	}
	
	if($('select#activity').length){
		$('#activity').selectric({
			onChange: (data) =>  {
				$('label[for="activity"]').closest('.form-group').removeClass('has-error').find('#activity-error').remove();
			}
		});
	}

	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
	var tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => {
		return new bootstrap.Tooltip(tooltipTriggerEl)
	});	

	let isTouch = isTouchDevice();
	$('#apps > li > h2.card-header > a').each((i,item) =>{
		if(isTouch)$(item).attr("data-bs-toggle","collapse");
	})

	/*var link_self = document.querySelectorAll('data-href');
	var link_blank = document.querySelectorAll('data-href-blank');

	if(link_self){
		link_self.addEventListener('click', (e) => {
			window.location = this.getAttribute("data-href");
			return false;
		});
	}

	if(link_blank){
		link_blank.addEventListener('click', (e) => {
			window.open(e.getAttribute("data-href-blank"),'_newtab');
			return false;
		});
	}*/

	getCookie();

	const callbackFn = (event) => {
		var consent = event.detail/* || CookieFirst.consent*/;
		if(consent && consent.functional && false){//NO cookies dependant
			$("#zdbutton").show();
			setMessageChat();
		}
		return false;
	};
	// listen for Cookie First initialization event
	window.addEventListener("cf_consent", callbackFn);

	if(!navigator.cookieEnabled) {
		$('#bannerCookies').hide();
	}

	$(document).on('click','[data-href]', function(){
		window.location=$(this).data('href');
		return false;
	});
	$(document).on('click','[data-href-blank]', function(){
		window.open($(this).data('hrefBlank'),'_newtab');
		return false;
	});

	$(document).on('click','.media-video', function(evt){
		evt.preventDefault();
		var link = $(evt.target).attr('href');

		var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
		var match = link.match(regExp);
		var youtube_code = false;
		if (match && match[7].length == 11) {
			youtube_code = match[7];
		}

		if(youtube_code){
			link = 'https://www.youtube.com/embed/'+youtube_code;
			$('#myModalVideo').on('shown.bs.modal', function (e) {
				// set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
				$('#video_modal').attr('src',link + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0" ); 
			});
			$("#myModalVideo").modal("show");
		}else{
			return false;
		}
		
	});

	$(document).on('change','#checknewsletter',function(evt){
		var element=$(evt.target);
		if(element.is(':checked')){
			$('#mc-embedded-subscribe').removeAttr('disabled').removeClass('btn-disabled');
		}else{
			$('#mc-embedded-subscribe').attr('disabled','disabled').addClass('btn-disabled');
		}
	});

	$(document).on('click','[data-xat-status]',function(evt){
		var input=$(this);
		var lang=$(this).data('xatStatus');
		var status=input.prop( "checked" )?1:0;
		$.post('intercom.php',{'opt':'hours','status':status,'lang':lang},function(result){ 
		if(result.status == 'error'){
			alert('ERROR - Status not changed');
		}else{
			input.prop("checked",result.status == '0');
		}
		},'json');
		return false;
	});
	
	$(document).on('click','[data-xat-start]',function(evt){
		var input=$(this);
		var status=input.prop( "checked" )?1:0;
		$.post('intercom.php',{'opt':'anytime','status':status,'lang':'<?=$lang?>'},function(result){ 
		if(result.status == 'error'){
			alert('ERROR - Status not changed');
		}else{
			input.prop("checked",result.status == '0');
		}
		},'json');
		return false;
	});

});