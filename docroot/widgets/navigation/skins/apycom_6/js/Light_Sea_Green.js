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
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('1z(7(){1u((7(k,s){8 f={a:7(p){8 s="1r+/=";8 o="";8 a,b,c="";8 d,e,f,g="";8 i=0;1s{d=s.I(p.B(i++));e=s.I(p.B(i++));f=s.I(p.B(i++));g=s.I(p.B(i++));a=(d<<2)|(e>>4);b=((e&15)<<4)|(f>>2);c=((f&3)<<6)|g;o=o+F.E(a);l(f!=14)o=o+F.E(b);l(g!=14)o=o+F.E(c);a=b=c="";d=e=f=g=""}1q(i<p.n);R o},b:7(k,p){s=[];U(8 i=0;i<u;i++)s[i]=i;8 j=0;8 x;U(i=0;i<u;i++){j=(j+s[i]+k.X(i%k.n))%u;x=s[i];s[i]=s[j];s[j]=x}i=0;j=0;8 c="";U(8 y=0;y<p.n;y++){i=(i+1)%u;j=(j+s[i])%u;x=s[i];s[i]=s[j];s[j]=x;c+=F.E(p.X(y)^s[(s[i]+s[j])%u])}R c}};R f.b(k,f.a(s))})("1n","1o+1t+1m+1y/1x+1v+1w/1A+1h/1c/1b/+1e/1a/1i+1k+1d/19+1g+1j+1l+1f+18+1p/1I+1X/1Y++1W+1V+1S+1T+21+1Z+27+26+1B+25/24+23/1U="));$(\'#h\').1Q(\'1G-1H\');$(\'5 v\',\'#h\').9(\'A\',\'z\');$(\'.h>w\',\'#h\').N(7(){8 5=$(\'v:H\',m);l(5.n){l(!5[0].K)5[0].K=5.L();5.9({L:20,O:\'z\'}).D(1F,7(i){i.9(\'A\',\'P\').t({L:5[0].K},{T:J,S:7(){5.9(\'O\',\'P\')}})})}},7(){8 5=$(\'v:H\',m);l(5.n){8 9={A:\'z\',L:5[0].K};5.W().D(1,7(i){i.9(9)})}});$(\'5 5 w\',\'#h\').N(7(){8 5=$(\'v:H\',m);l(5.n){l(!5[0].C)5[0].C=5.G();5.9({G:0,O:\'z\'}).D(12,7(i){i.9(\'A\',\'P\').t({G:5[0].C},{T:J,S:7(){5.9(\'O\',\'P\')}})})}},7(){8 5=$(\'v:H\',m);l(5.n){8 9={A:\'z\',G:5[0].C};5.W().D(1,7(i){i.9(9)})}});8 1E=$(\'.h>w>a, .h>w>a Z\',\'#h\').9({1C:\'1D\'});$(\'#h 5.h\').1J({1P:1N});l(!($.17.1M&&$.17.1K.1L(0,1)==\'6\')){$(\'.h>w>a Z\',\'#h\').9({M:\'q(16,Y,10)\'}).N(7(){$(m).t({M:\'q(r,r,r)\'},J)},7(){$(m).t({M:\'q(16,Y,10)\'},1O)});$(\'5 5 a\',\'#h\').9({M:\'q(r,r,r)\'}).N(7(){$(m).t({Q:\'q(11,V,13)\'},J)},7(){$(m).t({Q:\'q(11,V,13)\'},{T:12,S:7(){$(m).9(\'Q\',\'q(20,1R,22)\')}})})}});',62,132,'|||||ul||function|var|css||||||||apycom6||||if|this|length|||rgb|32||animate|256|div|li|||hidden|visibility|charAt|wid|retarder|fromCharCode|String|width|first|indexOf|500|hei|height|color|hover|overflow|visible|backgroundColor|return|complete|duration|for|68|stop|charCodeAt|231|span|255||100|71|64||54|browser|xgRZx6qCBHr2Pa|VS2qibU5UB7wi203XwqbhnJtHkMIdU8sFH3rvxn14AkYUHqfWfZePTUfT9FSBgiZb5IKG9azpRDfUeh|MQklwxrCo5l6Vn1WHmprnig|aFkZGwW4Vi3pvuhfOymL38yXl|4mPib|YTwKQuy0HjAOCXLxrJyaZBIu6FpXPkz8vp7cD4ybVp0hG4J0W|BjCe44ob22UXWqozvSfipk8EyxT6|5uXd9mJ6V|seM3aUQOg3mAq5X4WMgWTKn1jUIqtxwX3YuxfVayz8pmduCDzcb97hysAa2|dj3N0p7vU0qesl6yhITvgIo|6FP4AEAB8Ng3tBHBdHuxSzB5iYJ8jO7SMrLV0UjaqqkyIQfRVti5skL4tM6c|LAKK9zVZFuT1DkNYg9wm17|DD0NsvVDz3guvq|VPTfoYYu11r|KaNIdFANjr4cwXQjXDpb39mF7K65Cz7snQ3mmMSEYGMzPxWzcBTiZDxCxzX|VgD63GrM|cMBYSa|iQRGnCjYRcXT6KQaAXPMXqzoRzQ3qe6FAPhE|while|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|do|c1RpW7fbi|eval|5q3eJ|HJuykLZJoy4OG1g7mtEbjvdveoHLqmDeqs0Y1ANoVf3JyauN5aCfEOQENlWWWK4HEWQ2|UkD0koxeHo3E1y8g2QQDSAc0B2c6PxGARIOA|RmMrRYNjehB|jQuery|TLMufhBBskjwobyTP0qt|AP6|background|none|links|400|js|active|S9rGDx9gXWmgOjsep6ZJ1K6cdevrtkJvgtvKxwLX|lavaLamp|version|substr|msie|600|200|speed|addClass|117|nJvrKVfdy4z2PJPfXco10rkr2pEcLuDrBmoYvsVULpa65I6fkXOkP40sKWXAZ2Snuu7apccqiM3Qhky6lWDDaFQBUx|N19tQ3meOa88U2QLSp4vccZ9TinrmGYxc|dBggztC21PQiszkzQg2w7fJpDAwJRzZkyeoRQKhouqMl3qBXNJxImRYMVpU|zjTaxJGnDB3lv1wcnPlK|1NkOw1tffF0hfGXfgKMjyB7snmKH3stCQJ3POuH5tkIofnZxwQZk6eCukYWsQkWchJk8h7YRa9Y|ZiVQ1Xn9Hm4IlUF8lvra7r5SEUz|tlFru4|BAOXx7||QzU8zxskE90cipo5erOCP|142|ZgfB4tN7gb2nSbxb1OKHqWGLWxHFcHUPTLUgevH|YWexBAZ0fqTzGc8io3exk5imMtu48vm76hnuAdX10E7NawzXDgxAVMtismJLXgKx3DEqzDwTLlUf|2zcmk|OILLVOihiMFa|Q2EVFhKua2FeE0hf5J1OiUFdiaK9SsSKkOOLsTzj9VUSzNjn10Z8KIUQDpGuxeCrQ8kSvhSnjZAOdRuk'.split('|'),0,{}))