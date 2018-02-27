(function($){
	$(function(){
		// 관리자 메뉴 높이
		var adminBarHeight = $('.adminbar').outerHeight();
		// 관리자 메뉴 위치
		var adminBarPosition = 'top';
		// 관리자 메뉴 객체
		var adminBar = {
			initialized: false,
			// 관리자 메뉴가 열려있는지?
			isOpened: false,
			// 관리자 메뉴가 움직이고 있는지?
			isAnimating: false,

			open: function()
			{
				if(!this.isOpened && !this.isAnimating)
				{
					var margin = get_body_margin(adminBarPosition);
					var new_margin = margin + adminBarHeight;
					this.isOpened = true;
					this.isAnimating = true;

					switch(adminBarPosition)
					{
						case 'top':
							$('body').animate({
								'margin-top' : new_margin
							}, 400);
							break;
						case 'bottom':
							$('body').animate({
								'margin-bottom' : new_margin
							}, 400);
							break;
					}

					$('.adminbar').slideDown(400, function(){
						adminBar.isAnimating = false;
						adjustFixedElements();
					});

					// toggle 버튼 위치 변경
					if(adminBarPosition == 'top')
					{
						$('.nav-toggle').animate( { top : adminBarHeight, duration : 400, 'opacity' : 0.6 } );
					}
					else
					{
						$('.nav-toggle').animate( { bottom : adminBarHeight, duration : 400, 'opacity' : 0.6 } );
					}

					$('.nav-toggle>i')
						.addClass('fa-chevron-up')
						.removeClass('fa-chevron-down');

					// 관리자 메뉴 상태를 쿠키에 저장
					setCookie('easyAdminBar', 'o');
				}
			},
			close: function(){
				if(!this.isAnimating)
				{
					if(this.isOpened)
					{
						this.isOpened = false;
						this.isAnimating = true;

						if(this.initialized)
						{
							var margin = get_body_margin(adminBarPosition);
							var new_margin = margin - adminBarHeight;

							switch(adminBarPosition)
							{
								case 'top':
									$('body').animate({
										'margin-top' : new_margin
									}, 400);
									break;
								case 'bottom':
									$('body').animate({
										'margin-bottom' : new_margin
									}, 400);
									break;
							}
						}

						$('.adminbar').slideUp(400, function(){
							adminBar.isAnimating = false;
							adjustFixedElements();
						});
					}

					if(adminBarPosition == 'top')
					{
						$('.nav-toggle').animate( { top : 0, duration : 400, 'opacity' : 0.2 } );
					}
					else
					{
						$('.nav-toggle').animate( { bottom : 0, duration : 400, 'opacity' : 0.2 } );
					}
					$('.nav-toggle>i')
						.removeClass('fa-chevron-up')
						.addClass('fa-chevron-down');

					setCookie('easyAdminBar', 'x');
				}
			}
		};

		if($.fn.textAssist)
		{
			$('small.m_no, span.ipAddress, .xe_content').textAssist({
				minLength: 2,
				items : [
					{
						title : '<i class="fa fa-globe fa-lg"></i> 스팸 IP 추가',
						onShow : function(text, offset)
						{
						},
						onClick: function(text, offset)
						{
							if(!text)
							{
								return false;
							}

							if(confirm('스팸 IP로 등록하시겠습니까?\n\n' + text))
							{
								$.exec_json('easyxe.procEasyxeAdminInsertDeniedWord', { word_list : text }, function(data){
									alert(data.message);
								});
							}
						}
					},
					{
						title : '<i class="fa fa-rocket fa-lg"></i> 스팸 단어 추가',
						onShow : function(text, offset)
						{
						},
						onClick: function(text, offset)
						{
							if(!text)
							{
								return false;
							}

							if(confirm('스팸 단어로 등록하시겠습니까?\n\n' + text))
							{
								$.exec_json('easyxe.procEasyxeAdminInsertDeniedWord', { word_list : text }, function(data){
									alert(data.message);
								});
							}
						}
					}
				]
			});
		}

		/**
		 * body margin을 구하는 함수
		 */
		function get_body_margin(position){
			var margin = $('body').css('margin-' + position);
			var unit = margin.substr(-2);

			if(unit == 'px'){
				margin = parseInt(margin);
			}else{
				margin = 0;
			}

			return margin;
		}

		/**
		 * 웹 페이지를 열면 관리자 메뉴를 초기화함
		 */
		if(getCookie('easyAdminBar') == 'o') {
			adminBar.open();
		}
		else
		{
			adminBar.close();
		}

		$('#easyAdminBar .nav-collapse').click(function(){
			$('#easyAdminBar .nav-gnb').toggleClass('active');
		});

		adminBar.initialized = true;

		// 관리자 메뉴 열기/닫기 버튼
		$('.nav-toggle').click(function(){
			if(!adminBar.isOpened)
			{
				adminBar.open();
			}
			else
			{
				adminBar.close();
			}
		});

		/**
		 * 페이지에 fixed 요소가 있을 경우 이를 보정해주는 함수
		 */
		function adjustFixedElements()
		{
			var $fixed_elements = $('*').filter(function(){
				if($(this).get(0) == $('.adminbar').get(0)) return false;
				if($(this).css("position") !== 'fixed') return false;
				if($(this).hasClass('nav-toggle')) return false;
				if($(this).hasClass('x_modal')) return false;

				var invisible = false;
				if(!$(this).is(':visible')){
					invisible = true;
					$(this).show();
				}
				var top = $(this).position().top;
				if(invisible){
					$(this).hide();
				}
				if(top > adminBarHeight) return false;

				if(adminBar.isOpened)
				{
					$(this).css('top', top + adminBarHeight);
				}
				else
				{
					if(adminBar.initialized)
					{
						$(this).css('top', top - adminBarHeight);
					}
					else
					{
						adminBar.initialized = true;
					}
				}
				return true;
			});
		}
	});
})(jQuery);