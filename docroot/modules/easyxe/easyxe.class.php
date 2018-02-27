<?php
/**
 * @class easyxe
 * @author 퍼니엑스이 (contact@funnyxe.com)
 * @brief easyxe 모듈의 high class
 **/

class easyxe extends ModuleObject
{
	private $triggers = array(
		// before_module_proc 시점의 trigger
		array('moduleObject.proc', 'easyxe', 'controller', 'triggerBeforeModuleProc','before'),
		// after_module_proc 시점의 trigger
		array('moduleObject.proc', 'easyxe', 'controller', 'triggerAfterModuleProc','after'),
		// before_display_content 시점의 trigger
		array('display', 'easyxe', 'controller', 'triggerBeforeDisplayContent', 'before'),
		// 추가 설정 페이지에서 호출되는 trigger
		array('module.dispAdditionSetup', 'easyxe', 'controller', 'triggerDispAdditionSetup', 'before')
	);

	/**
	 * @brief 모듈 설치
	 **/
	function moduleInstall()
	{
		return new Object();
	}

	/**
	 * @brief 업데이트가 필요한지 확인
	 **/
	function checkUpdate()
	{
		// moduleModel 객체 생성
		$oModuleModel = getModel('module');

		// 트리거가 등록되어 있는지 확인
		foreach($this->triggers as $no => $trigger)
		{
			if(!$oModuleModel->getTrigger($trigger[0], $trigger[1], $trigger[2], $trigger[3], $trigger[4]))
			{
				return TRUE;
			}
		}

		// page module extend가 등록되어 있지 않은 경우
		if(!$oModuleModel->getModuleExtend('page', 'view'))
		{
			return TRUE;
		}

		if(!$oModuleModel->getModuleExtend('page', 'view', 'admin'))
		{
			return TRUE;
		}

		return FALSE;
	}

	/**
	* @brief 모듈 업데이트
	**/
	function moduleUpdate()
	{
		// moduleModel 객체 생성
		$oModuleModel = getModel('module');
		// moduleController 객체 생성
		$oModuleController = getController('module');

		// 트리거 등록
		foreach($this->triggers as $no => $trigger)
		{
			if(!$oModuleModel->getTrigger($trigger[0], $trigger[1], $trigger[2], $trigger[3], $trigger[4]))
			{
				$oModuleController->insertTrigger($trigger[0], $trigger[1], $trigger[2], $trigger[3], $trigger[4]);
			}
		}

		// page module extend가 등록되어 있지 않은 경우
		if(!$oModuleModel->getModuleExtend('page', 'view'))
		{
			$oModuleController->insertModuleExtend('page', 'easyxe', 'view');
		}

		if(!$oModuleModel->getModuleExtend('page', 'view', 'admin'))
		{
			$oModuleController->insertModuleExtend('page', 'easyxe', 'view', 'admin');
		}

		return new Object(0,'success_updated');
	}

	/**
	 * 모듈 삭제
	 */
	public function moduleUninstall()
	{
		// moduleController 객체 생성
		$oModuleController = getController('module');

		// 트리거 삭제
		foreach($this->triggers as $no => $trigger)
		{
			$oModuleController->deleteTrigger($trigger[0], $trigger[1], $trigger[2], $trigger[3], $trigger[4]);
		}

		// 모듈 확장 삭제
		$oModuleController->deleteModuleExtend('page', 'easyxe', 'view', 'admin');
	}

	/**
	 * @brief 캐시 파일 재생성
	 **/
	function recompileCache()
	{
	}
}