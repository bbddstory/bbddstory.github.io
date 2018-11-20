/**
 * Created by Leon Li on 14/02/2017.
 */
$(function() {
  var prevClientY = 0;

  document.getElementById('nav-diver-ascent').style.display = 'block';
  document.getElementById('nav-diver-ascent').style.top = '350px';
  document.getElementById('nav-diver-descent').style.display = 'none';
  document.getElementById('nav-diver-descent').style.top = '350px';

  $(window).on('load', function() {
    initNav();
    routing();
  });

  window.addEventListener('mousemove', function(e) {
    diverTracking(e);
  })

  function diverTracking(e) {
    var ascentDiver = document.getElementById('nav-diver-ascent');
    var descentDiver = document.getElementById('nav-diver-descent');

    if(e.clientY >= 350 && e.clientY <= (window.innerHeight - 230)) {
      // Ascending
      if(e.clientY <= prevClientY) {
        ascentDiver.style.opacity = 1 - (e.clientY / window.innerHeight).toFixed(1);
        ascentDiver.style.top = e.clientY + 'px';
        ascentDiver.style.display = 'block';
        descentDiver.style.display = 'none';
      }
  
      // Descending
      if(e.clientY > prevClientY) {
        descentDiver.style.opacity = 1 - (e.clientY / window.innerHeight).toFixed(1);
        descentDiver.style.top = e.clientY + 'px';
        ascentDiver.style.display = 'none';
        descentDiver.style.display = 'block';
      }
    }

    // Ascended through the roof
    if(e.clientY < 350) {
      ascentDiver.style.top = 350 + 'px';
    }

    // Descended through the bottom
    if(e.clientY > (window.innerHeight - 230)) {
      descentDiver.style.top = window.innerHeight - 230 + 'px';
    }

    prevClientY = e.clientY;
  }

  function initNav() {
    $('nav a, footer a').on('click', function(e) {
      $('main article').load('views/' + e.target.hash.replace('#', '') + '.html', function() {
        // $('main').scrollTop(0); // Back to top w/o animation
        $('article').stop().animate({ scrollTop : 0 }, 500); // Animated back to top scroll
      })
    })
  }

  function routing() {
    if(location.hash) {
      $('main article').load('views/' + location.hash.replace('#', '') + '.html');
    } else {
      $('main article').load('views/moi.html');
    }
  }
})