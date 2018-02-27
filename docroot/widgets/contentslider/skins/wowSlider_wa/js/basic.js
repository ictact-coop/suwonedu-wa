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
ws_basic=function(options){var $=jQuery;var $innerCont;var $IMGs;this.init=function(aCont){var $container=$(aCont);var $Elements=$("a",$container);$IMGs=$Elements.find("img");$innerCont=$("<div style=\"position:relative;\"></div>");$container.append($innerCont);$innerCont.append($Elements);$container.css({position:"relative",overflow:"hidden"});$innerCont.css({position:"relative",width:options.outWidth*$Elements.length*1.1+"px",left:0,top:0});$IMGs.css({position:"static"});};this.go=function(index){$innerCont.stop(true).animate({left:-$($IMGs.get(index)).position().left},options.duration);return true;};};// -----------------------------------------------------------------------------------
