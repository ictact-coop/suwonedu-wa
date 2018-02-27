(function($){
	$(function(){
		// 레이아웃 선택 시
		$('#source_layout').change(function(){
			var sourceLayout = $(this).val();

			$('#usingModule>table>tbody').empty();

			$.exec_json('easyxe.getEasyxeAdminLayoutUsingModule', { type : xe.layoutType, layout_srl : sourceLayout }, completeGetLayoutUsingModule);
		});

		function completeGetLayoutUsingModule(data)
		{
			var moduleCount = data.module_list.length;

			for(var i=0;i<moduleCount;i++)
			{
				var tr = $('<tr>');
				tr.append('<td>' + data.module_list[i].module + '</td>');
				tr.append('<td>' + data.module_list[i].mid + '</td>');
				tr.append('<td>' + data.module_list[i].browser_title + '</td>');
				$('#usingModule>table>tbody').append(tr);
			}
		}
	});
})(jQuery);