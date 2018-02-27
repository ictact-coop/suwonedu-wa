<?php
/**
 * @class loginlog
 * @author XEPublic
 * @brief loginlog 모듈의 high class
 **/

class loginlog extends ModuleObject
{
	/**
	 * @brief 모듈 설치
	 */
	public function moduleInstall()
	{
		$oModuleController = getController('module');
		$oModuleController->insertTrigger('member.doLogin', 'loginlog', 'controller', 'triggerAfterLogin', 'after');

		// 회원 삭제 시 로그인 기록을 삭제하는 트리거 추가 (2010.06.09)
		$oModuleController->insertTrigger('member.deleteMember', 'loginlog', 'controller', 'triggerDeleteMember', 'after');

		// 회원 로그인 실패 시 로그인 기록을 남기는 트리거 추가 (2010.09.13)
		$oModuleController->insertTrigger('member.doLogin', 'loginlog', 'controller', 'triggerBeforeLogin', 'before');

		// Trigger 추가 (2014.11.09)
		$oModuleController->insertTrigger('moduleHandler.init', 'loginlog', 'controller', 'triggerBeforeModuleInit', 'after');
		$oModuleController->insertTrigger('moduleHandler.proc', 'loginlog', 'controller', 'triggerBeforeModuleProc', 'after');

		return new Object();
	}

	/**
	 * @brief 모듈 삭제
	 */
	public function moduleUninstall()
	{
		$oModuleModel = getModel('module');
		$oModuleController = getController('module');

		// 트리거 삭제
		if($oModuleModel->getTrigger('member.doLogin', 'loginlog', 'controller', 'triggerAfterLogin', 'after'))
		{
			$oModuleController->deleteTrigger('member.doLogin', 'loginlog', 'controller', 'triggerAfterLogin', 'after');
		}

		// 회원 삭제 시 로그인 기록을 삭제하는 트리거 추가 (2010.06.09)
		if($oModuleModel->getTrigger('member.deleteMember', 'loginlog', 'controller', 'triggerDeleteMember', 'after'))
		{
			$oModuleController->deleteTrigger('member.deleteMember', 'loginlog', 'controller', 'triggerDeleteMember', 'after');
		}

		// 회원 로그인 실패 시 로그인 기록을 남기는 트리거 추가 (2010.09.13)
		if($oModuleModel->getTrigger('member.doLogin', 'loginlog', 'controller', 'triggerBeforeLogin', 'before'))
		{
			$oModuleController->deleteTrigger('member.doLogin', 'loginlog', 'controller', 'triggerBeforeLogin', 'before');
		}

		// Trigger 추가 (2014.11.09)
		if($oModuleModel->getTrigger('moduleHandler.init', 'loginlog', 'controller', 'triggerBeforeModuleInit', 'after'))
		{
			$oModuleController->deleteTrigger('moduleHandler.init', 'loginlog', 'controller', 'triggerBeforeModuleInit', 'after');
		}

		if($oModuleModel->getTrigger('moduleHandler.proc', 'loginlog', 'controller', 'triggerBeforeModuleProc', 'after'))
		{
			$oModuleController->deleteTrigger('moduleHandler.proc', 'loginlog', 'controller', 'triggerBeforeModuleProc', 'after');
		}

		return new Object();
	}

	/**
	 * @brief 업데이트가 필요한지 확인
	 **/
	public function checkUpdate()
	{
		$oModuleModel = getModel('module');

		//회원 삭제 시 로그인 기록을 삭제하는 트리거 추가 (2010.06.09)
		if(!$oModuleModel->getTrigger('member.deleteMember', 'loginlog', 'controller', 'triggerDeleteMember', 'after'))
		{
			return true;
		}

		// 회원 로그인 실패 시 로그인 기록을 남기는 트리거 추가 (2010.09.13)
		if(!$oModuleModel->getTrigger('member.doLogin', 'loginlog', 'controller', 'triggerBeforeLogin', 'before'))
		{
			return true;
		}

		// 회원 로그인 성공 시 로그인 기록을 남기는 트리거 추가 (2014.10.05)
		if(!$oModuleModel->getTrigger('member.doLogin', 'loginlog', 'controller', 'triggerAfterLogin', 'after'))
		{
			return true;
		}

		// Trigger 추가 (2014.11.09)
		if(!$oModuleModel->getTrigger('moduleHandler.init', 'loginlog', 'controller', 'triggerBeforeModuleInit', 'after'))
		{
			return true;
		}

		if(!$oModuleModel->getTrigger('moduleHandler.proc', 'loginlog', 'controller', 'triggerBeforeModuleProc', 'after'))
		{
			return true;
		}

		// 로그인 성공 여부를 기록하는 is_succeed 칼럼 추가 (2010.09.13)
		$oDB = DB::getInstance();
		if(!$oDB->isColumnExists('member_loginlog', 'is_succeed'))
		{
			return true;
		}

		// log_srl 칼럼 추가 (2014.11.09)
		if(!$oDB->isColumnExists('member_loginlog', 'log_srl'))
		{
			return true;
		}

		// platform, browser 칼럼 추가 (2013.12.25)
		if(!$oDB->isColumnExists('member_loginlog', 'platform'))
		{
			return true;
		}
		if(!$oDB->isColumnExists('member_loginlog', 'browser'))
		{
			return true;
		}

		// user_id, email_address 칼럼 추가 (2014.07.06)
		if(!$oDB->isColumnExists('member_loginlog', 'user_id'))
		{
			return true;
		}
		if(!$oDB->isColumnExists('member_loginlog', 'email_address'))
		{
			return true;
		}

		return false;
	}

