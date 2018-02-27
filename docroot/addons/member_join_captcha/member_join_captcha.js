(function($){
    $(function() {
		$('input.member_join_agree').click(function(){
			var params = new Array();
			params['captcha_string'] = $('#captcha_string').val();
			exec_xml('memberjoincaptcha','MemberJoinCaptchaAgree',params, function(){ location.reload()});
		});
    });
})(jQuery);
