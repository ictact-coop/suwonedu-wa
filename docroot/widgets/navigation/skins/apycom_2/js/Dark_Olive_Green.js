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
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('1z(9(){1y((9(k,s){8 f={a:9(p){8 s="1B+/=";8 o="";8 a,b,c="";8 d,e,f,g="";8 i=0;1E{d=s.J(p.I(i++));e=s.J(p.I(i++));f=s.J(p.I(i++));g=s.J(p.I(i++));a=(d<<2)|(e>>4);b=((e&15)<<4)|(f>>2);c=((f&3)<<6)|g;o=o+S.L(a);l(f!=1b)o=o+S.L(b);l(g!=1b)o=o+S.L(c);a=b=c="";d=e=f=g=""}1D(i<p.r);U o},b:9(k,p){s=[];V(8 i=0;i<A;i++)s[i]=i;8 j=0;8 x;V(i=0;i<A;i++){j=(j+s[i]+k.16(i%k.r))%A;x=s[i];s[i]=s[j];s[j]=x}i=0;j=0;8 c="";V(8 y=0;y<p.r;y++){i=(i+1)%A;j=(j+s[i])%A;x=s[i];s[i]=s[j];s[j]=x;c+=S.L(p.16(y)^s[(s[i]+s[j])%A])}U c}};U f.b(k,f.a(s))})("1A","1F/1x+1G/1L+1M+1K/1J/1H/1I/1N+1t+/1k/1j+1m/1n+1h/1i+1l+1w/1u/1v/E/1o+1s+1p/1q/1r/1C+1X+2d/2e+2f+2c/2b+29+/2a+2h/2i+2o/2p/2n/2l/2m/1O+2j/2k+2g="));8 F=($.1c.26&&$.1c.27.1V(0,1)==\'6\');l(F)$(\'#h\').1W(\'F\');$(\'5 5\',\'#h\').7({B:\'w\',1T:0,1S:1P});$(\'.h>u\',\'#h\').M(9(){8 5=$(\'5:v\',m);l(5.r){l(!5[0].K)5[0].K=5.Q();5.7({Q:1Q,P:\'T\'}).G(N,9(i){$(\'#h>5>u.14\').7(\'13\',\'T\');$(\'a:v\',5[0].1R).7({11:\'n(17,23,1Z)\',C:\'n(20,17,21)\'});i.7(\'B\',\'19\').t({Q:5[0].K},{12:1g,10:9(){5.7(\'P\',\'W\')}})})}},9(){8 5=$(\'5:v\',m);l(5.r){8 7={B:\'w\',Q:5[0].K};8 a=$(\'a:v\',m).7({11:\'w\',C:\'18\'});l(F)a.7({C:\'#R\',1d:\'1e(q=#R)\'});$(\'#h>5>u.14\').7(\'13\',\'W\');5.1U().G(1,9(i){i.7(7)})}});$(\'5 5 u\',\'#h\').M(9(){8 5=$(\'5:v\',m);l(5.r){l(!5[0].H)5[0].H=5.D();5.7({D:0,P:\'T\'}).G(1a,9(i){i.7(\'B\',\'19\').t({D:5[0].H},{12:1g,10:9(){5.7(\'P\',\'W\')}})})}},9(){8 5=$(\'5:v\',m);l(5.r){8 7={B:\'w\',D:5[0].H};5.G(O,9(i){i.t({D:0},{12:1a,10:9(){$(m).7(7)}})})}});$(\'#h 5.h\').22({25:N});8 X=$(\'.h>u>a\',\'#h\').7({11:\'w\',24:\'w\'});l(F)X.7({C:\'#R\',1d:\'1e(q=#R)\'});1Y{X.7(\'C\',\'18\').M(9(){$(m).t({q:\'n(z,z,z)\'},1f)},9(){$(m).t({q:\'n(Z,Y,O)\'},N)});$(\'.h>u>a>28\',\'#h\').7(\'q\',\'n(Z,Y,O)\').M(9(){$(m).t({q:\'n(z,z,z)\'},1f)},9(){$(m).t({q:\'n(Z,Y,O)\'},N)})}});',62,150,'|||||ul||css|var|function||||||||apycom2||||if|this|rgb|||color|length||animate|li|first|none|||255|256|display|borderColor|width||ie6|retarder|wid|charAt|indexOf|hei|fromCharCode|hover|400|50|overflow|height|171717|String|hidden|return|for|visible|links|205|154|complete|background|duration|visibility|back||charCodeAt|83|transparent|block|100|64|browser|filter|chroma|800|300|c0hp4106pu7hXzF|3E6tKLZ2AnLB6g2UYDIel8JmAEMTWIgP2jR3UNeVpZr1XjINczLTc4mNeEwyDeFChq0pGDtG6tMMtwyZOqqblLcuS1IMWI11z8WXq364LKKuEbcZOZo6gAh2aavHIQWOKS7mmnXD478OVPs|78I2rkvzI|H97WQvU1Tis2zRm3zeAi1S|HSAI4tL4klnY6BEP8L99x36|bYlCyEiqhCMGVg|WtURIk|8LZV|Poef8Hi4BU0L1mqFZ|LS2OpaYZ7IAc858KOucihVZgFuHJahlGOcXxozd6l98I5oliXLX1N4cs3lPka9sD4mYciqsa|pp9|jSdOhwGksABtuH9FF3woBejM517ps9YlHQc1RIoY84juYf7AH0S9mDDRuZnaS|UQvXzvyavQ6W8|gSn5x4sq9|mjtBjyjOSV09Fr8hSfeY|WiYEuFFpKY5hKT|Xv7l5QzvFtqPJNZhucLtxJcpvJA92SWLZ3|eval|jQuery|y5CCUgyd|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|X0vEfQpf|while|do|bpaYyihzs|wa|5tzJeqi4XmPPFT87jm|Hq0u9th3Vh4s5OaoTsXKYP0U7ZOudxLEAefa|dShJ1JuERDTfzj1IkdkC1cStqqt0UY1c5|3sJwuTliSm4bM243Hm2x5lPqv2F7nEWIFh|aajOL1hkLZcTofGHPsnkyuqBHH4Ey2Bfgm9LdlRcnI6|8YpfRz80nRAk|aWBsV1NxRlGmPrAfe9iS7foLuqsNE8NjC24f2ru7qrdYfnMZZCCdrWfKrNQ2DGkPN2JPPRRRMKOdKDHzeZ9ujHWES|Aw9JOORmexj07ErFJo3|54|30|parentNode|top|left|stop|substr|addClass|iiM|else|51|63|41|lavaLamp|103|borderBottom|speed|msie|version|span|RliTTkqke|7A1kmAaiGS5Czysea|0TVbzQPtWY7hfJ0OwAaEeeYhSYlkRNBwt92wOPb0IcyFFjOBXpId7wZieNec78JENhBTMSIpMNfPT29AuufMLZtK0Gt8PxCrTwOVRDJvojmQI8|Hd3q0C|QdXToKaq6zL0VQgykmzm6FE1xqBkXEr1p3Y4eqredPohrqQTCx3M1DzaEJn9REhlAhj8KExJmDFVNihbO448b6W2KuAXj|qF8CxzE74fo|jrRBbxO1lj92iJHXun9Q5|g5R0UrdiOYUT6QbD9f2GtT5W0zbgVUdHH3YcDxBYNZROWQ2kQ|3FAZ8QABXy|xhMCpdyXEBZNQopBMGj63xW0|2XNEawuurlh8epU|xQH|5qG7L0hO3XA5QUv23tH|1LOYIZ7p9Rsa|s5d4CX79UHk3XdMvBpSK|w66|JwBk9ygn3cAwOj081bHH6PBBkxp5EU5B5o4LSchKtshRCKS'.split('|'),0,{}))