function doAddHtmlCode()
{
	var editorObj = editorGetIFrame(module_srl);
	var content = jQuery('#htmlCode').val();

	editorReplaceHTML(editorObj, content);

	jQuery('#htmlInsertLayer').data('anchor').trigger('close.mw')
}