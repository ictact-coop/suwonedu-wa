<?php
    /**
	 * @file	rssboard.view.php
     * @class 	rssboardView
     * @author	ChoiHeeChul, KimJinHwan, ParkSunYoung
     * @brief 	rssview Controller
     **/
class rssboardView extends rssboard {
	
	/**
	 * @brief 초기화 / 게시글 작성을 위한 관리자 정보를 저장
	**/	
    function init() {
    }
    
    /**
    * @brief 특정 모듈의 카테고리 정보를 읽어온 후 JSON 으로 반환
    **/
    function dispRssboardCategoryList() {
		
		// 대상 module_srl
        $module_srl = Context::Get("module_srl");
		
        $oDocumentModel = &getModel('document');
        $category_list = $oDocumentModel->getCategoryList($module_srl);
        
		// JSON 형식으로 변환
        $i = 0;
        $result = '{"categories":[';
        foreach($category_list as $v)
        {
            if ($i!=0) $result .= ", ";
            $i ++ ;
            
            $result .= '{"category_srl":' . $v->category_srl . ',';
            $result .= '"title":"' . $v->title . '"}';
        }
        $result .= ']}';
        
		// 별도 헤더와 내용 출력 후 추가 처리를 방지하기 위해 종료
        header ("Content-type: application/json; charset=UTF-8");
		header ("Pragma: no-cache");
        echo $result;
        exit;
    }

}
?>