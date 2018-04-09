// Board
function board(){
jQuery(function($){
// Login
	if(loginNo){
		$('#bd a.bd_login').click(function(){
			if(confirm(loginLang)) window.location.href = loginUrl;
			return false
		})
	};

// Category Navigation
	var cnb = $('#bdCnb');
	var cMore = $('#cnbMore');
    var cItem = cnb.find('>ul>li');
    var lastEvent = null;
    function cnbToggle(){
        var t = $(this);
        if(t.next('ul').is(':hidden') || t.next('ul').length==0){
            cItem.find('>ul').fadeOut(100);
            t.next('ul').fadeIn(200);
        }
    };
    function cnbOut(){
        cItem.find('ul').fadeOut(100)
    };
    cItem.find('>a').mouseover(cnbToggle).focus(cnbToggle);
    cItem.mouseleave(cnbOut);
	cItem.find('>ul').each(function(){
		var t = $(this);
		t.append('<i class="edge"></i>');
		if($.browser.msie && $.browser.version<9) t.prepend('<i class="ie8_only bl"></i><i class="ie8_only br"></i>');
		if(t.width() > $('html,body').width()-t.offset().left){
			t.addClass('flip')
		};
	});
	cItem.find('>ul>li.on').parents('ul:first').show().prev().addClass('on');
	$('#bd .cTab>li>ul>li.on_').parents('li:first').addClass('on');
    function cnbStart(){
		// If Overflow
		cItem.each(function(){
			if($(this).offset().top!=cMore.offset().top){
				$(this).addClass('hidden').nextAll().addClass('hidden');
				cMore.css('visibility','visible')
				return false
			} else {
				$(this).removeClass('hidden').nextAll().removeClass('hidden');
				cMore.css('visibility','hidden')
			}
		});
		cnb.find('>.bg_f_f9').css('overflow','visible');
	};
	cnbStart();
	$(window).resize(cnbStart);
	function cnbMore(){
		cnb.toggleClass('open').find('.ui-icon').toggleClass('ui-icon-triangle-1-s').toggleClass('ui-icon-triangle-1-n');
		return false
	};
	if((cnb.find('.hidden a,.hidden li').hasClass('on')) && !cnb.hasClass('open')){
		cnbMore()
	};
	cMore.click(cnbMore);

// Speech Bubble
	if(bdBubble==undefined){
		$('#bd a.bubble').hover(function(){
			var t = $(this);
			if(!t.hasClass('no_bubble') && !t.find('.wrp').length){
				t.append('<span class="wrp"><span class="speech">'+t.attr('title')+'</span><i class="edge"></i></span>').removeAttr('title');
				if($('html,body').width()-t.offset().left < 80){
					t.addClass('left').find('.wrp').css({marginTop:t.parent('.wrp').height()/2})
				} else if(t.offset().top < 80 && !t.parent().parent().hasClass('rd_nav_side')){
					t.addClass('btm').find('.wrp').css({marginLeft:-t.find('.wrp').width()/2})
				} else {
					t.find('.wrp').css({marginLeft:-t.find('.wrp').width()/2})
				};
				if($.browser.msie && $.browser.version<9) t.find('.wrp').prepend('<i class="ie8_only bl"></i><i class="ie8_only br"></i>');
			};
			if($.browser.msie && $.browser.version<9) return;
			if(t.is('.left,.right,.btm')){
				t.find('.wrp:hidden').fadeIn(150)
			} else {
				t.find('.wrp:hidden').css('bottom','150%').animate({
					bottom:'100%'
				},{duration:150,specialEasing:{left:'easeInOutQuad'},complete:function(){
					},step:null,queue:false
				}).fadeIn(150)
			}
		},function(){
			if($.browser.msie && $.browser.version<9) return;
			$(this).find('.wrp').fadeOut(100)
		})
	};

// Nanum Font
	if($('#fontcheck_np1').width()==$('#fontcheck_np2').width()){
		$('#bd').removeClass('use_np');
		$.cookie('use_np',null)
	} else {
		$('#bd').addClass('use_np');
		$.cookie('use_np','use_np')
	};
	function installfontOut(){
		$('#install_ng2').fadeOut();
		$('.bd_font .select').focus();
		return false
	};
	$(document).keydown(function(event){
		if($('#install_ng2').is(':visible')) {
			if(event.keyCode!=27) return true;
			return installfontOut()
		}
	});
	$('#install_ng2 .tg_close2,#install_ng2 .close').click(installfontOut);
	$('#install_ng2 .tg_blur2').focusin(installfontOut);
	$('#bd .bd_font li a').click(function(){
		var p = $(this).parent();
		if(p.hasClass('ng') && $('#fontcheck_ng3').width()==$('#fontcheck_ng4').width()){
			$('#install_ng2').fadeIn().find('.tg_close2').focus()
		} else {
			var pC = p.attr('class');
			if(p.hasClass('ui_font')){
				$.cookie('bd_font',null)
			} else {
				$.cookie('bd_font',''+pC+'')
			};
			$('.bd,.bd input,.bd textarea,.bd select,.bd button,.bd table').removeClass('ui_font ng window_font tahoma').addClass(pC);
			p.addClass('on').siblings('.on').removeClass('on');
			$('.bd_font .select strong').text($(this).text())
		};
		return false
	});

// sketchbook's Toggle2 (Original : XE UI)
	var tgC2 = $('#bd .tg_cnt2');
	$('#bd .tg_btn2').click(function(){
		var t = $(this);
		var h = t.attr('href');
		if(t.next(h).is(':visible')){
			t.focus().next().fadeOut(200)
		} else {
			tgC2.filter(':visible').hide();
			t.after($(h)).next().fadeIn(200).css('display','block').find('a,input,button:not(.tg_blur2),select,textarea').eq(0).focus()
		};
		return false
	});
	function tgClose2(){
		var closeId = tgC2.filter(':visible').attr('id');
		tgC2.fadeOut(200).prev('[href="#'+closeId+'"]').focus()
	};
	$(document).keydown(function(event){
		if(event.keyCode != 27) return true; // ESC
		return tgClose2()
	});
	tgC2.mouseleave(tgClose2);
	$('#bd .tg_blur2').focusin(tgClose2);
	$('#bd .tg_close2,#install_ng2 .close').click(tgClose2);

// Form Label Overlapping
	$('#bd .itx_wrp label').next()
		.focus(function(){
			$(this).prev().css('visibility','hidden');
		})
		.blur(function(){
			if($(this).val()==''){
				$(this).prev().css('visibility','visible');
			} else {
				$(this).prev().css('visibility','hidden');
			}
		});
	// IE8 Fix;
	if($.browser.msie && $.browser.version<9){
		$('#guestbook .itx_wrp label').click(function(){
			$(this).next().focus()
		})
	};

// Scroll
	$('a.back_to').click(function(){
		$('html,body').animate({scrollTop:$($(this).attr('href')).offset().top},{duration:1000,specialEasing:{scrollTop:'easeInOutExpo'}});
		return false
	});

// Search
	var srchWindow = $('#faq_srch');
	$('#bd a.show_srch').click(function(){
		if(srchWindow.is(':hidden')){
			srchWindow.fadeIn().find('.itx').focus()
		} else {
			srchWindow.fadeOut();
			$(this).focus()
		};
		return false
	});
	$('#bd_srch_btm_itx').focus(function(){
		$('#bd_srch_btm .itx_wrp').animate({width:140},{duration:1000,specialEasing:{width:'easeOutBack'}}).parent().addClass('on')
	});

// Imagesloaded
	$('#bd .bd_lst.img_load .tmb').each(function(){
		$(this).imagesLoaded(function(){
			$(this).parent().addClass('fin_load').fadeIn(250)
		})
	});
	$('#bd .bd_lst.img_load2 .tmb').each(function(){
		$(this).imagesLoaded(function(){
			$(this).fadeIn().parent().addClass('fin_load2')
		})
	});

// Gallery hover effect
	$('#bd .info_wrp').hover(function(){
		var t = $(this);
		var st = t.find('.info.st,.info.st1');
		var tL = $('#tmb_lst');
		if(tL.hasClass('tmb_bg3')){
			st.animate({opacity:.8},200)
		} else {
			if($.browser.msie && $.browser.version<9){
				st.animate({opacity:.7},200)
			} else {
				st.animate({opacity:1},200)
			}
		};
		t.find('.info').animate({top:0,left:0},200)
	},
	function(){
		var t = $(this);
		t.find('.info.st,.info.st1').animate({opacity:0},200);
		t.find('.info.st2').animate({top:'-100%'},200);
		t.find('.info.st3').animate({left:'-100%'},200);
		t.find('.info.st4').animate({top:'-100%',left:'-100%'},200)
	});

// With Viewer
	var wView = $('#viewer_with');
	wView.click(function(){
		if(wView.hasClass('on')){
			$.cookie('cookie_viewer_with','N');
			wView.removeClass('on')
		} else {
			$.cookie('cookie_viewer_with','Y');
			wView.addClass('on')
		};
		return false
	});
	$('#bd .bd_lst a.hx').click(function(){
		if($('#viewer_with.rd_viewer').hasClass('on')){
			window.open(''+$(this).attr('data-viewer')+'','viewer','width=9999,height=9999,scrollbars=yes,resizable=yes,toolbars=no');
			return false
		} 
	});

// List Viewer
	if(lstViewer){
		$('#bd .bd_lst a.hx').append('<button class="bg_color" title="'+viewerTx+'">Viewer</button>');
		$('#bd .bd_lst a.hx button').click(function(){
			window.open(''+$(this).parent().attr('data-viewer')+'','viewer','width=9999,height=9999,scrollbars=yes,resizable=yes,toolbars=no');
			return false
		})
	};

// Read Page Only
if($('#bd div.rd').length || default_style=='guest'){
	// Prev-Next
	function rdPrev(){
		var a = $('#rd_prev .wrp');
		$(this).append(a).attr('href',$('#rd_prev').attr('href'));
		a.css({marginLeft:-a.width()/2})
	};
	$('#bd a.rd_prev').mouseover(rdPrev).focus(rdPrev);
	function rdNext(){
		var a = $('#rd_next .wrp');
		$(this).append(a).attr('href',$('#rd_next').attr('href'));
		a.css({marginLeft:-a.width()/2})
	};
	$('#bd a.rd_next').mouseover(rdNext).focus(rdNext);
	$(document).keydown(function(event){
		var p = $('#rd_prev');
		var n = $('#rd_next');
		// fixed for 'prettyphoto' addon
		if(!$('div.pp_overlay').length){
			if(event.keyCode==37 && p.length){
				window.location.href = p.attr('href')
			} else	if(event.keyCode==39 && n.length){
				window.location.href = n.attr('href')
			} else 	if(event.keyCode==27 && $('#viewer').length){
				self.close()
			} else {
				return true
			}
		}
	});
	$('#comment,textarea,input,select').keydown(function(event){
		event.stopPropagation()
	});

	// Comment, Trackback
	$('#rd_trb a').click(function(){
		$(this).parent().next('.fdb_lst').slideToggle();
		return false
	});

	// Hide : et_vars, prev_next
	$('#bd .fdb_hide,#bd .rd_file.hide,#bd .fdb_lst .cmt_files').hide();
	if($('#bd .rd table.et_vars th').length) $('#bd .rd table.et_vars').show();
	if(!$('#rd_prev').length) $('#bd a.rd_prev').hide();
	if(!$('#rd_next').length) $('#bd a.rd_next').hide();

	// Read Navi
	$('#bd .print_doc').click(function(){
		if($(this).hasClass('this')){
			print()
		} else {
			window.open(this.href,'print','width=860,height=999,scrollbars=yes,resizable=yes').print()
		};
		return false
	});
	$('#bd .font_plus').click(function(){
		var c = $('#bd .xe_content');
		var font_size = parseInt(c.css('fontSize'))+1;
		c.css('font-size',''+font_size+'px');
		return false
	});
	$('#bd .font_minus').click(function(){
		var c = $('#bd .xe_content');
		var font_size = parseInt(c.css('fontSize'))-1;
		c.css('font-size',''+font_size+'px');
		return false
	});

	// File Type
	if(bdFiles_type){
		if($('#bd .rd_file li').length==0){
			$('#bd .rd_file,#bd .rd_nav .file').hide()
		} else {
			if(default_style!='blog'){
				$('#bd .rd_file strong b').text($('#bd .rd_file li').length);
			} else {
				$('#bd .rd_file strong b').text($(this).parents('.rd').find('.rd_file li').length);
			}
		}
	};

	// Content Images
	if(bdImg_opt) $('#bd .xe_content img').draggable();
	if(bdImg_link==undefined){
		$('#bd .xe_content img').click(function(){
			window.location.href=$(this).attr('src')
		})
	};

	// Side Navi Scoll
	if(rd_nav_side==undefined && default_style!='guest'){
		$(window).scroll(function(){
			var sT = $(this).scrollTop();
			var o = $('#bd div.rd_nav_side .rd_nav');
			if((sT > $('#bd div.rd_body').offset().top) && (sT < $('#bd hr.rd_end').offset().top-$(this).height())){
				o.fadeIn()
			} else {
				o.fadeOut()
			}
		})
	};

	// To SNS
	$('#bd .to_sns a.twitter').snspost({type:'twitter'});
	$('#bd .to_sns a.me2day').snspost({type:'me2day'});
	$('#bd .to_sns a.facebook').snspost({type:'facebook'});
	$('#bd .to_sns a.yozm').snspost({type:'yozm'});

	// Editor
	var simpleWrt = $('#bd .simple_wrt textarea');
	var simpleWrt2 = $('#bd .cmt_wrt textarea');
	simpleWrt.each(function(){
		editorStartTextarea($(this).attr('id').split('_')[1],'content','comment_srl')
	});
	simpleWrt.focus(function(){
		$(this).parent().parent().next().slideDown()
	});
	simpleWrt.autoGrow();
	if(default_style!='blog' && default_style!='guest'){
		simpleWrt2.val($.cookie('socialxe_content'));
		simpleWrt2.bind('change',function(){
			$.cookie('socialxe_content',$(this).val())
		}).parents('form.cmt_wrt').find('.btn').click(function(){
			$.cookie('socialxe_content',null)
		})
	}
};
})
};
board();

