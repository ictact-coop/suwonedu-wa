(function($){
	$(function(){
		var addonLoaded = false;

		$('.adminbar>ul>li>a').click(function(){
			$(this).parent().toggleClass('active');
			var menu = $(this).data('menu');
			var listHeight;

			switch(menu)
			{
				case 'addon':
					// 최초 한 번만 불러오도록
					if(!addonLoaded)
					{
						var $this = $(this);
						$('.adminbar-addon>ul>li:eq(0)').show();

						$.exec_json('easyxe.getEasyxeAdminAddonList', { }, function(data){
							$('.adminbar-addon>ul>li:eq(0)').hide();
							var addonCount = data.addon_list.length;
							listHeight = Math.min(38 * 20, 38 * addonCount, $(window).height() - 46);

							for(var i=0; i < addonCount; i++)
							{
								var node = $('<li>');
								var anchor = $('<a>').attr('href' , '#').text(data.addon_list[i].title).data('addon_name', data.addon_list[i].addon_name).data('is_active', data.addon_list[i].is_active);
								var is_active = $('<button class="addon-toggle addon-toggle-desktop"><i class="fa fa-desktop fa-fw"></i></button>');
								var is_mactive = $('<button class="addon-toggle addon-toggle-mobile"><i class="fa fa-mobile fa-fw"></i></button>');

								is_active.data('addon_name', data.addon_list[i].addon_name);
								is_mactive.data('addon_name', data.addon_list[i].addon_name);

								// PC
								if(data.addon_list[i].activated)
								{
									is_active.find('i').addClass('fa-check');
								}
								else
								{
									is_active.find('i').addClass('fa-times');
								}

								// 모바일
								if(data.addon_list[i].mactivated)
								{
									is_mactive.find('i').addClass('fa-check');
								}
								else
								{
									is_mactive.find('i').addClass('fa-times');
								}


								anchor.append(is_active);
								anchor.append(is_mactive);
								node.append(anchor);
								node.appendTo('.adminbar-addon>ul');
							}

							$this.next().slideToggle(400, function(){
								$('.adminbar-addon>ul').animate({ height : listHeight });
							});

						});
						addonLoaded = true;
					}
					else
					{
						$(this).next().slideToggle(400, function(){
							$('.adminbar-addon>ul').height(listHeight);
						});
					}
					return false;
					break;
				default:
					if(menu)
					{
						$(this).next().slideToggle();
						return false;
					}
			}
		});

		// 애드온 이름을 클릭할 때 실행할 동작
		$(document).on('click', '.adminbar-addon ul li a', function(){
			var $this = $(this);
			var addon_name = $this.data('addon_name');
			// 애드온 설정 팝업을 띄운다
			var popup_url = request_uri.setQuery('module', 'easyxe').setQuery('act', 'dispAddonAdminSetup').setQuery('selected_addon', addon_name);

			popopen(popup_url);

			return false;
		});

		// 애드온을 끄고 켠다
		$(document).on('click', '.adminbar-addon ul li .addon-toggle-desktop, .adminbar-addon ul li .addon-toggle-mobile', function(){
			var $this = $(this);
			var isPC = $this.hasClass('.addon-toggle-desktop');
			var isMobile = $this.hasClass('.addon-toggle-desktop');
			var toggleType;

			if(isPC)
			{
				toggleType = 'pc';
			}
			else
			{
				toggleType = 'mobile';
			}

			var ajaxData = { addon : $this.data('addon_name'), type : toggleType};

			$.exec_json('easyxe.procEasyxeAdminToggleAddonActivate', ajaxData , function(data) {
				var icon = $this.find('i');

				icon
					.removeClass('fa-check')
					.removeClass('fa-times');

				switch(data.status)
				{
					case 'on':
						icon.addClass('fa-check');
						break;
					case 'off':
						icon.addClass('fa-times');
						break;
				}

			});
			return false;
		});
	});
})(jQuery);