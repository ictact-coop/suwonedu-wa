jQuery(function($){
window.xeLevelNotifyMessage = function(text,url){
	jQuery(function($){
		$("div.message.info").remove();
		$("body").prepend('<div class="modal fade message_alert"><div class="modal-header"><h4>New Message<button class="close" onclick="jQuery(\'.message_alert.modal\').modal(\'hide\');">&times;</button></h4></div><div class="modal-body">'+message+'</div><div class="modal-footer"><a href="'+messageurl+'" onclick="jQuery(\'.message_alert.modal\').modal(\'hide\');" class="btn btn-primary">Yes</a><button class="btn btn-primary" onclick="jQuery(\'.message_alert.modal\').modal(\'hide\');">No</button></div></div>');
		$(".message_alert.modal").modal("show");
	});
};
xeLevelNotifyMessage(message,messageurl);
});