function reComment(doc_srl,cmt_srl,edit_url){
	var fdbItm = jQuery('#comment_'+cmt_srl);
	var o = jQuery('#re_cmt');
	if(default_style=='guest' || default_style=='blog') o.find('input[name=document_srl]').val(doc_srl);
	o.appendTo(fdbItm).fadeIn().find('input[name=parent_srl]').val(cmt_srl).parent().find('a.wysiwyg').attr('href',edit_url);
	o.find('textarea').focus();
};

// To SNS
(function($){
	$.fn.snspost = function(opts) {
		var loc = '';
		var rdSnsPost = $(this).parents('.rd').find('.rd_hd h1').text();
		var rdSnsLink = $(this).parents('.rd').find('.rd_hd').attr('data-url')+'?l='+lang_type;
		opts = $.extend({}, {type:'twitter', event:'click'}, opts);
		opts.content = encodeURIComponent(rdSnsPost);
		switch(opts.type) {
			case 'me2day':
				loc = 'http://me2day.net/posts/new?new_post[body]="'+opts.content+'":'+rdSnsLink;
				if (opts.tag) loc += '&new_post[tags]='+encodeURIComponent(opts.tag);
				break;
			case 'facebook':
				loc = 'http://www.facebook.com/share.php?t='+opts.content+'&u='+encodeURIComponent(rdSnsLink);
				break;
			case 'yozm':
				loc = 'http://yozm.daum.net/api/popup/prePost?sourceid=0&link='+encodeURIComponent(rdSnsLink)+'&prefix='+opts.content;
				break;
			case 'twitter':
			default:
				loc = 'http://twitter.com/home?status='+opts.content+' '+rdSnsLink;
				break;
		}
		this.bind(opts.event, function(){
			window.open(loc);
			return false;
		});
	};
	$.snspost = function(selectors, action) {
		$.each(selectors, function(key,val) {
			$(val).snspost( $.extend({}, action, {type:key}) );
		});
	};
})(jQuery);

