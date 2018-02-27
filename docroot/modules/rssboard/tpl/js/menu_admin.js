function insertSelectedModule(id, module_srl, mid, browser_title) {
    var obj= xGetElementById('_'+id);
    var sObj = xGetElementById(id);
    sObj.value = module_srl;
    obj.value = decodeURIComponent(browser_title.replace(/\+/g," "))+' ('+mid+')';
    var category = xGetElementById('category_srl');
    getCategoryList(module_srl);
}

function completeRssboardInsert(ret_obj) {
	alert(ret_obj['message']);
	location.href=current_url.setQuery('act','dispRssboardAdminContent');
}

function doDeleteRssboard(rssboard_srl) {
	var fo_obj = jQuery("#fo_delete")[0];
	if(!fo_obj) return;
    fo_obj.rssboard_srl.value = rssboard_srl;
    procFilter(fo_obj, rss_delete);
}

function completeDeleteRssboard(ret_obj) {
	alert(ret_obj['message']);
	location.href=current_url.setQuery('act','dispRssboardAdminContent');
}

function getCategoryList(module_srl)
{
    jQuery.getJSON("?module=rssboard&act=dispRssboardCategoryList",{module_srl:module_srl},function(data)
	{
	    jQuery("#category_srl").val("");
	    
	    if (data.categories)
	    {
		jQuery.each(data.categories, function(i,item)
		    {
			jQuery("#category_srl").append("<option value='" + item.category_srl + "'>" + item.title + "</option>");
		    }
		);
	    }
	    else
	    {
		jQuery("#category_srl").val("<option value=''></option>");
	    }
	}
    );

}