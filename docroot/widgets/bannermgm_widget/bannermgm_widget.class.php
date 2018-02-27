<?php
    /**
     * @class  bannerMgmWidget
     * @author ChoiHeeChul, KimJinHwan, ParkSunYoung
     * @brief  배너 출력 위젯
     **/    

    class bannermgm_widget extends WidgetHandler {

        /**
         * @brief 위젯의 실행 부분
         * ./widgets/위젯/conf/info.xml에 선언한 extra_vars를 args로 받는다
         * 결과를 만든후 print가 아니라 return 해주어야 한다
         **/
        function proc($args) {
	    
	    // 언어팩 로드
	    Context::loadLang(_XE_PATH_.'widgets/bannermgm_widget/lang');

	    // bannermgm 모듈이 설치되어 있지 않은 경우 에러
	    if(!is_dir(_XE_PATH_.'modules/bannermgm/') || !file_exists(_XE_PATH_.'modules/bannermgm/bannermgm.class.php')) return Context::getLang('msg_not_installed_bannermgm_module');

	    $oTemplate = &TemplateHandler::getInstance();
	    
	    $oBannermgmModel = &getModel('bannermgm');
	    
	    $banner_info = $oBannermgmModel->getBannerInfo($args->bannermgm_srl);

	    // 이미지 크기가 넘어오지 않거나 0 이면 공백처리
	    $img_width = "";
	    if($args->img_width && $args->img_width != 0 )
		$img_width = " width=\"" . $args->img_width . "\"";
	    
	    $img_height = "";
	    if($args->img_height && $args->img_height != 0 )
		$img_height = " height=\"" . $args->img_height . "\"";
	
	    // 이전 버전의 widget 에서 target 을 설정하지 않았으면 새창으로 띄운다
	    if(!$args->link_target)
		$args->link_target="_blank";	
	
	    Context::set('image_path',$banner_info->image_path);
	    Context::set('link_url',$banner_info->link_url);
	    Context::set('target',$args->link_target);
	    Context::set('img_width',$img_width);
	    Context::set('img_height',$img_height);

	    $tpl_path = sprintf('%sskins/%s', $this->widget_path, $args->skin);
	    
	    $tmp_arr = explode('.',$banner_info->image_path);

	    // 이미지 종류에 따른 템플릿 컴파일
	    if( strcasecmp($tmp_arr[ count($tmp_arr) - 1 ],'swf') == 0 )
	    {
		$output = $oTemplate->compile($tpl_path, 'flashcontent');		
	    }
	    else
	    {
		$output = $oTemplate->compile($tpl_path, 'content');
	    }
	    return $output;
        }
    }
?>
