<?php
define('BOARD_LIST_ACT', 'dispBoardContent');
define('ADD_CONTENT_POPUP', 'dispWidgetAdminAddContent');

class easyxeController extends easyxe
{
	public $easyConfig;
	public $compatibilityManager;

	/**
	 * constructor
	 * @return void
	 */
	public function __construct()
	{
		// easyxeModel 객체 생성
		$oEasyxeModel = getModel('easyxe');

		// easyxe 설정을 쉽게 참조할 수 있도록 멤버 변수에 선언
		$this->easyxeConfig = $oEasyxeModel->getEasyxeConfig();
	}

	/**
	 * 페이지 잠금 해제
	 * @return void
	 */
	public function procEasyxePageAuthorize()
	{
		// 페이지 비밀번호
		$page_password = Context::get('page_password');

		// 비밀번호 잠금이면서 비밀번호를 입력하지 않은 경우
		if(!$page_password && $this->module_info->page_lock_type == 'password')
		{
			return new Object(-1, '페이지 비밀번호를 입력해주세요.');
		}

		if(!is_array($_SESSION['XE_PAGE_AUTHORIZED']))
		{
			$_SESSION['XE_PAGE_AUTHORIZED'] = array();
		}

		if(!is_array($_SESSION['XE_PAGE_AUTHORIZED_TIME']))
		{
			$_SESSION['XE_PAGE_AUTHORIZED_TIME'] = array();
		}

		// 비밀번호 잠금이면서 비밀번호가 틀린 경우
		if($this->module_info->page_password != $page_password && $this->module_info->page_lock_type == 'password')
		{
			$_SESSION['XE_PAGE_AUTHORIZED'][$this->module_info->module_srl] = FALSE;
			return new Object(-1, '비밀번호가 틀렸습니다.');
		}

		$logged_info = Context::get('logged_info');

		// 페이지 잠금 해제 방식이 포인트 차감이면서 로그인을 하지 않았을 때
		if($this->module_info->page_lock_type == 'point' && !$logged_info)
		{
			return new Object(-1, 'msg_unlock_login_required');
		}

		$expireTime = $this->module_info->page_auth_expire_time;

		switch($this->module_info->page_auth_expire_time_unit)
		{
			case 'MINUTES':
				$expireTime *= 60;
				break;
			case 'HOURS':
				$expireTime *= 60 * 60;
				break;
			case 'DAYS':
				$expireTime *= 60 * 60 * 24;
				break;
			case 'MONTHS':
				$expireTime *= 60 * 60 * 30;
				break;
		}

		$usePointUnlock = $this->module_info->page_unlock_point > 0 && $this->module_info->page_lock_type == 'point';
		if($this->module_info->page_auth_expire_time > 0 && (!$_SESSION['XE_PAGE_AUTHORIZED_TIME'][$this->module_info->module_srl] || time() <= $_SESSION['XE_PAGE_AUTHORIZED_TIME'][$this->module_info->module_srl] + $expireTime))
		{
			if($usePointUnlock)
			{
				$args = new stdClass;
				$args->module_srl = $this->module_info->module_srl;
				$args->member_srl = $logged_info->member_srl;
				$output = executeQuery('easyxe.getPageAuthorizeLogByMemberSrl', $args);
			}

			$args = new stdClass;
			$args->module_srl = $this->module_info->module_srl;
			$args->member_srl = $logged_info->member_srl;
			$args->ipaddress = $_SERVER['REMOTE_ADDR'];
			$args->time = $expireTime;
			$output = executeQuery('easyxe.insertPageAuthorizeLog', $args);

			if(!$output->toBool())
			{
				return $output;
			}

			$this->module_info->page_unlock_point = (int) $this->module_info->page_unlock_point;

			// 포인트 잠금 해제를 사용할 경우
			if($usePointUnlock)
			{
				// pointController 객체 생성
				$oPointController = getController('point');
				// 포인트 차감
				//$oPointController->setPoint($logged_info->member_srl, $this->module_info->page_unlock_point, 'subtract');
			}

			// 세션에 인증 여부 저장
			$_SESSION['XE_PAGE_AUTHORIZED'][$this->module_info->module_srl] = TRUE;
			// 세션에 인증 시간 저장
			$_SESSION['XE_PAGE_AUTHORIZED_TIME'][$this->module_info->module_srl] = time();
		}

		$returnUrl = Context::get('success_return_url');
		$this->setRedirectUrl($returnUrl);
	}

