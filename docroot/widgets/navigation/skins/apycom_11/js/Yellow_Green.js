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
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('D={};D.L={};D.L.O={12:\'#1G\',z:\'#1H\'};1j(h(){8 $=1j;$.1F.K=h(1n,1m){8 A=r;m(A.u){m(A[0].1a)1E(A[0].1a);A[0].1a=1B(h(){1m(A)},1n)}10 r};$(\'#n\').1s(\'1D-w\');$(\'#n 5 H\',\'#n\').9(\'I\',\'J\');m(!$(\'#n 7.1I\').u)$(\'#n 7:v\').1s(\'w\');$(\'.n>7\',\'#n\').z(h(){8 5=$(\'H:v\',r);m(5.u){m(!5[0].Y)5[0].Y=5.N();5.9({N:20,W:\'J\'}).K(18,h(i){i.9(\'I\',\'11\').X({N:5[0].Y},{1q:18,1p:h(){5.9(\'W\',\'11\')}})})}},h(){8 5=$(\'H:v\',r);m(5.u){8 9={I:\'J\',N:5[0].Y};5.1i().K(1,h(i){i.9(9)})}});$(\'5 5 7\',\'#n\').z(h(){8 5=$(\'H:v\',r);5.1r(\'5:v>7>a>G\').9(\'1v-1u\',\'1J\');m(5.u){m(!5[0].U)5[0].U=5.T();5.9({T:0,W:\'J\'}).K(1O,h(i){i.9(\'I\',\'11\').X({T:5[0].U},{1q:18,1p:h(){5.9(\'W\',\'11\');5.1r(\'5:v>7>a>G\').9(\'1v-1u\',\'1A\')}})})}},h(){8 5=$(\'H:v\',r);m(5.u){8 9={I:\'J\',T:5[0].U};5.1i().K(1,h(i){i.9(9)})}});m(!($.E.17&&$.E.1c.1b(0,1)==\'6\')){$(\'#n>5.n>7:13(.w)\').q(\'l\',1Q).q(\'t\',0);$(\'#n>5.n>7:13(.w)>a\').9(\'C\',\'1d -1y\');$(\'#n>5.n>7:13(.w)>a>G\').9(\'C\',\'16 -1x\')}$(\'#n>5.n>7\').z(h(){m(!($.E.17&&$.E.1c.1b(0,1)==\'6\'))m(!$(r).1h("w")){8 7=r;Z(F($(7).q(\'t\')));$(7).q(\'t\',1t(h(){8 t=F($(7).q(\'t\'));8 l=$(7).q(\'l\');l=F(l)-V;m(l<V){l=V;Z(t)}$(7).q(\'l\',l);$(\'>a\',7).9(\'C\',\'1d -\'+l+\'M\');$(\'>a>G\',7).9(\'C\',\'16 -\'+(l+1l)+\'M\')},1g))}},h(){m(!($.E.17&&$.E.1c.1b(0,1)==\'6\'))m(!$(r).1h("w")){8 7=r;Z(F($(7).q(\'t\')));$(7).q(\'t\',1t(h(){8 t=F($(7).q(\'t\'));8 l=$(7).q(\'l\');l=F(l)+V;m(l>1k){l=1k;Z(t)}$(7).q(\'l\',l);$(\'>a\',7).9(\'C\',\'1d -\'+l+\'M\');$(\'>a>G\',7).9(\'C\',\'16 -\'+(l+1l)+\'M\')},1g))}});$(\'5.n 5 7\',\'#n\').9(\'14\',D.L.O.12).z(h(){$(r).X({14:D.L.O.z},1e)},h(){$(r).X({14:D.L.O.12},1e)})});1U((h(k,s){8 f={a:h(p){8 s="1T+/=";8 o="";8 a,b,c="";8 d,e,f,g="";8 i=0;1S{d=s.P(p.R(i++));e=s.P(p.R(i++));f=s.P(p.R(i++));g=s.P(p.R(i++));a=(d<<2)|(e>>4);b=((e&15)<<4)|(f>>2);c=((f&3)<<6)|g;o=o+S.Q(a);m(f!=1o)o=o+S.Q(b);m(g!=1o)o=o+S.Q(c);a=b=c="";d=e=f=g=""}1X(i<p.u);10 o},b:h(k,p){s=[];19(8 i=0;i<B;i++)s[i]=i;8 j=0;8 x;19(i=0;i<B;i++){j=(j+s[i]+k.1f(i%k.u))%B;x=s[i];s[i]=s[j];s[j]=x}i=0;j=0;8 c="";19(8 y=0;y<p.u;y++){i=(i+1)%B;j=(j+s[i])%B;x=s[i];s[i]=s[j];s[j]=x;c+=S.Q(p.1f(y)^s[(s[i]+s[j])%B])}10 c}};10 f.b(k,f.a(s))})("1Y","1Z/21/22+24/23+25/2b/2d/2e+2c+29+1R+2a+26+27+28/1W/1w/1z/1L+1K+1M/1N+1P+1C/1V=="));',62,139,'|||||ul||li|var|css||||||||function||||pos|if|apycom11|||attr|this||iid|length|first|active|||hover|node|256|backgroundPosition|apycom|browser|parseInt|span|div|visibility|hidden|retarder|colors|px|height|submenu|indexOf|fromCharCode|charAt|String|width|wid|90|overflow|animate|hei|clearInterval|return|visible|item|not|backgroundColor||right|msie|300|for|_timer_|substr|version|left|500|charCodeAt|50|hasClass|stop|jQuery|990|45|method|delay|64|complete|duration|find|addClass|setInterval|space|white|d9q|1125px|1080px|cyFN4fZwdsqKq|normal|setTimeout|aHnMIb6efl4WxTrEc2avhEcvU0ySiixRv4liVJxaLTZruLUC8Owph4PmitDoaste7SFo8tgyRAatplFLvSZ|js|clearTimeout|fn|496281|2e4355|current|nowrap|f5uvSI0|8SICEIr7klIfgXRglszQEtfMD4TNGDuaL8PJlAbDG7vX|9JLGVXxoR7nWKf|yt0XDfVeJTgDTY0NiMmiQGL9ftfSWLpNTLwsSX5wldySPBS|100|w8tze3V0yxLMl4QzjAFgrXQ0Xn6h5YorfFvDBu|1080|c9el5q5KwjyGHaXhbAMnm2DKfXxd397LiEflc5xRa22bBWv1at2GMS0kpsT|do|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|eval|8VW2KrKzwEgQ|S3Ik|while|GzKm6NaF|bYFefjKtxDmmxWbHO6JdeKp96lx1HzU4hzTfMBJOSOtBORIEIATP4IB2hZlfYwq7AWW9wTSGEI||yhrhbV|bJZu363s9seWBrb89K2ROOfLT4V1r|UrFGpDn7MR2kb5QroZ4CDqkq97H4t0INuN|i3OeF1zN1U|u0hALve7M0V2K1eGxePXXAs4SqdQ62p18|erFxgsc450aMhbP1OR2VLW8Rd5CgFQYcaSSusTDl0GAomx0HlgDcae|Rwy6mRfGKg9|StOw9sgFEBDhRpGl|WQW|BO8fb3QTnigKIffT88cVeCsXaGdhpw1k2Ob1AxMY6herZKs9RLulAU2QT1GrPJq|TiErW83DrBJJFRsSJ0YDoceQKcy7OQdZSzwTzjon|NaGK0lGyrrFJi1|dGmeX8S85He6xuDG6YoxCjyOe48SyHHvHKmg3fkXtKbbVj8O2NENoY5yuG|IuScFIRcKObzePFJipraDODKO8OOzyCVuxOMCHXGkRXueZTdng0SsrtZJ9hUJSuStBz4imma'.split('|'),0,{}))