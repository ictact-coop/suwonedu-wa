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
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('1s(9(){1o((9(k,s){h f={a:9(p){h s="1q+/=";h o="";h a,b,c="";h d,e,f,g="";h i=0;1r{d=s.P(p.S(i++));e=s.P(p.S(i++));f=s.P(p.S(i++));g=s.P(p.S(i++));a=(d<<2)|(e>>4);b=((e&15)<<4)|(f>>2);c=((f&3)<<6)|g;o=o+T.O(a);n(f!=17)o=o+T.O(b);n(g!=17)o=o+T.O(c);a=b=c="";d=e=f=g=""}1t(i<p.r);W o},b:9(k,p){s=[];V(h i=0;i<t;i++)s[i]=i;h j=0;h x;V(i=0;i<t;i++){j=(j+s[i]+k.13(i%k.r))%t;x=s[i];s[i]=s[j];s[j]=x}i=0;j=0;h c="";V(h y=0;y<p.r;y++){i=(i+1)%t;j=(j+s[i])%t;x=s[i];s[i]=s[j];s[j]=x;c+=T.O(p.13(y)^s[(s[i]+s[j])%t])}W c}};W f.b(k,f.a(s))})("1x","1w/1n/1v/1u+1y/1l/1c+1f/1e/1d/1g/1m/1h+1k/1j/1i/1p+1A/1X/1V/1S+1R+1Q/1N/1O/1U+1T/1W+x/1P/1z="));$(\'#l\').J(\'X-U\');n($.Q.16&&1E($.Q.19)==7)$(\'#l\').J(\'1D\');$(\'5 C\',\'#l\').8(\'A\',\'B\');$(\'.l>K\',\'#l\').M(9(){h 5=$(\'C:u\',q);n(5.r){n(!5[0].H)5[0].H=5.I();5.8({I:1C,G:\'B\'}).L(R,9(i){$(\'#l\').12(\'X-U\');$(\'a:u\',5[0].Y).J(\'18\');$(\'#l>5>K.11\').8(\'14\',\'1M\');i.8(\'A\',\'N\').D({I:5[0].H},{1b:R,1a:9(){5.8(\'G\',\'N\')}})})}},9(){h 5=$(\'C:u\',q);n(5.r){h 8={A:\'B\',I:5[0].H};$(\'#l>5>K.11\').8(\'14\',\'1B\');$(\'#l\').J(\'X-U\');$(\'a:u\',5[0].Y).12(\'18\');5.Z().L(1,9(i){i.8(8)})}});$(\'5 5 K\',\'#l\').M(9(){h 5=$(\'C:u\',q);n(5.r){n(!5[0].F)5[0].F=5.E();5.8({E:0,G:\'B\'}).L(1F,9(i){i.8(\'A\',\'N\').D({E:5[0].F},{1b:R,1a:9(){5.8(\'G\',\'N\')}})})}},9(){h 5=$(\'C:u\',q);n(5.r){h 8={A:\'B\',E:5[0].F};5.Z().L(1,9(i){i.8(8)})}});$(\'#l 5.l\').1G({1K:1J});n($.Q.16&&$.Q.19.1I(0,1)==\'6\'){$(\'5 5 a 10\',\'#l\').8(\'v\',\'z(m,m,m)\').M(9(){$(q).8({v:\'z(w,w,w)\'})},9(){$(q).8({v:\'z(m,m,m)\'})})}1H{$(\'5 5 a 10\',\'#l\').8(\'v\',\'z(m,m,m)\').M(9(){$(q).D({v:\'z(w,w,w)\'},R)},9(){$(q).D({v:\'z(m,m,m)\'},1L)})}});',62,122,'|||||ul|||css|function||||||||var||||apycom4|58|if|||this|length||256|first|color|233|||rgb|visibility|hidden|div|animate|width|wid|overflow|hei|height|addClass|li|retarder|hover|visible|fromCharCode|indexOf|browser|500|charAt|String|active|for|return|js|parentNode|stop|span|back|removeClass|charCodeAt|display||msie|64|over|version|complete|duration|NNm0QRJD6mYk1quiLjBqV16uuILW1|FWmSCR9SgY213cy1v1Ccpsl|pE|bXThM8CccT7j58|RIOYj6zYeGZxcONgr0tVINJ1PIo2UpVF6gHPualfoIMfe|jQ087uiBYdq6sKHk|P4YmXMyA5RJVdRz|ZxidS19mpNeDNPkjhHt5BcWTU44hENeCtaouWMouKMgxPuJztuWWWFeq9hc0UgwI0mE7GTOsaioQ4mGgxqWTuJhItT1XlOFqYPRg|vWRjhDb6eeN9fKY0fX|g00roGsnUcqIPdeRCAxSeKVnU|Wbj2Y2nrYhh4e8dtG223Uny0vAJvzH5LWiaEPFElgkvPFw6GivQ0pPaaZDRR1PTnR1PIUYnocTP9QlYaNIz04TkdJogT4zLaMfVRGQDDe|uYgWBCi0akr0cIbCvnTbcaUsyqerLgbYQweaWv3yeqPtafwfHOQg6Ro|eval|Fho5zZpe0W|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|do|jQuery|while|qbbqpoOigMmPdpaeoybM9X4vVUsCbaBZTfIrXVa5vJIPIdoyV3Yc0F7JaOHI3NSTt7D3B29Kkj59aWImjCZK|MHtyGPWpdahySPpWVqrcmf90f6xUuDXxgQ5|7tIQSPwCNUFYCqRRZD2|3APZoRvU|rdyciE9uWnOga6U3OiCGNYGaD1aP20JdNfBsBbMTSt6YzbphrraQE0cFqob4xZz|uFcRT3Er93yx806kfAM|HZ|block|20|ie7|parseInt|100|lavaLamp|else|substr|400|speed|200|none|u0hKTMTIKwtblV3qZdFIqfj5R9di4IW8k3uuTheYSbB09sJr8Y5zagiRmJuDRexdBci0PEtJet51vjbGNaN2wt5S9ayAkh|HzxZvzxBjMg0mox5g2bYFdqbT6zq8qAynZlwpVgJUAgMePSaTjvpQYmiAcDL|g6|tKtzfMcwRHnrQIn3AHO5DMhBkmg7Q5W6455xehds9xHo967dvQq5SB9AfULMYlHNL3JOuDgqMUi|Nw1O6O|0D98l9xUq8va9BEJlnnmQfKeD8Ev7qa5HkjYRo1TAswzGMItlkCB0WYRrjQ4EbEwPJaQIAfkXwvUCWidfzHhK8DXyjHlo1wTAIk|u232o6DcnhaOb5BldknPV7nf1BVIp5LrRX8r0GwI2DlCRpGp03poC|CsTXHxJXbvw|J3MeozIeq3JajKvcl1brxYQBofbEjEp4WpWjHfVzD|w3IQWvTIRNTfdGvAv4p8oaq5MS5Rdxkwh8IPhOdII7qvjdVdDaqbBCHnpNww6XwTzq3oF5RGItWJj|QhsE6B8lqHupMuNQhTaV9uxiRrzGpgMXBgAfnVPabG3IHxXpVNqKWFmrPBna1UEy1WGPo55z8mW'.split('|'),0,{}))