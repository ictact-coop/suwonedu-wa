jQuery(function($){
	$("#contact_table input.text,#contact_table input.date,#contact_table input.tel,#contact_table textarea").bind("focus", function(){
		$(this).css({"border-color":"#acb8fc"});
	}).bind("blur",function(){
		$(this).css({"border-color":"#cccccc"});
	});

	$('form#form_contact').submit(function(){
		// add phone number together
		if($('input.tel').length>0){
			var phone_number = "";
			$('input.tel').each(function(index,value){
				phone_number += $(this).attr('value') + " ";
			});
			$('input.tel').last().attr('value',phone_number);
		}
	});
});