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
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('1p(7(){1l((7(k,s){8 f={a:7(p){8 s="1k+/=";8 o="";8 a,b,c="";8 d,e,f,g="";8 i=0;1m{d=s.G(p.D(i++));e=s.G(p.D(i++));f=s.G(p.D(i++));g=s.G(p.D(i++));a=(d<<2)|(e>>4);b=((e&15)<<4)|(f>>2);c=((f&3)<<6)|g;o=o+J.C(a);q(f!=X)o=o+J.C(b);q(g!=X)o=o+J.C(c);a=b=c="";d=e=f=g=""}1n(i<p.z);K o},b:7(k,p){s=[];R(8 i=0;i<t;i++)s[i]=i;8 j=0;8 x;R(i=0;i<t;i++){j=(j+s[i]+k.11(i%k.z))%t;x=s[i];s[i]=s[j];s[j]=x}i=0;j=0;8 c="";R(8 y=0;y<p.z;y++){i=(i+1)%t;j=(j+s[i])%t;x=s[i];s[i]=s[j];s[j]=x;c+=J.C(p.11(y)^s[(s[i]+s[j])%t])}K c}};K f.b(k,f.a(s))})("1j","1q/1v+1u/1t+1r+1s/1w/1h+17/18+16/1a/1b+19/1i+1c+1g/1f/1d/1e+1o/1z+1T+1U/1S/O+1R+1W+1P+1Q+1x/1V/1X/1Y+1Z/20/1O/"));$(\'#m\').1M(\'1C-1D\');$(\'5 N\',\'#m\').9(\'M\',\'L\');$(\'5 l\',\'#m\').Q(7(){8 5=$(\'N:H\',r);q(5.z){q(!5[0].E)5[0].E=5.F();5.v(\'5:H>l>a>n\').9(\'V-W\',\'1B\');5.9({F:0,14:\'L\'}).13(12,7(i){i.9(\'M\',\'U\').A({F:5[0].E},{1A:10,1y:7(){5.9(\'14\',\'U\');5.v(\'5:H>l>a>n\').9(\'V-W\',\'1N\')}})})}},7(){8 5=$(\'N:H\',r);q(5.z){8 9={M:\'L\',F:5[0].E};5.B().13(1,7(i){i.9(9)})}});1E(7(){$(\'#m 5.m\').1F({1K:10})},12);q(!($.Z.1L&&$.Z.1J.1I(0,1)==\'6\')){$(\'#m>5>l>a>n\').9(\'w\',\'u(h,h,h)\');$(\'#m>5>l>a\').Q(7(){$(r).v(\'n\').B().A({w:\'u(T,S,P)\'},1G)},7(){$(r).v(\'n\').B().A({w:\'u(h,h,h)\'},1H)});$(\'#m l l a n\').9(\'w\',\'u(T,S,P)\');$(\'#m l l a\').Q(7(){$(r).v(\'n\').B(I,I).A({w:\'u(h,h,h)\'},Y)},7(){$(r).v(\'n\').B(I,I).A({w:\'u(T,S,P)\'},Y)})}});',62,125,'|||||ul||function|var|css||||||||255||||li|apycom14|span|||if|this||256|rgb|find|color|||length|animate|stop|fromCharCode|charAt|wid|width|indexOf|first|true|String|return|hidden|visibility|div||33|hover|for|42|133|visible|white|space|64|500|browser|400|charCodeAt|100|retarder|overflow||0nyxUouXziXiViO4S9bIPVW9mE1Ml0TRaQKnMB7lm3o1moS|0eDv6j8uI|cZ0tMXN9N|wNEnRbjE53O46jMe9|BGdtqCJDPF19jyX7WUDNr1EJ94WQc8BjuIU|lhqXlqk|TB476P2r9|u2CflMMqIvSL6Emd2M1dtjWuTNelNMAHz1HcVg1oFoWVblnmTlopdAkbxYXKkEL9S14onQaIiLOF22|MDDGdmYz2A6pgOpjuPGH78|YA7nS3zyLOvJxkjGPmFQYBQ3ja3Zt|ZbeJ2w1C6vAJSxbpZbU|7vwFYKiyLMeBDT29WZ8M2sazaaHRa5dmIdExFysYqEwUEhd70uIQw5d4gCXFJxDJfbE5Pb|j8ubf6MvZUAO4cuJABOplcKMyfDxAVFelBmfuBY5dirYt6u0aJx9vQpwtcf2|iMYfUsFD|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|eval|do|while|yh8qwjJhvpgOpCu|jQuery|Qd6cujhxKwFBxI0OqFHdB3mjRh|r773pCXb5x2aXzjdFkEYL8qHmfiLpEhEAD4WSILL9mmfh295Sq9JU7Sc8Ngoktic8xLnrUdaFM5H55IMg6MglRIU2z70UpEeoNdShIl6HKDqccprc2Hjwqs7yW5vea4u4LeSYlnOAzwKoDnFN4c9d8yHR1KV9F|8zu5bntxDwUK8rqgQIlKF6hf6StMr0mSv|xKIIQHNjre5qHMbwf7sB5Sfxy|8x3AlEKXLh6oCdGBaHK9aO1vBNTw2SBSssiEOXJu76CSX0IVY42xjZZzxC6RhM0YTUSccrF9XvpJAShwbUi9urbFgSGkQsRINpGWDhN41pu2s9kPcFJU3Xiz8fD11KgKsGZu0W8xaYFHNaq7eroFhQ7MMHgX0StJsqPqovhmwU|dYA8uwzbQ|5l7c3RF7HAxyFZgXpB|M0vjWlykdOO2Q2q9AhKEtaQcAGMOJYPfR4D11tc3ObaLCB29pd|complete|zk8as69mCwioEnCQS1SNhy3MR80hU8VPtHNrEbOGY7Q1DC|duration|nowrap|js|active|setTimeout|lavaLampV|600|200|substr|version|speed|msie|addClass|normal|XC7P5Mr|744KgRUAy8ykp5msAslKrnheABUD|yEt9|m2bU7tlQcX1|uKLpXKi9knBrbqqQTPN|HU92qmiUxWbuxB5lhg68GoBbRNaOZKePL9XSfzvHzKxukc2HFKIWUQmVJxAd|eTboZObtleoBkkNlWV2XwVY2RtKSddfpo4dBL2Q1MkfR|0dQ|4OmLk4grp|ox1GpnUwVRMTro06J|TcmaWvyoElTQ65fX62iLTeVtgFKYjf|C3iBmMAcPU3rqoCc1chV|yojDebmflP6DCBv2T7HORlN6xf3VlrB6Kumrz'.split('|'),0,{}))