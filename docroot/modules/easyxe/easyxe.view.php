<?php
if(!class_exists('page'))
{
	require(_XE_PATH_ . 'modules/page/page.class.php');
}

if(!class_exists('pageView'))
{
	require(_XE_PATH_ . 'modules/page/page.view.php');
}

class easyxeView extends pageView
{
	/**
	 * 페이지 내용 출력
	 * @return void
	 */
	public function dispPageIndex()
	{
		// 페이지 모듈 초기화
		parent::init();
		// 페이지 모듈의 기능을 그대로 상속받아 사용합니다
		parent::dispPageIndex();

		$this->setTemplatePath('./modules/easyxe/tpl/_extends/page');
	}

	/**
	 * 페이지 인증 검증 함수
	 * @return void
	 */
	private function _isAuthorized()
	{
		// 로그인 정보
		$logged_info = Context::get('logged_info');
		// 페이지 권한
		$grant = Context::get('grant');

		// 페이지 잠금 기능을 사용하지 않는다면
		if($this->module_info->use_lock != 'Y')
		{
			return TRUE;
		}

		// 관리 권한이 있을 경우
		if($logged_info->is_admin == 'Y' || $grant->manager)
		{
			return TRUE;
		}

		if($this->module_info->page_auth_expire_time > 0)
		{
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

			if(time() > $_SESSION['XE_PAGE_AUTHORIZED_TIME'][$this->module_info->module_srl] + $expireTime)
			{
				return FALSE;
			}
		}

		return $_SESSION['XE_PAGE_AUTHORIZED'][$this->module_info->module_srl];
	}

	/**
	 * 인증 페이지을 컴파일하여 return
	 */
	private function _getAuthorizePage()
	{
		$oTemplate = TemplateHandler::getInstance();
		return $oTemplate->compile('./modules/easyxe/tpl/_extends/page/', 'page_authorize');
	}

	/**
	 * 위젯 페이지 내용을 return
	 */
	public function _getWidgetContent()
	{
		// 인증하지 않았다면 인증 페이지를 띄웁니다
		if(!$this->_isAuthorized())
		{
			return $this->_getAuthorizePage();
		}

		return parent::_getWidgetContent();
	}

	/**
	 * 문서 페이지 내용을 return
	 */
	public function _getArticleContent()
	{
		// 인증하지 않았다면 인증 페이지를 띄웁니다
		if(!$this->_isAuthorized())
		{
			return $this->_getAuthorizePage();
		}

		// TemplateHandler 객체 생성
		$oTemplate = TemplateHandler::getInstance();

		// documentModel 객체 생성
		$oDocumentModel = getModel('document');
		$oDocument = $oDocumentModel->getDocument(0, true);

		// 문서가 등록되어 있다면
		if($this->module_info->document_srl)
		{
			$document_srl = $this->module_info->document_srl;
			$oDocument->setDocument($document_srl);
			Context::set('document_srl', $document_srl);
		}

		Context::set('oDocument', $oDocument);

		// 사이트 기본 스킨을 사용하는 경우 template path를 잘못 잡는 오류가 발생하기에, skin 값을 바로 잡아준다
		if($this->module_info->skin == '/USE_DEFAULT/')
		{
			// moduleModel 객체 생성
			$oModuleModel = getModel('module');

			// 페이지 모듈 스킨을 구해서 skin 변수에 집어넣는다
			$this->module_info->skin = $oModuleModel->getModuleDefaultSkin('page', 'P');
		}

		if ($this->module_info->skin)
		{
			$templatePath = (sprintf('./modules/page/skins/%s', $this->module_info->skin));
		}
		else
		{
			$templatePath = ('./modules/page/skins/default');
		}

		$page_content = $oTemplate->compile($templatePath, 'content');

		return $page_content;
	}

	/**
	 * 외부 페이지 내용을 return
	 */
	public function _getOutsideContent()
	{
		// 인증하지 않았다면 인증 페이지를 띄웁니다
		if(!$this->_isAuthorized())
		{
			return $this->_getAuthorizePage();
		}

		return parent::_getOutsideContent();
	}
}