/*!
 * Autogrow Textarea Plugin Version v2.0
 * http://www.technoreply.com/autogrow-textarea-plugin-version-2-0
 *
 * Copyright 2011, Jevin O. Sewaruth
 *
 * Date: March 13, 2011
 */
jQuery.fn.autoGrow=function(){return this.each(function(){var c=this.cols;var b=this.rows;var d=function(){e(this)};var e=function(j){var h=0;var f=j.value.split("\n");for(var g=f.length-1;g>=0;--g){h+=Math.floor((f[g].length/c)+1)}if(h>=b){j.rows=h+1}else{j.rows=b}};var a=function(g){var f=0;var j=0;var i=0;var h=g.cols;g.cols=1;j=g.offsetWidth;g.cols=2;i=g.offsetWidth;f=i-j;g.cols=h;return f};this.style.height="auto";this.style.overflow="hidden";this.onkeyup=d;this.onfocus=d;this.onblur=d;e(this)})};

/*!
 * jQuery imagesLoaded plugin v2.1.0
 * http://github.com/desandro/imagesloaded
 *
 * MIT License. by Paul Irish et al.
 */

/*jshint curly: true, eqeqeq: true, noempty: true, strict: true, undef: true, browser: true */
/*global jQuery: false */
(function(c,n){var l="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";c.fn.imagesLoaded=function(f){function m(){var b=c(i),a=c(h);d&&(h.length?d.reject(e,b,a):d.resolve(e));c.isFunction(f)&&f.call(g,e,b,a)}function j(b,a){b.src===l||-1!==c.inArray(b,k)||(k.push(b),a?h.push(b):i.push(b),c.data(b,"imagesLoaded",{isBroken:a,src:b.src}),o&&d.notifyWith(c(b),[a,e,c(i),c(h)]),e.length===k.length&&(setTimeout(m),e.unbind(".imagesLoaded")))}var g=this,d=c.isFunction(c.Deferred)?c.Deferred():
0,o=c.isFunction(d.notify),e=g.find("img").add(g.filter("img")),k=[],i=[],h=[];c.isPlainObject(f)&&c.each(f,function(b,a){if("callback"===b)f=a;else if(d)d[b](a)});e.length?e.bind("load.imagesLoaded error.imagesLoaded",function(b){j(b.target,"error"===b.type)}).each(function(b,a){var d=a.src,e=c.data(a,"imagesLoaded");if(e&&e.src===d)j(a,e.isBroken);else if(a.complete&&a.naturalWidth!==n)j(a,0===a.naturalWidth||0===a.naturalHeight);else if(a.readyState||a.complete)a.src=l,a.src=d}):m();return d?d.promise(g):
g}})(jQuery);

/*!
 * jQuery Cookie Plugin
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function(a){a.cookie=function(g,f,k){if(arguments.length>1&&(!/Object/.test(Object.prototype.toString.call(f))||f===null||f===undefined)){k=a.extend({},k);if(f===null||f===undefined){k.expires=-1}if(typeof k.expires==="number"){var h=k.expires,j=k.expires=new Date();j.setDate(j.getDate()+h)}f=String(f);return(document.cookie=[encodeURIComponent(g),"=",k.raw?f:encodeURIComponent(f),k.expires?"; expires="+k.expires.toUTCString():"",k.path?"; path="+k.path:"",k.domain?"; domain="+k.domain:"",k.secure?"; secure":""].join(""))}k=f||{};var b=k.raw?function(i){return i}:decodeURIComponent;var c=document.cookie.split("; ");for(var e=0,d;d=c[e]&&c[e].split("=");e++){if(b(d[0])===g){return b(d[1]||"")}}return null}})(jQuery);