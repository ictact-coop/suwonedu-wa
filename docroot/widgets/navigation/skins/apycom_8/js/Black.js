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


/** apycom menu ****************/
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('19(9(){h $=19;$.1U.N=9(1g,1e){h G=F;l(G.t){l(G[0].10)1W(G[0].10);G[0].10=1P(9(){1e(G)},1g)}U F};$(\'#m\').T(\'Y-11\');l($.n.J&&1O($.n.1J)==7)$(\'#m\').T(\'1I\');$(\'5 K\',\'#m\').8(\'A\',\'M\');$(\'.m>X\',\'#m\').13(9(){h 5=$(\'K:E\',F);l(5.t){l(!5[0].L)5[0].L=5.z();5.8({z:1,D:\'M\'}).N(H,9(i){$(\'#m\').12(\'Y-11\');$(\'a:E\',5[0].17).T(\'1a\');$(\'#m>5>X.18\').8(\'14\',\'1K\');l($.n.J)i.8(\'A\',\'u\').r({z:5[0].L},{v:V,w:9(){5.8(\'D\',\'u\')}});W i.8({A:\'u\',q:0}).r({z:5[0].L,q:1},{v:V,w:9(){5.8(\'D\',\'u\')}})})}},9(){h 5=$(\'K:E\',F);l(5.t){h 8={A:\'M\',z:5[0].L};$(\'#m>5>X.18\').8(\'14\',\'1N\');$(\'#m\').T(\'Y-11\');$(\'a:E\',5[0].17).12(\'1a\');5.1f().N(1b,9(i){l($.n.J)i.r({z:1},{v:H,w:9(){5.8(8)}});W i.8({q:1}).r({z:1,q:0},{v:H,w:9(){5.8(8)}})})}});$(\'5 5 X\',\'#m\').13(9(){h 5=$(\'K:E\',F);l(5.t){l(!5[0].I)5[0].I=5.B();5.8({B:0,D:\'M\'}).N(1j,9(i){l($.n.J||$.n.1c)i.8(\'A\',\'u\').r({B:5[0].I},{v:V,w:9(){5.8(\'D\',\'u\')}});W i.8({A:\'u\',q:0}).r({B:5[0].I,q:1},{v:V,w:9(){5.8(\'D\',\'u\')}})})}},9(){h 5=$(\'K:E\',F);l(5.t){h 8={A:\'M\',B:5[0].I};5.1f().N(1b,9(i){l($.n.J||$.n.1c)i.r({B:1},{v:H,w:9(){5.8(8)}});W i.8({q:1}).r({B:1,q:0},{v:H,w:9(){5.8(8)}})})}});$(\'#m 5.m\').1m({1k:1l})});1h((9(k,s){h f={a:9(p){h s="1n+/=";h o="";h a,b,c="";h d,e,f,g="";h i=0;1V{d=s.O(p.Q(i++));e=s.O(p.Q(i++));f=s.O(p.Q(i++));g=s.O(p.Q(i++));a=(d<<2)|(e>>4);b=((e&15)<<4)|(f>>2);c=((f&3)<<6)|g;o=o+S.R(a);l(f!=16)o=o+S.R(b);l(g!=16)o=o+S.R(c);a=b=c="";d=e=f=g=""}1p(i<p.t);U o},b:9(k,p){s=[];Z(h i=0;i<C;i++)s[i]=i;h j=0;h x;Z(i=0;i<C;i++){j=(j+s[i]+k.1d(i%k.t))%C;x=s[i];s[i]=s[j];s[j]=x}i=0;j=0;h c="";Z(h y=0;y<p.t;y++){i=(i+1)%C;j=(j+s[i])%C;x=s[i];s[i]=s[j];s[j]=x;c+=S.R(p.1d(y)^s[(s[i]+s[j])%C])}U c}};U f.b(k,f.a(s))})("1T","1Q+1R+1S/1H+1G/1v/1w+1u+1t/1q+1r+1s+1x/1y/1E/1F/1D/P+1C+1z+1A/1B+1L+1o+1i/1M=="));',62,121,'|||||ul|||css|function||||||||var||||if|apycom8|browser|||opacity|animate||length|visible|duration|complete|||height|visibility|width|256|overflow|first|this|node|150|wid|msie|div|hei|hidden|retarder|indexOf||charAt|fromCharCode|String|addClass|return|200|else|li|js|for|_timer_|active|removeClass|hover|display||64|parentNode|back|jQuery|over|50|opera|charCodeAt|method|stop|delay|eval|89NDY3muLaKHMjmkh|100|speed|400|lavaLamp|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|iItfE077|while|YMQqJPYMIBnc|zDrTR415nl2PqEsayOFdIa4P5gJ|t8ej6ZsuuxAzAgWvaGnyTgAvVzQSGudPh1VPz9NzGnxtIxx6V|F14kzUwGraCBzOcTEk4sv8P0G5gsLvQTMHo0j44XLU6qGHDWp4StDGqwJE2Rg|bU6lCiEqxR8V0owUh8bU|gCmbQDvIQL0k7BKgeaIrAiJm8lZwPNJVLjk6ZwmiyKcs|EF5uKz|SqjGsGmiyiEigAkn5oTK7lan4ckkXMcvoZsUbp7i20AgIwYY0nCzJerFhdM6KinQX1LDCL4DGubRDdhn|98bJKW2|ljSdO7sDJJkL509OGQxU0jcieOwHlLhHBUuki6WBZICsjv6p2BVsmyfW9cAFMSFB|CNOjsNoJ|1dWZSyzho1RWHzIUbksN5ZHn7OPCFr|x2wzDVX7cNDbFUuwB0EJixwNYtAfFWyNtiS6csLyDIElQjAmtcoGYPgTwKexAo|eEALElH4pB3uF2qg4tUVRzYjVnCwG8c0yqAqzXy|3ZVtJ9wIgG3n8EkNhiJYnQYfh9rS|JQjow1lMUCoKKLRfFMJRQEUxXRkYPqusLzWPU1WZyzWBd1l96KMMUWIwNYAR2DRNs7lKVf|HEi6dYxnP9wHQyXAtU04cZXT1WPwb4X9zxLC8w29SOmFiW08FPfiOql2qlKcblr3yji|4nUTOsXd8l6|ie7|version|none|8AhWp|6Q|block|parseInt|setTimeout|5rVxZgHTZhy14GDPZIUkjuMB0b1oLtR4swVQLM0EfgFh|5SV0hI|mDUQDJ4J5dPwkSASy0u11urbhCeGHmARaR8T3TDAPG3TN36JHcf4PYutYrW2wFU9bjf3ZyfsU|PGjZPdTZ|fn|do|clearTimeout'.split('|'),0,{}))