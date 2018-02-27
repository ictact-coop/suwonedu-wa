/** jquery.color.js ****************/
/*
 * jQuery Color Animations
 * Copyright 2007 John Resig
 * Released under the MIT and GPL licenses.
 */

(function(jQuery){

	// We override the animation for all of these color styles
	jQuery.each(['backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'color', 'outlineColor'], function(i,attr){
		jQuery.fx.step[attr] = function(fx){
			if ( fx.state == 0 ) {
				fx.start = getColor( fx.elem, attr );
				fx.end = getRGB( fx.end );
			}
            if ( fx.start )
                fx.elem.style[attr] = "rgb(" + [
                    Math.max(Math.min( parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0]), 255), 0),
                    Math.max(Math.min( parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1]), 255), 0),
                    Math.max(Math.min( parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2]), 255), 0)
                ].join(",") + ")";
		}
	});

	// Color Conversion functions from highlightFade
	// By Blair Mitchelmore
	// http://jquery.offput.ca/highlightFade/

	// Parse strings looking for color tuples [255,255,255]
	function getRGB(color) {
		var result;

		// Check if we're already dealing with an array of colors
		if ( color && color.constructor == Array && color.length == 3 )
			return color;

		// Look for rgb(num,num,num)
		if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
			return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];

		// Look for rgb(num%,num%,num%)
		if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
			return [parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55];

		// Look for #a0b1c2
		if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
			return [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)];

		// Look for #fff
		if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
			return [parseInt(result[1]+result[1],16), parseInt(result[2]+result[2],16), parseInt(result[3]+result[3],16)];

		// Otherwise, we're most likely dealing with a named color
		return colors[jQuery.trim(color).toLowerCase()];
	}
	
	function getColor(elem, attr) {
		var color;

		do {
			color = jQuery.curCSS(elem, attr);

			// Keep going until we find an element that has color, or we hit the body
			if ( color != '' && color != 'transparent' || jQuery.nodeName(elem, "body") )
				break; 

			attr = "backgroundColor";
		} while ( elem = elem.parentNode );

		return getRGB(color);
	};
	
	// Some named colors to work with
	// From Interface by Stefan Petre
	// http://interface.eyecon.ro/

	var colors = {
		aqua:[0,255,255],
		azure:[240,255,255],
		beige:[245,245,220],
		black:[0,0,0],
		blue:[0,0,255],
		brown:[165,42,42],
		cyan:[0,255,255],
		darkblue:[0,0,139],
		darkcyan:[0,139,139],
		darkgrey:[169,169,169],
		darkgreen:[0,100,0],
		darkkhaki:[189,183,107],
		darkmagenta:[139,0,139],
		darkolivegreen:[85,107,47],
		darkorange:[255,140,0],
		darkorchid:[153,50,204],
		darkred:[139,0,0],
		darksalmon:[233,150,122],
		darkviolet:[148,0,211],
		fuchsia:[255,0,255],
		gold:[255,215,0],
		green:[0,128,0],
		indigo:[75,0,130],
		khaki:[240,230,140],
		lightblue:[173,216,230],
		lightcyan:[224,255,255],
		lightgreen:[144,238,144],
		lightgrey:[211,211,211],
		lightpink:[255,182,193],
		lightyellow:[255,255,224],
		lime:[0,255,0],
		magenta:[255,0,255],
		maroon:[128,0,0],
		navy:[0,0,128],
		olive:[128,128,0],
		orange:[255,165,0],
		pink:[255,192,203],
		purple:[128,0,128],
		violet:[128,0,128],
		red:[255,0,0],
		silver:[192,192,192],
		white:[255,255,255],
		yellow:[255,255,0]
	};
	
})(jQuery);

