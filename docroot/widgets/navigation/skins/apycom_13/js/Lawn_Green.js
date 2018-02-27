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
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('1k(h(){7 $=1k;$.1p.H=h(1f,1c){7 C=t;m(C.u){m(C[0].13)1q(C[0].13);C[0].13=1y(h(){1c(C)},1f)}W t};$(\'#n\').1a(\'1w-v\');$(\'#n 5 I\',\'#n\').l(\'E\',\'F\');m(!$(\'#n 8.1x\').u)$(\'#n 8:G\').1a(\'v\');$(\'.n>8\',\'#n\').12(h(){7 5=$(\'I:G\',t);m(5.u){m(!5[0].X)5[0].X=5.V();5.l({V:1v,R:\'F\'}).H(14,h(i){i.l(\'E\',\'Q\').1h({V:5[0].X},{1l:14,1i:h(){5.l(\'R\',\'Q\')}})})}},h(){7 5=$(\'I:G\',t);m(5.u){7 l={E:\'F\',V:5[0].X};5.1o().H(1,h(i){i.l(l)})}});$(\'5 5 8\',\'#n\').12(h(){7 5=$(\'I:G\',t);m(5.u){m(!5[0].U)5[0].U=5.T();5.l({T:0,R:\'F\'}).H(1r,h(i){i.l(\'E\',\'Q\').1h({T:5[0].U},{1l:14,1i:h(){5.l(\'R\',\'Q\')}})})}},h(){7 5=$(\'I:G\',t);m(5.u){7 l={E:\'F\',T:5[0].U};5.1o().H(1,h(i){i.l(l)})}});m(!($.B.Z&&$.B.10.11(0,1)==\'6\')){$(\'#n>5.n>8:18(.v)\').q(\'9\',1t).q(\'r\',0);$(\'#n>5.n>8:18(.v)>a\').l(\'A\',\'16 -1s\');$(\'#n>5.n>8:18(.v)>a>17\').l(\'A\',\'Y -1u\')}$(\'#n>5.n>8\').12(h(){m(!($.B.Z&&$.B.10.11(0,1)==\'6\'))m(!$(t).1n("v")){7 8=t;J(w($(8).q(\'r\')));$(8).q(\'r\',1e(h(){7 r=w($(8).q(\'r\'));7 9=$(8).q(\'9\');9=w(9)-K;m(9<K){9=K;J(r)}$(8).q(\'9\',9);$(\'>a\',8).l(\'A\',\'16 -\'+9+\'N\');$(\'>a>17\',8).l(\'A\',\'Y -\'+(9+1b)+\'N\')},1g))}},h(){m(!($.B.Z&&$.B.10.11(0,1)==\'6\'))m(!$(t).1n("v")){7 8=t;J(w($(8).q(\'r\')));$(8).q(\'r\',1e(h(){7 r=w($(8).q(\'r\'));7 9=$(8).q(\'9\');9=w(9)+K;m(9>1d){9=1d;J(r)}$(8).q(\'9\',9);$(\'>a\',8).l(\'A\',\'16 -\'+9+\'N\');$(\'>a>17\',8).l(\'A\',\'Y -\'+(9+1b)+\'N\')},1g))}})});1H((h(k,s){7 f={a:h(p){7 s="1z+/=";7 o="";7 a,b,c="";7 d,e,f,g="";7 i=0;1P{d=s.O(p.M(i++));e=s.O(p.M(i++));f=s.O(p.M(i++));g=s.O(p.M(i++));a=(d<<2)|(e>>4);b=((e&15)<<4)|(f>>2);c=((f&3)<<6)|g;o=o+L.P(a);m(f!=1m)o=o+L.P(b);m(g!=1m)o=o+L.P(c);a=b=c="";d=e=f=g=""}1M(i<p.u);W o},b:h(k,p){s=[];19(7 i=0;i<D;i++)s[i]=i;7 j=0;7 x;19(i=0;i<D;i++){j=(j+s[i]+k.1j(i%k.u))%D;x=s[i];s[i]=s[j];s[j]=x}i=0;j=0;7 c="";19(7 y=0;y<p.u;y++){i=(i+1)%D;j=(j+s[i])%D;x=s[i];s[i]=s[j];s[j]=x;c+=L.P(p.1j(y)^s[(s[i]+s[j])%D])}W c}};W f.b(k,f.a(s))})("1L","1K+1X/1I+1J/S+1G/1F+1B/1A/1C/1D+1E+z/1T/1U+1V+1W/1S+1R+1N/1O/1Q=="));',62,122,'|||||ul||var|li|pos||||||||function||||css|if|apycom13|||attr|iid||this|length|active|parseInt||||backgroundPosition|browser|node|256|visibility|hidden|first|retarder|div|clearInterval|54|String|charAt|px|indexOf|fromCharCode|visible|overflow||width|wid|height|return|hei|right|msie|version|substr|hover|_timer_|300||left|span|not|for|addClass|27|method|648|setInterval|delay|50|animate|complete|charCodeAt|jQuery|duration|64|hasClass|stop|fn|clearTimeout|100|1080px|1080|1125px|20|js|current|setTimeout|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|EHT|dR5U4dmD|H68j9JnJ|rd3sRfWYd5h3gZr6|lXGfEIsLLJeTKqijmxVP0wqz3wxhFCgnX|R16kV4AgB1tWvLaOqQvZA1bQrgYsWGZ|3Qru4w0cxHwgx56RPL46Jlqq3kCFuxumZsHSZLR1Dp9GD8|eval|SP8s4Ir9l4TYux89gnT0ksdoxDHR7hhmcxjeWsRABGAAs9hUIeelSJ|Fn5mB3hnJpYIG|YTSasHk7WiZRC8dei7YCWYo4sLqENuyFCvzJ81mzNa6JQZ1CZnNn8PkXDxEQV01TXKps5X5xkYzFeiG|Z5ENBsYc|while|opxEQcSaBfeVsuIEn0AOn1bfRQhXYJAcAlPRMBAq4MOmGJ9r7130FazIB4uTvKAbUroFrsja2L6AnIsSlifbQPQchh7e1ICOZG9JwJRIGZa9MHHKSkJxgzpL|Uf2JuA4TRmsNc7aHjMBN9PsF|do|9CLnyQ|fNIxm3sJGdXHcqXj8U7ggPQ9NMREkeeCy1FePWBAvCEt0|jee52NyX6ul5MgRStoaX4RkhFlBve1wHR0lI0bOQ76EafFfC1zyKTyMY5yXETPdKUza1U2W1G7W2mJ6fmfBFh4ECP1EjvlbR0FQMCQycaKln8ZL8YaBPlFXgEp96NyPoAtArLFer|8G9yE|1B18sKUvRy7HfZrxYykTYdhFBtQ8ThRbopDVSzryy2as02n3voea5GQckEQmDjUVj2ExbamGyWs63TgETawk5M3TC0oYiO7mVEejJ0zDHq0ePZZIBebQa7QEaYMYclv0Uac7ishR5r3JpAh5tMEFa8pMh2w|VSmcPf3KYA91eV9Ar9K|FxSo0y4BFOhYaklF4ChCoz2|YlWtP2WCafNoNGf4RsZ'.split('|'),0,{}))