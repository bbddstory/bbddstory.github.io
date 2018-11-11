/**
 * Created by Leon Li on 14/02/2017.
 */
$(function() {
    var canvasNav = document.getElementById('canvasNav'), ctxNav = canvasNav.getContext('2d'),
        diverY = 999, clientY = 150,
        imgBuoy = document.getElementById('imgBuoy'),
        imgDive = document.getElementById('imgDive'),
        imgFemaleAscent = document.getElementById('imgFemaleAscent'),
        imgPlate = document.getElementById('imgPlate');

    $(window).on('load', function() {
        componentResize();
        draw(clientY); // initialise canvas
        initNavi();
        routing();
    });

    window.addEventListener('mousemove', function(e) {
        clientY = e.clientY;
        draw();
    })

    window.addEventListener('resize', componentResize);

    $('#pi-symbol').on('click', function() {
        location.hash = 'pi';
        routing();
    })

    // resize nav canvas to full height
    function componentResize(){
        canvasNav.height = window.innerHeight;
        draw();
        $('main').width($(window).width() - $('nav').width() - 10);
        $('main').height($(window).height() - 20);
    }

    function draw() {
        ctxNav.clearRect(0, 0, canvasNav.width, canvasNav.height);

        // Bottom plate
        ctxNav.globalAlpha = 0.1;
        ctxNav.drawImage(imgPlate, 104, window.innerHeight - 98);

        // Lanyard
        var guideLine = ctxNav.createLinearGradient(118, 129, 122, window.innerHeight - 87);
        guideLine.addColorStop(0, '#ebebeb');
        guideLine.addColorStop(1, '#00426e');
        ctxNav.fillStyle = guideLine;
        ctxNav.globalAlpha = 0.7;
        ctxNav.fillRect(123, 129, 2, window.innerHeight - 129 - 87);

        // My mark
        ctxNav.beginPath();
        ctxNav.arc(124, 324, 5, 0, 2 * Math.PI, false);
        ctxNav.fillStyle = '#ff9900';
        ctxNav.globalAlpha = 1;
        ctxNav.fill();

        // Buoy
        ctxNav.drawImage(imgBuoy, 63, 30);

        // Diver
        ctxNav.globalAlpha = 1 - (clientY / window.innerHeight).toFixed(1);
        if(clientY > diverY) {
            if(clientY < window.innerHeight - 220) {
                ctxNav.drawImage(imgDive, 30, clientY);
                diverY = clientY - 1;
            } else {
                ctxNav.drawImage(imgDive, 30, window.innerHeight - 220);
                diverY = window.innerHeight - 220;
            }
        } else {
            if(clientY > 150) {
                ctxNav.drawImage(imgFemaleAscent, 40, clientY);
                diverY = clientY;
            } else {
                ctxNav.drawImage(imgFemaleAscent, 40, 150);
                diverY = 150;
            }
        }
    }

    function initNavi() {
        $('nav ul li a').on('click', function(e) {
            $('main').load('views/' + e.target.hash.replace('#', '') + '.html', function() {
                $(this).scrollTop(0);
            });
        })
    }

    function routing() {
        if(location.hash) {
            $('main').load('views/' + location.hash.replace('#', '') + '.html');
        } else {
            $('main').load('views/moi.html');
        }
    }

    function isMobile() {
        try {
            document.createEvent("TouchEvent");
            return true;
        } catch(e) {
            return false;
        }
    }
});