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

	var events = {
		init: function(){
      drawRings();
			pageResize();
      win.resize(pageResize);
      $('#prove-it').click(showIntro);
      $('#main-nav').click(showNav);
      $('.option').click(answerQuestion);
      $('#audio-btn').click(toggleMusic);
      $('#balance h2').click(toggleExtras);
      $('#intro').click(answerQuestion);
      function toggleExtras() {
        $('#extras').toggleClass('expanded')
      }
      function drawRings() {
        for(var i=0;i<17;i++){
          $('#rings').append('<div class="ring"></div>');
          $('.ring').eq(i).css({
            '-webkit-transform':'perspective(2000px) translate3d(-50%, -50%,'+((i+1)*-(2500))+'px)',
            '-webkit-transform-origin':'0% 0%'
          })
        }
      }
      function answerQuestion(e) {
        $('#balance,#day,#date-line,#logo,#ticks').addClass('visible');
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
        snd.play();
        $('#audio-btn').addClass('visible');
        $('#welcome,#logo').addClass('out');
        $('#intro').addClass('intro-play');
      }
      function toggleMusic() {
        if (snd.paused == false) {
          $('#audio-btn').addClass('off');
          snd.pause();
        } else {
          $('#audio-btn').removeClass('off');
          snd.play();
        }
      }
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
      function placeTicks(){
        $(".tick").each(function(i){
          $('.tick').eq(i).css({
            'top': (WIN_H/33)*i
          })
          if(i>= 9 && i%7==2 && i<30){
            $('.tick').eq(i).html('$')
          }else if(i<30){
            $('.tick').eq(i).html(i+1)
          }
          
        })
      }
		}
	};
	events.init();
});























