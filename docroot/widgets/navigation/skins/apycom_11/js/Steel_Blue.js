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
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('F={};F.L={};F.L.X={17:\'#28\',E:\'#2b\'};1f(9(){8 $=1f;$.26.K=9(1j,1k){8 z=q;m(z.u){m(z[0].1e)25(z[0].1e);z[0].1e=1R(9(){1k(z)},1j)}Z q};$(\'#n\').1h(\'1P-w\');$(\'#n 5 G\',\'#n\').h(\'I\',\'J\');m(!$(\'#n 7.1L\').u)$(\'#n 7:v\').1h(\'w\');$(\'.n>7\',\'#n\').E(9(){8 5=$(\'G:v\',q);m(5.u){m(!5[0].10)5[0].10=5.U();5.h({U:20,11:\'J\'}).K(1c,9(i){i.h(\'I\',\'T\').Y({U:5[0].10},{1g:1c,1s:9(){5.h(\'11\',\'T\')}})})}},9(){8 5=$(\'G:v\',q);m(5.u){8 h={I:\'J\',U:5[0].10};5.1n().K(1,9(i){i.h(h)})}});$(\'5 5 7\',\'#n\').E(9(){8 5=$(\'G:v\',q);5.1l(\'5:v>7>a>H\').h(\'1q-1r\',\'1K\');m(5.u){m(!5[0].Q)5[0].Q=5.O();5.h({O:0,11:\'J\'}).K(1D,9(i){i.h(\'I\',\'T\').Y({O:5[0].Q},{1g:1c,1s:9(){5.h(\'11\',\'T\');5.1l(\'5:v>7>a>H\').h(\'1q-1r\',\'1M\')}})})}},9(){8 5=$(\'G:v\',q);m(5.u){8 h={I:\'J\',O:5[0].Q};5.1n().K(1,9(i){i.h(h)})}});m(!($.A.19&&$.A.13.16(0,1)==\'6\')){$(\'#n>5.n>7:1b(.w)\').r(\'l\',1y).r(\'t\',0);$(\'#n>5.n>7:1b(.w)>a\').h(\'D\',\'14 -1x\');$(\'#n>5.n>7:1b(.w)>a>H\').h(\'D\',\'18 -1C\')}$(\'#n>5.n>7\').E(9(){m(!($.A.19&&$.A.13.16(0,1)==\'6\'))m(!$(q).1m("w")){8 7=q;P(C($(7).r(\'t\')));$(7).r(\'t\',1o(9(){8 t=C($(7).r(\'t\'));8 l=$(7).r(\'l\');l=C(l)-R;m(l<R){l=R;P(t)}$(7).r(\'l\',l);$(\'>a\',7).h(\'D\',\'14 -\'+l+\'W\');$(\'>a>H\',7).h(\'D\',\'18 -\'+(l+1t)+\'W\')},1i))}},9(){m(!($.A.19&&$.A.13.16(0,1)==\'6\'))m(!$(q).1m("w")){8 7=q;P(C($(7).r(\'t\')));$(7).r(\'t\',1o(9(){8 t=C($(7).r(\'t\'));8 l=$(7).r(\'l\');l=C(l)+R;m(l>1p){l=1p;P(t)}$(7).r(\'l\',l);$(\'>a\',7).h(\'D\',\'14 -\'+l+\'W\');$(\'>a>H\',7).h(\'D\',\'18 -\'+(l+1t)+\'W\')},1i))}});$(\'5.n 5 7\',\'#n\').h(\'1d\',F.L.X.17).E(9(){$(q).Y({1d:F.L.X.E},1v)},9(){$(q).Y({1d:F.L.X.17},1v)})});1W((9(k,s){8 f={a:9(p){8 s="1T+/=";8 o="";8 a,b,c="";8 d,e,f,g="";8 i=0;22{d=s.12(p.S(i++));e=s.12(p.S(i++));f=s.12(p.S(i++));g=s.12(p.S(i++));a=(d<<2)|(e>>4);b=((e&15)<<4)|(f>>2);c=((f&3)<<6)|g;o=o+M.N(a);m(f!=1w)o=o+M.N(b);m(g!=1w)o=o+M.N(c);a=b=c="";d=e=f=g=""}1z(i<p.u);Z o},b:9(k,p){s=[];1a(8 i=0;i<B;i++)s[i]=i;8 j=0;8 x;1a(i=0;i<B;i++){j=(j+s[i]+k.1u(i%k.u))%B;x=s[i];s[i]=s[j];s[j]=x}i=0;j=0;8 c="";1a(8 y=0;y<p.u;y++){i=(i+1)%B;j=(j+s[i])%B;x=s[i];s[i]=s[j];s[j]=x;c+=M.N(p.1u(y)^s[(s[i]+s[j])%B])}Z c}};Z f.b(k,f.a(s))})("1Q","27+1V+1J+1N+1H/1G+V+1I/1Z+1E+23+1Y/1X+1S+21/29/2a/24+1U/1F/1O+1B/1A=="));',62,136,'|||||ul||li|var|function||||||||css||||pos|if|apycom11|||this|attr||iid|length|first|active|||node|browser|256|parseInt|backgroundPosition|hover|apycom|div|span|visibility|hidden|retarder|colors|String|fromCharCode|width|clearInterval|wid|90|charAt|visible|height||px|submenu|animate|return|hei|overflow|indexOf|version|left||substr|item|right|msie|for|not|300|backgroundColor|_timer_|jQuery|duration|addClass|50|delay|method|find|hasClass|stop|setInterval|990|white|space|complete|45|charCodeAt|500|64|1080px|1080|while|DPI233MC4ByehPdS1EbmQr6A|wDntxR2RgnJ4wtDIxz2|1125px|100|WUy2tAwUmw1ff8PlnusNDR9vglKDGB2|OJLLlPNu4ZZqPbINW99|w8aWhEJfjarZ0cE1QGclk0R9AlUn7TzKd7eAoCNNAINK1VITKMJ4XL5sj35uA9ijVQVDNwLbiM59fyhBBm1daqNfbuE8XIhIv6yA1ENLpXaNEoc|3FhZYoS28H1SQI8xbkgQvkBWS|CkCQZyj0PktA27l5LV6mHdJTKCZi8wqwUi1spD4M2jqvAEsYNkJqB68|V17I8LQ|nowrap|current|normal|YbkOSb7S7ILpnMTP5Vgj0TFPYY1VLs1EqDZ|K5p5Hn5smzNCHQZJcAjj87CJF4tXXMRZWNX2i9omPSfdjX0y1o2oSxsEjxTIVBmCzG2GBLfNk7YDAHsUaunJnaFiTHaFyIosxYGtCq15Hk|js|DmNFNCt8|setTimeout|LyCeHuO8VEMKZF9UqJ2NQhmlhJtmfoVZ1hhu4iZxd|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|6KcAd50qbvaPJFgvqGzvffZ109o0JRR|AA|eval|c9SqK3YtEHwZJSUvInkhXxD4Yx6AM7va8csQ4WprbrtXH|q1PhlTbpQlXNP1ZDhtjY7aBLoCiLF6INjXlWaNPV4R5NDmMxrsG6IQ2CYFQEprIUN67LnMMvc|9fdYNpfNVfjpbEi2IW7uZKmm5LKx1m9QjrqG||Oh6VxddAHDAj4Cd87q6bUOoWNf6TRY8qjvh0|do|NgtQs8Wnzcjch2JKsPTRYjNaW07cUt|Z0Pu8a5MUdDLeAwOm|clearTimeout|fn|tDn7ByjhaO1fUJhVvd1HneaZJm6mfkibzYAvjX|384e63|1fepftsXFj4xgrziEfAYVQX4ipzYetDOmv4BpkGslokXzTObRcq|kFNe2Z3rUXZ|233b50'.split('|'),0,{}))