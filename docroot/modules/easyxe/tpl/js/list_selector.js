(function($){
	$(function(){
		$('#memberList tbody>tr>td, #documentListTable tbody>tr>td, #commentListTable tbody>tr>td, #fileListTable tbody>tr>td').click(function(e){
			if(e.target.nodeName == 'TD')
			{
				$(this).parent().find('input[type=checkbox]').click();
			}
		});
	});
})(jQuery);