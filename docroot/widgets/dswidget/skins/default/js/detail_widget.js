jQuery(document).ready(function($){	$(".showDetailWidget").click(function(){	var ori_width = $(".detailBoxWidget").width();		if($(".detailBoxWidget").css('display')=='block'){			$(".detailBoxWidget").animate({"top": '0px'},"fast");			$(".detailBoxWidget").animate({"left": '0px'},"fast");			setTimeout($(".detailBoxWidget").hide(),100);		}else{			$(".detailBoxWidget").show();			$(".detailBoxWidget").animate({"top": ($(this).offset().top + 30)+'px' , "left": ($(this).offset().left - ori_width) +'px'},"fast");			$(".detailBoxWidget").animate({"width": ori_width +'px'},"fast");		}	});});function checkMenuItemSrlsWidget(){	jQuery(function($){		var menu_item_srls = '';		$(".menu_item_srls_widget").each(function(){			if($(this).is(":checked")){			if(menu_item_srls != '') menu_item_srls += ',';			menu_item_srls += $(this).val();			}		});		$('input[type=hidden][name=menu_item_srls]').val(menu_item_srls);		return true;	});}