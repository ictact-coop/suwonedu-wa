<?php
/**
 * @class easyxeAdminController
 * @author 퍼니엑스이 (contact@funnyxe.com)
 * @brief easyxe 모듈의 admin controller class
 **/

class easyxeAdminController extends easyxe
{
	public $easyConfig;

	/**
	 * constructor
	 */
	public function __construct()
	{
		// easyxeModel 객체 생성
		$oEasyxeModel = getModel('easyxe');

		// easyxe 설정을 쉽게 참조할 수 있도록 멤버 변수에 선언
		$this->easyxeConfig = $oEasyxeModel->getEasyxeConfig();
	}

	/**
	 * EasyXE 설정 저장
	 */
	public function procEasyxeAdminSaveSetting()
	{
		$this->easyxeConfig->enabled = Context::get('enabled');
		$this->easyxeConfig->submanager_group = Context::get('submanager_group');

		$oModuleController = getController('module');
		$oModuleController->insertModuleConfig('easyxe', $this->easyxeConfig);

		$returnUrl = Context::get('success_return_url');
		if(!$returnUrl)
		{
			$returnUrl = getNotEncodedUrl('', 'module', 'admin', 'act', 'dispEasyxeAdminSetting');
		}

		$this->setRedirectUrl($returnUrl);
		$this->setMessage('success_saved');
	}

	public function procEasyxeAdminToggleAddonActivate()
	{
		$addon = Context::get('addon');

		$site_module_info = Context::get('site_module_info');
		// batahom addon values
		$addon = Context::get('addon');
		$type = Context::get('type');
		if(!$type)
		{
			$type = 'pc';
		}

		// addonAdminController 객체 생성
		$oAddonController = getAdminController('addon');

		if($addon)
		{
			// addonAdminModel 객체 생성
			$oAddonModel = getAdminModel('addon');
			// If enabled Disables
			if($oAddonModel->isActivatedAddon($addon, $site_module_info->site_srl, $type))
			{
				$status = 'off';
				$oAddonController->doDeactivate($addon, $site_module_info->site_srl, $type);
			}
			// If it is disabled Activate
			else
			{
				$status = 'on';
				$oAddonController->doActivate($addon, $site_module_info->site_srl, $type);
			}

			$this->add('status', $status);
		}

		$oAddonController->makeCacheFile($site_module_info->site_srl, $type);
	}

	function procEasyxeAdminInsertDeniedIP()
	{
		// 스팸IP 추가
		$ipaddress_list = Context::get('ipaddress_list');
		$oSpamfilterController = getController('spamfilter');
		if($ipaddress_list)
		{
			$output = $oSpamfilterController->insertIP($ipaddress_list);
			if(!$output->toBool() && !$output->get('fail_list')) return $output;

			if($output->get('fail_list')) $message_fail = '<em>'.sprintf(Context::getLang('msg_faillist'),$output->get('fail_list')).'</em>';
			$this->setMessage(Context::getLang('success_registed').$message_fail);
		}
	}

	public function procEasyxeAdminInsertDeniedWord()
	{
		//스팸 키워드 추가
		$word_list = Context::get('word_list');
		if($word_list)
		{
			$oSpamfilterController = getAdminController('spamfilter');
			$output = $oSpamfilterController->insertWord($word_list);
			if(!$output->toBool() && !$output->get('fail_list')) return $output;

			if($output->get('fail_list')) $message_fail = '<em>'.sprintf(Context::getLang('msg_faillist'),$output->get('fail_list')).'</em>';
			$this->setMessage(Context::getLang('success_registed').$message_fail);
		}
	}

	public function procEasyxeAdminChangeModuleLayout()
	{
		$source_layout_srl = Context::get('source_layout');
		if(!$source_layout_srl)
		{
			return new Object(-1, '변경 전 레이아웃을 선택해주세요.');
		}

		$target_layout_srl = Context::get('target_layout');
		if(!$target_layout_srl)
		{
			return new Object(-1, '변경 후 레이아웃을 선택해주세요.');
		}

		$type = Context::get('type');

		$args = new stdClass;
		$args->source_layout_srl = $source_layout_srl;
		$args->target_layout_srl = $target_layout_srl;

		if($type == 'P')
		{
			$query_id = 'easyxe.updateModuleLayout';
		}
		else
		{
			$query_id = 'easyxe.updateModuleMobileLayout';
		}

		$output = executeQuery($query_id, $args);
		if(!$output->toBool())
		{
			return $output;
		}

		// CacheHandler 객체 생성
		$oCacheHandler = CacheHandler::getInstance('object', null, true);

		// 캐시 파일 삭제
		if($oCacheHandler->isSupport())
		{
			$oCacheHandler->invalidateGroupKey('site_and_module');
		}

		$returnUrl = Context::get('success_return_url');

		$this->setRedirectUrl($returnUrl);
		$this->setMessage('succeed_updated');
	}

	/**
	 * 메시지 설정
	 */
	public function procEasyxeAdminSaveMessageSetting()
	{
		$target_module_srl = Context::get('target_module_srl');

		// easyxeModel 객체 생성
		$oEasyxeModel = getModel('easyxe');

		// 해당 모듈 설정을 가져옵니다
		$config = $oEasyxeModel->getEasyxePartConfig('easyxe', $target_module_srl);
		if(!isset($config))
		{
			$config = new stdClass;
		}

		$config->customMessage->msg_not_permitted_access_A = Context::get('msg_not_permitted_access_A');
		$config->customMessage->msg_not_permitted_write_A = Context::get('msg_not_permitted_write_A');
		$config->customMessage->msg_not_permitted_list_A = Context::get('msg_not_permitted_list_A');
		$config->customMessage->msg_not_permitted_view_A = Context::get('msg_not_permitted_view_A');

		$config->customMessage->msg_not_permitted_access_B = Context::get('msg_not_permitted_access_B');
		$config->customMessage->msg_not_permitted_write_B = Context::get('msg_not_permitted_write_B');
		$config->customMessage->msg_not_permitted_list_B = Context::get('msg_not_permitted_list_B');
		$config->customMessage->msg_not_permitted_view_B = Context::get('msg_not_permitted_view_B');

		// moduleController 객체 생성
		$oModuleController = getController('module');

		// 모듈 설정 저장
		$oModuleController->insertModulePartConfig('easyxe', $target_module_srl, $config);

		$returnUrl = Context::get('success_return_url');
		if(!$returnUrl)
		{
			$returnUrl = getNotEncodedUrl('', 'module', 'admin', 'act', 'dispBoardAdminContent');
		}

		$this->setRedirectUrl($returnUrl);
		$this->setMessage('success_saved');
	}

	/**
	 * 글/댓글 제한 설정
	 */
	public function procEasyxeAdminSaveBoardLimitSetting()
	{
		$new_group_srl = Context::get('new_group_srl');
		$new_period_unit = Context::get('new_period_unit');
		$new_period = Context::get('new_period');
		$new_document_limit_count = Context::get('new_document_limit_count');
		$new_comment_limit_count = Context::get('new_comment_limit_count');

		if($new_group_srl && ($new_document_limit_count > 0 || $new_comment_limit_count > 0))
		{
			$new_args = new stdClass;
			$new_args->group_srl = $new_group_srl;
			$new_args->group_srl = $new_group_srl;
			$new_output = executeQuery('easyxe.insertBoardLimit', $new_args);
			if(!$new_output->toBool())
			{
				return $new_output;
			}
		}
	}
}