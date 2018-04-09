jQuery(function($){
	$('#rd_prev .wrp').imagesLoaded(function(){
		$(this).css('margin-top',-$(this).height()/2+32)
	});
	$('#rd_next .wrp').imagesLoaded(function(){
		$(this).css('margin-top',-$(this).height()/2+32)
	});

// Viewer Toggle
	var v = $('#viewer_lst');
	$('#viewer_lst_tg,#viewer_lst .tg_close2').click(function(){
		if(v.hasClass('open')){
			v.animate({left:-455},{duration:750,specialEasing:{left:'easeInOutBack'}}).removeClass('open');
			$.cookie('viewer_lst_cookie',null)
		} else {
			v.animate({left:-100},{duration:500,specialEasing:{left:'easeOutBack'}}).addClass('open');
			$.cookie('viewer_lst_cookie','open')
		}
	});
	$('#viewer_lst_scroll').height(v.height()-132).imagesLoaded(function(){
		$(this).mCustomScrollbar({
			scrollButtons:{
				enable:true
			}
		})
	});
    function viewerResize(){
        $('#viewer_lst_scroll').height(v.height()-132).mCustomScrollbar('update')
    };
	$(window).resize(viewerResize);
});