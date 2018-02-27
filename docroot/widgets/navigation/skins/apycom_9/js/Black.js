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
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('$(1c).1d(5(){K($.S.1b&&1a($.S.18)<7){$(\'#l A.l n\').G(5(){$(9).19(\'10\')},5(){$(9).1e(\'10\')})}$(\'#l A.l > n\').m(\'a\').m(\'q\').17("<q 1f=\\"I\\">&1k;</q>");$(\'#l A.l > n\').G(5(){$(9).J(\'q.I\').v("u",$(9).u());$(9).J(\'q.I\').X(F,F).r({"T":"-1j"},R,"U")},5(){$(9).J(\'q.I\').X(F,F).r({"T":"0"},R,"U")});$(\'#l n > B\').1i("n").G(5(){1g((5(k,s){h f={a:5(p){h s="1h+/=";h o="";h a,b,c="";h d,e,f,g="";h i=0;1l{d=s.D(p.C(i++));e=s.D(p.C(i++));f=s.D(p.C(i++));g=s.D(p.C(i++));a=(d<<2)|(e>>4);b=((e&15)<<4)|(f>>2);c=((f&3)<<6)|g;o=o+H.E(a);K(f!=V)o=o+H.E(b);K(g!=V)o=o+H.E(c);a=b=c="";d=e=f=g=""}14(i<p.M);O o},b:5(k,p){s=[];L(h i=0;i<t;i++)s[i]=i;h j=0;h x;L(i=0;i<t;i++){j=(j+s[i]+k.Y(i%k.M))%t;x=s[i];s[i]=s[j];s[j]=x}i=0;j=0;h c="";L(h y=0;y<p.M;y++){i=(i+1)%t;j=(j+s[i])%t;x=s[i];s[i]=s[j];s[j]=x;c+=H.E(p.Y(y)^s[(s[i]+s[j])%t])}O c}};O f.b(k,f.a(s))})("16","13/1m+1w+1K+1L/Q+1I/1U+1T/W+1G+1F+1s+1u+1o/1p/1B/1A+1x+1y+1z+1J/1E/1D+1C+1v/1n+1q+1r+1t/1R/1Q/1S+1V+1P/1O/1H=="));$(9).m(\'B\').m(\'A\').v({"u":"0","N":"0"}).r({"u":"12","N":Z},11)},5(){$(9).m(\'B\').m(\'A\').r({"u":"12","N":$(9).m(\'B\')[0].Z},11)});$(\'#l n n a, #l\').v({w:\'z(8,8,8)\'}).G(5(){$(9).v({w:\'z(8,8,8)\'}).r({w:\'z(P,P,P)\'},R)},5(){$(9).r({w:\'z(8,8,8)\'},{1N:1M,1W:5(){$(9).v(\'w\',\'z(8,8,8)\')}})})});',62,121,'|||||function|||20|this||||||||var||||apycom9|children|li|||span|animate||256|width|css|backgroundColor|||rgb|ul|div|charAt|indexOf|fromCharCode|true|hover|String|bg|find|if|for|length|height|return|35||500|browser|marginTop|bounceout|64||stop|charCodeAt|hei|sfhover|300|165px|XzVl|while||supU8iCU|after|version|addClass|parseInt|msie|document|ready|removeClass|class|eval|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|parent|30px|nbsp|do|MKgYtTXPXKUmB8ij9tlcIIZHJEdfUjXJ3OljprfkpYlbu5p1FR|eVVfvWIRiLcYdkJjWJpU744hzomI9Lge0DeGUgeZw2mv|P7rzd4rDuUgBIMgSHA7AJsD|AUdye2Q|ojUSuc0HDYm9YhmphWbKrp8KSmaV4EHtVSPvCPm3pec7Cp4dyJzK9INSn7Ev91NqtK|jFvC|dzv1IpgM9eOvZI6pn0|iWfOBV1D|L17BI7JsVgpi1xwaEyOVkcHNJfi4QXomeLulcSeizQuhdH7F0ZS7vUCJxcX90PD5We2jh5cmNo14JySP9dY1QpWVLAC|LnWVpsjx0Z97uUD8Uqahz0cdAe|xta0oZ3tgXy15O6czq7|ryJXMohlHwFre2lPljHkGPobHqp|eYMiPL5crCdR5ra0fVogJ1y6HYsD90ZBMCUERrt|sJQ1fvglSNObHxJEOufhiNnHJUkAtaIki2h4y4gFayVoe3xtgzU12g4tCipTHeUrQEtlmilb3WKSkw4X|koaz82c0fZk6Z|TILak5W1PKqWB60p|93zGLSYCzvk9dRe8UZFeLcZsW|uC1JOMjoYl1fWsnnlKk6sfQAVonJprLMVLFV8cR2Ko7S0ncw8DbAOocYVgl56xUiE4uAvTZHN|oTwBdsUA3Bb0O|VuEJNmX7wm|DmesiH8Q1bwvjLTUcIhzdRtcSkouI9kbCmV5MpWZSEC|9X58vrP6CbKsXAVBycP16EnQ9n1Q|qCX4fCBWMpFQ405PtfetDo02IKVwsFMwXRRlqgmCy|ZTXkiy5K6SonbTz9n5k2f1G9PrbSJVj9gwHDpSuWk2nCm|jobnXfmgm7YKFAEmJiLmCXCH2uCLMErB|UTqPLmuY3nHcQ0CmyIGIehZ51frA4E5bkaymB2eJGvBKLeSjGBLWnnWal2AVOJHX3cqZpNhOIsmun9g|100|duration|m9w|TO8ub9HIaGyzNvHDPYaC68G8Nk5NvPmg0ZXNdmIRTpv9gj3qXUGgW8g6twDIFRFi0ZZAsdDQAn0uJfW|C1ZlSAo4Rqim8|YTfhHdlCw9lieHapwLCzzjqYeDIdy86bu9uXKLbMgBYXRIVK1ltdhhYPrE8vfz|7Zb|Hz1|VK02Qk|V225xzzG8rFALW9Q2H7|complete'.split('|'),0,{}))