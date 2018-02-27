(function($){
	function getOffset( el ) {
		var _x = 0;
		var _y = 0;
		while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
			_x += el.offsetLeft - el.scrollLeft;
			_y += el.offsetTop - el.scrollTop;
			el = el.offsetParent;
		}
		return { top: _y, left: _x };
	}

	$(function(){
		$('section.section').css('position', 'relative');
		$('section.section>h1,section.section>h2').after('<div class="sectionNavigator x_btn-group x_btn-group-vertical" style="position:absolute;right:-60px;top:0"><button type="button" class="x_btn" data-action="prev"><i class="fa fa-angle-up"></i></button><button type="button" class="x_btn" data-action="next"><i class="fa fa-angle-down"></i></button></div>');
		$('.sectionNavigator button').click(function(e){
			var action = $(this).data('action');
			switch(action)
			{
				case 'prev':
					var prevObj = $(this).parent().parent().prev();
					if(prevObj.length > 0)
					{
						var targetY = (prevObj.offset().top);
		
						$('html, body').animate({ scrollTop : targetY });
					}
					break;
				case 'next':
					var nextObj = $(this).parent().parent().next();
					if(nextObj.length > 0)
					{
						var targetY = (nextObj.offset().top);
						$('html, body').animate({ scrollTop : targetY });
						break;
					}
			}
			e.preventDefault();
		});
	});
})(jQuery);