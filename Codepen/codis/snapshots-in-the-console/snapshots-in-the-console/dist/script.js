/* Noel Delgado | @pixelia_me */

(function() {
    window.URL = window.URL || window.webkitURL;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    if (!navigator.getUserMedia) {
        document.body.className += " no-usermedia";
        return;
    }

    var cta     = document.querySelector('button'),
        btnText = ["Take Shot", "Enable your Webcam"],
        video   = document.createElement('video'),
        canvas  = document.createElement('canvas'),
        ctx     = canvas.getContext('2d'),
        style   = "\
            padding: 120px 160px; \
            background-size: cover; \
            background-repeat: no-repeat; \
            background-position: 50% 50%; \
            border: 10px solid #000; \
            line-height: 320px;\
        ";

    video.autoplay = true;
    canvas.width = 640;
    canvas.height = 480;

    var enableBtn = function () {
        cta.disabled = false;
        cta.textContent = btnText[0];
    };

    var disableBtn = function () {
        cta.disabled = true;
        cta.textContent = btnText[1];
    };

    cta.addEventListener('click', function() {
        disableBtn();
        navigator.getUserMedia({
            video : true
        }, function (stream) {
            video.src = window.URL.createObjectURL(stream);
            video.load();
            setTimeout(function () {
                ctx.drawImage(video, 0, 0);
                style += 'background-image: url(' + canvas.toDataURL('image/webp') + ');';
                console.log('%c', style);
                enableBtn();
                stream.stop();
            }, 1000);
        }, function () {
            console.log('%c You need to grant access to your camera!', 'color: red; font-weight: bold;');
            enableBtn();
        });
    }, false);
}());