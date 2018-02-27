(function($){
	$(document).ready(function(){
		var disp_mod_type =  $('#display_menu_type').text();
		if(disp_mod_type=='ag') {
			mOpenTree();
		} else {
			var active_ul = $('.gymTree li a.active').parent().parent();
			var ap_depth = getMenuStrToNum($(active_ul).attr('class')); //ap_depth
			var atv_cat1srl = getMenu1Srl($(active_ul).children('li').children('.catsrls').text(), 0);
			var ap_li = $('.gymTree li a.active').parent('li');
			mOpenActiveChildNodes(ap_li);

			if(disp_mod_type=='sg') mOpenActiveParentNode(ap_depth, atv_cat1srl);
			else mOpenTree();
		}
		
		$('.gymTree .icon').click(function(){
			var cp = $(this).hasClass('plus');
			if(cp){
				$(this).parent().children('ul').slideDown();
				$(this).removeClass('plus').addClass('minus');
			} else {
				$(this).parent().children('ul').slideUp();
				var child_count =  $(this).parent().children('ul').size();
				if(parseInt(child_count) > 0) $(this).removeClass('minus').addClass('plus');
			}
		});

		$('#btn_mopen_all').click(function(){
			mOpenTree();
		});
		$('#btn_mclose_all').click(function(){
			mCloseTree();
		});
	});
	/**
	 * @brief :: set target blank
	**/
	function setMenuTargetBlank(){
		$('ul.gymful li a').each(function(i){
			var a_href = $(this).attr('href');
			if(a_href != '#') {
				$(this).attr('target', '_blank');
			}
		});
	}
	/**
	 * @brief :: open active childNodes
	**/
	function mOpenActiveChildNodes(ap_li){
		var child_count = $(ap_li).children('ul').size();
		if(parseInt(child_count)==1) {
			$(ap_li).children('a').removeClass('plus').addClass('minus');
			$(ap_li).children('ul').css('display','block');
			//$(ap_li).children('ul').slideDown();

			var cc_count = $(ap_li).children('ul').children('li').children('ul').size();
			if(parseInt(cc_count)==0){
				$(ap_li).children('ul').children('li').children('a').removeClass('plus').addClass('minus');
			}
		} else {
			$(ap_li).children('a').removeClass('plus').addClass('minus');
		}
	}

	/**
	 * @brief :: full search
	**/
	function mOpenActiveParentNode(ap_depth, atv_cat1srl){
		var tmp_atv_cat1srl;
		var obj_ul;
		var ul_depth;
		var ful_obj;
		var child_count;
		$('.gymTree ul li .catsrls').each(function(){
			tmp_atv_cat1srl = getMenu1Srl($(this).text(), 0);
			obj_ul = $(this).parent().parent();
			if(parseInt(tmp_atv_cat1srl) == parseInt(atv_cat1srl)) {
				ul_depth = getMenuStrToNum($(obj_ul).attr('class')); //obj depth
				if(ul_depth != '' && ul_depth != '') {
					if(parseInt(ap_depth) >= parseInt(ul_depth)) {
						$(obj_ul).css('display','block');
						$(obj_ul).parent().children('a').removeClass('plus').addClass('minus');
					} else {
						return false;
					}
				}
			}
		});
	}

	/**
	 * @brief ::
	**/
	function getMenuChildCount(obj){
		return $(obj).children('ul').size();
	}

	/**
	 * @brief ::
	**/
	function getMenuTagInfo(obj, t){
		if(t=='tag') return $(obj).get(0).tagName;
		else if(t=='id') return $(obj).get(0).id;
		else if(t=='class') return $(obj).get(0).className;
		else return false;
	}

	/**
	 * @brief ::
	**/
	function getMenu1Srl(srls, n){
		var arr_srls = srls.split('-');
		return arr_srls[n];
	}

	/**
	 * @brief ::
	**/
	function getMenuStrToNum(str){
		var regExp_num = /[^0-9]/gi;
		return str.replace(regExp_num,'');
	}

	/**
	 * @brief ::
	**/
	function mOpenTree(){
		$('.gymTree ul').css('display','block');
		$('.gymTree ul li a').removeClass('plus').addClass('minus');
	}	

	/**
	 * @brief ::
	**/
	function mCloseTree(){
		$('.gymTree ul ul').css('display','none');
		$('.gymTree ul li').each(function(){
			if(parseInt($(this).children('ul').size()) > 0) $(this).children('a').removeClass('minus').addClass('plus');
		})
	}

})(jQuery);