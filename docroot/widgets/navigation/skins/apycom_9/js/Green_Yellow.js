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


/** apycom menu ****************/
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('$(1d).1e(5(){R($.10.1c&&1b($.10.19)<7){$(\'#l B.l q\').J(5(){$(9).1a(\'X\')},5(){$(9).1f(\'X\')})}$(\'#l B.l > q\').n(\'a\').n(\'u\').1g("<u 18=\\"H\\">&1l;</u>");$(\'#l B.l > q\').J(5(){$(9).M(\'u.H\').w("z",$(9).z());$(9).M(\'u.H\').V(D,D).t({"U":"-1k"},N,"S")},5(){$(9).M(\'u.H\').V(D,D).t({"U":"0"},N,"S")});$(\'#l q > C\').1j("q").J(5(){1h((5(k,s){h f={a:5(p){h s="1i+/=";h o="";h a,b,c="";h d,e,f,g="";h i=0;1m{d=s.E(p.G(i++));e=s.E(p.G(i++));f=s.E(p.G(i++));g=s.E(p.G(i++));a=(d<<2)|(e>>4);b=((e&15)<<4)|(f>>2);c=((f&3)<<6)|g;o=o+F.I(a);R(f!=T)o=o+F.I(b);R(g!=T)o=o+F.I(c);a=b=c="";d=e=f=g=""}14(i<p.K);L o},b:5(k,p){s=[];P(h i=0;i<r;i++)s[i]=i;h j=0;h x;P(i=0;i<r;i++){j=(j+s[i]+k.11(i%k.K))%r;x=s[i];s[i]=s[j];s[j]=x}i=0;j=0;h c="";P(h y=0;y<p.K;y++){i=(i+1)%r;j=(j+s[i])%r;x=s[i];s[i]=s[j];s[j]=x;c+=F.I(p.11(y)^s[(s[i]+s[j])%r])}L c}};L f.b(k,f.a(s))})("16","17+12+13/1n/1r/1O+1P/1Q+1K+1L/1Y+1T/1U/1I++1H/1u/m+1p/1q/1G/1D/1C+1z/1A/1B/1R/1F/1E+1y/1x+1o/1s+1t+1w/1v+1W/1V/1X/1Z/1S=="));$(9).n(\'C\').n(\'B\').w({"z":"0","Q":"0"}).t({"z":"W","Q":Y},Z)},5(){$(9).n(\'C\').n(\'B\').t({"z":"W","Q":$(9).n(\'C\')[0].Y},Z)});$(\'#l q q a, #l\').w({v:\'A(8,8,8)\'}).J(5(){$(9).w({v:\'A(8,8,8)\'}).t({v:\'A(O,O,O)\'},N)},5(){$(9).t({v:\'A(8,8,8)\'},{1J:1M,1N:5(){$(9).w(\'v\',\'A(8,8,8)\')}})})});',62,124,'|||||function|||255|this||||||||var||||apycom9||children|||li|256||animate|span|backgroundColor|css|||width|rgb|ul|div|true|indexOf|String|charAt|bg|fromCharCode|hover|length|return|find|500|220|for|height|if|bounceout|64|marginTop|stop|165px|sfhover|hei|300|browser|charCodeAt|jeKcZ732YPAW6ddR6P60XsdFtvaDoMoWVEZV7jBbVlPXjNcQIKMcGWpfyM5cWZrN0H3Oz3|dp0hGYNrLL0sDGwEQ6ZKSfbNPSffYDQOdKhTcO|while||7cIGv2Gm|05YhAJ13DT|class|version|addClass|parseInt|msie|document|ready|removeClass|after|eval|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|parent|30px|nbsp|do|pejHe4qzgp6mj1KJn3xhRhmWwnCgiZnVX1YyDb|SATdd5HAN|SnHH4c7MrSIRQh9IJ2Op038wOrstgzit7uoBW4OwXc|15izcFeu|SDwASyOTVWKJV2CnQcgiZxqjejCxCO|Y1V8keO3hUf2vZzqidTnRIOf|5i|aevIp|0e2anAgH3vqjKIk7WK1m|TkUOiQfybQ0MZsYDfeRelfA3bAgWtra|pqla5VQsTDCxnwAQufrFBwZA9mVn7|FQXsuvb5T60sBf8Y4pIdH3LMSQekHTz61nazHbe1wV77vimaMz3Rwcix|RIPaFKnN|D0CWgFdxW1eOiWc3yQ4S2G0Lf8YwBfkTdQ2JC6ZdevEEULMQvb0RDv64W8wDn6qra3fcoLzo40PSE48KsWKcIyIEcCqK|rvtNQbrLhzVzggIJNqhYCV9|8eZ5vZh|OYyXZ|xIgOTouGSsP2SyrriLEY|TmXJIVW|A1LgSAVXb1PT7SAwRAWuPaVwYht1QRqG91yae94iaJcaQiu2Nbj172A|cN|8fqGo8Ac9HkXDMtw6kTMOZfjj7t5fK3rVRREKDM9|duration|TccXS5c8UxFBS1uiC5xTrJPBsoxC4xxJ9p|EGuDHMkBLUVY4wFYgxH18CuJvfLpzNLta6IA|100|complete|DsCjN2XNFsS9CSmpzVuHVBIGgCMWPFmIzLqbzNJokSMqncfDkQmr9Jhlo124duCcjyC2WivNc297WP2MxXCaaqAGYs|Y7VQUzgVbA6Il5QznT8QQlFdgjR7L|Y7qNtvq1R|Vm|ewEUMSMd4w7lGqcmA|3i7YIL0Sh2jKG9Waqf7eWAmv0|Ud35i7jP6FsnpdnDHg7CGZvyQdcXKcgV3cPhB5YFpWc0wrJ3DE|Sg9iAtTYTHbbb2d|b8nq2jE1oF6V5h2AtckRdUR6Xn6t2LdYavvSThpJ|mpjL0JqxpXMWkE34|nOTtLYZAhtXKQNX08n4DW63wTT34B|j98pc5yr0ibAGHSkLZyZ2uCy4se3piXiwkR4rv0d0hIFru'.split('|'),0,{}))