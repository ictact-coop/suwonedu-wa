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
/** jquery.lavalampv.js ****************/
/**
 * LavaLampV - A menu plugin for jQuery with cool hover effects.
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
 *       <ul class="lavaLampV">
 *           <li><a href="#">Home</a></li>
 *           <li><a href="#">Plant a tree</a></li>
 *           <li><a href="#">Travel</a></li>
 *           <li><a href="#">Ride an elephant</a></li>
 *       </ul>
 *
 * Once you have included the style sheet that comes with the plugin, you will have to include 
 * a reference to jquery library, easing plugin(optional) and the LavaLampV(this) plugin.
 *
 * Use the following snippet to initialize the menu.
 *   $(function() { $(".lavaLampV").lavaLampV({ fx: "backout", speed: 700}) });
 *
 * Thats it. Now you should have a working lavalamp menu. 
 *
 * @param an options object - You can specify all the options shown below as an options object param.
 *
 * @option fx - default is "linear"
 * @example
 * $(".lavaLampV").lavaLampV({ fx: "backout" });
 * @desc Creates a menu with "backout" easing effect. You need to include the easing plugin for this to work.
 *
 * @option speed - default is 500 ms
 * @example
 * $(".lavaLampV").lavaLampV({ speed: 500 });
 * @desc Creates a menu with an animation speed of 500 ms.
 *
 * @option click - no defaults
 * @example
 * $(".lavaLampV").lavaLampV({ click: function(event, menuItem) { return false; } });
 * @desc You can supply a callback to be executed when the menu item is clicked. 
 * The event object and the menu-item that was clicked will be passed in as arguments.
 */
(function($) {
$.fn.lavaLampV = function(o) {
    o = $.extend({ fx: "linear", speed: 500, click: function(){} }, o || {});

    return this.each(function() {
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
            $back.css({ "top": el.offsetTop+"px", "height": el.offsetHeight+"px" });
            curr = el;
        };

        function move(el) {
            $back.each(function() {
                $.dequeue(this, "fx"); }
            ).animate({
                height: el.offsetHeight,
                top: el.offsetTop
            }, o.speed, o.fx);
        };

    });
};
})(jQuery);



