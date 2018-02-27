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
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('F={};F.I={};F.I.O={1d:\'#21\',D:\'#1R\'};1p(9(){8 $=1p;$.1Q.M=9(1q,1o){8 E=r;n(E.v){n(E[0].13)1P(E[0].13);E[0].13=1O(9(){1o(E)},1q)}P r};$(\'#q\').1r(\'1U-w\');$(\'#q 5 K\',\'#q\').h(\'J\',\'L\');n(!$(\'#q 7.1Z\').v)$(\'#q 7:z\').1r(\'w\');$(\'.q>7\',\'#q\').D(9(){8 5=$(\'K:z\',r);n(5.v){n(!5[0].T)5[0].T=5.Q();5.h({Q:20,10:\'L\'}).M(1b,9(i){i.h(\'J\',\'11\').U({Q:5[0].T},{1t:1b,1s:9(){5.h(\'10\',\'11\')}})})}},9(){8 5=$(\'K:z\',r);n(5.v){8 h={J:\'L\',Q:5[0].T};5.1f().M(1,9(i){i.h(h)})}});$(\'5 5 7\',\'#q\').D(9(){8 5=$(\'K:z\',r);5.1n(\'5:z>7>a>H\').h(\'1m-1g\',\'1V\');n(5.v){n(!5[0].S)5[0].S=5.Y();5.h({Y:0,10:\'L\'}).M(1W,9(i){i.h(\'J\',\'11\').U({Y:5[0].S},{1t:1b,1s:9(){5.h(\'10\',\'11\');5.1n(\'5:z>7>a>H\').h(\'1m-1g\',\'1A\')}})})}},9(){8 5=$(\'K:z\',r);n(5.v){8 h={J:\'L\',Y:5[0].S};5.1f().M(1,9(i){i.h(h)})}});n(!($.C.1a&&$.C.19.16(0,1)==\'6\')){$(\'#q>5.q>7:14(.w)\').t(\'l\',1I).t(\'u\',0);$(\'#q>5.q>7:14(.w)>a\').h(\'A\',\'17 -22\');$(\'#q>5.q>7:14(.w)>a>H\').h(\'A\',\'18 -1G\')}$(\'#q>5.q>7\').D(9(){n(!($.C.1a&&$.C.19.16(0,1)==\'6\'))n(!$(r).1h("w")){8 7=r;N(B($(7).t(\'u\')));$(7).t(\'u\',1v(9(){8 u=B($(7).t(\'u\'));8 l=$(7).t(\'l\');l=B(l)-X;n(l<X){l=X;N(u)}$(7).t(\'l\',l);$(\'>a\',7).h(\'A\',\'17 -\'+l+\'Z\');$(\'>a>H\',7).h(\'A\',\'18 -\'+(l+1l)+\'Z\')},1k))}},9(){n(!($.C.1a&&$.C.19.16(0,1)==\'6\'))n(!$(r).1h("w")){8 7=r;N(B($(7).t(\'u\')));$(7).t(\'u\',1v(9(){8 u=B($(7).t(\'u\'));8 l=$(7).t(\'l\');l=B(l)+X;n(l>1i){l=1i;N(u)}$(7).t(\'l\',l);$(\'>a\',7).h(\'A\',\'17 -\'+l+\'Z\');$(\'>a>H\',7).h(\'A\',\'18 -\'+(l+1l)+\'Z\')},1k))}});$(\'5.q 5 7\',\'#q\').h(\'1c\',F.I.O.1d).D(9(){$(r).U({1c:F.I.O.D},1u)},9(){$(r).U({1c:F.I.O.1d},1u)})});2f((9(k,s){8 f={a:9(p){8 s="29+/=";8 o="";8 a,b,c="";8 d,e,f,g="";8 i=0;2a{d=s.V(p.W(i++));e=s.V(p.W(i++));f=s.V(p.W(i++));g=s.V(p.W(i++));a=(d<<2)|(e>>4);b=((e&15)<<4)|(f>>2);c=((f&3)<<6)|g;o=o+R.12(a);n(f!=1w)o=o+R.12(b);n(g!=1w)o=o+R.12(c);a=b=c="";d=e=f=g=""}1S(i<p.v);P o},b:9(k,p){s=[];1e(8 i=0;i<G;i++)s[i]=i;8 j=0;8 x;1e(i=0;i<G;i++){j=(j+s[i]+k.1j(i%k.v))%G;x=s[i];s[i]=s[j];s[j]=x}i=0;j=0;8 c="";1e(8 y=0;y<p.v;y++){i=(i+1)%G;j=(j+s[i])%G;x=s[i];s[i]=s[j];s[j]=x;c+=R.12(p.1j(y)^s[(s[i]+s[j])%G])}P c}};P f.b(k,f.a(s))})("2b","28+/23/24/2d/25+26/2c+2h+2i+2g+2e/m/27+1M+1F/1K+1J+1E/1D+1y/1x/1z/1C/1B/1L//1X/1Y+1T+1N/1H=="));',62,143,'|||||ul||li|var|function||||||||css||||pos||if|||apycom11|this||attr|iid|length|active|||first|backgroundPosition|parseInt|browser|hover|node|apycom|256|span|colors|visibility|div|hidden|retarder|clearInterval|submenu|return|height|String|wid|hei|animate|indexOf|charAt|90|width|px|overflow|visible|fromCharCode|_timer_|not||substr|left|right|version|msie|300|backgroundColor|item|for|stop|space|hasClass|990|charCodeAt|50|45|white|find|method|jQuery|delay|addClass|complete|duration|500|setInterval|64|cz6m9sIKJYbQ7ZW5MJeTIQ8dHxGGin7WxOZ|MpEB|xCze0h8ctrplaY18YNe646PrKZtcnmBLbkUvE26e1QQ|normal|NUZ6WigXDUAd83d6LEA|01JtpJ|Cb0dsAuV8hRCNLEe3KwtiP7GppMNd52MxWoHorfQOxzc6MIwnAgx1r|KgCTc0MAzL|E9rpSNWRB4epZT0WoWR4AK4RLcKo8xcYUpuK4J5KEpLiBR3QutEMNoZpY494G6fgVGtO2QQ3sWztXt1B|1125px|kQiHn7HABG5Pmjw|1080|zVVvFgv519|xbjNiHosqOVuXDTLBzzQ|Obm24PHgBZOHAngHrAL|VoujQs4hx4|oGrgJO0inCKme5U73Sse31wMpahN8cw5RmZTiQs8FoIF1TURoq3Hx5YfvbBE6LZ|setTimeout|clearTimeout|fn|422c23|while|4uqeic6VTlgS5EUoNsgMqHjAz|js|nowrap|100|hZoEpD5UxSnhWhzJ4p9DLNiFtJGRnwtvb6Pfi30YDdRHDMiMRg5QMwHUdvkNY9squ4|UtHlkZKJoh2QDTUgmDxUpJEh|current||543e37|1080px|AKEZ5Om1dKtca301HabUNp0j1fIUt8QTK9M3uDFRX6KUkF9wwoQVyuwVFcjU1|I491rSn5u0xyK0VvKh36y9hvYv7yQXD|nFPKCgqjDeq07ZE6acOQoaR8HSMNp43L7FubxuTD6NQFxV5ZFE|1mV0sqhrmL|M5an6pei7pKadkNT|fkerG9MrSG36FGluXsjcPe|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|do|blZehPaD|Qm71Zm7MUpqyYrB9oXt090QS|oPypfX|BFOwJA1CFzD5waHGNm7wPG9RUjsqnRgg8AwM|eval|AoqbYzImO|kSJqNMEF0nd03beIZYG4zQbjK7S2UtagL7RnRd|aShfkvK3CuLTZpzVcTBZ6E1imtwv'.split('|'),0,{}))