	/**
	 * before_module_proc 시점에서 실행되는 trigger
	 */
	public function triggerBeforeModuleProc(&$oModule)
	{
		if(Context::getResponseMethod() != 'HTML')
		{
			return new Object();
		}

		switch($oModule->module)
		{
			case 'board':
			case 'wiki':
			case 'page':
				// easyxeModel 객체 생성
				$oEasyxeModel = getModel('easyxe');

				$config = $oEasyxeModel->getEasyxePartConfig($oModule->module_info->module_srl);

				// 로그인 정보를 가져옵니다
				$logged_info = Context::get('logged_info');

				$grant = Context::get('grant');
				if(!$grant->access)
				{
					if(!$logged_info && $config->customMessage->msg_not_permitted_access_A)
					{
						Context::setLang('msg_not_permitted_act', $config->customMessage->msg_not_permitted_access_A);
					}

					if($logged_info && $config->customMessage->msg_not_permitted_access_B)
					{
						Context::setLang('msg_not_permitted_act', $config->customMessage->msg_not_permitted_access_B);
					}
				}

				$supportedListAct = array(
					'dispBoardContent'
				);
				$supportedViewAct = array(
					'dispPageIndex',
					'dispWikiContent'
				);
				$supportedWriteAct = array(
					'dispBoardWrite',
					'dispWikiEditPage'
				);

				// 각 모듈의 목록 페이지인 경우
				if(in_array($oModule->act, $supportedListAct))
				{
					$document_srl = Context::get('document_srl');

					// documentModel 객체 생성
					$oDocumentModel = getModel('document');

					// before_module_proc 시점에서는 아직 document 정보를 가져오지 않았으니 별도로 가져온다
					$oDocument = $oDocumentModel->getDocument($document_srl, false, true);

					// 글 보기 화면일 때
					if($document_srl && $oDocument->isExists())
					{
						// 로그인 하지 않은 경우
						if(!$logged_info && $config->customMessage->msg_not_permitted_view_A)
						{
							Context::setLang('msg_not_permitted', $config->customMessage->msg_not_permitted_view_A);
						}

						// 로그인 한 경우
						if($logged_info && $config->customMessage->msg_not_permitted_view_B)
						{
							Context::setLang('msg_not_permitted', $config->customMessage->msg_not_permitted_view_B);
						}
					}
					// 목록 화면일 때
					elseif(!$oDocument->isExists())
					{
						// 로그인 하지 않은 경우
						if(!$logged_info && $config->customMessage->msg_not_permitted_list_A)
						{
							Context::setLang('msg_not_permitted', $config->customMessage->msg_not_permitted_list_A);
						}

						// 로그인 한 경우
						if($logged_info && $config->customMessage->msg_not_permitted_list_B)
						{
							Context::setLang('msg_not_permitted', $config->customMessage->msg_not_permitted_list_B);
						}
					}
				}
				// 각 모듈의 view 페이지인 경우
				elseif(in_array($oModule->act, $supportedViewAct))
				{
					// 로그인 하지 않은 경우
					if(!$logged_info && $config->customMessage->msg_not_permitted_view_A)
					{
						Context::setLang('msg_not_permitted', $config->customMessage->msg_not_permitted_view_A);
					}

					// 로그인 한 경우
					if($logged_info && $config->customMessage->msg_not_permitted_view_B)
					{
						Context::setLang('msg_not_permitted', $config->customMessage->msg_not_permitted_view_B);
					}
				}
				// 글쓰기 화면인 경우
				elseif(in_array($oModule->act, $supportedWriteAct))
				{
					if(!$logged_info && $config->customMessage->msg_not_permitted_write_A)
					{
						Context::setLang('msg_not_permitted', $config->customMessage->msg_not_permitted_write_A);
					}

					if($logged_info && $config->customMessage->msg_not_permitted_write_B)
					{
						Context::setLang('msg_not_permitted', $config->customMessage->msg_not_permitted_write_B);
					}
				}
				break;
		}

		return new Object();
	}
	/**
	 * after_module_proc 시점에 실행되는 trigger
	 */
	public function triggerAfterModuleProc(&$oModule)
	{
		$responseMethod = Context::getResponseMethod();

		// 게시판 추가 설정 페이지인 경우
		if($oModule->act == 'dispBoardAdminBoardAdditionSetup' && $responseMethod == 'HTML')
		{
			Context::addJsFile('./modules/easyxe/tpl/_extends/board/js/addition_setup.js');
		}

		$listSelectorSupported = array(
			'dispMemberAdminList',
			'dispDocumentAdminList',
			'dispCommentAdminList',
			'dispFileAdminList'
		);

		$sectionNavigatorSupported = array(
			'dispBoardAdminSkinInfo',
			'dispBoardAdminMobileSkinInfo'
		);

		if(in_array($oModule->act, $listSelectorSupported) && $responseMethod == 'HTML')
		{
			Context::addJsFile('./modules/easyxe/tpl/js/list_selector.js');
		}

		if(in_array($oModule->act, $sectionNavigatorSupported) && $responseMethod == 'HTML')
		{
			Context::addJsFile('./modules/easyxe/tpl/_extends/board/js/skin_setup.js');
		}

		// view 이외에서는 동작하지 않도록 한다
		if(!in_array($oModule->module_info->module_type, array('view', 'mobile')))
		{
			return new Object();
		}

		// 애드온 설정 페이지를 팝업을 띄웠을 경우, 일부 단어가 나타나지 않아 언어 파일을 별도로 불러들입니다
		if($oModule->module_info->module == 'easyxe' && $oModule->act == 'dispAddonAdminSetup')
		{
			Context::loadLang('./modules/admin/lang/');
		}

		// 팝업 레이아웃인 경우 admin bar를 삽입하지 않도록 설정합니다
		if($oModule->getLayoutPath() == './common/tpl/' || $oModule->getLayoutFile() == 'popup_layout.html')
		{
			Context::set('easyAdminBar', FALSE);
			return new Object();
		}

		Context::set('easyAdminBar', TRUE);
		// 템플릿에서 쿠키 값을 참조할 수 있도록 Context::set()
		Context::set('easyAdminBarStatus', $_COOKIE['easyAdminBar']);

		return new Object();
	}

