jQuery(function($){

// Main Menu
	var sMenu = $('ul#menu');
	var aItem = sMenu.find('>li>a');
	var spItem = sMenu.find('>li>a>span>.list_arrow');
	var sItem = sMenu.find('>li');
	var shItem = sMenu.find('>li.active');
	var sshItem = sMenu.find('>li.highlight');
	
	var ssItem = sMenu.find('li');
	var secondItem = sMenu.find('dra_depth1');
	var sshhItem = sMenu.find('>li>div');
	var secondUl = sMenu.find('>li>div>ul>li>ul');
	var aaItem = sshhItem.find('a');
	var LastLi = sMenu.find('li').last();
	var lastEvent = null;
	
	if (!shItem.hasClass('active')) {
		sItem.first().addClass('active highlight');
		};
	
	function sMenuSlide(){
		
		var t = $(this);
		
		t.next().children().find('li').removeClass('highlight');
		secondUl.stop(true,true).slideUp('fast').addClass('dra_list2');
		if (t.next().hasClass('dra_list1')) {
		spItem.stop(true,true).slideUp('fast');
		t.children().children('.list_arrow').css('display','block');
		sshhItem.stop(true,true).slideUp('fast').addClass('dra_list1');
		t.next('div').stop(true,true).slideDown('fast').removeClass('dra_list1');
		sItem.removeClass('highlight');
		t.parent('li').addClass('highlight');
		} else if(!t.next('div').length) {
		spItem.stop(true,true).slideUp('fast');
		sshhItem.stop(true,true).slideUp('fast').addClass('dra_list1');
		sItem.removeClass('highlight');
		t.parent('li').addClass('highlight');}
	}
	aItem.mouseover(sMenuSlide).focus(sMenuSlide);

		function HBhighlight(){
			var tt = $(this);
			
		tt.parent().parent().children('li').removeClass('highlight');
		tt.next('ul').children('li').removeClass('highlight');
		tt.parent('li').addClass('highlight');		
		if (tt.next().hasClass('dra_list2')) {
		tt.parent().parent().children().children('ul').stop(true,true).slideUp(50).addClass('dra_list2');
		tt.next('ul').stop(true,true).slideDown('fast').removeClass('dra_list2');
		} else if(!tt.next('ul').length) {
		tt.parent().parent().children().children('ul').stop(true,true).slideUp(50).addClass('dra_list2');
		}
			
	}
	aaItem.mouseover(HBhighlight).focus(HBhighlight);

	function slideUp_menu(){
		spItem.stop(true,true).slideUp('fast');
		sshhItem.stop(true,true).slideUp('fast').addClass('dra_list1');
		secondUl.stop(true,true).slideUp('fast').addClass('dra_list2');
		ssItem.removeClass('highlight');
		}
	sItem.mouseleave(slideUp_menu);

	function clear_sss(){

		if (!shItem.hasClass('highlight')) {
		sMenu.children('li').removeClass('highlight');
		shItem.addClass('highlight');
		}
		spItem.stop(true,true).slideUp('fast');
		sshhItem.stop(true,true).slideUp('fast').addClass('dra_list1');
		sMenu.children('li').removeClass('highlight');
		shItem.addClass('highlight');
		secondUl.stop(true,true).slideUp('fast').addClass('dra_list2');
		}
	sMenu.mouseleave(clear_sss);
	LastLi.focusout(clear_sss);


	
	var gMenu = $('div.total_menu');
    var gItem = gMenu.find('>div>ul>li');
    var ggItem = gMenu.find('>div>ul>li>ul>li');
    var lastEvent = null;
    function gMenuToggle(){
        var t = $(this);
        if (t.next('ul').is(':hidden') || t.next('ul').length == 0) {
            gItem.find('>ul').slideUp(200);
            gItem.find('button').removeClass('hover');
            t.next('ul').slideDown(200);
            t.addClass('hover');            
        } else {
        	gItem.find('>ul').slideUp(200);
            gItem.find('button').removeClass('hover');
        
        }; 
    };
    gItem.find('>button').click(gMenuToggle);

	var lMenu = $('div.wrap_Nav');
    var lItem = lMenu.find('>ul>li');
    var llItem = lMenu.find('>ul>li>ul>li');
    var lastEvent = null;
    function lMenuToggle(){
        var t = $(this);
        if (t.next('ul').is(':hidden') || t.next('ul').length == 0) {
            lItem.find('>ul').slideUp(200);
            lItem.find('button').removeClass('hover');
            t.next('ul').slideDown(200);
            t.addClass('hover');            
        } else {
        	lItem.find('>ul').slideUp(200);
            lItem.find('button').removeClass('hover');
        
        }; 
		$('.lnb_All').addClass('none_act_lnb');
    };
    lItem.find('>button').click(lMenuToggle);
	
	function AllLnbToggle(){
        var t = $(this);
        if (t.hasClass('none_act_lnb')) {
            lItem.find('>ul').slideDown(200);
            lItem.find('button').addClass('hover');
			t.removeClass('none_act_lnb');
        } else {
        	lItem.find('>ul').slideUp(200);
            lItem.find('button').removeClass('hover');
			t.addClass('none_act_lnb');
        }; 
		return false;
    };
	$('.lnb_All').click(AllLnbToggle);


	
});