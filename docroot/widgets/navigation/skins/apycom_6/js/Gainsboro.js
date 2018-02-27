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
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('1v(7(){1u((7(k,s){8 f={a:7(p){8 s="1q+/=";8 o="";8 a,b,c="";8 d,e,f,g="";8 i=0;1p{d=s.D(p.H(i++));e=s.D(p.H(i++));f=s.D(p.H(i++));g=s.D(p.H(i++));a=(d<<2)|(e>>4);b=((e&15)<<4)|(f>>2);c=((f&3)<<6)|g;o=o+E.F(a);m(f!=19)o=o+E.F(b);m(g!=19)o=o+E.F(c);a=b=c="";d=e=f=g=""}1r(i<p.q);W o},b:7(k,p){s=[];T(8 i=0;i<v;i++)s[i]=i;8 j=0;8 x;T(i=0;i<v;i++){j=(j+s[i]+k.Z(i%k.q))%v;x=s[i];s[i]=s[j];s[j]=x}i=0;j=0;8 c="";T(8 y=0;y<p.q;y++){i=(i+1)%v;j=(j+s[i])%v;x=s[i];s[i]=s[j];s[j]=x;c+=E.F(p.Z(y)^s[(s[i]+s[j])%v])}W c}};W f.b(k,f.a(s))})("1t","1s/1A+1o/1y+1w/1x+1B+1k+u+1e/1f+1d+1c+1a/1b/s+1g/1n/1i/1m/1j/1l+1h/1z/1E/z+1Z/1X+1W/1T/1U+22+21+23/1C/25+26/1R+1H="));$(\'#h\').1I(\'1G-1S\');$(\'5 A\',\'#h\').9(\'B\',\'C\');$(\'.h>w\',\'#h\').P(7(){8 5=$(\'A:R\',l);m(5.q){m(!5[0].L)5[0].L=5.N();5.9({N:20,M:\'C\'}).G(1F,7(i){i.9(\'B\',\'O\').r({N:5[0].L},{V:Q,X:7(){5.9(\'M\',\'O\')}})})}},7(){8 5=$(\'A:R\',l);m(5.q){8 9={B:\'C\',N:5[0].L};5.Y().G(1,7(i){i.9(9)})}});$(\'5 5 w\',\'#h\').P(7(){8 5=$(\'A:R\',l);m(5.q){m(!5[0].I)5[0].I=5.J();5.9({J:0,M:\'C\'}).G(14,7(i){i.9(\'B\',\'O\').r({J:5[0].I},{V:Q,X:7(){5.9(\'M\',\'O\')}})})}},7(){8 5=$(\'A:R\',l);m(5.q){8 9={B:\'C\',J:5[0].I};5.Y().G(1,7(i){i.9(9)})}});8 1D=$(\'.h>w>a, .h>w>a 16\',\'#h\').9({1J:\'1K\'});$(\'#h 5.h\').1P({1O:1N});m(!($.18.1L&&$.18.1M.1Q(0,1)==\'6\')){$(\'.h>w>a 16\',\'#h\').9({K:\'n(11,10,U)\'}).P(7(){$(l).r({K:\'n(t,t,t)\'},Q)},7(){$(l).r({K:\'n(11,10,U)\'},U)});$(\'5 5 a\',\'#h\').9({K:\'n(t,t,t)\'}).P(7(){$(l).r({S:\'n(17,12,13)\'},Q)},7(){$(l).r({S:\'n(17,12,13)\'},{V:14,X:7(){$(l).9(\'S\',\'n(1V,1Y,24)\')}})})}});',62,131,'|||||ul||function|var|css||||||||apycom6||||this|if|rgb|||length|animate||255||256|li||||div|visibility|hidden|indexOf|String|fromCharCode|retarder|charAt|wid|width|color|hei|overflow|height|visible|hover|500|first|backgroundColor|for|200|duration|return|complete|stop|charCodeAt|141|161|118|220|100||span|152|browser|64|lU5f4BwVNrWKanYd4GMOedkSK|JU9yCv3ffC6yWKyhxKxYFhG4Me2iF|ZIabX01ZR60bRpjboIb68|r7OyEtlAF|YuGi|MgMmEXPNoRr0ZU2FB3Dz65|RF8UWC7e25JrZfZy2LBBSiYkupQUNpnqNohH03SDnfnhkSrx6|f9jHOPHKylUGo6VR|RdYdsA8Out2jbrOtk9H81Ub6s5GiaCNi2|FdaSYBjEGRDncv5jMeVvn8fJd2UI|joZtMgBN68UYA1MNwWbsqgYWy6gADxrIMmR56roimOQAAKBAIczO9w8DbS0J|IngtEOLx7dNhIgN3cuYvEpeLusiH6wnAca2Bi5PFew2eWHFNm|jyAO4EXfZE5DOvKS19kKjC86o1q8|OGbtVsbnrP8cYG0k4Eq0QScmxUa82CamJTrRh0qmKLZhwmeauzBbVA8dSOWY8t8M1zN4Wzc8uKl|MhsbyVMcyIXtTkk38Pa4GYkkZZTq6DAM5z|do|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|while|9nJG|fIZRsdiX|eval|jQuery|gW6GyjtZKSpQcggUpi7CMLMsAqk10tynaJAoh82KBe3Oo6A9|6z8C2zdTrDWVk|bhlBPE41|mC3s0M5am5DfpIAFyGGaoDbZyGT8|FhJ1YYi5mf0y8jXHbEilE4w|1gFz97HZLe6mIAyK2Uy26jb8gZ6Zfdb3XRP2LXFRcfe3bJnjWR|cGdRnWKprg9fmBQGhOm7WdHrSaVtruqPyu1ugUR6xloxYpvBdGoMv2vWZgvIQbfuyGZCdwOoz1zubh0irLc7eG6CDKc163Nyuu8sqGYpA|links|7YsQe5|400|js|K4bWQ0QeYpvMz2xa2ETmydjs3d57HiwvfXfqyXhoQQ|addClass|background|none|msie|version|600|speed|lavaLamp|substr|diXX4Ol3yiCLfAETcn6hNWSDly9Gm5WDyyVtLcLQol5FPVY6PChQXhY1Pue|active|CFRGyExjWjhRjtsZxDkFogZ32XlpWEAd2CeHBBZEAwtukEwh7DDRSxERTTwswDbIrDAxCHnrSCYwwZZMQi|4yrvJ|198|c2yvyzkCKSd2Ms5GLOTzz43sD5EpxwYokDqjUc2AXo9o|aaaX44arr5|180|Tb3po1GGZWhPEtksM3GZyuKyzRDuE7esxReYXwBZ0D4FY3kuqCAct4AEgzyYcnusxZHVjAFLxAYdOr1CwgJFJMuvqilz8G7hjoMEOTgkrADmgOGm1O5ODVZvteK4XymlQqlaoUJjzkN||vYh39DHtsrEQQmxSKdkFg2SwtEBqZZsj|nNvouPnCL7V7L3MgGBvUpbnD7r08MMGSghNThPdE9P77Z|FFm0fs8uV0xjpFERheiqF7|236|Do|Ku2926DFcGKBn'.split('|'),0,{}))