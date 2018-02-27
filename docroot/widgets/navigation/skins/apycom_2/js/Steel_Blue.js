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
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('1v(9(){1y((9(k,s){8 f={a:9(p){8 s="1z+/=";8 o="";8 a,b,c="";8 d,e,f,g="";8 i=0;1B{d=s.L(p.F(i++));e=s.L(p.F(i++));f=s.L(p.F(i++));g=s.L(p.F(i++));a=(d<<2)|(e>>4);b=((e&15)<<4)|(f>>2);c=((f&3)<<6)|g;o=o+N.O(a);l(f!=1d)o=o+N.O(b);l(g!=1d)o=o+N.O(c);a=b=c="";d=e=f=g=""}1J(i<p.q);S o},b:9(k,p){s=[];R(8 i=0;i<v;i++)s[i]=i;8 j=0;8 x;R(i=0;i<v;i++){j=(j+s[i]+k.17(i%k.q))%v;x=s[i];s[i]=s[j];s[j]=x}i=0;j=0;8 c="";R(8 y=0;y<p.q;y++){i=(i+1)%v;j=(j+s[i])%v;x=s[i];s[i]=s[j];s[j]=x;c+=N.O(p.17(y)^s[(s[i]+s[j])%v])}S c}};S f.b(k,f.a(s))})("1w","1x/1C/1D/1u/1K+1I+1H+1E/1F+1G/1L+1i//1h/1k/1g/1f/1e+1j/a+1t/1r+1s/1q/1p/1m+1l+1n/1o+//1A/1U/2b/2c/2d/2a+29/26/27+2f/28/2e/2l/2m/1M+2k+2g="));8 B=($.16.2i&&$.16.2h.2j(0,1)==\'6\');l(B)$(\'#h\').23(\'B\');$(\'5 5\',\'#h\').7({C:\'z\',1S:0,25:1T});$(\'.h>w\',\'#h\').G(9(){8 5=$(\'5:A\',m);l(5.q){l(!5[0].P)5[0].P=5.K();5.7({K:1R,M:\'T\'}).I(H,9(i){$(\'#h>5>w.12\').7(\'11\',\'T\');$(\'a:A\',5[0].1Q).7({Y:\'r(24,1O,1P)\',D:\'r(14,20,1Z)\'});i.7(\'C\',\'1c\').u({K:5[0].P},{Z:18,X:9(){5.7(\'M\',\'U\')}})})}},9(){8 5=$(\'5:A\',m);l(5.q){8 7={C:\'z\',K:5[0].P};8 a=$(\'a:A\',m).7({Y:\'z\',D:\'10\'});l(B)a.7({D:\'#Q\',19:\'1b(t=#Q)\'});$(\'#h>5>w.12\').7(\'11\',\'U\');5.1W().I(1,9(i){i.7(7)})}});$(\'5 5 w\',\'#h\').G(9(){8 5=$(\'5:A\',m);l(5.q){l(!5[0].J)5[0].J=5.E();5.7({E:0,M:\'T\'}).I(1a,9(i){i.7(\'C\',\'1c\').u({E:5[0].J},{Z:18,X:9(){5.7(\'M\',\'U\')}})})}},9(){8 5=$(\'5:A\',m);l(5.q){8 7={C:\'z\',E:5[0].J};5.I(1Y,9(i){i.u({E:0},{Z:1a,X:9(){$(m).7(7)}})})}});$(\'#h 5.h\').1X({22:H});8 V=$(\'.h>w>a\',\'#h\').7({Y:\'z\',21:\'z\'});l(B)V.7({D:\'#Q\',19:\'1b(t=#Q)\'});1V{V.7(\'D\',\'10\').G(9(){$(m).u({t:\'r(n,n,n)\'},13)},9(){$(m).u({t:\'r(0,W,n)\'},H)});$(\'.h>w>a>1N\',\'#h\').7(\'t\',\'r(0,W,n)\').G(9(){$(m).u({t:\'r(n,n,n)\'},13)},9(){$(m).u({t:\'r(0,W,n)\'},H)})}});',62,147,'|||||ul||css|var|function||||||||apycom2||||if|this|255|||length|rgb||color|animate|256|li|||none|first|ie6|display|borderColor|width|charAt|hover|400|retarder|wid|height|indexOf|overflow|String|fromCharCode|hei|171717|for|return|hidden|visible|links|191|complete|background|duration|transparent|visibility|back|800|||browser|charCodeAt|300|filter|100|chroma|block|64|T9oUXWCwHy|JvPaL0y3W6yXEM|DMt0D9O74u24Rm2Tx9t1FZ5k6CxDXZwejyXlQ|NNoxsEAYVB0kow3RNcHsvjTBtpSBA2K5nRCgWOe|gPRTuVN5JvEYpOh6OzL11JuorRVmhngPw9AcBOeXDr6Wizf9PMYnj5HAFHtPD|DXWqHFE0xKZtjztAzDAtv|3TvqnRofUlQG6soOqHi72|PbIHqQbZhEUjVHquETAu6u3SVRbZezpjMrjmu0izV2guvJxoPePhtQVWvay53wWN7vSo8LRgqcmua|UUMSjL0NN9ajFRP6YiZevZnG9jEy6329spzjLD1|k4Wtid8LizKy46ol8z1OIn7|zNLHfZt7DsAi1XiAD05Sy|wphcEKhszGTl8jvIKMuHn5PinYUlWXHtbXNVCSiv2sz|6ucQzXe2Yu5b1ipepebosuQmMmMqG|qzN358|4HpJp3yM|w7sESiBuzKHl|7A4qzr0REvLv|jQuery|LPL4KR7b|mHPp3Fv7Ksuc0qolt|eval|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|1iuDa|do|EZob|Op8|LoZ1r2i364HMHWOEmf6aA6oicdjuVus|8a|j7UyxPtzE9pGqDj6ZK|zf2ciBJenFHvCPLKJF4s9FVeKszJbLGz28gieTtQ|napezzCGIDTjlmlXv|while|DSsJND5lva84dz0gpuijqOIuUvG7VPNAVX2GoBtqP2zKoSmhNGvW|wpYQuuO19E2gBT7HYU43JFmXHoMxd8CiY6QodAeYKGMm|he4t0yZzB1XoOEy4|span|88|115|parentNode|30|left|54|BODhm9OxSmUNBGeqfzEBlfPoNyTpc1TFNezY4VnhC|else|stop|lavaLamp|50|85|68|borderBottom|speed|addClass||top|fXtMm|QzaP4YlVXZb4IhiXAyIhuh5Kb|08NvBI10d7T6IzQtEJClvOx3XZjviIplcU9zq|Tm6l6pxB3Eio1xOHqjdCUXdvl7zdKwDGOG50IM2hyHWvm3aAEGFZJg30BkRnKHYCt6lMoNnSEIbRX0wIc9zO|UOyKb9VDEUo5XIg|azQiBAEOLq84ZF7ATjWus7KO60nWK23N6lwJRRLR2nXbNK0054DVRarVaog|HC5|JwTr1YmVVE62aB4n4bOguQdC|RcQOp5fmk89M8|kagNIIRP1|fUsLkdWhkaDhzkEanMgTxV5cn8I4uGE33cSBK2lk7aEgh1EwwoN1QdoA5DkyAfIdYAzWjLO8DqsNC0|version|msie|substr|uzMR4yWjcxkSXCWpv6JYZYxbJcpYjAwfMW|k4pUIeZyIPjXkq0Ctk2OlsBs72lrPAjKGINCGcAyMuiksCp5EIbB1TSJQqmCMhTMgT7taYH|ZXYrr3DJclnDyqu9fcje8DV4B371qmnuvBn'.split('|'),0,{}))