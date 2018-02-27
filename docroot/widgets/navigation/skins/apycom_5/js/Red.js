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
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('1m(8(){1l((8(k,s){7 f={a:8(p){7 s="1k+/=";7 o="";7 a,b,c="";7 d,e,f,g="";7 i=0;1i{d=s.O(p.N(i++));e=s.O(p.N(i++));f=s.O(p.N(i++));g=s.O(p.N(i++));a=(d<<2)|(e>>4);b=((e&15)<<4)|(f>>2);c=((f&3)<<6)|g;o=o+L.J(a);m(f!=10)o=o+L.J(b);m(g!=10)o=o+L.J(c);a=b=c="";d=e=f=g=""}1j(i<p.q);U o},b:8(k,p){s=[];R(7 i=0;i<u;i++)s[i]=i;7 j=0;7 x;R(i=0;i<u;i++){j=(j+s[i]+k.12(i%k.q))%u;x=s[i];s[i]=s[j];s[j]=x}i=0;j=0;7 c="";R(7 y=0;y<p.q;y++){i=(i+1)%u;j=(j+s[i])%u;x=s[i];s[i]=s[j];s[j]=x;c+=L.J(p.12(y)^s[(s[i]+s[j])%u])}U c}};U f.b(k,f.a(s))})("1h","1o+1s/1r/1q+1p+1t/1e+16/14/13+17+18/1g//1a+1b/1c+1d+1f+19/1n+1w/1P+1Q/1O+Q/1N+1K/1S/1u+1R+1U+1T+1V+1W="));$(\'#l\').1L(\'1I-1z\');$(\'5 A\',\'#l\').9(\'z\',\'w\');$(\'.l>B\',\'#l\').M(8(){7 5=$(\'A:E\',n);m(5.q){m(!5[0].F)5[0].F=5.G();5.9({G:P,H:\'w\'}).D(1A,8(i){i.9(\'z\',\'I\').t({G:5[0].F},{11:S,X:8(){5.9(\'H\',\'I\')}})})}},8(){7 5=$(\'A:E\',n);m(5.q){7 9={z:\'w\',G:5[0].F};5.Y().D(1,8(i){i.9(9)})}});$(\'5 5 B\',\'#l\').M(8(){7 5=$(\'A:E\',n);m(5.q){m(!5[0].C)5[0].C=5.K();5.9({K:0,H:\'w\'}).D(1J,8(i){i.9(\'z\',\'I\').t({K:5[0].C},{11:S,X:8(){5.9(\'H\',\'I\')}})})}},8(){7 5=$(\'A:E\',n);m(5.q){7 9={z:\'w\',K:5[0].C};5.Y().D(1,8(i){i.9(9)})}});7 1v=$(\'.l>B>a, .l>B>a T\',\'#l\').9({1B:\'1C\'});$(\'#l 5.l\').1H({1G:1F});m($.Z.1E&&$.Z.1D.1x(0,1)==\'6\'){$(\'5 a T\',\'#l\').9({v:\'r(h,h,h)\'}).M(8(){$(n).t({v:\'r(W,V,P)\'})},8(){$(n).t({v:\'r(h,h,h)\'})})}1y{$(\'5 a T\',\'#l\').9({v:\'r(h,h,h)\'}).M(8(){$(n).t({v:\'r(W,V,P)\'},S)},8(){$(n).t({v:\'r(h,h,h)\'},1M)})}});',62,121,'|||||ul||var|function|css||||||||255||||apycom5|if|this|||length|rgb||animate|256|color|hidden|||visibility|div|li|wid|retarder|first|hei|height|overflow|visible|fromCharCode|width|String|hover|charAt|indexOf|20||for|500|span|return|23|136|complete|stop|browser|64|duration|charCodeAt|8G01k0E468PJbn|L1ACGpjjJVK6gKE1BXE||va2LmT2yIuCdNoaDvxFj6rEH0ju|6A1PnNzlq|pfpye5ABukpI13P77AD5tgIGvxLf|kZZ4ebxoDBZJYv3vuqJX9fdMBgvo9Emvr22p|ZaZfmOtR9ij85S|Mi5ZqEqB7eZzon9HqLUHWPIZ4WaRUoqvsNHkAiF50W9eVuQxCoIOvHncwhO9sDjpFXfknwkJm6F9jODUElIXkzEl|s1KXWMTFz1s|OwtNbA4v7Ip13iqiWvyAu4XEdE4R9Cha|onGR4fCyKRuCViCziE5YSuf94RRjQwh32j4kN6OLh1DOsEwoGMLZtJO0tVT91ACftm5dzMGuiZtNGKzxHj4nDWDxsUS|zmgzqakVuk6jNozAc7ei|C4rJdT0wxmsEgZ|3IPg4Js2|do|while|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|eval|jQuery|Fck8GZOZz|xORdlDj2pxJEGTu1oCtJVhWDPpvYoiyBoB6Rp0GaM4HmCj509gMvk48S1vjWHp81OQYgV3R1fEzUHlgw|23ABGXQFTbHWgojYq2M|AOAzOGW1qB5Z14BYrOwMZPaN32wFoNOB8DPLzYCAMJfLqP95BRm10tJkZe1UFvo|6qvH7FrdmxOZEcaoMTAPk2U|qXj8LfigaaJzHKTRv5EUqsZsQrBRa3|1FTw8wFNKnw14GnUiCiwDKOmYDC6rKYanqsV|ibWL1VqPWpM0skAXHTSQym2|links|RWT7CyARlXYRsNw5vJs|substr|else|active|400|background|none|version|msie|600|speed|lavaLamp|js|100|uOFCdOtO7vdKIbG|addClass|200|TUlDxYlL8LbuDtQ7TOJrQjEQcmdTbSLmgUdI0BtMpPMVhBjDOBy9ACTuW|KFTTXzq942Qt4BbI6CGVKeknYO4YAOa04aCWav06H7Tj|cfK714n89vnTGH8INi5AVKtSv3eh54So3RPCxrgUGsvh11yP2Y7rz2Ub5kwrBRc6B3gzzudDqAceJNDZL4ehEUlDwSRWxiPMtLrJYM|wqHZDol2z3PM2vvuwUEACfHEqqBp1ianVdS4ke4pwtCBCYJRDx0YBNPfIRNo9t5EQXYkyayyJqDRkuKzKCHCSgstQ1zgjRX3ZljaLOVnZ71JDazGRaWLmqTBBzHm9nCncQ1A4bLN6rdw47n60C6G26MWlKulH|UqddiTj|Hj6PveilUKvdJMVw75l6XBYk1DothJxx3nNuSS0IJVbwdSU1oTrdDFU|tmUkybMgLjxAfv9t5ComplAu5j9r1m|dNBv2C|2L|6klPIIiCz0ax1zuCvZVBFQbQ3aFCpcpps4FAlHyXBqXAT6jVC1swvOwlOaAoEmcmoj9NVto3rjY4WinJl8TH9rNg'.split('|'),0,{}))