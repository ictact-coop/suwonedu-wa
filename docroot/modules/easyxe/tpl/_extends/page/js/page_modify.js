
var selectedNode;

// 잘라내기/복사 시 객체가 저장 될 임시저장소
var easyxeClipboard;
var easyxeLastCommand;
(function($){
	$(function(){
		$('#zonePageContent>.widgetOutput, #zonePageContent>.widgetOutput>.widgetBoxBorder>.nullWidget>.widgetOutput').jeegoocontext('menu_1', {
			onShow : function(e, context)
			{
			},
			// 메뉴 선택
			onSelect : function(e, context)
			{
				if($(e.currentTarget).hasClass('disabled'))
				{
					return false;
				}

				switch($(this).data('cmd'))
				{
					// 잘라내기
					case 'cut':
						easyxeClipboard = context;
						easyxeLastCommand = 'cut';
						$('#menu_1 li[data-cmd=paste]').removeClass('disabled');
						$(context).remove();
						break;
					// 복사
					case 'copy':
						easyxeClipboard = context;
						easyxeLastCommand = 'cut';
						$('#menu_1 li[data-cmd=paste]').removeClass('disabled');
						break;
					// 복사해서 앞에 붙여넣기
					case 'clone_before':
						idStep++;
						var cloneElement = $(context).clone().attr('id', 'widget_' + idStep);
						cloneElement.insertBefore($(context));
						break;
					// 복사해서 뒤에 붙여넣기
					case 'clone_after':
						idStep++;
						var cloneElement = $(context).clone().attr('id', 'widget_' + idStep);
						cloneElement.insertAfter($(context));
						break;
					// 붙여넣기
					case 'paste':
						// 클립보드에 요소가 저장되어 있다면
						if(easyxeClipboard)
						{
							var widget = easyxeClipboard.getAttribute('widget');

							// 상자 위젯을 상자 위젯 안에 넣는다면
							if(widget == 'widgetBox' && context.getAttribute('widget') == 'widgetBox')
							{
								alert('상자 위젯 안에 상자 위젯을 넣을 수 없습니다.');
								return false;
							}

							// 상자 위젯이 아닌 곳에 넣으려고 한다면
							if(context.getAttribute('widget') != 'widgetBox')
							{
								alert('상자 위젯 안에만 붙여넣을 수 있습니다.');
								return false;
							}

							// 직접 추가된 내용이라면
							if(widget == 'widgetContent' && easyxeClipboard.getAttribute('document_srl') && easyxeLastCommand == 'copy')
							{
								var response_tags = ['error','message','document_srl'];
								var params = [];
								params.document_srl = easyxeClipboard.getAttribute('document_srl');
								exec_xml('widget','procWidgetCopyDocument', params, completeCopyWidgetContent, response_tags, params, p_obj);
							}
							else
							{
								var dummy = xCreateElement("DIV");
								xInnerHtml(dummy,xInnerHtml(easyxeClipboard));

								dummy.widget_sequence = '';
								dummy.className = "widgetOutput";
								for(var i=0;i<easyxeClipboard.attributes.length;i++) {
									if(!easyxeClipboard.attributes[i].nodeName || !easyxeClipboard.attributes[i].nodeValue) continue;
									var name = easyxeClipboard.attributes[i].nodeName.toLowerCase();

									var value = easyxeClipboard.attributes[i].nodeValue;
									if(!value) continue;

									if(value && typeof(value)=="string") value = value.replace(/\"/ig,'&quot;');

									dummy.setAttribute(name, value);
								}

								idStep++;
								dummy.setAttribute('id', 'widget_' + idStep);

								if(xIE4Up) dummy.style.cssText = easyxeClipboard.style.cssText;

								$(context)
									.find('.widgetBoxBorder')
										.find('.nullWidget')
											.append(dummy);
							}

							// 잘라내기 후 붙여넣기를 했다면
							if(easyxeLastCommand != 'copy')
							{
								// 붙여넣기 메뉴 비활성화
								$('#menu_1 li[data-cmd=paste]').addClass('disabled');
							}
						}

						easyxeLastCommand = 'paste';

						break;
					case 'remove':
						$(context).remove();
						break;
					// 앞에 위젯 추가
					case 'addWidgetBefore':
						var form = $('#pageFo');
						var module_srl = form[0].module_srl.value;
						var widgetID = $(context).attr('id');
						widgetID = widgetID.replace('widget_', '');
						var url = request_uri.setQuery('module','easyxe').setQuery('act','dispEasyxeAdminGenerateCodeInPage').setQuery('module_srl', module_srl).setQuery('before', widgetID);
						popopen(url,'GenerateWidgetCode');
						break;
					// 뒤에 위젯 추가
					case 'addWidgetBefore':
						var form = $('#pageFo');
						var module_srl = form[0].module_srl.value;
						var widgetID = $(context).attr('id');
						widgetID = widgetID.replace('widget_', '');
						var url = request_uri.setQuery('module','easyxe').setQuery('act','dispEasyxeAdminGenerateCodeInPage').setQuery('module_srl', module_srl).setQuery('after', widgetID);
						popopen(url,'GenerateWidgetCode');
						break;
					// CSS 초기화
					case 'resetCSS':
						$(context).attr('style', '');
						$(context).css({
							'float' :  'left',
							'width' : '100%',
							'border' : '0px solid rgb(255, 255, 255)',
							'margin' : 0,
							'background' : 'transparent'
						});
						break;
					// 테두리 제거
					case 'removeBorder':
						$(context).css('border', '0 solid rgb(255, 255, 255)');
						break;
					// padding 제거
					case 'removePadding':
						$(context).css('padding', 0);
						break;
					// margin 제거
					case 'removeMargin':
						$(context).css('margin', 0);
						break;
					// 맨 앞으로 이동
					case 'moveToFirst':
						// 상자 위젯에 포함되어 있다면
						if($(context).parent().is('.nullWidget'))
						{
							// 상자 위젯 맨 앞으로
							$('<div>').prependTo($(context).parent()).replaceWith($(context));
						}
						else
						{
							$('<div>').prependTo('#zonePageContent').replaceWith($(context));
						}
						break;
					// 맨 뒤으로 이동
					case 'moveToLast':
						// 상자 위젯에 포함되어 있다면
						if($(context).parent().is('.nullWidget'))
						{
							// 상자 위젯 맨 앞으로
							$('<div>').appendTo($(context).parent()).replaceWith($(context));
						}
						else
						{
							$('<div>').appendTo('#zonePageContent').replaceWith($(context));
						}
						break;
					case 'moveToTop':
						$(context).prev().before($('<div>'));
						$(context).prev().prev().replaceWith($(context));
						break;
					case 'moveToBottom':
						$(context).next().after($('<div>'));
						$(context).next().next().replaceWith($(context));
						break;
				}
			}
		});
	});
})(jQuery);