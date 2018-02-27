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
ws_fade=function(options){var $=jQuery;options.duration=options.duration||1000;var Images=[];var curIdx=0;this.init=function(aCont){Images=$("img",aCont).get();$(Images).each(function(Index){if(!Index){$(this).show();}else{$(this).hide();}});};this.go=function(new_index){$(Images).each(function(Index){if(Index==new_index){$(this).fadeIn(options.duration);}if(Index==curIdx){$(this).fadeOut(options.duration);}});curIdx=new_index;return true;};};// -----------------------------------------------------------------------------------
