/**
 * Created by Leon Li on 14/02/2017.
 */
$(function() {
  var clientY = 150;
  var diverY = 999;

  $(window).on('load', function() {
    componentResize();
    drawDesktop(); // initialise canvas
    initNav();
    routing();
  });

  window.addEventListener('resize', componentResize);

  window.addEventListener('mousemove', function(e) {
    clientY = e.clientY;
    drawDesktop();
  })

  $('#pi-symbol').on('click', function() {
    location.hash = 'pi';
    routing();
  })

  function componentResize(){
    if(window.innerWidth > 520) {
        drawDesktop();
    } else {
        drawMobile();
    }
  }

  function drawMobile() {
    var mobileHeaderCanvas = document.getElementById('mobile-header-canvas');
    var mobileHeaderCtx = mobileHeaderCanvas.getContext('2d');
    var imgBuoyMobile = document.getElementById('img-buoy-mobile');

    mobileHeaderCanvas.width = window.innerWidth;
    mobileHeaderCanvas.height = 200;

    mobileHeaderCtx.clearRect(0, 0, window.innerWidth, 200);
    mobileHeaderCtx.drawImage(imgBuoyMobile, (window.innerWidth - window.innerWidth*0.32), 95);
  }

  function drawDesktop() {
    var imgBuoy = document.getElementById('img-buoy');
    var imgAscent = document.getElementById('img-ascent');
    var imgDescent = document.getElementById('img-descent');
    var imgBottomPlate = document.getElementById('img-bottom-plate');
    var desktopNavCanvas = document.getElementById('desktop-nav-canvas');
    var desktopNavCtx = desktopNavCanvas.getContext('2d');

    desktopNavCanvas.width = 250;
    desktopNavCanvas.height = window.innerHeight;

    desktopNavCtx.clearRect(0, 0, desktopNavCanvas.width, window.innerHeight);

    // Bottom plate
    desktopNavCtx.globalAlpha = 0.1;
    desktopNavCtx.drawImage(imgBottomPlate, 104, window.innerHeight - 98);

    // Lanyard
    var guideLine = desktopNavCtx.createLinearGradient(118, 129, 122, window.innerHeight - 87);
    guideLine.addColorStop(0, '#ebebeb');
    guideLine.addColorStop(1, '#00426e');
    desktopNavCtx.fillStyle = guideLine;
    desktopNavCtx.globalAlpha = 0.7;
    desktopNavCtx.fillRect(123, 129, 2, window.innerHeight - 129 - 87);

    // My mark
    desktopNavCtx.beginPath();
    desktopNavCtx.arc(124, 324, 5, 0, 2 * Math.PI, false);
    desktopNavCtx.fillStyle = '#ff9900';
    desktopNavCtx.globalAlpha = 1;
    desktopNavCtx.fill();

    // Buoy
    desktopNavCtx.drawImage(imgBuoy, 63, 30);

    // Diver
    desktopNavCtx.globalAlpha = 1 - (clientY / window.innerHeight).toFixed(1);
    if(clientY > diverY) {
      if(clientY < window.innerHeight - 220) {
        desktopNavCtx.drawImage(imgDescent, 30, clientY);
        diverY = clientY - 1;
      } else {
        desktopNavCtx.drawImage(imgDescent, 30, window.innerHeight - 220);
        diverY = window.innerHeight - 220;
      }
    } else {
      if(clientY > 150) {
        desktopNavCtx.drawImage(imgAscent, 40, clientY);
        diverY = clientY;
      } else {
        desktopNavCtx.drawImage(imgAscent, 40, 150);
        diverY = 150;
      }
    }
  }

  function initNav() {
    $('nav ul li a').on('click', function(e) {
      $('main article').load('views/' + e.target.hash.replace('#', '') + '.html', function() {
        $(this).scrollTop(0);
      });
    })
  }

  function routing() {
    if(location.hash) {
      $('main article').load('views/' + location.hash.replace('#', '') + '.html');
    } else {
      $('main article').load('views/moi.html');
    }
  }

  // function isMobile() {
  //   try {
  //     document.createEvent("TouchEvent");
  //     return true;
  //   } catch(e) {
  //     return false;
  //   }
  // }
});