/**
 * Created by Leon Li on 14/02/2017.
 */
$(function() {
  var prevClientY = 0;

  document.getElementById('nav-diver-ascent').style.display = 'block';
  document.getElementById('nav-diver-ascent').style.top = '250px';
  document.getElementById('nav-diver-descent').style.display = 'none';
  document.getElementById('nav-diver-descent').style.top = '250px';

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

    if(e.clientY >= 300 && e.clientY <= (window.innerHeight - 165)) {
      // Ascending
      if(e.clientY <= prevClientY) {
        console.log(parseInt(e.clientY) - ascentDiver.height/2);
        
        ascentDiver.style.top = e.clientY + 'px';
        ascentDiver.style.display = 'block';
        descentDiver.style.display = 'none';
      }
  
      // Descending
      if(e.clientY > prevClientY) {
        // descentDiver.style.top = (parseInt(e.clientY) - descentDiver.height/2) + 'px';
        descentDiver.style.top = e.clientY + 'px';
        ascentDiver.style.display = 'none';
        descentDiver.style.display = 'block';
      }
    }

    // Ascended through the roof
    if(e.clientY < 300) {
      ascentDiver.style.top = (300 - ascentDiver.height/2) + 'px';
    }

    // Descended through the bottom
    if(e.clientY > (window.innerHeight - 165)) {
      descentDiver.style.top = window.innerHeight - 165 - descentDiver.height/2 + 'px';
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