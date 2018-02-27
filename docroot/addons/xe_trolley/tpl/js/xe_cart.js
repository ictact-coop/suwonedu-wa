
function delCookie(name, path) {
	var expireDate = new Date();

	// 어제 날짜를 쿠키 소멸 날짜로 설정한다.
	expireDate.setDate(expireDate.getDate() - 1);
	document.cookie = name + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";

	document.cookie = name + "="
		+ ((path == null) ? "" : "; path=" + path)
		+ ""
		+ "; expires=Thu, 01-Jan-70 00:00:01 GMT";
}

jQuery(document).ready(function() {
	var r_prefix = jQuery("#r_prefix").val();
	var rc_name = r_prefix + 'Recent_item';
	var Chk_Itemsrl = getCookie(rc_name);

	if(Chk_Itemsrl) {
		var Chk_Itemsrls = Chk_Itemsrl.split(",");
		var Chk_Itemsrlp = Chk_Itemsrl.split(",");
		if(Chk_Itemsrlp.pop() == '') {
			Chk_Itemsrls.pop();
			// delCookie(rc_name);
			setCookie(rc_name, Chk_Itemsrls);
		}
	}

	setCookie('r_pagenum',1);

	r_load_recent();
});


// 최근본 상품 아이템 삭제
var item_number;
function delitem(item_number, type) {
	var r_prefix = jQuery("#r_prefix").val();
	var rc_name = r_prefix + 'Recent_item';
	var getRecent_item = getCookie(rc_name);
	var replace_1 = getRecent_item.replace(item_number+",",'');
	var replace_2 = replace_1.replace(item_number,'');
	var replace_3 = replace_2.split(',');
	var replace_r = replace_2.split(',');
	if(replace_r.pop() == '') {
		replace_3.pop();
	}

	// delCookie(rc_name);
	setCookie(rc_name, replace_3);
	setCookie('r_pagenum', 1);
	r_load_recent();
}


// Pagination
function r_arrow(type) {
	pagenum = parseInt(getCookie('r_pagenum'));

	if(type =='left') {
		pagenum = pagenum - 1;
		// delCookie('r_pagenum');
		setCookie('r_pagenum', pagenum);
		r_load_recent();
	} else if(type =="right") {
		pagenum = pagenum + 1;
		// delCookie('r_pagenum');
		setCookie('r_pagenum', pagenum);
		r_load_recent();
	}
}


function r_load_recent() {
	rp_num = parseInt(getCookie('r_pagenum'));
	r_pagenum = getCookie('r_pagenum');
	r_pagenum = r_pagenum * 4;
	r_divisionc = Math.ceil(r_pagenum / 4);
	r_pagenum = r_pagenum - r_divisionc;

	var r_prefix = jQuery("#r_prefix").val();
	var rc_name = r_prefix + 'Recent_item';
	var params = new Array();

	if(getCookie(rc_name)) {
		params['document_srls'] = getCookie(rc_name);
		params['image_width'] = q_thumb_w;
		params['image_height'] = q_thumb_h;
		var responses = ['error','message','data'];
		exec_xml('nproduct', 'getNproductItemInfos', params, function(ret_obj) {
			if(ret_obj['data']) {
				var data = ret_obj['data']['item_list']['item'];
				var items_count = data.length;
				var r_recent_length = Math.ceil(items_count / 3);

				if(rp_num > r_recent_length) {
					// delCookie('r_pagenum');
					setCookie('r_pagenum', 1);
					r_pagenum = getCookie('r_pagenum');
					r_pagenum = r_pagenum * 4;
					r_divisionc = Math.ceil(r_pagenum / 4);
					r_pagenum = r_pagenum - r_divisionc;
				}

				if(!jQuery.isArray(data)) {
					data = new Array(data);
				}

				total_page = Math.ceil(items_count / 3);

				data.reverse();
				

				jQuery.recent_list = jQuery("#q_box");
				jQuery.list = jQuery.recent_list.empty();
				jQuery.list.append('<ul class="q_box"></ul>');
				jQuery.fold = jQuery.recent_list.find(".q_box").empty();
				
				for(var p = r_pagenum - 3 ; p < r_pagenum; p++) {
					if(!data[p]) break;
					if(data[p].thumbnail_url) item_src = data[p].thumbnail_url;
				

					url = current_url.setQuery('document_srl',data[p].document_srl);

					item_name = data[p].item_name;
					if(item_name.length > 6) item_name = item_name.substr(0, 6)+"...";

					jQuery.fold.append('<li style="width:' + q_thumb_w + 'px; height:' + q_thumb_h +'px"><div class="box_off" onClick="delitem(\'' + data[p].document_srl + '\')"></div><a href="' + url + '"><img src="' + item_src + '"/></a></li>');

				}
				
				if(total_page > 1) {
					if(rp_num == 1) {
						jQuery.list.append('<div class="recent-pagination newclearfix"><span class="no-arrow left-arrow"></span><span class="recent-arrow right-arrow" onClick="r_arrow(\'right\')" ></span></div>');
					} else if(rp_num == total_page) {
						jQuery.list.append('<div class="recent-pagination newclearfix"><span class="recent-arrow left-arrow" onClick="r_arrow(\'left\')"></span><span class="no-arrow right-arrow"></span></div>');
					} else {
						jQuery.list.append('<div class="recent-pagination newclearfix"><span class="recent-arrow left-arrow" onClick="r_arrow(\'left\')"></span><span class="recent-arrow right-arrow" onClick="r_arrow(\'right\')"></span></div>');
					}
				}
			}
		}, responses);
	} else {
		jQuery.recent_list = jQuery("#q_box");
		jQuery.list = jQuery.recent_list.empty();
		jQuery.list.append('<span class="nothing"></span>');
	}

}