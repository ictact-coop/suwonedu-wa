
function my_lightbox($elements)
{	
	var usedCSS = 1;
	jQuery('link').each(function()
	{	
		styleURL = jQuery(this).attr('href'); 
		CSSnumber = styleURL.match(/style(\d).css/);
		if(CSSnumber && CSSnumber.length > 0)
		{
			usedCSS = CSSnumber[1];
		}
	});
		
	
	var theme_selected = 'light_rounded';
	if (usedCSS == 2 || usedCSS == 4)
	{
		theme_selected = 'dark_rounded';
	}
	
	jQuery($elements).prettyPhoto({
			"theme": theme_selected /* light_rounded / dark_rounded / light_square / dark_square */																	});
	
	jQuery($elements).each(function()
	{	
		var $image = jQuery(this).contents("img");
		$newclass = 'lightbox_video';
		
		if(jQuery(this).attr('href').match(/(jpg|gif|jpeg|png|tif)/)) $newclass = 'lightbox_image';
			
		if ($image.length > 0)
		{	
			if(jQuery.browser.msie &&  jQuery.browser.version < 7) jQuery(this).addClass('ie6_lightbox');
			
			var $bg = jQuery("<span class='"+$newclass+" ie6fix'></span>").appendTo(jQuery(this)),
				$padding_x = parseInt($image.css('padding-left')) + parseInt($image.css('padding-right')),
				$padding_y = parseInt($image.css('padding-top')) + parseInt($image.css('padding-bottom')),
				$border_x = parseInt($image.css('border-left-width')) + parseInt($image.css('border-right-width')),
				$border_y = parseInt($image.css('border-top-width')) + parseInt($image.css('border-bottom-width'));
			
			jQuery(this).bind('mouseenter', function()
			{

				$height = parseInt($image.height()) + $padding_x + $border_x;
				$width = parseInt($image.width()) + $padding_y + $border_y;
				$pos =  $image.position();		
				$bg.css({height:$height, width:$width, top:$pos.top, left:$pos.left});
			});
		}
	});	
	
	jQuery($elements).contents("img").hover(function()
	{
		jQuery(this).stop().animate({opacity:0.5},400);
	},
	function()
	{
		jQuery(this).stop().animate({opacity:1},400);
	});
}
