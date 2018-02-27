<?php
    /**
     * @class lnbMenu
     * @author jedison (master@xgenesis.org)
     * @brief 메뉴 모듈에서 생성된 메뉴로 LNB 메뉴를 만들어 표시하는 위젯입니다.
     * @version 0.1
     **/

    class lnb_menu extends WidgetHandler {
    	/**
         * @brief 위젯의 실행 부분
         *
         * ./widgets/위젯/conf/info.xml 에 선언한 extra_vars를 args로 받는다
         * 결과를 만든후 print가 아니라 return 해주어야 한다
         **/
        function proc($args) {

        	$php_file = sprintf('%sfiles/cache/menu/%d.php', _XE_PATH_, $args->menu_srl);
            @include($php_file);
       
            $widget_info->lnb_menu = $menu;
            if($args->lnb_menu_colorset==null){
            	$args->lnb_menu_colorset = "black";
            }
			$widget_info->lnb_menu_colorset = $args->lnb_menu_colorset;
			$widget_info->advertise_lnb_menu_bottom = $args->advertise_lnb_menu_bottom;
            if($this->selected_node_srl) $widget_info->selected_node_srl = $this->selected_node_srl;
            
            Context::set('widget_info', $widget_info);

            // 템플릿 컴파일
            $tpl_path = sprintf('%sskins/%s', $this->widget_path, $args->skin);
            $tpl_file = 'lnb_menu';

            $oTemplate = &TemplateHandler::getInstance();
            return $oTemplate->compile($tpl_path, $tpl_file);
        }
    }
?>