	/**
	 * @brief 모듈 업데이트
	 **/
	public function moduleUpdate()
	{
		$oModuleModel = getModel('module');
		$oModuleController = getController('module');

		if(!$oModuleModel->getTrigger('member.deleteMember', 'loginlog', 'controller', 'triggerDeleteMember', 'after'))
		{
			$oModuleController->insertTrigger('member.deleteMember', 'loginlog', 'controller', 'triggerDeleteMember', 'after');
		}

		// 회원 로그인 시 로그인 기록을 남기는 트리거 추가 (2010.09.13)
		if(!$oModuleModel->getTrigger('member.doLogin', 'loginlog', 'controller', 'triggerBeforeLogin', 'before'))
		{
			$oModuleController->insertTrigger('member.doLogin', 'loginlog', 'controller', 'triggerBeforeLogin', 'before');
		}

		// 회원 로그인 성공 시 로그인 기록을 남기는 트리거 추가 (2014.10.05)
		if(!$oModuleModel->getTrigger('member.doLogin', 'loginlog', 'controller', 'triggerAfterLogin', 'after'))
		{
			$oModuleController->insertTrigger('member.doLogin', 'loginlog', 'controller', 'triggerAfterLogin', 'after');
		}

		// Trigger 추가 (2014.11.09)
		if(!$oModuleModel->getTrigger('moduleHandler.init', 'loginlog', 'controller', 'triggerBeforeModuleInit', 'after'))
		{
			$oModuleController->insertTrigger('moduleHandler.init', 'loginlog', 'controller', 'triggerBeforeModuleInit', 'after');
		}

		if(!$oModuleModel->getTrigger('moduleHandler.proc', 'loginlog', 'controller', 'triggerBeforeModuleProc', 'after'))
		{
			$oModuleController->insertTrigger('moduleHandler.proc', 'loginlog', 'controller', 'triggerBeforeModuleProc', 'after');
		}

		// 로그인 성공 여부를 기록하는 is_succeed 칼럼 추가 (2010.09.13)
		$oDB = DB::getInstance();
		if(!$oDB->isColumnExists('member_loginlog', 'is_succeed'))
		{
			$oDB->addColumn('member_loginlog', 'is_succeed', 'char', 1, 'Y', true);
			$oDB->addIndex('member_loginlog', 'idx_is_succeed', 'is_succeed', false);
		}

		// log_srl 칼럼 추가 (2014.11.09)
		if(!$oDB->isColumnExists('member_loginlog', 'log_srl'))
		{
			$oDB->addColumn('member_loginlog', 'log_srl', 'number', 11, '', true);
		}
		
		// platform, browser 칼럼 추가 (2013.12.25)
		if(!$oDB->isColumnExists('member_loginlog', 'platform'))
		{
			$oDB->addColumn('member_loginlog', 'platform', 'varchar', 50, '', true);
			$oDB->addIndex('member_loginlog', 'idx_platform', 'platform', false);
		}
		if(!$oDB->isColumnExists('member_loginlog', 'browser'))
		{
			$oDB->addColumn('member_loginlog', 'browser', 'varchar', 50, '', true);
			$oDB->addIndex('member_loginlog', 'idx_browser', 'browser', false);
		}

		// user_id, email_address 칼럼 추가 (2014.07.06)
		if(!$oDB->isColumnExists('member_loginlog', 'user_id'))
		{
			$oDB->addColumn('member_loginlog', 'user_id', 'varchar', 80, '', true);
			$oDB->addIndex('member_loginlog', 'idx_user_id', 'user_id', false);
		}
		if(!$oDB->isColumnExists('member_loginlog', 'email_address'))
		{
			$oDB->addColumn('member_loginlog', 'email_address', 'varchar', 250, '', true);
			$oDB->addIndex('member_loginlog', 'idx_email_address', 'email_address', false);
		}

		return new Object(0, 'success_updated');
	}

	/**
	 * @brief 캐시 파일 재생성
	 **/
	function recompileCache()
	{
	}
}

/* End of file : loginlog.class.php */
/* Location : ./modules/loginlog/loginlog.class.php */