<?php
    /**
	 * @file	rssboard.admin.view.php
     * @class 	rssboardAdminView
     * @author	ChoiHeeChul, KimJinHwan, ParkSunYoung
     * @brief 	rssboard Admin View
     **/

class rssboardAdminView extends rssboard {
	
	/**
	 * @brief 초기화
	**/
    function init() {
	    // 템플릿 경로 지정 (board의 경우 tpl에 관리자용 템플릿 모아놓음)
        $template_path = sprintf("%stpl/",$this->module_path);
        $this->setTemplatePath($template_path);
	}
	
	/**
	* @brief RSS 게시판 목록을 보여줌. 
	**/
	function dispRssboardAdminContent() {

		// RSS 게시판 목록을 페이징으로 보여줌
		// board 모듈을 참고하였음 
        $args->sort_index = "rssboard_srl";
        $args->page = Context::get('page');
        $args->list_count = 20;
        $args->page_count = 10;

        $output = executeQueryArray('rssboard.getRssboardList', $args);

        // 템플릿에 사용할 값들을 설정
        Context::set('total_count', $output->total_count);
        Context::set('total_page', $output->total_page);
        Context::set('page', $output->page);
        Context::set('rssboard_list', $output->data);
        Context::set('page_navigation', $output->page_navigation);
		
        // 템플릿 파일 지정
        $this->setTemplateFile('index');
    }

	/**
	* @brief RSS 게시판 세부정보/수정 (게시판 입력과 동일)
	**/
	function dispRssboardAdminInfo() {
		$this->dispRssboardAdminInsert() ;
    }

	/**
	* @brief RSS 게시판 수정/입력
	**/
	function dispRssboardAdminInsert() {
		
		// rssboard_srl 이 있을 경우 수정
		$rssboard_srl = Context::get('rssboard_srl');
		if (isset($rssboard_srl))
		{
			// DB 에서 이름,URL,카테고리 가져오기
			$args->rssboard_srl = $rssboard_srl;
			$output = executeQuery('rssboard.getRssboard', $args);
			Context::set('rssname',$output->data->rssname);
			Context::set('rssurl',$output->data->rssurl);
			Context::set('category_srl',$output->data->category_srl);
			
			// 대상 모듈 정보 가져오기
			$oModuleModel = &getModel('module');
	        $target_module = $oModuleModel->getModuleInfoByModuleSrl($output->data->module_srl);
			Context::set('target_module',$target_module);
			
			// 대상 모듈의 카테고리 정보 가져오기
			$oDocumentModel = &getModel('document');
			$category_list = $oDocumentModel->getCategoryList($output->data->module_srl);
			Context::set('category_list',$category_list);			
		}

		$this->setTemplateFile('rss_insert');
    }

}
?>