// -----------------------------------------------------------------------------------
// http://wowslider.com/
// JavaScript Wow Slider is a free software that helps you easily generate delicious 
// slideshows with gorgeous transition effects, in a few clicks without writing a single line of code.
// Last updated: 2011-02-15
//
//***********************************************
// Obfuscated by Javascript Obfuscator
// http://javascript-source.com
//***********************************************
ws_fly=function(options){var $=jQuery;options.duration=options.duration||1000;var Images=[];var curIdx=0;this.init=function(aCont){$(aCont).css("overflow","visible");Images=$("img",aCont).get();$(Images).each(function(Index){if(!Index){$(this).show();}else{$(this).hide();}});};this.go=function(new_index){var $current=$($(Images).get(curIdx));var cur_left=0;var $new=$($(Images).get(new_index));$new.stop(1,1);$new.css({opacity:"hide",left:cur_left-options.width/4,'z-index':30});$new.animate({opacity:"show"},{duration:options.duration,queue:false});$new.animate({left:cur_left},{duration:2*options.duration/3,queue:false});setTimeout(function(){$current.animate({left:cur_left+options.width/4,opacity:"hide"},2*options.duration/3,function(){$current.css("left",cur_left);$new.css({'z-index':"",opacity:1});});},options.duration/3);curIdx=new_index;return true;};};// -----------------------------------------------------------------------------------
