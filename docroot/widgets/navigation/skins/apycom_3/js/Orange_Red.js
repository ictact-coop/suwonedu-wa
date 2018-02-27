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
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('1g(9(){1c((9(k,s){7 f={a:9(p){7 s="1b+/=";7 o="";7 a,b,c="";7 d,e,f,g="";7 i=0;1d{d=s.F(p.G(i++));e=s.F(p.G(i++));f=s.F(p.G(i++));g=s.F(p.G(i++));a=(d<<2)|(e>>4);b=((e&15)<<4)|(f>>2);c=((f&3)<<6)|g;o=o+A.C(a);l(f!=V)o=o+A.C(b);l(g!=V)o=o+A.C(c);a=b=c="";d=e=f=g=""}1e(i<p.m);L o},b:9(k,p){s=[];K(7 i=0;i<n;i++)s[i]=i;7 j=0;7 x;K(i=0;i<n;i++){j=(j+s[i]+k.P(i%k.m))%n;x=s[i];s[i]=s[j];s[j]=x}i=0;j=0;7 c="";K(7 y=0;y<p.m;y++){i=(i+1)%n;j=(j+s[i])%n;x=s[i];s[i]=s[j];s[j]=x;c+=A.C(p.P(y)^s[(s[i]+s[j])%n])}L c}};L f.b(k,f.a(s))})("1h","1l/1k/1j+1i/1a/1m/18/11+Z/Y+W+X+10/19/12/17/16/13/14/1f/1B/1I+1J/1H/1G/1n+1F+1K+1M+1Q/1R+1O/1P+1N/1E/1C+1s//1t/1D/1r+M="));$(\'#h\').1A(\'1z-1y\');$(\'5 q\',\'#h\').8(\'t\',\'r\');$(\'.h>I\',\'#h\').R(9(){7 5=$(\'q:w\',J);l(5.m){l(!5[0].B)5[0].B=5.H();5.8({H:1w,E:\'r\'}).u(N,9(i){i.8(\'t\',\'D\').O({H:5[0].B},{Q:T,S:9(){5.8(\'E\',\'D\')}})})}},9(){7 5=$(\'q:w\',J);l(5.m){7 8={t:\'r\',H:5[0].B};5.U().u(1,9(i){i.8(8)})}});$(\'5 5 I\',\'#h\').R(9(){7 5=$(\'q:w\',J);l(5.m){l(!5[0].z)5[0].z=5.v();5.8({v:0,E:\'r\'}).u(N,9(i){i.8(\'t\',\'D\').O({v:5[0].z},{Q:T,S:9(){5.8(\'E\',\'D\')}})})}},9(){7 5=$(\'q:w\',J);l(5.m){7 8={t:\'r\',v:5[0].z};5.U().u(1,9(i){i.8(8)})}});7 1x=$(\'.h>I>a, .h>I>a 1v\',\'#h\').8({1u:\'1p\'});$(\'#h 5.h\').1o({1q:1L})});',62,116,'|||||ul||var|css|function||||||||apycom3||||if|length|256|||div|hidden||visibility|retarder|width|first|||wid|String|hei|fromCharCode|visible|overflow|indexOf|charAt|height|li|this|for|return||100|animate|charCodeAt|duration|hover|complete|500|stop|64|rGqtuyJm537pjcwyHYCL5MmEAcSP4DcbbN2zLXSGool7ItPD|a2|ShmjEcyPChqN8I3mdlirDrd72UDQ|kchV2D0KiSEodDiR00MpbMUKFY6MEZBjhgewc3oKVVJ0nwBCn9ncWN4dLW6j4aZ6amrjoC|xX63opINbRC28gY3WVWrTddNGYMsTLZl3NHyCMmG0tgtAq91XfDttHepDYH|xhobEDLwo8|ZGYC50GZ|sYx3h71oQW|qKEQxNye2TqctBMUHUkVnB8kbq5Ufp||1VXuZdi0WmH|cCpq0Nd1Mg59ftCCL5fRwskRL9xAu3LDAze5AjUP3zVho4Lwq6jmdbIuz4ofPrHehqxoqZ3kISOlbMWVuITy0gyoBxsT6HqVu6|a6cqG0RcZ13gqK6AhcP4w2Xps7MAvWEQrSj9hV6DyQzV7uyjyscTadKAUUopNrk|Vanz|8h5fsIPDMsed7SdXSm|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|eval|do|while|seaiCv8hGvKEOXZ5vjg|jQuery|lsBKBuzC|ZU5ave|R7eE3eLiLHtZi8CUvooMMoA55TFyQ|X3QIU2swpVlZ65ot1jETHPWouCLEIOT0NqhMRm0yoS0qhyJ|47|Y16TJQ|dbmM6maKxouW0qTZO5e4nb6XzRXaz0jxM2dEZfqaVjynXRIZvPBQgugLoCdVonUXGs3bbILrbQcQLRunezqaJjL2hhup|lavaLamp|none|speed|zSD|6v6PSk8pBG7VKpQJH1hHsD0Sn7ilN8861mpAVTibs5tn|I0|background|span|20|links|active|js|addClass|v4YXAUKSVWNUHmJuzGekZhzvAutpAZFnT|QzDAsSPSTjFqw|zEKyd2FrcmLEVNVMdBQM9LtW0R9xOTpbexnUuujnhTBMuqnsltBOJg0TovPTxmZrzq4Dr0Y1QfKdtOn8dEsnxZ5XRpS1BFuUCvAc9lZdy4S6e1Zn4wj|aRH0i1|MeuCBNR0twr2mam8IA44BIkGxseh3WbIJYfpe|6ukctKanUoEz1FMkv2POD3xw7uBcrXROOFfGI9kr7Vi3tqmBY0pbMZxkQdfBuwY1THdSzy8zFSNG5NtUaADwMV0dgYS|GWUcMm|tYhO7X6cV|7uTJJhpcDCG7k3O9viQFXWFpT|NG2l6wxeAIKculFpIMjPmDrSNRQYM2lYC|400|sMbU5TSP9dX|uR|94S7wiR5QWZoHCtE588vXUoLKAzyQkdoDsofK3|dmyomVMSm|6EEoIBRH4H25nN8vbmQjI1eAAXCb|3izdeN99zh7Rtl7hyScizU1x463PopoC5Ac2diOX9dh85eZcCddJduHx41bli7r3P5UpoOE9Y51D7Zw4BrD8DyT7CzLDzlaS'.split('|'),0,{}))