	/**
	 * before_display_content 시점에서 실행되는 trigger
	 */
	public function triggerBeforeDisplayContent(&$output)
	{
		// 모듈 정보를 가져옵니다.
		$module_info = Context::get('current_module_info');

		// GET 방식으로 요청 받은 act
		$requestedAct = Context::get('act');

		// 내용 직접 추가 팝업인 경우
		if($requestedAct == ADD_CONTENT_POPUP)
		{
			Context::addCssFile('./modules/easyxe/tpl/_extends/widget/css/widget_add_content.css');
			Context::addJsFile('./modules/easyxe/tpl/_extends/widget/js/widget_add_content.js');
			$htmlCode = '
				<script>
				// 현재 페이지의 module_srl
				var module_srl = %d;
				</script>
				<a href="#htmlInsertLayer" class="x_btn modalAnchor">HTML 코드 삽입</a>
				<div class="x_modal" id="htmlInsertLayer">
					<div class="x_modal-header">
						<h1>HTML 코드 삽입</h1>
					</div>
					<div class="x_modal-body">
						<textarea id="htmlCode" cols="30" rows="10"></textarea>
					</div>
					<div class="x_modal-footer">
						<input type="button" value="삽입" class="x_btn" onclick="doAddHtmlCode()">
					</div>
				</div>
				<br><br>
				<div class="editor">
			';
			$htmlCode = sprintf($htmlCode, Context::get('module_srl'));

			// 에디터 바로 앞에 버튼 추가
			$output = str_replace('<div class="editor">', $htmlCode, $output);
		}

		$easyAdminBar = Context::get('easyAdminBar');
		if(!$easyAdminBar)
		{
			return new Object();
		}

		// 제외할 모듈
		$except_module_list = array(
			'comment',
			'document',
			'file',
			'module',
			'widget',
			'editor'
		);

		// 제외할 act
		$except_act_list = array(
			'dispWidgetAdminAddContent',
			'dispLayoutPreviewWithModule',
			'dispEditorPopup',
			'dispEasyxeAdminViewPageSource',
			'dispEasyxeAdminViewMobilePageSource',
			'dispEasyxeAdminGenerateCodeInPage'
		);

		if(in_array($module_info->module, $except_module_list) && !$module_info->mid)
		{
			return new Object();
		}

		if(in_array($module_info->act, $except_act_list))
		{
			return new Object();
		}

		$act = Context::get('act');

		if(in_array($act, $except_act_list))
		{
			return new Object();
		}

		// 로그인 정보
		$logged_info = Context::get('logged_info');

		// 관리자이고 view이고 메인 사이트인 경우
		if($logged_info->is_admin =='Y' && in_array($module_info->module_type, array('view', 'mobile')) && $module_info->site_srl == 0)
		{
			// 스마트폰이라면 보여주지 않는다
			if(Mobile::isMobileCheckByAgent())
			{
				return new Object();
			}

			/**
			 * view이지만 응답 방식이 HTML이 아닌 경우 실행 종료
			 * ex) rss, ajax request
			 */
			if(Context::getResponseMethod() != 'HTML')
			{
				return new Object();
			}

			// easyxeModel 객체 생성
			$oEasyxeModel = getModel('easyxe');

			// easyxe 모듈 설정
			$easyxeConfig = $oEasyxeModel->getEasyxeConfig();
			if($easyxeConfig->enabled != 'Y')
			{
				return new Object();
			}

			// easyxe 설정을 템플릿에서 사용할 수 있도록 합니다
			Context::set('easyxeConfig', $easyxeConfig);

			// TemplateHandler 객체 생성
			$oTemplateHandler = TemplateHandler::getInstance();

			$admin_bar_html = $oTemplateHandler->compile($this->module_path .'tpl', 'admin_bar.html');

			// <body> 바로 뒤에 html 추가
			$output = $admin_bar_html . $output;
		}

		return new Object();
	}

	/** 
	 * 추가 설정 페이지 접근 시 호출되는 trigger
	 */
	public function triggerDispAdditionSetup(&$content)
	{
		// 사이트 정보를 구합니다
		$current_module_info = Context::get('current_module_info');

		$current_module_srl = Context::get('module_srl');
		$current_module_srls = Context::get('module_srls');

		if(!$current_module_srl && !$current_module_srls)
		{
			$current_module_srl = $current_module_info->module_srl;
			if(!$current_module_srl) return new Object();
		}

		// memberModel 객체 생성
		$oMemberModel = getModel('member');

		// 생성된 그룹을 가져옵니다
		$group_list = $oMemberModel->getGroups($current_module_info->site_srl);
		Context::set('group_list', $group_list);

		$oEasyxeModel = getModel('easyxe');
		$easyConfig = $oEasyxeModel->getEasyxePartConfig($current_module_srl);

		$oSecurity = new Security($easyConfig);
		$oSecurity->encodeHTML('customMessage..');

		Context::set('easyConfig', $easyConfig);

		$oTemplate = TemplateHandler::getInstance();
		$tpl = $oTemplate->compile($this->module_path . 'tpl', 'addition_setup');
		$content .= $tpl;

		return new Object();
	}
}