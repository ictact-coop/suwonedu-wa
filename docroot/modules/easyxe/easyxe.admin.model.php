<?php
class easyxeAdminModel extends easyxe
{
	public function getEasyxeAdminMenuItems()
	{
		$menuSrl = Context::get('menuSrl');

		// menuAdminModel 객체 생성
		$oMenuAdminModel = getAdminModel('menu');

		$output = $oMenuAdminModel->getMenuItems($menuSrl);

		$this->add('menu_items', $output->data);
	}

	public function getEasyxeAdminMemberSearchTpl()
	{
		$oMemberAdminView = getAdminView('member');

		$memberInfo = new stdClass;

		$oMemberModel = getModel('member');
		$this->memberConfig = $oMemberModel->getMemberConfig();
		$member_config = $this->memberConfig;

		// member 모듈 설정
		Context::set('config', $this->memberConfig);

		global $lang;
		$identifierForm = new stdClass();
		$identifierForm->title = $lang->{$member_config->identifier};
		$identifierForm->name = $member_config->identifier;
		$identifierForm->value = $memberInfo->{$member_config->identifier};
		Context::set('identifierForm', $identifierForm);

		// 등록된 모든 그룹을 가져옴
		$group_list = $oMemberModel->getGroups();

		// 템플릿에서 쓸 수 있도록 Context::set()
		Context::set('group_list', $group_list);

		$oTemplate = TemplateHandler::getInstance();

		$this->add('html', $oTemplate->compile('./modules/easyxe/tpl', 'adminBar_MemberSearch.html'));
	}

	/**
	 * AJAX 회원 검색
	 */
	public function getEasyxeAdminMemberSearchResult()
	{
		// memberModel 객체 생성
		$oMemberModel = getModel('member');

		$this->memberConfig = $oMemberModel->getMemberConfig();
		$member_config = $this->memberConfig;

		$search_target = Context::get('search_target');
		$search_keyword = Context::get('search_keyword');

		$startDate = Context::get('start_date');
		$endDate = Context::get('end_date');

		$args = new stdClass;
		switch($search_target)
		{
			case 'email_address':
				$args->s_email_address = $search_keyword;
				break;
			case 'regdate':
				if($startDate)
				{
					$args->s_regdate_more = date('YmdHis', strtotime($startDate . ':00'));
				}
				if($endDate)
				{
					$args->s_regdate_less = date('YmdHis', strtotime($endDate . ':59'));
				}
				break;
			case 'user_id':
				$args->s_user_id = $search_keyword;
				break;
		}

		$output = executeQueryArray('easyxe.getMemberList', $args);

		global $lang;
		$identifierForm = new stdClass();
		$identifierForm->title = $lang->{$member_config->identifier};
		$identifierForm->name = $member_config->identifier;
		$identifierForm->value = $memberInfo->{$member_config->identifier};
		Context::set('identifierForm', $identifierForm);

		Context::set('member_list', $output->data);

		$oTemplate = TemplateHandler::getInstance();

		$this->add('memberConfig', $this->memberConfig);
		$this->add('member_tpl', $oTemplate->compile('./modules/easyxe/tpl', 'adminBar_MemberSearchResult.html'));
	}

	public function getEasyxeAdminInsertMemberFormTpl()
	{
		$oMemberAdminView = getAdminView('member');

		$memberInfo = new stdClass;

		$formTags = $oMemberAdminView->_getMemberInputTag($memberInfo, true);
		Context::set('formTags', $formTags);

		$oMemberModel = getModel('member');
		$this->memberConfig = $oMemberModel->getMemberConfig();
		$member_config = $this->memberConfig;

		Context::set('config', $this->memberConfig);

		global $lang;
		$identifierForm = new stdClass();
		$identifierForm->title = $lang->{$member_config->identifier};
		$identifierForm->name = $member_config->identifier;
		$identifierForm->value = $memberInfo->{$member_config->identifier};
		Context::set('identifierForm', $identifierForm);

		$oTemplate = TemplateHandler::getInstance();

		$this->add('html', $oTemplate->compile('./modules/easyxe/tpl', 'adminBar_MemberInsert.html'));
	}

	public function getEasyxeAdminMemberList()
	{
		$args = new stdClass;
		executeQueryArray('easyxe.getMemberList', $args);
	}

	public function getEasyxeAdminPageList()
	{
		$args = new stdClass;
		$output = executeQueryArray('easyxe.getPageList', $args);

		$this->add('page_list', $output->data);
	}

	/**
	 * [AJAX] 설치된 애드온 검색
	 */
	public function getEasyxeAdminAddonList()
	{
		$oAddonModel = getAdminModel('addon');
		$addon_list = $oAddonModel->getAddonList();

		$this->add('addon_list', $addon_list);
	}

	/**
	 * [AJAX] 해당 레이아웃을 사용하는 모듈 검색
	 */
	public function getEasyxeAdminLayoutUsingModule()
	{
		$type = Context::get('type');

		switch($type)
		{
			// PC 레이아웃을 기준으로 검색할 경우
			case 'P':
				$layout_srl = Context::get('layout_srl');
				break;
			// 모바일 레이아웃을 기준으로 검색할 경우
			case 'M':
				$mlayout_srl = Context::get('layout_srl');
				break;
			// 잘못된 요청인 경우
			default:
				// 에러 출력
				return new Object(-1, 'msg_invalid_request');
				break;
		}

		$args = new stdClass;
		$args->layout_srl = $layout_srl;
		$args->mlayout_srl = $mlayout_srl;

		$output = executeQueryArray('easyxe.getModulesByLayout', $args);

		$this->add('module_list', $output->data);
	}
}