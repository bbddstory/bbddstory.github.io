/**
 * Created by lli on 14/02/2017.
 */
$(function() {
    var canvasNav = document.getElementById('canvasNav'), ctxNav = canvasNav.getContext("2d"),
        diverY = 999, clientY = 150,
        imgBuoy = document.getElementById("imgBuoy"),
        imgDive = document.getElementById("imgDive"),
        imgFemaleAscent = document.getElementById("imgFemaleAscent"),
        imgPlate = document.getElementById("imgPlate");

    $(window).on('load', function(){
        componentResize();
        draw(clientY); // initialise canvas
        initNavi();
        routing();
    });

    // window.document.onload = routing();

    window.addEventListener('mousemove', function(e){
        clientY = e.clientY;
        draw();
    })

    window.addEventListener("resize", componentResize);

    // resize nav canvas to full height
    function componentResize(){
        canvasNav.height = window.innerHeight;
        draw();
        $('main').width($(window).width() - 240);
    }

    function draw(){
        ctxNav.clearRect(0, 0, canvasNav.width, canvasNav.height);

        // Guide line
        var guideLine = ctxNav.createLinearGradient(118, 129, 122, window.innerHeight - 98);
        guideLine.addColorStop(0, '#ebebeb');
        guideLine.addColorStop(1, '#00426e');
        ctxNav.fillStyle = guideLine;
        ctxNav.globalAlpha = 0.6;
        ctxNav.fillRect(118, 129, 2, window.innerHeight - 129 - 98);

        // Buoy
        ctxNav.globalAlpha = 1;
        ctxNav.drawImage(imgBuoy, 58, 30);

        // Diver
        ctxNav.globalAlpha = 1 - (clientY / window.innerHeight).toFixed(1);
        if(clientY > diverY){
            if(clientY < window.innerHeight - 220){
                ctxNav.drawImage(imgDive, 70, clientY);
                diverY = clientY - 1;
            }else{
                ctxNav.drawImage(imgDive, 70, window.innerHeight - 220);
                diverY = window.innerHeight - 220;
            }
        }else{
            if(clientY > 150){
                ctxNav.drawImage(imgFemaleAscent, 80, clientY);
                diverY = clientY;
            }else{
                ctxNav.drawImage(imgFemaleAscent, 80, 150);
                diverY = 150;
            }
        }

        // Bottom plate
        ctxNav.globalAlpha = 0.1;
        ctxNav.drawImage(imgPlate, 100, window.innerHeight - 98);
    }

    function initNavi(){
        $('#navi a').on('click', function(e){
            $('main').load('views/' + e.target.hash.replace('#', '') + '.html')
        })
    }

    function routing(){
        $('main').load('views/' + location.hash.replace('#', '') + '.html')
    }
});