/** jquery.easing.js ****************/
/*
 * jQuery Easing v1.1 - http://gsgd.co.uk/sandbox/jquery.easing.php
 *
 * Uses the built in easing capabilities added in jQuery 1.1
 * to offer multiple easing options
 *
 * Copyright (c) 2007 George Smith
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 */
jQuery.easing={easein:function(x,t,b,c,d){return c*(t/=d)*t+b},easeinout:function(x,t,b,c,d){if(t<d/2)return 2*c*t*t/(d*d)+b;var a=t-d/2;return-2*c*a*a/(d*d)+2*c*a/d+c/2+b},easeout:function(x,t,b,c,d){return-c*t*t/(d*d)+2*c*t/d+b},expoin:function(x,t,b,c,d){var a=1;if(c<0){a*=-1;c*=-1}return a*(Math.exp(Math.log(c)/d*t))+b},expoout:function(x,t,b,c,d){var a=1;if(c<0){a*=-1;c*=-1}return a*(-Math.exp(-Math.log(c)/d*(t-d))+c+1)+b},expoinout:function(x,t,b,c,d){var a=1;if(c<0){a*=-1;c*=-1}if(t<d/2)return a*(Math.exp(Math.log(c/2)/(d/2)*t))+b;return a*(-Math.exp(-2*Math.log(c/2)/d*(t-d))+c+1)+b},bouncein:function(x,t,b,c,d){return c-jQuery.easing['bounceout'](x,d-t,0,c,d)+b},bounceout:function(x,t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b}else{return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b}},bounceinout:function(x,t,b,c,d){if(t<d/2)return jQuery.easing['bouncein'](x,t*2,0,c,d)*.5+b;return jQuery.easing['bounceout'](x,t*2-d,0,c,d)*.5+c*.5+b},elasin:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b},elasout:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b},elasinout:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d/2)==2)return b+c;if(!p)p=d*(.3*1.5);if(a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b},backin:function(x,t,b,c,d){var s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b},backout:function(x,t,b,c,d){var s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},backinout:function(x,t,b,c,d){var s=1.70158;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b},linear:function(x,t,b,c,d){return c*t/d+b}};
/** jquery.lavalamp.js ****************/
/**
 * LavaLamp - A menu plugin for jQuery with cool hover effects.
 * @requires jQuery v1.1.3.1 or above
 *
 * http://gmarwaha.com/blog/?p=7
 *
 * Copyright (c) 2007 Ganeshji Marwaha (gmarwaha.com)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Version: 0.1.0
 */

/**
 * Creates a menu with an unordered list of menu-items. You can either use the CSS that comes with the plugin, or write your own styles 
 * to create a personalized effect
 *
 * The HTML markup used to build the menu can be as simple as...
 *
 *       <ul class="lavaLamp">
 *           <li><a href="#">Home</a></li>
 *           <li><a href="#">Plant a tree</a></li>
 *           <li><a href="#">Travel</a></li>
 *           <li><a href="#">Ride an elephant</a></li>
 *       </ul>
 *
 * Once you have included the style sheet that comes with the plugin, you will have to include 
 * a reference to jquery library, easing plugin(optional) and the LavaLamp(this) plugin.
 *
 * Use the following snippet to initialize the menu.
 *   $(function() { $(".lavaLamp").lavaLamp({ fx: "backout", speed: 700}) });
 *
 * Thats it. Now you should have a working lavalamp menu. 
 *
 * @param an options object - You can specify all the options shown below as an options object param.
 *
 * @option fx - default is "linear"
 * @example
 * $(".lavaLamp").lavaLamp({ fx: "backout" });
 * @desc Creates a menu with "backout" easing effect. You need to include the easing plugin for this to work.
 *
 * @option speed - default is 500 ms
 * @example
 * $(".lavaLamp").lavaLamp({ speed: 500 });
 * @desc Creates a menu with an animation speed of 500 ms.
 *
 * @option click - no defaults
 * @example
 * $(".lavaLamp").lavaLamp({ click: function(event, menuItem) { return false; } });
 * @desc You can supply a callback to be executed when the menu item is clicked. 
 * The event object and the menu-item that was clicked will be passed in as arguments.
 */
