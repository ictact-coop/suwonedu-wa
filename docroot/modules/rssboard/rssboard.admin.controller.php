<?php
    /**
	 * @file	rssboard.admin.controller.php
     * @class	rssboardAdminController
     * @author	ChoiHeeChul, KimJinHwan, ParkSunYoung
     * @brief	rssboard Admin Controller
     **/
class rssboardAdminController extends rssboard {
	
	/**
	 * @brief 초기화
	**/
    function init() {
	}

	/**
	 * @brief 관리자 페이지에서 추가한 RSS 주소와 대상 게시판을 추가/업데이트 
	 **/	
	function procRssboardAdminUpdate() {
		
		// 기본 인자를 가져옴
		$args = Context::getRequestVars();
		$args->module_srl = $args->target_module;
		
		// Database 적용
		if (isset($args->rssboard_srl) )
		{
			$output = executeQuery('rssboard.updateRssboard',$args);
		}
		else
		{		
			$args->rssboard_srl = getNextSequence();
			$output = executeQuery('rssboard.insertRssboard',$args);
		}
		$this->setMessage('success_registed');
	}
	
	/**
	 * @brief 관리자 페이지에서 삭제한 업데이트 대상 RSS 를 삭제
	 **/
	function procRssboardAdminDelete() {
		
		// 대상 rss 게시판 번호를 가져와서 삭제. 
		$args->rssboard_srl = Context::get('rssboard_srl');
		$output = executeQuery('rssboard.deleteRssboard',$args);
		$this->setMessage('success_deleted');
	}
}
?>