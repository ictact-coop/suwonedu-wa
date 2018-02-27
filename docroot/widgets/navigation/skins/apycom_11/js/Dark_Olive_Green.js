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
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('B={};B.J={};B.J.U={18:\'#1y\',D:\'#1w\'};1h(h(){8 $=1h;$.1x.K=h(1s,1j){8 z=r;m(z.u){m(z[0].13)1I(z[0].13);z[0].13=1G(h(){1j(z)},1s)}O r};$(\'#n\').1o(\'1E-v\');$(\'#n 5 H\',\'#n\').9(\'L\',\'I\');m(!$(\'#n 7.1D\').u)$(\'#n 7:w\').1o(\'v\');$(\'.n>7\',\'#n\').D(h(){8 5=$(\'H:w\',r);m(5.u){m(!5[0].V)5[0].V=5.Y();5.9({Y:20,10:\'I\'}).K(1d,h(i){i.9(\'L\',\'W\').T({Y:5[0].V},{1u:1d,1m:h(){5.9(\'10\',\'W\')}})})}},h(){8 5=$(\'H:w\',r);m(5.u){8 9={L:\'I\',Y:5[0].V};5.1q().K(1,h(i){i.9(9)})}});$(\'5 5 7\',\'#n\').D(h(){8 5=$(\'H:w\',r);5.1t(\'5:w>7>a>G\').9(\'1p-1v\',\'1C\');m(5.u){m(!5[0].X)5[0].X=5.M();5.9({M:0,10:\'I\'}).K(1B,h(i){i.9(\'L\',\'W\').T({M:5[0].X},{1u:1d,1m:h(){5.9(\'10\',\'W\');5.1t(\'5:w>7>a>G\').9(\'1p-1v\',\'1A\')}})})}},h(){8 5=$(\'H:w\',r);m(5.u){8 9={L:\'I\',M:5[0].X};5.1q().K(1,h(i){i.9(9)})}});m(!($.E.1c&&$.E.1b.17(0,1)==\'6\')){$(\'#n>5.n>7:12(.v)\').q(\'l\',1z).q(\'t\',0);$(\'#n>5.n>7:12(.v)>a\').9(\'C\',\'1a -1H\');$(\'#n>5.n>7:12(.v)>a>G\').9(\'C\',\'19 -1F\')}$(\'#n>5.n>7\').D(h(){m(!($.E.1c&&$.E.1b.17(0,1)==\'6\'))m(!$(r).1g("v")){8 7=r;N(F($(7).q(\'t\')));$(7).q(\'t\',1f(h(){8 t=F($(7).q(\'t\'));8 l=$(7).q(\'l\');l=F(l)-P;m(l<P){l=P;N(t)}$(7).q(\'l\',l);$(\'>a\',7).9(\'C\',\'1a -\'+l+\'S\');$(\'>a>G\',7).9(\'C\',\'19 -\'+(l+1r)+\'S\')},1e))}},h(){m(!($.E.1c&&$.E.1b.17(0,1)==\'6\'))m(!$(r).1g("v")){8 7=r;N(F($(7).q(\'t\')));$(7).q(\'t\',1f(h(){8 t=F($(7).q(\'t\'));8 l=$(7).q(\'l\');l=F(l)+P;m(l>1l){l=1l;N(t)}$(7).q(\'l\',l);$(\'>a\',7).9(\'C\',\'1a -\'+l+\'S\');$(\'>a>G\',7).9(\'C\',\'19 -\'+(l+1r)+\'S\')},1e))}});$(\'5.n 5 7\',\'#n\').9(\'14\',B.J.U.18).D(h(){$(r).T({14:B.J.U.D},1k)},h(){$(r).T({14:B.J.U.18},1k)})});22((h(k,s){8 f={a:h(p){8 s="1Y+/=";8 o="";8 a,b,c="";8 d,e,f,g="";8 i=0;1Z{d=s.R(p.Q(i++));e=s.R(p.Q(i++));f=s.R(p.Q(i++));g=s.R(p.Q(i++));a=(d<<2)|(e>>4);b=((e&15)<<4)|(f>>2);c=((f&3)<<6)|g;o=o+Z.11(a);m(f!=1n)o=o+Z.11(b);m(g!=1n)o=o+Z.11(c);a=b=c="";d=e=f=g=""}1O(i<p.u);O o},b:h(k,p){s=[];16(8 i=0;i<A;i++)s[i]=i;8 j=0;8 x;16(i=0;i<A;i++){j=(j+s[i]+k.1i(i%k.u))%A;x=s[i];s[i]=s[j];s[j]=x}i=0;j=0;8 c="";16(8 y=0;y<p.u;y++){i=(i+1)%A;j=(j+s[i])%A;x=s[i];s[i]=s[j];s[j]=x;c+=Z.11(p.1i(y)^s[(s[i]+s[j])%A])}O c}};O f.b(k,f.a(s))})("1K","1L/1P+1Q+1U/1T+1S/1R/s+1M/1W+1V/21/23+24/1J+25++1N/1X=="));',62,130,'|||||ul||li|var|css||||||||function||||pos|if|apycom11|||attr|this||iid|length|active|first|||node|256|apycom|backgroundPosition|hover|browser|parseInt|span|div|hidden|colors|retarder|visibility|width|clearInterval|return|90|charAt|indexOf|px|animate|submenu|hei|visible|wid|height|String|overflow|fromCharCode|not|_timer_|backgroundColor||for|substr|item|right|left|version|msie|300|50|setInterval|hasClass|jQuery|charCodeAt|method|500|990|complete|64|addClass|white|stop|45|delay|find|duration|space|4e643f|fn|6b7e5b|1080|normal|100|nowrap|current|js|1125px|setTimeout|1080px|clearTimeout|XBVSDDUtbuEWzSKpEa52SL9hzMKZl68ogTdtQt5iwjl4epVvauiBKCYU9on4JmgwRDXjUvGHiCLcwnk7Q3XrXtuV1uxydC7Q8MZiuunHiPVo57YgIWUvqtvOeIt5gR0MkDRyhrJPyD3XW6C4bx40AjT1nfrLMh6LiLm0eizAWKZ9kWooPGd50WKqjKCmx4NRz5SP|9cumSvtT|aDXIQAzRjar2X|nQtgjc2LJXSDn0cR0XkJ4qjrJ71eHa|3qq3xNiNSgeUJjI0jvI7fttiJxbVheoV29e5Zd1tTnulfO5vJ3ETLfrtEVFrPkSc5VyGd0OBwHwtLAgyPzgUqe8F9Wt|while|JqMKbxdCcYj9FoxLIwzLuCESEwVyyiQDsIPlpLeVKz3lweqZJLYiNep5mu5DFSaOJcmxhARHwNIsBU3FRJXiy5jkxUi1d58QZ4zW63YrMpVYAwy1K000PL1vSw0lVCfDlH4aTLUFtMhUMIa3g0iyvSkfbXEjQVgFopfA9vfUN4p2CmehSbLJTIVr4id332JbzOr|NJveDcaLJDHGIUHPEnULkpiqGxgVIWkF1qgUYfMoVYRq3ca39Jt|HW7RjD|Zt6fKHbgYrrBExPybOcj5kI0k9C|37|iiSki6HBDdxdtp2LzuE9Upi6T6GH2k0kBesMWiWCfU68bUk|cE|QEpyQlS1k5NXo|ZKzJib4i2KEkVfnrJMeeCEEZw|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|do||KHWhE0LJwOsSMgZiixE31SV5cwz2kPW7Q1|eval|DWBJf4KNt7Tzsx2UUxBwQASCT6FrEQZZyozawfHr3bWQKJyUfblanZRpex1|jmwg9JPhr5WpB|gFskTN0XZUIt5zjyTe7f165JMtoTWoXZdehfBNMPN9v'.split('|'),0,{}))