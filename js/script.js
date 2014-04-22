/* Author: Nick Jones

*/


$(document).ready(function() {
	var win = $(window);
	var doc = $(document);
	var initialized = false;

	var WIN_H;
	var WIN_W;

	var INERTIA = .92;

  var snd = new Audio("sounds/intro.mp3"); // buffers automatically when created

	var touchStartX;
	var touchStartY;
	var oldMouseY;
	var oldMouseX;

  var currentChallenge = 0;

	var events = {
		init: function(){

      setTimeout(function(){
        // Hide the address bar!
        window.scrollTo(0, 1);
      }, 0);
      drawRings();
			pageResize();
      win.resize(pageResize);
      $('.copy').widowFix();
      $('h1').widowFix();
      $('.option').widowFix();
      $('#prove-it').click(showIntro);
      $('#main-nav').click(showNav);
      $('.option').click(answerQuestion);
      $('#audio-btn').click(toggleMusic);
      $('#balance h2').click(toggleExtras);
      $('#intro').click(answerQuestion);
      $('.challenge').click(showResults);
      $('.result').click(nextChallenge);
      $('form button').css({
        opacity: 0,
        top: 40
      })
      function toggleExtras() {
        $('#extras').toggleClass('expanded')
      }
      function answerQuestion(e) {
        $('#balance,#day,#date-line,#ticks').addClass('visible');
        $('#welcome,#logo').removeClass('out');
        $('.challenges').css({
          display: 'block'
        })
        $('#audio-btn').addClass('hidden');
        $('#intro').css({
          '-webkit-transition':'1s',
          opacity: 0
        })
        setTimeout(function(){$('#intro').css({display: 'none'})})
      }
      function showNav() {
        $('#main-nav').addClass('expanded').unbind('click').click(hideNav);
      }
      function hideNav() {
        $('#main-nav').removeClass('expanded').unbind('click').click(showNav);
      }
      function showIntro() {
        //snd.play();
        $('#audio-btn').addClass('visible');
        $('#welcome,#logo').addClass('out');
        $('#welcome').css({
          display: 'none'
        })
        $('#intro').addClass('intro-play');
      }
      function toggleMusic() {
        if (snd.paused == false) {
          $('#audio-btn').addClass('off');
          snd.pause();
        } else {
          $('#audio-btn').removeClass('off');
          //snd.play();
        }
      }
      function showResults() {
        var oldChallenge = currentChallenge;
        $('.challenge').eq(oldChallenge).addClass('out')
        $('.result').removeClass('hidden');
        setTimeout(function(){
          $('.challenge').eq(oldChallenge).css({
            display: 'none'
          })
        },1000)
      }
      function nextChallenge() {
        $('.result').addClass('out');
        setTimeout(function(){
          $('.result').removeClass('out');
          $('.result').addClass('hidden');
        },1000)
        $('.tick').eq(currentChallenge).removeClass('current')
        
        currentChallenge++;
        
        $('.challenge').eq(currentChallenge).removeClass('hidden');
        $('#date-line').css({
          top: (currentChallenge+1)*(WIN_H/33)-5
        })
        $('#current-day').html(currentChallenge+1)
        $('.tick').eq(currentChallenge).addClass('current');
        if(currentChallenge == 9 || currentChallenge == 16 || currentChallenge == 23){
          alert('Payday!')
        }
      }
      // WINDOW
			function pageResize (e) {
				WIN_H = win.height();
				WIN_W = win.width();
				if(win.width() < 1000){
					tabletScreen = true;
				}else{
					tabletScreen = false;
				}
        if(win.width() < 766){
          phoneScreen = true;
        }else{
          phoneScreen = false;
        }
				initialized = true;
        placeTicks();
			}

      // INITIALIZATION
      function drawRings() {
        for(var i=0;i<17;i++){
          $('#rings').append('<div class="ring"></div>');
          $('.ring').eq(i).css({
            '-webkit-transform':'perspective(2000px) translate3d(-50%, -50%,'+((i+1)*-(2500))+'px)',
            '-webkit-transform-origin':'0% 0%'
          })
        }
      }
      function placeTicks(){
        $(".tick").each(function(i){
          $('.tick').eq(i).css({
            'top': (WIN_H/33)*i
          })
          if(i>= 9 && i%7==2 && i<30){
            $('.tick').eq(i).html('$').addClass('payday');
          }else if(i<30){
            //$('.tick').eq(i).html(i+1)

          }
          
        })
      }
		}
	};
	events.init();
});























