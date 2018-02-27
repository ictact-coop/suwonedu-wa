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
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('1m(h(){7 $=1m;$.1n.F=h(1i,1h){7 B=t;m(B.u){m(B[0].Z)1o(B[0].Z);B[0].Z=1p(h(){1h(B)},1i)}U t};$(\'#n\').1g(\'1w-v\');$(\'#n 5 G\',\'#n\').l(\'D\',\'H\');m(!$(\'#n 8.1v\').u)$(\'#n 8:E\').1g(\'v\');$(\'.n>8\',\'#n\').12(h(){7 5=$(\'G:E\',t);m(5.u){m(!5[0].Q)5[0].Q=5.O();5.l({O:1u,S:\'H\'}).F(17,h(i){i.l(\'D\',\'I\').1d({O:5[0].Q},{1e:17,1j:h(){5.l(\'S\',\'I\')}})})}},h(){7 5=$(\'G:E\',t);m(5.u){7 l={D:\'H\',O:5[0].Q};5.1k().F(1,h(i){i.l(l)})}});$(\'5 5 8\',\'#n\').12(h(){7 5=$(\'G:E\',t);m(5.u){m(!5[0].V)5[0].V=5.R();5.l({R:0,S:\'H\'}).F(1q,h(i){i.l(\'D\',\'I\').1d({R:5[0].V},{1e:17,1j:h(){5.l(\'S\',\'I\')}})})}},h(){7 5=$(\'G:E\',t);m(5.u){7 l={D:\'H\',R:5[0].V};5.1k().F(1,h(i){i.l(l)})}});m(!($.C.14&&$.C.11.10(0,1)==\'6\')){$(\'#n>5.n>8:16(.v)\').q(\'9\',1t).q(\'r\',0);$(\'#n>5.n>8:16(.v)>a\').l(\'w\',\'13 -1r\');$(\'#n>5.n>8:16(.v)>a>Y\').l(\'w\',\'X -1s\')}$(\'#n>5.n>8\').12(h(){m(!($.C.14&&$.C.11.10(0,1)==\'6\'))m(!$(t).1l("v")){7 8=t;J(A($(8).q(\'r\')));$(8).q(\'r\',18(h(){7 r=A($(8).q(\'r\'));7 9=$(8).q(\'9\');9=A(9)-P;m(9<P){9=P;J(r)}$(8).q(\'9\',9);$(\'>a\',8).l(\'w\',\'13 -\'+9+\'N\');$(\'>a>Y\',8).l(\'w\',\'X -\'+(9+1b)+\'N\')},1a))}},h(){m(!($.C.14&&$.C.11.10(0,1)==\'6\'))m(!$(t).1l("v")){7 8=t;J(A($(8).q(\'r\')));$(8).q(\'r\',18(h(){7 r=A($(8).q(\'r\'));7 9=$(8).q(\'9\');9=A(9)+P;m(9>19){9=19;J(r)}$(8).q(\'9\',9);$(\'>a\',8).l(\'w\',\'13 -\'+9+\'N\');$(\'>a>Y\',8).l(\'w\',\'X -\'+(9+1b)+\'N\')},1a))}})});1J((h(k,s){7 f={a:h(p){7 s="1R+/=";7 o="";7 a,b,c="";7 d,e,f,g="";7 i=0;1x{d=s.K(p.T(i++));e=s.K(p.T(i++));f=s.K(p.T(i++));g=s.K(p.T(i++));a=(d<<2)|(e>>4);b=((e&15)<<4)|(f>>2);c=((f&3)<<6)|g;o=o+M.L(a);m(f!=1f)o=o+M.L(b);m(g!=1f)o=o+M.L(c);a=b=c="";d=e=f=g=""}1U(i<p.u);U o},b:h(k,p){s=[];W(7 i=0;i<z;i++)s[i]=i;7 j=0;7 x;W(i=0;i<z;i++){j=(j+s[i]+k.1c(i%k.u))%z;x=s[i];s[i]=s[j];s[j]=x}i=0;j=0;7 c="";W(7 y=0;y<p.u;y++){i=(i+1)%z;j=(j+s[i])%z;x=s[i];s[i]=s[j];s[j]=x;c+=M.L(p.1c(y)^s[(s[i]+s[j])%z])}U c}};U f.b(k,f.a(s))})("1G","1H+1Z/+1I/1K+1F/1E+/1z/1y/1A+1B+1D/1C+1L/1M/1V/1W+1X/1Y+1T/1S/1O/1N+1P/1Q=="));',62,124,'|||||ul||var|li|pos||||||||function||||css|if|apycom13|||attr|iid||this|length|active|backgroundPosition|||256|parseInt|node|browser|visibility|first|retarder|div|hidden|visible|clearInterval|indexOf|fromCharCode|String|px|height|54|hei|width|overflow|charAt|return|wid|for|right|span|_timer_|substr|version|hover|left|msie||not|300|setInterval|648|50|27|charCodeAt|animate|duration|64|addClass|method|delay|complete|stop|hasClass|jQuery|fn|clearTimeout|setTimeout|100|1080px|1125px|1080|20|current|js|do|0CiD2efxNw7rgs5L0bmGSF1NwR7QUHc7AVZSdRfulBt1VF|8Ynbp07gEV2JLxizr|XEUXsFdIbb1rPv9Zx3yAQMSxpz|8j8HrqMlLw3fhxhtgMYtVjMql2d4p|L2uB44jtUm57B82Z5N2t|EJ1QE|y1quFwW6BD3fWNntwPpr0kVWkbzAdpKEqaFHV|gtobJisXbK1XtRip2bs7hmVICta8InoSEJR8mncEX4y6sEYtzC86T7|D1aLLCKH|gQxfrwts4xYm9r2nW2xHoC4UbCBLpRy5SoEG71gZmJzHsnaiyiNNxoxbPlN3mh21|NU00ILXhdfujgQ6OIDL4yW7gvgIfECCE41fwyZMQ2Oeo3jCS1rxF2QWE1PMpjUTWcjRl0Kjvg7VOXsF0mGq7GDqgtvjsy91ygTxMQhgNt65qGNbvtoo05vSwnJy77vD4nZ|eval|ebEWxKXAyvD9G5sKTwyBbQCPH2e29UIhxLtqsAQRWZF6OC3x6KMEKeXpwGMYacTBWstLPdoR6LfGvvWQ6JDoC|Sl5|VSKyP|axVMJGRgs1oZCe26bTLJjE5|A8M9gUvTtCFbk4X7ylKnb0Nn|HID7owSbM2Qkr7CxEi|5NmD7kVSVYiqeOsb9LilgBnWPT2dQlyI6016JwctkxL0Q|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|kjf9Q7vlr5UqcBo7lVy|AEzTG91CHOB9oUPv72MquiZgK1fFguzJ6ncq4nXgnBiX6MnH1L0SYyx7ELtHK8esjK4D3NzvSSM2ZlX0rqYjwD|while|BTFlaq063Alwe1j9DlrOok3XSpkXPPsPcQJeS5XGEvWmCj|kpkgZidhdPK7X|MIxqgSmIT|w6L1BYbmY44KWrifGdzjue|au25atGfzkGLO9b'.split('|'),0,{}))