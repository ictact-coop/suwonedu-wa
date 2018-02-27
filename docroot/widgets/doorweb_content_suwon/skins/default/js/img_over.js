// <![CDATA[
(function($){
jQuery(function($){
	 $(".over_rep").hover(
	  function () {
		$(this).children().children().children('span.DWRep').fadeIn("fast");
	}, 
	  function () {
		$(this).children().children().children('span.DWRep').fadeOut("fast");
	  }
	);
});
})(jQuery);
// ]]>