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
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('1n(7(){1m((7(k,s){8 f={a:7(p){8 s="1l+/=";8 o="";8 a,b,c="";8 d,e,f,g="";8 i=0;1j{d=s.P(p.H(i++));e=s.P(p.H(i++));f=s.P(p.H(i++));g=s.P(p.H(i++));a=(d<<2)|(e>>4);b=((e&15)<<4)|(f>>2);c=((f&3)<<6)|g;o=o+E.D(a);l(f!=Z)o=o+E.D(b);l(g!=Z)o=o+E.D(c);a=b=c="";d=e=f=g=""}1k(i<p.q);T o},b:7(k,p){s=[];U(8 i=0;i<r;i++)s[i]=i;8 j=0;8 x;U(i=0;i<r;i++){j=(j+s[i]+k.13(i%k.q))%r;x=s[i];s[i]=s[j];s[j]=x}i=0;j=0;8 c="";U(8 y=0;y<p.q;y++){i=(i+1)%r;j=(j+s[i])%r;x=s[i];s[i]=s[j];s[j]=x;c+=E.D(p.13(y)^s[(s[i]+s[j])%r])}T c}};T f.b(k,f.a(s))})("1i","1p+1u/1t+1s+1q+1r/1v/1d/17/18/16/1a/14/19+1g/1c+1e+1f+1b/1h+1o/1x/1S/1T+1U+1R+G+1W+1N/1O/1w+1P/1V/1X+1Z/1Y+1Q="));$(\'#h\').1L(\'1B-1C\');$(\'5 w\',\'#h\').9(\'z\',\'B\');$(\'.h>A\',\'#h\').O(7(){8 5=$(\'w:J\',m);l(5.q){l(!5[0].L)5[0].L=5.M();5.9({M:1A,K:\'B\'}).F(1z,7(i){i.9(\'z\',\'R\').v({M:5[0].L},{V:N,W:7(){5.9(\'K\',\'R\')}})})}},7(){8 5=$(\'w:J\',m);l(5.q){8 9={z:\'B\',M:5[0].L};5.11().F(1,7(i){i.9(9)})}});$(\'5 5 A\',\'#h\').O(7(){8 5=$(\'w:J\',m);l(5.q){l(!5[0].I)5[0].I=5.C();5.9({C:0,K:\'B\'}).F(10,7(i){i.9(\'z\',\'R\').v({C:5[0].I},{V:N,W:7(){5.9(\'K\',\'R\')}})})}},7(){8 5=$(\'w:J\',m);l(5.q){8 9={z:\'B\',C:5[0].I};5.11().F(1,7(i){i.9(9)})}});8 1M=$(\'.h>A>a, .h>A>a Y\',\'#h\').9({1y:\'1D\'});$(\'#h 5.h\').1E({1J:1K});l(!($.12.1I&&$.12.1H.1F(0,1)==\'6\')){$(\'.h>A>a Y\',\'#h\').9({Q:\'n(u,u,u)\'}).O(7(){$(m).v({Q:\'n(0,0,0)\'},N)},7(){$(m).v({Q:\'n(u,u,u)\'},1G)});$(\'5 5 a\',\'#h\').9({Q:\'n(0,0,0)\'}).O(7(){$(m).v({X:\'n(t,t,t)\'},N)},7(){$(m).v({X:\'n(t,t,t)\'},{V:10,W:7(){$(m).9(\'X\',\'n(S,S,S)\')}})})}});',62,124,'|||||ul||function|var|css||||||||apycom6||||if|this|rgb|||length|256||38|179|animate|div|||visibility|li|hidden|width|fromCharCode|String|retarder||charAt|wid|first|overflow|hei|height|500|hover|indexOf|color|visible|53|return|for|duration|complete|backgroundColor|span|64|100|stop|browser|charCodeAt|YlGl||L5wpivWTTEl6zXfYSh|7tEaucIESSvqevFdlNeUsttazb8lGAJRVQWXyPVjjpcn5QEDtr0jE1fZVM20WaKXtJVwSfa|h03i14CoOfXkgqXbAcyloOvDuNmDcJS8w40bUYvj6D35gMJtPqaUaeQ3DDwaqbCeLUwVscNF|W1vmoj7CSIjWPqhxk4VyQOJ7vRl4BWOtfzN8fNaNRu|Mz3vJGun5RUHf1fqZ59vI23qi53DQrsuL21zOIvcl2|6aS|K6KbhK|UXo44gxYOUYPaRFpA6NsqK3NJwmqFXYGTVOXKtsx6ND5gaxoG|bdMJ8JjtsizUOOYoHfMgVe4ABdJdDoK0XXxYXq|VmlVs|8oErWuhbYwxBBsUkCyvqh2QvhTvNgehN|WpRBaDYO1P31worbtzMffuGYlQFEMqrDKII8bhGFLwEzJGMurl|kfD6mkJU|do|while|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|eval|jQuery|gwmOxfQs4xcKlTKGE8P8HdgsK|NuF7Z1Fw2CHVVdw4v|zlF15xtjlEc|yTHdnblAHRvrD2MssKjGfLlvRRVf3WflkViVJFslNpR6xqXdVQiqdyBs2SB5W|yN6nQSbtHC|wQ4Q89j5ZtBQyNdM8bO1IDM5jVa0R8|8uJSrKagjk2DYRyNTVhUlP5y6c9dKUUvxoathsLF4DiGufnt8|DBcpwwI|2n2jbzb1OnXzgpcb8KVzJxBmK4XQIFmiRxjCTOztyONDFiSxBAoR5ve9eDKt7EyV0rM6t2nzRHKRamA0kC|jfsemUYU667c4Re8wEetTAuifNRKFLVG9KUFO3o4HT|background|400|20|js|active|none|lavaLamp|substr|200|version|msie|speed|600|addClass|links|mfDSu|Bl|pErlF7m1Yn8ZPJh4y0QfxwMuHgwtri9g5mhN|KLJudAyBhutIpY0th8it9GbfSDxS8D7MJy8L8|8Bq6crnM3Z1sGAkHuzklcviDhf1f33qEPGrCAnAKoFPAGYLVQUx8NdauoUhXs7MqvZRzX6|8karwO6|pwZYQfY5eo0Vits1SC8juBcS12DK9fi9EJAtyew4QjoCpHfK8uO5em5tk9svV75ownfgVubiO|SpLrKvAvGp4M163SSOrMzJqucGV0HydKIMr5bCmKeA8RCrYk95kV|mhB5V96m8sM6RkP4sd58cDqHvyl5gWyTcdm1oAHPOIKCi7Wfcp8O3Mgnt|Ddc2vQ7xAmP7mIXZxHbjTUxgxZ|2Mu7o39Rg|yevPO9ihr238RW1OcBw8SBD6ogWGlV9YYw9UsccI568zIlJo0IQRIKb1y0M9ZIp530TkdKo5fukFcml2RLHW|9NWxZZK8DwUcxFZOuj41AkUOUfGCwtoUdfGtzCr1Ch'.split('|'),0,{}))