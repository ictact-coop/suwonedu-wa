CKEDITOR.editorConfig = function( config ) {
	config.extraPlugins = 'clipboard,pastetext,pastefromword,notification,notificationaggregator,widgetselection,widget,lineutils,embedbase,embed';
	config.embed_provider = '//ckeditor.iframe.ly/api/oembed?url={url}&callback={callback}';
};
