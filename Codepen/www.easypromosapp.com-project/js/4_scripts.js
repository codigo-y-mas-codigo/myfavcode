/*
Código extraído del view source https://view-source-editor.vercel.app/
Fecha de descarga: 12/11/2025, 7:54:40 a.m.
¡Excelente día!
*/

function toggleMenu() {
    $(".tggl-menu").click(function() {
        $("body").toggleClass("hide-menu");
        $("body").toggleClass("show-menu");
        if ($("body").hasClass("show-menu")) {
            $(".tggl-menu").attr("aria-expanded", "true");
			$(".tggl-menu.visually-hidden-focusable").attr("tabindex", "0");
        } else {
            $(".tggl-menu").attr("aria-expanded", "false");
			$(".tggl-menu.visually-hidden-focusable").attr("tabindex", "-1");
        }
    });
}

// Hide header on scroll down, show header on scroll up
function headerScroll() {

	var didScroll;
	var lastScrollTop = 0;
	var delta = 1;
	var navbarHeight = $('#header').outerHeight() / 3;

	$(window).scroll(function(event){
		didScroll = true;
	});

	setInterval(function() {
		if (didScroll) {
			hasScrolled();
			didScroll = false;
		}
	}, 50);

	function hasScrolled() {
		var st = $(this).scrollTop();

		if(Math.abs(lastScrollTop - st) <= delta)
			return;

		if (st > lastScrollTop && st > navbarHeight){
			// Scroll Down
			$('#header').removeClass('scroll-up').removeClass('scroll-top').addClass('scroll-down');
		} else {
			// Scroll Up
			if(st + $(window).height() < $(document).height()) {
				$('#header').removeClass('scroll-down').addClass('scroll-up');
			}
		}

		if(st < navbarHeight){
			$('#header').removeClass('scroll-up').addClass('scroll-top');
		}

		lastScrollTop = st;
	}
}


if((window.innerWidth) >= 1024) {

	const toggles = document.querySelectorAll('.tggl-sub');
    
     document.addEventListener('click', function(e) {
        toggles.forEach(toggle => {
            if (toggle.contains(e.target)) {
                const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
               // toggle.setAttribute('aria-expanded', String(!isExpanded));
            } else {
                // Opcional: Si deseas que solo un menú pueda estar expandido a la vez,
                // puedes descomentar la siguiente línea.
                 toggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

	const submenus = document.querySelectorAll('.submenu');

	document.addEventListener('click', function(e) {
		submenus.forEach(submenu => {
			if (submenu.contains(e.target)) {
				// Si el clic fue dentro del submenu, alternar la clase show
				submenu.classList.toggle('show');
			} else {
				// Si el clic fue fuera, asegurar que la clase show se remueva
				submenu.classList.remove('show');
			}
		});
	});
}
/*
if((window.innerWidth) >= 1024) {

    const toggle = [...document.querySelectorAll('.tggl-sub')];
	const toggleSub = [...document.querySelectorAll('.tggl-submenu')];

    document.addEventListener('click', function(e) {
		if (!toggle.some(f => f.contains(e.target))) {
		  toggle.forEach(f => f.setAttribute('aria-expanded', 'false'));
		} else {
		  toggle.forEach(f => !f.contains(e.target) ? f.setAttribute('aria-expanded', 'true') : '');
		}
	  })


	document.addEventListener('click', function(e) {
	if (toggleSub.some(f => f.contains(e.target))) {
		toggle.forEach(f => f.setAttribute('aria-expanded', 'false'));
	} else {
		toggle.forEach(f => !f.contains(e.target) ? f.setAttribute('aria-expanded', 'true') : '');
	}
	})

    const submenu = [...document.querySelectorAll('.submenu')];
    document.addEventListener('click', function(e) {
      if (!submenu.some(f => f.contains(e.target))) {
        submenu.forEach(f => f.classList.remove('show'));
      } else {
        submenu.forEach(f => !f.contains(e.target) ? f.classList.remove('show') : '');
      }
    }) 
}
*/

function getCookieName(name){

	const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const [cookieName, cookieValue] = cookies[i].split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null; // Retorna null si la cookie no existe
		
}

function getCookieLang(langBrowser,langWeb,mr){

	if (document.cookie.length > 0){
		var allcookies = document.cookie;
		var findcookie = allcookies.indexOf("lse_site_cookie2=");
		//search cookie "lse_site_cookie"
		var lang_lowercase = langBrowser.toLowerCase();
		if((lang_lowercase.indexOf("es") > -1 || lang_lowercase.indexOf("ca") > -1) && langWeb=='en' && findcookie == -1 ){
			showPopUpLanguages();
		}else{
			createCookieLang(langWeb,'');//reset any time
		}
	}	
}

function createCookieLang(lang,mr){
	var allcookies = document.cookie;
	var oggi = new Date();
	var scadenza = new Date();
	var dominio = ".easypromosapp.com";  //production domain
	var findcookie = allcookies.indexOf("lse_site_cookie2=");
	if (findcookie == -1 || true){		
		scadenza.setFullYear(scadenza.getFullYear()+1);
		document.cookie = "lse_site_cookie2=" + lang + ";expires=" + scadenza.toGMTString()+ ";path=/" +";domain=" + dominio;
		//I hide the disclaimer
		if(mr!='')window.location=mr;
		else $("#cookie_lang").modal("hide");
		return false;
	}else{
		return false;
	}
}
function showPopUpLanguages() {
	$("#cookie_lang .modal-body").html(modal_language);
	$("#cookie_lang").modal("show");
}

function existCookie(){
	if (document.cookie.length > 0){
		var allcookies = document.cookie;
		var findcookie = false;//localStorage.getItem('cookiefirst-consent')
		var cookie_json = JSON.parse(findcookie);
		if((!findcookie || cookie_json && !cookie_json.functional) && false){//No cookies dependant
			return false;
		}else{
			return true;
		}
	}else{
		return true;//can't read
	}
}

function getCookie(){
	if (document.cookie.length > 0){
		var allcookies = document.cookie;
		var findcookie = false;//localStorage.getItem('cookiefirst-consent')
		//var findcookie = allcookies.indexOf("lse_site_cookie=");
		//search cookie "lse_site_cookie"
		var cookie_json = JSON.parse(findcookie);
		if((!findcookie || cookie_json && !cookie_json.functional) && false){//No cookies dependant
			$("#zdbutton").hide();
		}
	}	
}	

function isTouchDevice() {
	return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) ||	(navigator.msMaxTouchPoints > 0));
}

