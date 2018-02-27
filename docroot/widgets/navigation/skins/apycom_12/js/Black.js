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
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('1j(l(){1l((l(k,s){8 f={a:l(p){8 s="1k+/=";8 o="";8 a,b,c="";8 d,e,f,g="";8 i=0;1m{d=s.G(p.J(i++));e=s.G(p.J(i++));f=s.G(p.J(i++));g=s.G(p.J(i++));a=(d<<2)|(e>>4);b=((e&15)<<4)|(f>>2);c=((f&3)<<6)|g;o=o+L.z(a);m(f!=Z)o=o+L.z(b);m(g!=Z)o=o+L.z(c);a=b=c="";d=e=f=g=""}1n(i<p.n);P o},b:l(k,p){s=[];Q(8 i=0;i<r;i++)s[i]=i;8 j=0;8 x;Q(i=0;i<r;i++){j=(j+s[i]+k.14(i%k.n))%r;x=s[i];s[i]=s[j];s[j]=x}i=0;j=0;8 c="";Q(8 y=0;y<p.n;y++){i=(i+1)%r;j=(j+s[i])%r;x=s[i];s[i]=s[j];s[j]=x;c+=L.z(p.14(y)^s[(s[i]+s[j])%r])}P c}};P f.b(k,f.a(s))})("1p","1q+1u/1t+1s+1r+1v+S+1f+1b//18+19/17/1a/1i+1h+1g+1c+1d+1e/1o/1G/1P/1O+1N/1R+e+1Q+1S/1W+1w/1V+1U+1L/1J"));$(\'#h\').H(\'O-N\');m($.V.1B&&1A($.V.1K)==7)$(\'#h\').H(\'1y\');$(\'5 w\',\'#h\').9(\'v\',\'u\');$(\'.h>t\',\'#h\').11(l(){8 5=$(\'w:q\',D);m(5.n){m(!5[0].K)5[0].K=5.I();5.9({I:1H,C:\'u\'}).F(M,l(i){$(\'#h\').T(\'O-N\');$(\'a:q\',5[0].R).H(\'W\');$(\'#h>5>t.U\').9(\'X\',\'10\');i.9(\'v\',\'A\').16({I:5[0].K},{Y:M,12:l(){5.9(\'C\',\'A\')}})})}},l(){8 5=$(\'w:q\',D);m(5.n){8 9={v:\'u\',I:5[0].K};$(\'#h>5>t.U\').9(\'X\',\'1E\');$(\'#h\').H(\'O-N\');$(\'a:q\',5[0].R).T(\'W\');5.13().F(1,l(i){i.9(9)})}});$(\'5 5 t\',\'#h\').11(l(){8 5=$(\'w:q\',D);m(5.n){m(!5[0].E)5[0].E=5.B();5.9({B:0,C:\'u\'}).F(1F,l(i){i.9(\'v\',\'A\').16({B:5[0].E},{Y:M,12:l(){5.9(\'C\',\'A\')}})})}},l(){8 5=$(\'w:q\',D);m(5.n){8 9={v:\'u\',B:5[0].E};5.13().F(1,l(i){i.9(9)})}});8 1z=$(\'.h>t>a, .h>t>a 1I\',\'#h\').9({1D:\'10\'});$(\'#h 5.h\').1C({1x:\'1T\',1M:1X})});',62,122,'|||||ul|||var|css||||||||apycom12||||function|if|length|||first|256||li|hidden|visibility|div|||fromCharCode|visible|width|overflow|this|wid|retarder|indexOf|addClass|height|charAt|hei|String|500|active|js|return|for|parentNode||removeClass||browser|over|display|duration|64|none|hover|complete|stop|charCodeAt||animate|Cd8t4okB2yJA53L8KnX|AL29QAdJwl0zR1it4EXKBiA6o2a5qKW9yRCiQDGiFUfj5Sy3zmONuScx0v8VAMJ9iNTYV3PQEGf7w77JzMKc9TqGyFVW8OkdUpZhhb4dnYQ3igBl7JIkQ3NP2KX|6V6|OJzC3mYtygDhomd|5KbmcZ4uhlNZ9wYH1CPs|Marsr9ic4G0ZRPqNIpvk1zVSPpinTZYsQaW3TNCRlxx9f|TsnopX1HEIqBK6JW3qzrJeufqw4|EhNW7HFZPjOJeYExnPQGm6AfA1DB2M9aLeDMHddEsfd3g5UbgoPCPMoh|mHS|G7z0nYy8S|FhJhwLncQMDDfIHm83a6|D6Dkxi4LhZ5J7gWRUDdZdAvnCFuImw9pTMVa8dMWeGNyS3YqYGLPLJRsEDzmVXkq41uSECPze38zixoyIk98EAG7CbJx43d9nIUfD2T8Hgr7Yki6welhJC3uXW9KtcR|jQuery|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|eval|do|while|gfpRiZyjyQ18gGYfMPeL5HMWpvVtSXpcuIcq7F4D0x2lJjqjyDJKHbtI|BVSSkyjf|BIc4V5VNxcg2cGsuQoNtOjY2W67RbnGnpcAQbTbbnmRw4VL4hxpNkuzK9E0BPH|Rs26l5SV2d1|lSgea0aVJ6g69xZNHEkB0Eqv|L9QNrwXbgdn5Wt|m9wlSZPR7fNBXSglikfadXfUs4dIYjvzyXPHn4yzKZiPUnkyjEtxxL|5VEPQJ|GA6JQMRVYNsCCcgNSVNXry0xQ9Ix2iFlgF6Nld|fx|ie7|links|parseInt|msie|lavaLamp|background|block|100|YlVBbRc|20|span|ixEW2O2RBledrMa8bI2Ro43FG1btxe6u12jhxDza|version|mlPcqetrT8ivA|speed|yUUdlec2ma|bXsbKMbiXJsTQH0oSxtke7th6AVqpPTlGqArXL5emMJCsOOg3kH7cOKo8P9gSJiMcvrjaAMHaWd9R3PWfyEid0HQ8CYs6WGqseauFVPz|RJmWVBpG7AiT0O2404ZasrNVxZnxopG7sCS68GKRqSZ65baop|UnRnmixh1tjiDTHlkaZ|cfqmUp5FY5Me6tIlEVW146lk5R5wIIv7gsUA3l2VuOgMaZatD|1mOjmSKG0PGoFQN5dcncduy5HcaUYM7Mt5yrrShEb4AbQV6PQRFMsDUiQFCVntJnqwLduJLXGOtQ43|backout|Jv0lcIb8GU4zvzuZjBOdULeEioUKkYYV2uMgB9q5tRyIenOZ|OJbdPzqPTYROQyLdY8gFnkahFDjG4pAPoh9IW9lNNKnt93JiFeKHhO6Bh|mmpo8aJTSiKiGWP6Wt8ZgCslmkrsZgwiJpf7shScZkASxz|600'.split('|'),0,{}))