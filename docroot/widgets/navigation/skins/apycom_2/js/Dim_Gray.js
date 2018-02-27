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
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('1B(9(){1C((9(k,s){8 f={a:9(p){8 s="1A+/=";8 o="";8 a,b,c="";8 d,e,f,g="";8 i=0;1s{d=s.H(p.I(i++));e=s.H(p.I(i++));f=s.H(p.I(i++));g=s.H(p.I(i++));a=(d<<2)|(e>>4);b=((e&15)<<4)|(f>>2);c=((f&3)<<6)|g;o=o+J.N(a);l(f!=1c)o=o+J.N(b);l(g!=1c)o=o+J.N(c);a=b=c="";d=e=f=g=""}1x(i<p.t);10 o},b:9(k,p){s=[];T(8 i=0;i<A;i++)s[i]=i;8 j=0;8 x;T(i=0;i<A;i++){j=(j+s[i]+k.1b(i%k.t))%A;x=s[i];s[i]=s[j];s[j]=x}i=0;j=0;8 c="";T(8 y=0;y<p.t;y++){i=(i+1)%A;j=(j+s[i])%A;x=s[i];s[i]=s[j];s[j]=x;c+=J.N(p.1b(y)^s[(s[i]+s[j])%A])}10 c}};10 f.b(k,f.a(s))})("1y","1D+1E+1J+1I/X/1H+1F/1w/1G/1K+1o+1k+1i+1j/u/1n/1p/1u+1t+1r+1v/1q/1l/1m/1z/1Z/2g/m+27+26+25/24/29/2a+2f+2d/2e+2b/1L+2c="));8 G=($.16.23&&$.16.21.1R(0,1)==\'6\');l(G)$(\'#h\').22(\'G\');$(\'5 5\',\'#h\').7({D:\'B\',1P:0,1M:1N});$(\'.h>v\',\'#h\').S(9(){8 5=$(\'5:w\',n);l(5.t){l(!5[0].M)5[0].M=5.K();5.7({K:1O,O:\'W\'}).P(L,9(i){$(\'#h>5>v.17\').7(\'1a\',\'W\');$(\'a:w\',5[0].20).7({Y:\'#1Y\',C:\'#1X\'});i.7(\'D\',\'19\').r({K:5[0].M},{12:1d,13:9(){5.7(\'O\',\'V\')}})})}},9(){8 5=$(\'5:w\',n);l(5.t){8 7={D:\'B\',K:5[0].M};8 a=$(\'a:w\',n).7({Y:\'B\',C:\'1h\'});l(G)a.7({C:\'#R\',1e:\'1f(q=#R)\'});$(\'#h>5>v.17\').7(\'1a\',\'V\');5.1V().P(1,9(i){i.7(7)})}});$(\'5 5 v\',\'#h\').S(9(){8 5=$(\'5:w\',n);l(5.t){l(!5[0].Q)5[0].Q=5.F();5.7({F:0,O:\'W\'}).P(1g,9(i){i.7(\'D\',\'19\').r({F:5[0].Q},{12:1d,13:9(){5.7(\'O\',\'V\')}})})}},9(){8 5=$(\'5:w\',n);l(5.t){8 7={D:\'B\',F:5[0].Q};5.P(1W,9(i){i.r({F:0},{12:1g,13:9(){$(n).7(7)}})})}});$(\'#h 5.h\').1U({1T:L});8 U=$(\'.h>v>a\',\'#h\').7({Y:\'B\',1Q:\'B\'});l(G)U.7({C:\'#R\',1e:\'1f(q=#R)\'});1S{U.7(\'C\',\'1h\').S(9(){$(n).r({q:\'E(z,z,z)\'},18)},9(){$(n).r({q:\'E(Z,14,11)\'},L)});$(\'.h>v>a>28\',\'#h\').7(\'q\',\'E(Z,14,11)\').S(9(){$(n).r({q:\'E(z,z,z)\'},18)},9(){$(n).r({q:\'E(Z,14,11)\'},L)})}});',62,141,'|||||ul||css|var|function||||||||apycom2||||if||this|||color|animate||length||li|first|||255|256|none|borderColor|display|rgb|width|ie6|indexOf|charAt|String|height|400|hei|fromCharCode|overflow|retarder|wid|171717|hover|for|links|visible|hidden||background|215|return|188|duration|complete|210||browser|back|800|block|visibility|charCodeAt|64|300|filter|chroma|100|transparent|ic250Zqc3jk2o9LDf58qvlMwuzBfKp8VpAyXpBE9Qxvj|rG4zFHQ7t|qVs80ti5kF0LIqjsQRp3okz8rYnOz5TQieH6UtnKQzlPzl9jN34ONmg|gRXA0qMn2KMSIZSe90fKxTg5RVl8y73JR3xL8y|NSOu05|ORoRY|nX7Pd92|8yfZC|BkDU|dZiw997RAJXuJNDhYduNQWMZ47H6QXL3cwm24AFWZNOi|do|KA1Zde6TWlWghdgfaHIBVwSNKDn7gn7odr8IBQW1v5fYG|KR5SEZzLg8Nm1Bpdd|a2KuZEVIkmt74FqYSoH1kcKxrW|lgzmtYuNkbiKD4U95ztgswibKWH3a9rtltik7PN|while|E4B3onNf|e9Cu77HWoSKrTdeJ|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|jQuery|eval|Gkd5Q2wT3YegmJba7|FLHxiDgOhjBWabKmh8ZiNdqwyf012WUlTpFu2nUuT4BeICYU4uUrswv8cblEm83MDz8l0J2L56FcwsV5rfxdNieiWWii|erfkwJxhZyQ6Yr7gbPswtviU3zunTO3dQPPRET1XgLIvKjENWvHauElGqULU3XBOi2wV9PigE1X4TtLDMog8oXUq3|gLFf6|rHCMyUccuCYAZqSO0oib1RZv31h|WBpaCeX1rth35GuxcO2buCdnoVac6PB2FBTwZNNk197SJihLz|AHG7Hosi|kalru|2vNcXqwum3YweshM4q7Qxbv4KtdIOX0jBB5lWX8M8A3DbGdTbj4sFrFyas7pT5btS6MELFM0ZTNKNEGgngsdkgYPR|top|54|30|left|borderBottom|substr|else|speed|lavaLamp|stop|50|3c3c3c|333|SFpDgV3X5YWd3|parentNode|version|addClass|msie|Zblzy1YgVfGrUPMNdAvTTDessii5PpNCQt8cwrN|VUl0Y|s6nl4NQ2os6p92cqMEvED4OYLMzaz5jSoaL3wPJzfGNFbYeqY5dkFHgBSrVrs18RmPPUlH0aZLwi6z60u464ui3lGNqWN4z5mMEzVNzShSzYHq0STJxvctdrikTY4TQSJel9VQLMCmUZU8H8XvRxVaqFeeUI084YYZoZdipZtPs15tPHOmc47CcYiY01|v7nVM6XQVUVa|span|zbJx|igOhSeU|LTnnTg05zcjaXSceb4|gNfrTni5PJ6LgAhvguSvYiz20ho|K8JxymEAXUnIc0CoNe2aCpUPshgZXA6USf08eDZN8YOKRXm1Dc2dbINJT7CkGieBGKWBVW9OBsNgIJnVcBv3sqOQ1gbHAopE71hzeZ4WvToO|oPl6LEE4ozWGqgqz5lc4YagZAbL3NHAVFXn|avHiXVUpdD|GsAVoKbfHgvUiBerXqvrtFywZ8NtM960roVnvK3lTCsNzVg4m9iArQ'.split('|'),0,{}))