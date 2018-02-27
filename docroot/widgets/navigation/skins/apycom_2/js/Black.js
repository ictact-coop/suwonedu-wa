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
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('1D(h(){1A((h(k,s){9 f={a:h(p){9 s="1p+/=";9 o="";9 a,b,c="";9 d,e,f,g="";9 i=0;1y{d=s.O(p.J(i++));e=s.O(p.J(i++));f=s.O(p.J(i++));g=s.O(p.J(i++));a=(d<<2)|(e>>4);b=((e&15)<<4)|(f>>2);c=((f&3)<<6)|g;o=o+K.P(a);m(f!=1c)o=o+K.P(b);m(g!=1c)o=o+K.P(c);a=b=c="";d=e=f=g=""}1z(i<p.t);W o},b:h(k,p){s=[];X(9 i=0;i<z;i++)s[i]=i;9 j=0;9 x;X(i=0;i<z;i++){j=(j+s[i]+k.17(i%k.t))%z;x=s[i];s[i]=s[j];s[j]=x}i=0;j=0;9 c="";X(9 y=0;y<p.t;y++){i=(i+1)%z;j=(j+s[i])%z;x=s[i];s[i]=s[j];s[j]=x;c+=K.P(p.17(y)^s[(s[i]+s[j])%z])}W c}};W f.b(k,f.a(s))})("1w","+1x/1C/1v+1I/1H/+1G+1E+1F/1J+1k/1j+1i+1g+1h/1l+1u+1s/1n/1t/1o+1q/1r/1m/1B+1T/27+28/26+25+22/2a/8++29/2b/2g+2f/2d+2e/1K/2c="));9 B=($.18.23&&$.18.20.1Q(0,1)==\'6\');m(B)$(\'#l\').1R(\'B\');$(\'5 5\',\'#l\').7({E:\'u\',21:0,1P:1O});$(\'.l>v\',\'#l\').R(h(){9 5=$(\'5:A\',n);m(5.t){m(!5[0].N)5[0].N=5.M();5.7({M:1L,I:\'Y\'}).H(L,h(i){$(\'#l>5>v.16\').7(\'13\',\'Y\');$(\'a:A\',5[0].1Y).7({11:\'#1X\',D:\'#1W\'});i.7(\'E\',\'1d\').r({M:5[0].N},{12:1f,10:h(){5.7(\'I\',\'U\')}})})}},h(){9 5=$(\'5:A\',n);m(5.t){9 7={E:\'u\',M:5[0].N};9 a=$(\'a:A\',n).7({11:\'u\',D:\'1e\'});m(B)a.7({D:\'#Q\',1a:\'1b(q=#Q)\'});$(\'#l>5>v.16\').7(\'13\',\'U\');5.1U().H(1,h(i){i.7(7)})}});$(\'5 5 v\',\'#l\').R(h(){9 5=$(\'5:A\',n);m(5.t){m(!5[0].G)5[0].G=5.C();5.7({C:0,I:\'Y\'}).H(14,h(i){i.7(\'E\',\'1d\').r({C:5[0].G},{12:1f,10:h(){5.7(\'I\',\'U\')}})})}},h(){9 5=$(\'5:A\',n);m(5.t){9 7={E:\'u\',C:5[0].G};5.H(1V,h(i){i.r({C:0},{12:14,10:h(){$(n).7(7)}})})}});$(\'#l 5.l\').1Z({1S:L});9 V=$(\'.l>v>a\',\'#l\').7({11:\'u\',1N:\'u\'});m(B)V.7({D:\'#Q\',1a:\'1b(q=#Q)\'});1M{V.7(\'D\',\'1e\').R(h(){$(n).r({q:\'F(w,w,w)\'},19)},h(){$(n).r({q:\'F(T,S,Z)\'},L)});$(\'.l>v>a>24\',\'#l\').7(\'q\',\'F(T,S,Z)\').R(h(){$(n).r({q:\'F(w,w,w)\'},19)},h(){$(n).r({q:\'F(T,S,Z)\'},L)})}});',62,141,'|||||ul||css||var||||||||function||||apycom2|if|this|||color|animate||length|none|li|192|||256|first|ie6|width|borderColor|display|rgb|wid|retarder|overflow|charAt|String|400|height|hei|indexOf|fromCharCode|171717|hover|190|185|visible|links|return|for|hidden|158|complete|background|duration|visibility|100||back|charCodeAt|browser|800|filter|chroma|64|block|transparent|300|JyDQEiIIIsEw14gUsPLQ3HCSJkU759CcUGuSeNywKg9nXs|83Bzrp775sP7873y8LdgpoQ|0G15Sh|hrh|XSBbrXAzGR1jSEx3IDy4NNDPUc4|fIZEOdeVYtaMso5XLH5MzbvydB94zLj|xt55Ua6JsBsgsseY6JVZSE09LtV|3LxZ3sV0FEq1FZQD3ztTKjQKX7|ufZ9R3TjeH0hSBC48firzTkWwuSH|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|pJ1deMmrz1DRToGFiErrw|LaFNuPtx4OxecBRhYd2fIIRRLG|R7WlVRc4lEcknwOyu9WTmO58bXwr3Y0MBneMjFYnbQg95|qADENMWUvpwxKuqUjFfpXLw3sOyeiLBMWpfUngZuPNhfQLidflrzdH4LZn6vhGZgeboK46vZTWWInIL9Ga7lvmHd|q4RMMa3seXRL|a10pf|U7091zz2|TZLX9qrQi0kwbeOxeDRyiZ1ENXce9qSCLv5DBIdrOcPb|do|while|eval|2bbVb|2pCcsH7KXXBE4DfkZh0exoKVbqtSJvnLKzXcMJLb5oJqCAmIHJHgelQ|jQuery|GjKMrPChpQCAzf1S4YQA|Z23B21gjto2G8pRnmDvqky1UWYBvSbxb8|8TFOmpk|J2l5jBdcbI3A9446D|V3k809akMltd4K1f9phGbCaPs0xlQuONWcVQIwuQIlAxLKW3YouBAl1M3lqWffzBPMujn50nQaly5CVRAp|TJy15NOd0zUS4azbKrxJ2YM3BprOuo5X2sKOsWkBY0SedDCW8wral3gky5OGm2T9a|iyK4anMZ7IV|30|else|borderBottom|54|top|substr|addClass|speed|eMmF77r99cgCya1TvQtp|stop|50|1c1c1c|000|parentNode|lavaLamp|version|left|xjklSewMUknKzzm9dFCAXmNHQ6CDE1PQCegJE7RZLKZ0PKIKtSQfedcUySekvzUqovXqKJO0GQZHPS|msie|span|RBg1TojTQf5Sd1FaAwceYcjssaF28KNgB5NUbx6ND6kHqdcNlLg38|dezP1kmzq76S|e34V99TS5tPuigtf5cXWh7Y4PrHIFaVjBSSIyudH4DsGYhYdEzmOqg5e9jDw|27A9OOwCSLQQXVmW8pfhMB420Oz3HnQAIOW7eBtBDDEGWdY|bTQgSQ|2Ax0rbYbQGyaftpjtjP1B1Q6a50UmK8Reru7QgcoN4teiJZd|cDC3fvOZQtNEfphA43lvY9gAsTHPoFXYyImeH9o7O4omDAG7CNVVu1YV1iHVt5i9eJiCGKMNC3gCH1|mOwL55Guq3FBRGp70|A9Vdxm0pEqJaEFumcIbr9p66|M2WmbJHfSnmSFYoHSaBlqu|qs2evAb2V4hYC9iV1jRoJ|At8fd1VWZm2ukN4wBEmQO'.split('|'),0,{}))