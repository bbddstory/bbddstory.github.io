/**
 * Created by Leon Li on 14/02/2017.
 */
$(function() {
  var clientY = 150;
  var diverY = 999;

  // screen.orientation.lock('portrait');

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


  function componentResize(){
    if(window.innerWidth > 520) {
        drawDesktop();
    } else {
        drawMobileHeader();
        drawMobileFooter();
    }
  }

  function drawMobileHeader() {
    var mobileHeaderCanvas = document.getElementById('mobile-header-canvas');
    var mobileHeaderCtx = mobileHeaderCanvas.getContext('2d');
    var imgAscentLeft = document.getElementById('img-ascent-left');
    var imgBuoyMobile = document.getElementById('img-buoy-mobile');

    mobileHeaderCanvas.width = window.innerWidth;
    mobileHeaderCanvas.height = 350;

    // Buoy
    mobileHeaderCtx.clearRect(0, 0, window.innerWidth, 200);
    mobileHeaderCtx.drawImage(imgBuoyMobile, (window.innerWidth - window.innerWidth * 0.205) - 43, 115);

    // Diver
    mobileHeaderCtx.drawImage(imgAscentLeft, (window.innerWidth - window.innerWidth * 0.17), 205);

    // Lanyard
    var guideLine = mobileHeaderCtx.createLinearGradient(0, 196, 0, 220);
    guideLine.addColorStop(0, '#ebebeb');
    guideLine.addColorStop(1, '#00426e');
    mobileHeaderCtx.fillStyle = guideLine;
    mobileHeaderCtx.globalAlpha = 0.7;
    mobileHeaderCtx.fillRect((window.innerWidth - window.innerWidth * 0.205), 196, 2, 24);
  }

  function drawMobileFooter() {
    var mobileFooterCanvas = document.getElementById('mobile-footer-canvas');
    var mobileFooterCtx = mobileFooterCanvas.getContext('2d');
    var imgDescent = document.getElementById('img-descent');
    var imgBottomPlate = document.getElementById('img-bottom-plate');

    mobileFooterCanvas.width = window.innerWidth;
    mobileFooterCanvas.height = 380;
    
    // Diver
    mobileFooterCtx.globalAlpha = 0.3;
    mobileFooterCtx.drawImage(imgDescent, (window.innerWidth - window.innerWidth * 0.205) + 10, 185);
    
    // Bottom plate
    mobileFooterCtx.globalAlpha = 0.1;
    mobileFooterCtx.drawImage(imgBottomPlate, (window.innerWidth - window.innerWidth * 0.205) - 18, 302);

    // Lanyard
    var guideLine = mobileFooterCtx.createLinearGradient(0, 0, 0, 150);
    guideLine.addColorStop(0, '#ebebeb');
    guideLine.addColorStop(1, '#00426e');
    mobileFooterCtx.fillStyle = guideLine;
    mobileFooterCtx.globalAlpha = 0.5;
    mobileFooterCtx.fillRect((window.innerWidth - window.innerWidth * 0.205), 0, 2, 312);

    // My mark
    mobileFooterCtx.beginPath();
    mobileFooterCtx.arc((window.innerWidth - window.innerWidth * 0.205) + 1, 165, 5, 0, 2 * Math.PI, false);
    mobileFooterCtx.fillStyle = '#ff9900';
    mobileFooterCtx.globalAlpha = 1;
    mobileFooterCtx.fill();
  }

  function drawDesktop() {
    var imgBuoy = document.getElementById('img-buoy');
    var imgAscent = document.getElementById('img-ascent');
    var imgDescent = document.getElementById('img-descent');
    var imgBottomPlate = document.getElementById('img-bottom-plate');
    var desktopNavCanvas = document.getElementById('desktop-nav-canvas');
    var desktopNavCtx = desktopNavCanvas.getContext('2d');

    desktopNavCanvas.width = 250;
    desktopNavCanvas.height = window.innerHeight - 5;

    desktopNavCtx.clearRect(0, 0, desktopNavCanvas.width, window.innerHeight);

    // Bottom plate
    desktopNavCtx.globalAlpha = 0.1;
    desktopNavCtx.drawImage(imgBottomPlate, 104, window.innerHeight - 98);

    // Lanyard
    var guideLine = desktopNavCtx.createLinearGradient(0, 129, 0, window.innerHeight - 87);
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
        desktopNavCtx.drawImage(imgAscent, 40, clientY); // Low point of ascending diver
        diverY = clientY;
      } else {
        desktopNavCtx.drawImage(imgAscent, 40, 130); // High point of ascending diver
        diverY = 150;
      }
    }
  }

  function initNav() {
    $('nav a, footer a').on('click', function(e) {
      $('main article').load('views/' + e.target.hash.replace('#', '') + '.html', function() {
        // $('main').scrollTop(0); // Back to top w/o animation
        $('main').stop().animate({ scrollTop : 0 }, 500); // Animated back to top scroll
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