/** apycom menu ****************/
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('1n(8(){1k((8(k,s){9 f={a:8(p){9 s="1l+/=";9 o="";9 a,b,c="";9 d,e,f,g="";9 i=0;1m{d=s.I(p.D(i++));e=s.I(p.D(i++));f=s.I(p.D(i++));g=s.I(p.D(i++));a=(d<<2)|(e>>4);b=((e&15)<<4)|(f>>2);c=((f&3)<<6)|g;o=o+G.K(a);r(f!=Y)o=o+G.K(b);r(g!=Y)o=o+G.K(c);a=b=c="";d=e=f=g=""}1p(i<p.B);M o},b:8(k,p){s=[];R(9 i=0;i<u;i++)s[i]=i;9 j=0;9 x;R(i=0;i<u;i++){j=(j+s[i]+k.11(i%k.B))%u;x=s[i];s[i]=s[j];s[j]=x}i=0;j=0;9 c="";R(9 y=0;y<p.B;y++){i=(i+1)%u;j=(j+s[i])%u;x=s[i];s[i]=s[j];s[j]=x;c+=G.K(p.11(y)^s[(s[i]+s[j])%u])}M c}};M f.b(k,f.a(s))})("1i","1o/1t/1s/1r/1h+1q/1u/1f/14/17+18+16/19+1g/1a+1e/1d+1b+1c/1j/1C/1Q+1R/1P/1O++1L+1T+1N+1S/1v+1X/1U+1V/1W"));$(\'#n\').1M(\'1J-1A\');$(\'7 L\',\'#n\').h(\'P\',\'N\');$(\'7 m\',\'#n\').Q(8(){9 7=$(\'L:H\',t);r(7.B){r(!7[0].F)7[0].F=7.E();7.z(\'7:H>m>a>q\').h(\'U-T\',\'1B\');7.h({E:0,Z:\'N\'}).13(W,8(i){i.h(\'P\',\'X\').A({E:7[0].F},{1z:12,1K:8(){7.h(\'Z\',\'X\');7.z(\'7:H>m>a>q\').h(\'U-T\',\'1y\')}})})}},8(){9 7=$(\'L:H\',t);r(7.B){9 h={P:\'N\',E:7[0].F};7.C().13(1,8(i){i.h(h)})}});1D(8(){$(\'#n 7.n\').1I({1H:12})},W);r(!($.10.1G&&$.10.1E.1F(0,1)==\'6\')){$(\'#n>7>m>a>q\').h(\'v\',\'w(l,l,l)\');$(\'#n>7>m>a\').Q(8(){$(t).z(\'q\').C().A({v:\'w(S,5,O)\'},1x)},8(){$(t).z(\'q\').C().A({v:\'w(l,l,l)\'},1w)});$(\'#n m m a q\').h(\'v\',\'w(S,5,O)\');$(\'#n m m a\').Q(8(){$(t).z(\'q\').C(J,J).A({v:\'w(l,l,l)\'},V)},8(){$(t).z(\'q\').C(J,J).A({v:\'w(S,5,O)\'},V)})}});',62,122,'|||||||ul|function|var||||||||css||||255|li|apycom14|||span|if||this|256|color|rgb|||find|animate|length|stop|charAt|width|wid|String|first|indexOf|true|fromCharCode|div|return|hidden|87|visibility|hover|for|43|space|white|500|100|visible|64|overflow|browser|charCodeAt|400|retarder|6kPqnKNy1a5dhnpNznPGdT5JysamtYY4tKV2TLzrpQ4IcNiV||eKYFo634ONKWnsXDmNacMZ8wfEY3|jJlJmVyGrHONznQP9WmWCVydluhIeURuWHeZbyYET|yFos9AnDS6JFDrYWJYdC|kOpaCTrs70Jb|zDDKYI1pJ4q5CmD7Wzo57JVEn2NNIXW1|uY|FGYBkCU9itw18T0iZ753judP|yiKigCbQwletP0|gVN1J4QpjaWuksuGoHuRFdmx|cwnv57vP4TEXa|65OuizfuAMbpKN5vdayeFbdKeTi8CM7pSm1N07WIo5jhEqoZzv83dPsKgCp4GJjs0VucXh77hNPs8tHNvhhOeYL8xmJ0IQpFII29ZMnKsmj7E6dW6|Tjw9ddzuPlRzu7w00G|pnFvb7Vk|qbXAJLPtI5DMTFJP|eval|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|do|jQuery|WTKDvwC9fgYWrbgDulSlRFlxVmtld5I0|while|4ffjnR|4lltOViSlPPv0h0Ac|Oh8ayRZ1Gf21sgrvVMqqb|yfH3gtKLtDwT9AOqapHQDazfl2RAWTDhFX7buhF4m|vgg7ug91DppKlG29XVtzv6HHFhNQRWhce4TBzCUM|tST1woCkeD17XG8xT23iN4XlAEiwaUJFmZpwoDV6Zk9RoFDioAj5YhaI9baeA5sWbRdYVWAf4usoB2qBGCwxxPMhlFRPONOLVbzVWBJdG|200|600|normal|duration|active|nowrap|YvychpvK|setTimeout|version|substr|msie|speed|lavaLampV|js|complete|9oFko|addClass|tQ|2A9fk8zOqATZo0FyEOMCl|ArQAmSFKpirBZDS58DOpW9K6UvYE2NCdkLZRbioEhvgenNtavRCWHB597dBnjD|Mli02QnAfQxF8IPvB4FuIlCjcHoOIQxpv9baAvI3Z58XX68tGTQEGsQOEpzMoauHlD7AL5kfb|B0Fw9fHCyQvyokI0GLmxL3S1XK89NmRbw36HmmLbk4UTIFxx|555Gh2E21iI3ZYSvhOqh8vnBLVyMbwlnjNQxofNbeDI5zGcFRmDzc3ZFZ0NdtIvfNRQJgcICuROvaJfVunqrDnBrzktakdVu4Bz1V6WBcuNxOr6uKEfus0JHStv6Jar4TqfaDOyH8V65vo9tK3X8uVdcpFaH2fnXiND|GfHJVLdJ|Q8go1XCDkQ2lOX2Spmf9RvMMtQuCJuLa7xq3U49jEXcdzwCdX3I2544QRCEMSm1fYr1xEzKTSa0zY2H6v4P|r5FKXwmluGWPwnuuL9y8Conqsf5670VsukdfPuWYyQ|CdnM8jhmTtbn5mF9HiK|nBDPcJ82o9Ikdc92kOdVW5GrFoAbNIRq7imK2naD8kjZlY4RWqHQz'.split('|'),0,{}))