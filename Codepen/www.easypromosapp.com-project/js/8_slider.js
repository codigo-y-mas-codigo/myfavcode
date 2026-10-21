/*
Código extraído del view source https://view-source-editor.vercel.app/
Fecha de descarga: 12/11/2025, 7:54:40 a.m.
¡Excelente día!
*/

$(document).ready(function(){
    $('.slider-lst').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: false,
        swipeToSlide: true, // Permite deslizar entre slides
        touchThreshold: 10, // Ajusta la sensibilidad del swipe
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                }
            },{
                breakpoint: 840,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },{
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.slider-testimonials').slick({
        infinite: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: true,
        arrows: false,
        swipeToSlide: true, // Permite deslizar entre slides
        touchThreshold: 10, // Ajusta la sensibilidad del swipe
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                }
            },{
                breakpoint: 840,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },{
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

  $(".slider-situacions").each(function(){
        var main_slider = $(this);
        //console.log('Mainslider',main_slider.closest('.item-tri').find('.item-info'));
        main_slider.slick({
            accessibility: false, 
            arrows: false,
            dots: true,
            infinite: true,
            speed: 300,
            fade: true,
            cssEase: 'linear',
            slidesToShow: 2,
            slidesToScroll: 1,
            adaptiveHeight: false,
            dotsClass:'slash-lst clr-secondary mt-4',
            appendDots:main_slider.closest('.item-tri').find('.item-info'),
            customPaging : function(slider, i) {
                var slidernav = $(slider.$slides[i]).data('slidernav');
                return '<span class="btn-link clr-secondary-dark">'+slidernav+'</span>';
            },
        }).on('afterChange', (event, slick, currentSlide, nextSlide)=>{
            var text = $(slick.$slides[currentSlide]).data('slidertext');
            var img = $(slick.$slides[currentSlide]).data('slideimage');
            var id = $(slick.$slides[currentSlide]).data('slideid');
            $('#situacio'+id+' > .item-pic > picture.img > img').attr('src',img);
            $('#situacio'+id+' > .item-info > blockquote > p').html(text);
        });
    });
});