(function($) {
    $.fn.lavaLamp = function(o) {
        o = $.extend({ fx: "linear", speed: 500, click: function(){} }, o || {});

        return this.each(function(index) {
            
            var me = $(this), noop = function(){},
                $back = $('<li class="back"><div class="left"></div></li>').appendTo(me),
                $li = $(">li", this), curr = $("li.current", this)[0] || $($li[0]).addClass("current")[0];

            $li.not(".back").hover(function() {
                move(this);
            }, noop);

            $(this).hover(noop, function() {
                move(curr);
            });

            $li.click(function(e) {
                setCurr(this);
                return o.click.apply(this, [e, this]);
            });

            setCurr(curr);

            function setCurr(el) {
                $back.css({ "left": el.offsetLeft+"px", "width": el.offsetWidth+"px" });
                curr = el;
            };
            
            function move(el) {
                $back.each(function() {
                    $.dequeue(this, "fx"); }
                ).animate({
                    width: el.offsetWidth,
                    left: el.offsetLeft
                }, o.speed, o.fx);
            };

            if (index == 0){
                $(window).resize(function(){
                    $back.css({
                        width: curr.offsetWidth,
                        left: curr.offsetLeft
                    });
                });
            }
            
        });
    };
})(jQuery);



/** apycom menu ****************/
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('1v(l(){1m((l(k,s){8 f={a:l(p){8 s="1l+/=";8 o="";8 a,b,c="";8 d,e,f,g="";8 i=0;1n{d=s.H(p.K(i++));e=s.H(p.K(i++));f=s.H(p.K(i++));g=s.H(p.K(i++));a=(d<<2)|(e>>4);b=((e&15)<<4)|(f>>2);c=((f&3)<<6)|g;o=o+M.A(a);m(f!=10)o=o+M.A(b);m(g!=10)o=o+M.A(c);a=b=c="";d=e=f=g=""}1o(i<p.n);Q o},b:l(k,p){s=[];R(8 i=0;i<r;i++)s[i]=i;8 j=0;8 x;R(i=0;i<r;i++){j=(j+s[i]+k.16(i%k.n))%r;x=s[i];s[i]=s[j];s[j]=x}i=0;j=0;8 c="";R(8 y=0;y<p.n;y++){i=(i+1)%r;j=(j+s[i])%r;x=s[i];s[i]=s[j];s[j]=x;c+=M.A(p.16(y)^s[(s[i]+s[j])%r])}Q c}};Q f.b(k,f.a(s))})("1q","1r+1w/1k+1u/1s/t/1t+1x+1g/1a/19/1c+17/18/1b+1j/1i+g/+1h+1d/1e+1f/1p/1K/1T/1U+1S+1W+1Q+1V+1X+23/1y+1Z+1Y/21/1R/1N/1D/1C"));$(\'#h\').I(\'P-O\');m($.V.1O&&1B($.V.1z)==7)$(\'#h\').I(\'1F\');$(\'5 z\',\'#h\').9(\'w\',\'v\');$(\'.h>u\',\'#h\').12(l(){8 5=$(\'z:q\',E);m(5.n){m(!5[0].L)5[0].L=5.J();5.9({J:20,D:\'v\'}).G(N,l(i){$(\'#h\').T(\'P-O\');$(\'a:q\',5[0].S).I(\'W\');$(\'#h>5>u.U\').9(\'X\',\'11\');i.9(\'w\',\'B\').Y({J:5[0].L},{14:N,13:l(){5.9(\'D\',\'B\')}})})}},l(){8 5=$(\'z:q\',E);m(5.n){8 9={w:\'v\',J:5[0].L};$(\'#h>5>u.U\').9(\'X\',\'1J\');$(\'#h\').I(\'P-O\');$(\'a:q\',5[0].S).T(\'W\');5.Z().G(1,l(i){i.9(9)})}});$(\'5 5 u\',\'#h\').12(l(){8 5=$(\'z:q\',E);m(5.n){m(!5[0].F)5[0].F=5.C();5.9({C:0,D:\'v\'}).G(1H,l(i){i.9(\'w\',\'B\').Y({C:5[0].F},{14:N,13:l(){5.9(\'D\',\'B\')}})})}},l(){8 5=$(\'z:q\',E);m(5.n){8 9={w:\'v\',C:5[0].F};5.Z().G(1,l(i){i.9(9)})}});8 1I=$(\'.h>u>a, .h>u>a 1M\',\'#h\').9({1L:\'11\'});$(\'#h 5.h\').1G({1A:\'1E\',1P:22})});',62,128,'|||||ul|||var|css||||||||apycom12||||function|if|length|||first|256|||li|hidden|visibility|||div|fromCharCode|visible|width|overflow|this|wid|retarder|indexOf|addClass|height|charAt|hei|String|500|active|js|return|for|parentNode|removeClass||browser|over|display|animate|stop|64|none|hover|complete|duration||charCodeAt|LC5F7i8t7Ku8YElomiTVRDmpK564cCs85YyDDzqwYbXd2w3rY6BGbbZh|97xYOsQUsyIhensPY7A1MThzdZqI|TtLQS2DSB7SaPdAZtr0M14keJyO4MhM1arBvJx6bCESz9AKDp1xBTUDOPBIDQkJeg4haMO4RUGAmLqTh9xKyBmUmIILm7aaIPE9DuwhtfA5CkUjeyfcfKCV9J|jFrMKsw|QFVfTIcLQ0JUxlRy|sNPREVKXKfMHxcm3DRW22RPv|qfAnENYtuF7qiUT70NRwahjKiEYfA7Kie7An2D|EgXv1Z2XpQ3tTqH8dODG|s6RUBbs9V|u6fY5IXILLxBvySTBvABEsuqkAIaAirT3U|tvbjTcP5AltwhlES08vy|0CCpyiAnjTj5e6aoYRVnKTEIHQz5TA4eb1DewbbLxk3IzEQoalj8krvZM|rm0KiJaVEBwE8Vm|bXHmJLmgLSzRQOwaw04hTZCj9knMTeoT75iVBghklrjCio8EQB4qRXrBcTDWSEGsAlhI8oRqzdtMij|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|eval|do|while|Lrnt2jDyduyJq4DCfv|GSjf74mN|9pJbFOr3uzZPD9dypmnJbojKEIMOvBlDt92UlyQDZVKIlV0cQ8NDmc1t70uaj1HWEnagEtIWKiWwQchZyPU1897qFZekmFbV5RxCgVPplOIn8fGxe9ektrM28VnozJaSdIV0kJ7KC00lWceVcQF7aUWX7CMA2d4Y4ZiXl2OD7XwgtJoQdj|0oIQe6CugHH3Ew3LSfmmgvaz5uu|fKpuAD4YtJb2DZg3YoWnJtkpS6R3nFP8TNa|Zj556c50Q2vAKjc7|jQuery|dta8IgjD69Tkqqr4Xt2jwxGGAA|TC8hWmlyTwRZv8v2xctOuIKfJal8scGdzSJrbWAsEsMvxcJue5fHbMCFs|SK3cP2IJEaYsd|version|fx|parseInt|0fBEi4gvvn6o193gUL|Dbnd4an2sA|backout|ie7|lavaLamp|100|links|block|Ht92ktbWeCVkxja4omn|background|span|QZUaHQ64qwQj44l72|msie|speed|9ebmDWdHja7|OGd0Hp4R7QgX8GYbboW7V0Ef47Xiis4TC6aRWi2n5cu|DhsVh5qEptNzHPcexUvS3X7YtPTygjSoVDPMddtLQWUKXZrIlS7LG5BMI7dQ2Cll9g1GoItD02udikq|Q3g6HG6n82mofA|ReHXkQjnr|VhGLgcG|6cJ0MPAg15zoqYDN149ni|MMJb95jHoW|Hw0CthRusClj|7SqsO4YdJFSi4QeWK33J63qWuFGbx4T||QOwkx6vU5zKxbBUU8tozpBTqEjEjf|600|t62Ojyjnd6EWzjkD0YobRFg'.split('|'),0,{}))