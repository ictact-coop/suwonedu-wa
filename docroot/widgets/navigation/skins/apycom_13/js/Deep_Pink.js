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
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('1m(h(){7 $=1m;$.1Q.D=h(1j,1k){7 w=t;m(w.u){m(w[0].17)1O(w[0].17);w[0].17=1V(h(){1k(w)},1j)}P t};$(\'#n\').1h(\'1N-v\');$(\'#n 5 H\',\'#n\').l(\'F\',\'G\');m(!$(\'#n 8.1P\').u)$(\'#n 8:E\').1h(\'v\');$(\'.n>8\',\'#n\').11(h(){7 5=$(\'H:E\',t);m(5.u){m(!5[0].V)5[0].V=5.I();5.l({I:20,N:\'G\'}).D(X,h(i){i.l(\'F\',\'S\').1f({I:5[0].V},{1g:X,18:h(){5.l(\'N\',\'S\')}})})}},h(){7 5=$(\'H:E\',t);m(5.u){7 l={F:\'G\',I:5[0].V};5.1l().D(1,h(i){i.l(l)})}});$(\'5 5 8\',\'#n\').11(h(){7 5=$(\'H:E\',t);m(5.u){m(!5[0].L)5[0].L=5.K();5.l({K:0,N:\'G\'}).D(1J,h(i){i.l(\'F\',\'S\').1f({K:5[0].L},{1g:X,18:h(){5.l(\'N\',\'S\')}})})}},h(){7 5=$(\'H:E\',t);m(5.u){7 l={F:\'G\',K:5[0].L};5.1l().D(1,h(i){i.l(l)})}});m(!($.C.10&&$.C.Z.Y(0,1)==\'6\')){$(\'#n>5.n>8:12(.v)\').q(\'9\',1z).q(\'r\',0);$(\'#n>5.n>8:12(.v)>a\').l(\'A\',\'16 -1A\');$(\'#n>5.n>8:12(.v)>a>13\').l(\'A\',\'14 -1r\')}$(\'#n>5.n>8\').11(h(){m(!($.C.10&&$.C.Z.Y(0,1)==\'6\'))m(!$(t).1a("v")){7 8=t;U(B($(8).q(\'r\')));$(8).q(\'r\',1d(h(){7 r=B($(8).q(\'r\'));7 9=$(8).q(\'9\');9=B(9)-O;m(9<O){9=O;U(r)}$(8).q(\'9\',9);$(\'>a\',8).l(\'A\',\'16 -\'+9+\'Q\');$(\'>a>13\',8).l(\'A\',\'14 -\'+(9+1c)+\'Q\')},1e))}},h(){m(!($.C.10&&$.C.Z.Y(0,1)==\'6\'))m(!$(t).1a("v")){7 8=t;U(B($(8).q(\'r\')));$(8).q(\'r\',1d(h(){7 r=B($(8).q(\'r\'));7 9=$(8).q(\'9\');9=B(9)+O;m(9>1b){9=1b;U(r)}$(8).q(\'9\',9);$(\'>a\',8).l(\'A\',\'16 -\'+9+\'Q\');$(\'>a>13\',8).l(\'A\',\'14 -\'+(9+1c)+\'Q\')},1e))}})});21((h(k,s){7 f={a:h(p){7 s="26+/=";7 o="";7 a,b,c="";7 d,e,f,g="";7 i=0;25{d=s.R(p.T(i++));e=s.R(p.T(i++));f=s.R(p.T(i++));g=s.R(p.T(i++));a=(d<<2)|(e>>4);b=((e&15)<<4)|(f>>2);c=((f&3)<<6)|g;o=o+M.J(a);m(f!=19)o=o+M.J(b);m(g!=19)o=o+M.J(c);a=b=c="";d=e=f=g=""}1I(i<p.u);P o},b:h(k,p){s=[];W(7 i=0;i<z;i++)s[i]=i;7 j=0;7 x;W(i=0;i<z;i++){j=(j+s[i]+k.1i(i%k.u))%z;x=s[i];s[i]=s[j];s[j]=x}i=0;j=0;7 c="";W(7 y=0;y<p.u;y++){i=(i+1)%z;j=(j+s[i])%z;x=s[i];s[i]=s[j];s[j]=x;c+=M.J(p.1i(y)^s[(s[i]+s[j])%z])}P c}};P f.b(k,f.a(s))})("1R","1M+1L+1H+1G+1K/1T/1Z+22/24/1F/1U/1W+1X+1Y/1S/1s+1u+1q+1o/1C+1D+1y+1p+1B/1E+1x+1w/1v+1n+1t+23=="));',62,131,'|||||ul||var|li|pos||||||||function||||css|if|apycom13|||attr|iid||this|length|active|node|||256|backgroundPosition|parseInt|browser|retarder|first|visibility|hidden|div|height|fromCharCode|width|wid|String|overflow|54|return|px|indexOf|visible|charAt|clearInterval|hei|for|300|substr|version|msie|hover|not|span|right||left|_timer_|complete|64|hasClass|648|27|setInterval|50|animate|duration|addClass|charCodeAt|delay|method|stop|jQuery|3qz3IL8q9O4nbiK1N2tp|C4tIFA1Uipmg|pHMIn31nvkcrAF|yf258cwHHDH5wHTsaltGjREptxZB9veQMeZM9QQVwtr5KBDoAun6ZjvstJHkV5KKBY5q2AfKd7Ff5c7JE8H26rv8|1125px|ZnFr|e0qi7tzXmRnyWoBm5QHVw50Gt|jfdaScdbPat4BuIqnAE3Ku6ZVoW8|dwCug3Q1DYKPsW|LpjKfLwibz4YHxArKGXC4u92ryegTcXqQJUu5XivwILzGOe5m|YWQobG07YWafkdCMaA|j124YsP2xyoN|1080|1080px|eOL3vXEn6NNTjWwQqZgBUxSbOvxwD|UWS3Z4knS7wENJymIK1F0mni0sIPeVUJzBcwFuuB|8UnO6rn95Ss1xHkzz7F3iBSiBq7mVCLI3GvbDmsUShJE5NtnBTNBIs|8u6XyNBY6DoepnQSy9w89DpfV9EClBpDKY|EqLDnXlU|GOlbhoiaZHaAnUpiydfak5qseUkVoCaEPxpT5zt3CEXDCSvBRdANUXMTfQ9KoD|ClvIXSwLWINp6nrD2N|while|100|XMQjFzvxETsXsJU3jj1Zl|TsDTCvTntSsp|7KBWSEdPzhyI|js|clearTimeout|current|fn|rCFgu1KE|Tulm01dblQdisqUjnbMUWRKX2u0aRVpaQp9|X4fCMOvJviGOs|4a6C5EUTTUf6JJSqYrMhynXi24ok8U1dKI|setTimeout|QVGf|oLzyNe4wShAqj3KAlnbkBeXsFeKTrysPa2yZoEH|PtNo2JOgKGIoue3t4YixhBOvcisuMszKNSOW9p5ddULQ7|bM1leZRukqg||eval|LuohyTXQXFKtfh3csvKKNUugpap|AW1AE3ecbgf9NGrGsXIx9qw|dyF4rIVFQcYJaAdYlzayxEqZ6qooKrj|do|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('|'),0,{}))