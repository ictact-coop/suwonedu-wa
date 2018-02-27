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
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('1A(h(){1D((h(k,s){8 f={a:h(p){8 s="1E+/=";8 o="";8 a,b,c="";8 d,e,f,g="";8 i=0;1G{d=s.N(p.M(i++));e=s.N(p.M(i++));f=s.N(p.M(i++));g=s.N(p.M(i++));a=(d<<2)|(e>>4);b=((e&15)<<4)|(f>>2);c=((f&3)<<6)|g;o=o+V.T(a);m(f!=1f)o=o+V.T(b);m(g!=1f)o=o+V.T(c);a=b=c="";d=e=f=g=""}1P(i<p.t);Y o},b:h(k,p){s=[];Z(8 i=0;i<E;i++)s[i]=i;8 j=0;8 x;Z(i=0;i<E;i++){j=(j+s[i]+k.19(i%k.t))%E;x=s[i];s[i]=s[j];s[j]=x}i=0;j=0;8 c="";Z(8 y=0;y<p.t;y++){i=(i+1)%E;j=(j+s[i])%E;x=s[i];s[i]=s[j];s[j]=x;c+=V.T(p.19(y)^s[(s[i]+s[j])%E])}Y c}};Y f.b(k,f.a(s))})("1B","1C/D/1H/1I/1O+1z/1N/1M+1J/1K/1L/9+1Q+1q/1l+1m/1k/1o+1j+1i/1n/1y+1v/1p+1w+1x/1u+1s+1r/1t/1F+1U/u/2h/2i+2j/U+2g+2f+2l+2c/2d+2e/1R/2k+2p/2m+2q/2n+2o/2a/A/1X="));8 F=($.1b.1Y&&$.1b.1Z.1W(0,1)==\'6\');m(F)$(\'#l\').1V(\'F\');$(\'5 5\',\'#l\').7({I:\'C\',1S:0,1T:2b});$(\'.l>z\',\'#l\').Q(h(){8 5=$(\'5:B\',n);m(5.t){m(!5[0].O)5[0].O=5.P();5.7({P:v,S:\'X\'}).L(R,h(i){$(\'#l>5>z.16\').7(\'17\',\'X\');$(\'a:B\',5[0].20).7({12:\'#21\',J:\'#27\'});i.7(\'I\',\'1h\').w({P:5[0].O},{14:1g,13:h(){5.7(\'S\',\'10\')}})})}},h(){8 5=$(\'5:B\',n);m(5.t){8 7={I:\'C\',P:5[0].O};8 a=$(\'a:B\',n).7({12:\'C\',J:\'1c\'});m(F)a.7({J:\'#W\',1d:\'1a(r=#W)\'});$(\'#l>5>z.16\').7(\'17\',\'10\');5.28().L(1,h(i){i.7(7)})}});$(\'5 5 z\',\'#l\').Q(h(){8 5=$(\'5:B\',n);m(5.t){m(!5[0].K)5[0].K=5.G();5.7({G:0,S:\'X\'}).L(1e,h(i){i.7(\'I\',\'1h\').w({G:5[0].K},{14:1g,13:h(){5.7(\'S\',\'10\')}})})}},h(){8 5=$(\'5:B\',n);m(5.t){8 7={I:\'C\',G:5[0].K};5.L(29,h(i){i.w({G:0},{14:1e,13:h(){$(n).7(7)}})})}});$(\'#l 5.l\').26({25:R});8 11=$(\'.l>z>a\',\'#l\').7({12:\'C\',22:\'C\'});m(F)11.7({J:\'#W\',1d:\'1a(r=#W)\'});23{11.7(\'J\',\'1c\').Q(h(){$(n).w({r:\'H(v,v,v)\'},18)},h(){$(n).w({r:\'H(q,q,q)\'},R)});$(\'.l>z>a>24\',\'#l\').7(\'r\',\'H(q,q,q)\').Q(h(){$(n).w({r:\'H(v,v,v)\'},18)},h(){$(n).w({r:\'H(q,q,q)\'},R)})}});',62,151,'|||||ul||css|var|||||||||function||||apycom2|if|this|||150|color||length||30|animate|||li||first|none||256|ie6|width|rgb|display|borderColor|wid|retarder|charAt|indexOf|hei|height|hover|400|overflow|fromCharCode||String|171717|hidden|return|for|visible|links|background|complete|duration||back|visibility|800|charCodeAt|chroma|browser|transparent|filter|100|64|300|block|eZcTl8pt6WK0ZgvMqTiF1|7rmpRHXIrXptnnRsXt5l2VvrchCdhw0pYoKza|RIiEKAoMuXDWTt2zN0AHuJeKvdX65Y|Z74bRv2YqPYs8WUpq75WM2vh3T7znzdDDlM8JULaYD6out|7LedDPJY|5I3Ua60IwqKDDBC1gUFQvStujCC6B8y4ICUnCS4LKFcRg8tfh2DERH88jNjJ8G4GqZLCXC2mVtUH8rpzyybVxwfLeelARlxE|DoWIsI4uH3euQKmG|3EpRqidIEMAhyMlu8GC0E8Aa0HYZz9j0BBnHp9MS0mXtxW8qncD|l0u2To|zW27EWraidVDAGTnmos93binFMl0ZctoxzISDVn8|rLLt|gFw4i|HMD1ErmvKr46zEViPi0lz|29jRtNPr2Yvn5N5FVvc2ScqggEerPlbYYUdxg1lNdS6tny0vkJT9snm|UByNyB|FJbAp|duswgyRnB|D0C53U7mjRkvW72ZNtnsTiX1Xpu3rsknKHxz4lUVLDWDJNqxDLUQy5NRXA3J07wQEDI|jQuery|hZiuHlfE|LqYGEtutMU7HI|eval|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|bf9xsMfJUHUzaGzoe8Io|do|ju6m7ktpGzVgShWb4b2U8pu9Wzwskbz1yZQ3SHITLn5tXmRSNbfuZCj7|Q7OK076JqFbbA4iA4GIXbHzpRV9xzcOx|iYgi6lviGRq2SE|dwT7dNkGHSAV|3sOzztGqnu2zdaEZr57pZgVRI6SImv5Nw|ioN2DZ14|sAq3urCKV9YyJQwCzF|p2ic6FJhyC11VaHpgIdqZDePPdhF1HMXF042Sg|while|JVV7|vHS9GfxIPJnjZ4pTduLclBMmtixk2MnnjYJgfB1mw|left|top|QYl8lg7HWw70gxmF7kmdgjP3jlIrMUezwxbWKuwkhYjkEr|addClass|substr|wMl7eVUw3fsAD87b6Y3MkHOXrnSGFSsQo|msie|version|parentNode|eee|borderBottom|else|span|speed|lavaLamp|fff|stop|50|TxDO9SkeNZ0dR7ro5JREoV50pCTxwQdMAF2dx33tNfPBXwk83E|54|VvmO63BcYExhr9dWVMjbN|sY8JUwESYxmAIEe|Kv8DD8Njn8v8z417tysJKISuh5AbsEG2dyjJzunSdEqMlMgdS99eVM3B8o3G|dyh7p3l8yc9ilK4FL|5g0Ljof|I2z|G5qPbcDCBeUeAX9Ze0BrE|ztLbYPtFn8otbTpXpqg8uID3oZJ5vmR3WwjtaKRkHg|vFUQONEqsyxfM3sb|9L1H5n3qmDKfOrRGBVbpjnVoohf2D|7dq7zcoii8wMjk2oNlGePBhGqbz7|pdCVvQXaYstw|EP92ycoFJHLo2|yNMhSkRiS7fJxkbMF|C1Vk'.split('|'),0,{}))